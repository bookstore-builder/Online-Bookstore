package com.example.bookstore.service;

import com.example.bookstore.dto.DataPage;
import com.example.bookstore.entity.Book;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface BookService {

    Book getBook(Integer id);

    DataPage<Book> getBookPage(Integer pageNum, Integer pageSize);

    DataPage<Book> searchTypeBookPage(String word, String type, Integer pageNum, Integer pageSize);

    DataPage<Book> searchBookPage(String word, Integer pageNum, Integer pageSize);

    Msg addBook(Book book);

    Msg deleteBook(Integer id);

    Book searchBook(String key);

    Msg updateBook(Book book);

    DataPage<Book> getSimilarBooks(String type, Integer pageNum, Integer pageSize);

    List<Map<String, String>> getTopBooks();

    List<Book> fullTextSearchBook(String searchbookstr);

    List<Book> fullTextSearchTypeBook(String word, String type);
}
