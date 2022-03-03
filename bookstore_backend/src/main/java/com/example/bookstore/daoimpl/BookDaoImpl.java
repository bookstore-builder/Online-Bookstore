package com.example.bookstore.daoimpl;

import com.example.bookstore.entity.Book;
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
    public Msg addBook(Book book) {
        Book searchBook = bookRepository.getBookByBookId(book.getBookId());
        if (searchBook != null) {
            return Msg.failed("书籍已存在！");
        } else {
            bookRepository.save(book);
            return Msg.success(null, "已添加书籍！");
        }
    }

    @Override
    @CacheEvict(value = "book", key = "'id-' + #p0.bookId")
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

}
