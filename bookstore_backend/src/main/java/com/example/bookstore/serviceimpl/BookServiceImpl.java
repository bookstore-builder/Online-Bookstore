package com.example.bookstore.serviceimpl;

import com.example.bookstore.dao.BookDao;
import com.example.bookstore.entity.Book;
import com.example.bookstore.dto.DataPage;
import com.example.bookstore.service.BookService;
import com.example.bookstore.utils.RedisUtil;
import com.example.bookstore.utils.msgutils.Msg;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookDao bookDao;
    private final RedisUtil redisUtil;

    @Override
    public Book getBook(Integer id){
        return bookDao.getBook(id);
    }

    @Override
    public DataPage<Book> getBookPage(Integer pageNum, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return bookDao.getBooks(pageable);
    }

    @Override
    public DataPage<Book> searchTypeBookPage(String word, String type, Integer pageNum, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return bookDao.searchTypeBooks(word, type, pageable);
    }

    @Override
    public DataPage<Book> searchBookPage(String word, Integer pageNum, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return bookDao.searchBooks(word, pageable);
    }

    @Override
    public Msg addBook(Book book) { return bookDao.addBook(book); }

    @Override
    public Msg deleteBook(Integer id) { return bookDao.deleteBook(id); }

    @Override
    public Book searchBook(String key) { return bookDao.searchBook(key); }

    @Override
    public Msg updateBook(Book book) { return bookDao.updateBook(book); }

    @Override
    public DataPage<Book> getSimilarBooks(String type, Integer pageNum, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return bookDao.getSimilarBooks(type, pageable);
    }

    @Override
    public List<Map<String, String>> getTopBooks() { return bookDao.getTopBooks(); }

    @Override
    public List<Book> fullTextSearchBook(String searchbookstr) {
        return bookDao.fullTextSearchBook(searchbookstr);
    }
}
