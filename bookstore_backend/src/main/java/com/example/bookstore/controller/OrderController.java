package com.example.bookstore.controller;

import com.example.bookstore.dto.BookStatisticResult;
import com.example.bookstore.dto.OrderPage;
import com.example.bookstore.dto.OrderResult;
import com.example.bookstore.dto.UserStatisticResult;
import com.example.bookstore.service.OrderService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.lang.*;

@RestController
public class OrderController {

    @Autowired
    private  OrderService orderService;

    @RequestMapping(value = "/getOrderBooks")
    public List<OrderResult> getOrderBooks(@RequestParam("userId") Integer id) { return orderService.getOrderBooks(id); }

    @RequestMapping(value = "/getAllOrderBooks")
    public List<OrderResult> getAllOrderBooks() { return orderService.getAllOrderBooks(); }

    @RequestMapping(value = "/getOrderPage")
    public OrderPage getOrderPage(@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize,
                                  @RequestParam("search") String search, @RequestParam("time") String time,
                                  @RequestParam("userId") Integer userId){
        return orderService.getOrderPage(pageNum, pageSize, search, time, userId);
    }

    @RequestMapping(value = "/changeOrderNums")
    public Msg changeBooksNum(@RequestBody List<Map<String, Integer>> books){
        return orderService.changeBooksNum(books);
    }

    @RequestMapping(value = "/getBookSale")
    public List<Integer> getBookSale(@RequestParam("bookId") Integer bookId, @RequestParam("time") String time){
        return orderService.getBookSale(bookId, time);
    }

    @RequestMapping(value = "/getBookStatistic")
    public List<BookStatisticResult> getBookStatistic(@RequestParam("time") String time) {
        return orderService.getBookStatistic(time);
    }

    @RequestMapping(value = "/getUserStatistic")
    public List<UserStatisticResult> getUserStatistic(@RequestParam("time") String time) {
        return orderService.getUserStatistic(time);
    }

    @RequestMapping(value = "/getUserBookStatistic")
    public List<BookStatisticResult> getUserBookStatistic(@RequestParam("userId") Integer userId, @RequestParam("time") String time){
        return orderService.getUserBookStatistic(userId, time);
    }

    @RequestMapping(value = "/getUserBookType")
    public List<Map<String, String>> getUserBookType(@RequestParam("userId") Integer userId) {
        return orderService.getUserBookType(userId);
    }

    @RequestMapping(value = "/updateTopBooks")
    public Msg updateTopBooks(@RequestParam("time") String time) {
        return orderService.updateTopBooks(time);
    }

}
