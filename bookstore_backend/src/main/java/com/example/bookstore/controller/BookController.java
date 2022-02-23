package com.example.bookstore.controller;

import com.example.bookstore.entity.Book;
import com.example.bookstore.service.BookService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/getBooks")
    public List<Book> getBooks(@RequestBody Map<String, String> params) { return bookService.getBooks(); }

    @RequestMapping(value = "/getBook")
    public Book getBook(@RequestParam("id") Integer id) { return bookService.getBook(id); }

    @RequestMapping(value = "/addBook")
    public Msg addBook(@RequestBody Book book) { return bookService.addBook(book); }

    @RequestMapping(value = "/deleteBook")
    public Msg deleteBook(@RequestParam("id") Integer id) { return bookService.deleteBook(id); }

    @RequestMapping(value = "/searchBook")
    public Book searchBook(@RequestParam("bookName") String bookName) { return bookService.searchBook(bookName); }

    @RequestMapping(value = "/updateBook")
    public Msg updateBook(@RequestBody Book book) { return bookService.updateBook(book); }

    @RequestMapping(value = "/getSimilarBooks")
    public List<Book> getSimilarBooks(@RequestParam("type") String type) { return bookService.getSimilarBooks(type); }

    @RequestMapping(value = "/getTopBooks")
    public List<Map<String, String>> getTopBooks() { return bookService.getTopBooks(); }
}
