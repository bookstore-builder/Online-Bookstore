package com.example.bookstore.serviceimpl;

import com.example.bookstore.dao.BookDao;
import com.example.bookstore.entity.Book;
import com.example.bookstore.service.BookService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book getBook(Integer id){
        return bookDao.getBook(id);
    }

    @Override
    public List<Book> getBooks() { return bookDao.getBooks(); }

    @Override
    public Msg addBook(Book book) { return bookDao.addBook(book); }

    @Override
    public Msg deleteBook(Integer id) { return bookDao.deleteBook(id); }

    @Override
    public Book searchBook(String key) { return bookDao.searchBook(key); }

    @Override
    public Msg updateBook(Book book) { return bookDao.updateBook(book); }

    @Override
    public List<Book> getSimilarBooks(String type) { return bookDao.getSimilarBooks(type); }

    @Override
    public List<Map<String, String>> getTopBooks() { return bookDao.getTopBooks(); }

}
