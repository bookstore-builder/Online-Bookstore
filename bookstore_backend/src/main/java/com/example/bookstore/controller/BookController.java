package com.example.bookstore.controller;

import com.example.bookstore.dto.DataPage;
import com.example.bookstore.entity.Book;
import com.example.bookstore.service.BookService;
import com.example.bookstore.utils.RedisUtil;
import com.example.bookstore.utils.msgutils.Msg;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
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

    @RequestMapping(value="/searchTypeBookPage")
    public DataPage<Book> searchTypeBookPage(@RequestParam("word") String word, @RequestParam("type") String type, @RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize) {
        return bookService.searchTypeBookPage(word, type, pageNum, pageSize);
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

    @RequestMapping(value = "/addViewsCount")
    public Long addViewsCount() {
        redisUtil.addViewsRecord();
        Long view_counts = redisUtil.getViewsRecord();
        log.info("总用户访问量："+ view_counts);
        return view_counts;
    }
}
