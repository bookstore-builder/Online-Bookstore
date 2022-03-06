package com.example.bookstore.daoimpl;

import com.example.bookstore.entity.Book;
import com.example.bookstore.fulltextsearch.FilesPositionConfig;
import com.example.bookstore.fulltextsearch.ReadWriteFiles;
import com.example.bookstore.fulltextsearch.SearchFiles;
import com.example.bookstore.entity.BookImage;
import com.example.bookstore.repository.BookImageRepository;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.dao.BookDao;
import com.example.bookstore.dto.DataPage;
import com.example.bookstore.utils.msgutils.Msg;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookImageRepository bookImageRepository;

    @Override
    @Cacheable(value = "book", key = "'id-' + #p0")
    public Book getBook(Integer id){
        Book searchBook = bookRepository.getBookByBookId(id);
        BookImage searchBookImage = bookImageRepository.findByBookId(id);
        if (searchBookImage != null) {
            searchBook.setImage(searchBookImage.getImageBase64());
        }
        return searchBook;
    }

    @Override
    @Cacheable(value = "book-all", key = "#p0.pageNumber + '-' + #p0.pageSize")
    public DataPage<Book> getBooks(Pageable pageable) {
        DataPage<Book> bookPage = new DataPage<>(bookRepository.getBooks(pageable));
        List<Book> books = bookPage.getObjectList();
        for (int i=0; i < books.size(); i++) {
            BookImage searchBookImage = bookImageRepository.findByBookId(books.get(i).getBookId());
            if (searchBookImage != null) {
                books.get(i).setImage(searchBookImage.getImageBase64());
            }
        }
        return bookPage;
    }

    @Override
    public DataPage<Book> searchTypeBooks(String word, String type, Pageable pageable) {
        DataPage<Book> bookPage = new DataPage<>(bookRepository.searchTypeBooks(word, type, pageable));
        List<Book> books = bookPage.getObjectList();
        for (int i=0; i < books.size(); i++) {
            BookImage searchBookImage = bookImageRepository.findByBookId(books.get(i).getBookId());
            if (searchBookImage != null) {
                books.get(i).setImage(searchBookImage.getImageBase64());
            }
        }
        return bookPage;
    }

    @Override
    @Cacheable(value = "book-name", key = "#p0 + '-' + #p1.pageNumber + '-' + #p1.pageSize")
    public DataPage<Book> searchBooks(String word, Pageable pageable) {
        DataPage<Book> bookPage = new DataPage<>(bookRepository.searchBooks(word, pageable));
        List<Book> books = bookPage.getObjectList();
        for (int i=0; i < books.size(); i++) {
            BookImage searchBookImage = bookImageRepository.findByBookId(books.get(i).getBookId());
            if (searchBookImage != null) {
                books.get(i).setImage(searchBookImage.getImageBase64());
            }
        }
        return bookPage;
    }

    @Override
    @Cacheable(value = "book-type", key = "#p0 + '-' + #p1.pageNumber + '-' + #p1.pageSize")
    public DataPage<Book> getSimilarBooks(String type, Pageable pageable) {
        DataPage<Book> bookPage = new DataPage<>(bookRepository.getSimilarBooks(type, pageable));
        List<Book> books = bookPage.getObjectList();
        for (int i=0; i < books.size(); i++) {
            BookImage searchBookImage = bookImageRepository.findByBookId(books.get(i).getBookId());
            if (searchBookImage != null) {
                books.get(i).setImage(searchBookImage.getImageBase64());
            }
        }
        return bookPage;
    }

    @Override
    @CacheEvict(cacheNames = {"book-all", "book-name", "book-type"}, allEntries = true)
    public Msg addBook(Book book) {
        Book searchBook = bookRepository.getBookByBookId(book.getBookId());
        if (searchBook != null) {
            return Msg.failed("书籍已存在！");
        } else {
            BookImage bookImage = new BookImage();
            bookImage.setImageBase64(book.getImage());
            book.setImage("");
            bookRepository.save(book);
            ReadWriteFiles.create_docs_files(book.getBookId(), book.getName() + book.getDescription(), true);
            bookImage.setBookId(book.getBookId());
            bookImageRepository.save(bookImage);
            return Msg.success(null, "已添加书籍！");
        }
    }

    @Override
    @CacheEvict(cacheNames = {"book-all", "book-name", "book-type", "book"}, allEntries = true)
    public Msg deleteBook(Integer id) {
        Book searchBook = bookRepository.getBookByBookId(id);
        BookImage searchBookImage = bookImageRepository.findByBookId(id);
        if (searchBook != null) {
            bookRepository.deleteByItemId(id);
            if (searchBookImage != null) {
                bookImageRepository.deleteByBookId(id);
            }
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
        BookImage searchBookImage = bookImageRepository.findByBookId(book.getBookId());
        if (searchBook == null) {
            return Msg.failed("书籍不存在！");
        } else {
            searchBook.setAuthor(book.getAuthor());
            searchBook.setDescription(book.getDescription());
            searchBook.setInventory(book.getInventory());
            searchBook.setName(book.getName());
            searchBook.setPrice(book.getPrice());
            searchBook.setType(book.getType());
            searchBook.setIsbn(book.getIsbn());
            bookRepository.save(searchBook);
            ReadWriteFiles.create_docs_files(searchBook.getBookId(), searchBook.getName() + searchBook.getDescription(), true);
            if (searchBookImage == null) {
                searchBookImage = new BookImage();
                searchBookImage.setBookId(book.getBookId());
            }
            bookImageRepository.deleteByBookId(book.getBookId());
            searchBookImage.setImageBase64(book.getImage());
            bookImageRepository.save(searchBookImage);

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
