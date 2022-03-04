package com.example.bookstore.dao;

import com.example.bookstore.dto.DataPage;
import com.example.bookstore.entity.Book;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface BookDao {
    Book getBook(Integer id);

    DataPage<Book> getBooks(Pageable pageable);

    DataPage<Book> searchTypeBooks(String word, String type, Pageable pageable);

    DataPage<Book> searchBooks(String word, Pageable pageable);

    Msg addBook(Book book);

    Msg deleteBook(Integer id);

    Book searchBook(String key);

    Msg updateBook(Book book);

    DataPage<Book> getSimilarBooks(String type, Pageable pageable);

    List<Map<String, String>> getTopBooks();
}
