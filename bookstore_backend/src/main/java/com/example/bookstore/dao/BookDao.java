package com.example.bookstore.dao;

import com.example.bookstore.entity.Book;
import com.example.bookstore.utils.msgutils.Msg;

import java.util.List;
import java.util.Map;

public interface BookDao {
    Book getBook(Integer id);

    List<Book> getBooks();

    Msg addBook(Book book);

    Msg deleteBook(Integer id);

    Book searchBook(String key);

    Msg updateBook(Book book);

    List<Book> getSimilarBooks(String type);

    List<Map<String, String>> getTopBooks();
}
