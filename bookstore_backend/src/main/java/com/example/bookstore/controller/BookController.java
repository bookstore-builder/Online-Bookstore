package com.example.bookstore.controller;

import com.example.bookstore.dto.DataPage;
import com.example.bookstore.entity.Book;
import com.example.bookstore.service.BookService;
import com.example.bookstore.utils.RedisUtil;
import com.example.bookstore.utils.msgutils.Msg;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class BookController {
    private final String VIEWS_TOPIC = "/topic/views-count";
    private final RedisUtil redisUtil;

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/getBookPage")
    public DataPage<Book> getBookPage(@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
        return bookService.getBookPage(pageNum, pageSize);
    }

    @RequestMapping(value="/searchBookPage")
    public DataPage<Book> searchBookPage(@RequestParam("word") String word, @RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
        return bookService.searchBookPage(word, pageNum, pageSize);
    }

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
    public DataPage<Book> getSimilarBooks(@RequestParam("type") String type, @RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
        return bookService.getSimilarBooks(type, pageNum, pageSize);
    }

    @RequestMapping(value = "/getTopBooks")
    public List<Map<String, String>> getTopBooks() { return bookService.getTopBooks(); }

    @MessageMapping(value = "/add-views")
    @SendTo(VIEWS_TOPIC)
    public Long getViewsCount() {
        redisUtil.addViewsRecord();
        return bookService.getHomePageViewsCount();
    }
}
