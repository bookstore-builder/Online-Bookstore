package com.example.bookstore.daoimpl;

import com.example.bookstore.entity.Book;
import com.example.bookstore.fulltextsearch.FilesPositionConfig;
import com.example.bookstore.fulltextsearch.ReadWriteFiles;
import com.example.bookstore.fulltextsearch.SearchFiles;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.dao.BookDao;
import com.example.bookstore.dto.DataPage;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    @Cacheable(value = "book", key = "'id-' + #p0")
    public Book getBook(Integer id){
        return bookRepository.getBookByBookId(id);
    }

    @Override
    @Cacheable(value = "book-all", key = "#p0.pageNumber + '-' + #p0.pageSize")
    public DataPage<Book> getBooks(Pageable pageable) {
        return new DataPage<>(bookRepository.getBooks(pageable));
    }

    @Override
    public DataPage<Book> searchTypeBooks(String word, String type, Pageable pageable) {
        return new DataPage<>(bookRepository.searchTypeBooks(word, type, pageable));
    }

    @Override
    @Cacheable(value = "book-name", key = "#p0 + '-' + #p1.pageNumber + '-' + #p1.pageSize")
    public DataPage<Book> searchBooks(String word, Pageable pageable) {
        return new DataPage<>(bookRepository.searchBooks(word, pageable));
    }

    @Override
    @Cacheable(value = "book-type", key = "#p0 + '-' + #p1.pageNumber + '-' + #p1.pageSize")
    public DataPage<Book> getSimilarBooks(String type, Pageable pageable) {
        return new DataPage<>(bookRepository.getSimilarBooks(type, pageable));
    }

    @Override
    @CacheEvict(cacheNames = {"book-all", "book-name", "book-type"}, allEntries = true)
    public Msg addBook(Book book) {
        Book searchBook = bookRepository.getBookByBookId(book.getBookId());
        if (searchBook != null) {
            return Msg.failed("书籍已存在！");
        } else {
            bookRepository.save(book);
            ReadWriteFiles.create_docs_files(book.getBookId(), book.getName() + book.getDescription(), true);
            return Msg.success(null, "已添加书籍！");
        }
    }

    @Override
    @CacheEvict(cacheNames = {"book-all", "book-name", "book-type", "book"}, allEntries = true)
    public Msg deleteBook(Integer id) {
        Book searchBook = bookRepository.getBookByBookId(id);
        if (searchBook != null) {
            bookRepository.deleteByItemId(id);
            return Msg.success(null, "已删除书籍！");
        } else {
            return Msg.failed("书籍不存在！");
        }
    }

    @Override
    public Book searchBook(String key) { return bookRepository.getBookByName(key); }

    @Override
    @CacheEvict(cacheNames = {"book-all", "book-name", "book-type", "book"}, allEntries = true)
    public Msg updateBook(Book book) {
        Book searchBook = bookRepository.getBookByBookId(book.getBookId());
        if (searchBook == null) {
            return Msg.failed("书籍不存在！");
        } else {
            searchBook.setAuthor(book.getAuthor());
            searchBook.setDescription(book.getDescription());
            searchBook.setImage(book.getImage());
            searchBook.setInventory(book.getInventory());
            searchBook.setName(book.getName());
            searchBook.setPrice(book.getPrice());
            searchBook.setType(book.getType());
            searchBook.setIsbn(book.getIsbn());
            bookRepository.save(searchBook);
            ReadWriteFiles.create_docs_files(searchBook.getBookId(), searchBook.getName() + searchBook.getDescription(), true);
            return Msg.success(null,"已更新书籍！");
        }
    }

    @Override
    public List<Map<String, String>> getTopBooks(){
        List<Map<String, String>> topBookResults = new ArrayList<>();
        List<Book> topBooks = bookRepository.getTopBooks();
        Integer key = 0;
        for(Book book: topBooks){
            key++;
            Map<String, String> result = new HashMap<>();
            result.put("key", Integer.toString(key));
            result.put("name", book.getName());
            result.put("bookId", Integer.toString(book.getBookId()));
            topBookResults.add(result);
        }
        return topBookResults;
    }

    @Override
    public List<Book> fullTextSearchBook(String text) {
        List<Book> bookList = new ArrayList<>();
//        for (int i = 1; i < 30; ++i) {
//            Book book = bookRepository.getBookByBookId(i);
//            ReadWriteFiles.create_docs_files(book.getBookId(), book.getName() + book.getDescription(), true);
//        }
        try {
            String[] args = {"-index", FilesPositionConfig.indexPath, "-query", text};
            List<Integer> bookidList = SearchFiles.search_interface(args);
            System.out.println(bookidList);
            for (Integer integer : bookidList) {
                Book book = bookRepository.getBookByBookId(integer);
                /* 如果该书没有被删除 */
               if (book != null) bookList.add(book);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(bookList);
        return bookList;
    }
}
