package com.example.bookstore.controller;

import com.example.bookstore.activemq.QueueProducer;
import com.example.bookstore.dto.BookStatisticResult;
import com.example.bookstore.dto.DataPage;
import com.example.bookstore.dto.OrderResult;
import com.example.bookstore.dto.UserStatisticResult;
import com.example.bookstore.service.OrderService;
import com.example.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.lang.*;

@RestController
public class OrderController {

    @Autowired
    private  OrderService orderService;

    QueueProducer orderProducer = new QueueProducer("order");
    private static final Logger LOG = LoggerFactory.getLogger(OrderController.class);

    @RequestMapping(value = "/getOrderBooks")
    public List<OrderResult> getOrderBooks(@RequestParam("userId") Integer id) { return orderService.getOrderBooks(id); }

    @RequestMapping(value = "/getAllOrderBooks")
    public List<OrderResult> getAllOrderBooks() { return orderService.getAllOrderBooks(); }

    @RequestMapping(value = "/getOrderPage")
    public DataPage<OrderResult> getOrderPage(@RequestParam("pageNum") Integer pageNum, @RequestParam("pageSize") Integer pageSize,
                                        @RequestParam("search") String search, @RequestParam("time") String time,
                                        @RequestParam("userId") Integer userId){
        return orderService.getOrderPage(pageNum, pageSize, search, time, userId);
    }

    @RequestMapping(value = "/changeOrderNums")
    public Msg changeBooksNum(@RequestBody List<Map<String, Integer>> orderarg){
        JSONObject order = new JSONObject();
        order.put("userId", orderarg.get(0).get("userId"));
        JSONArray books = new JSONArray();
        for(Map<String, Integer>cur : orderarg) {
            JSONObject book = new JSONObject();
            book.put("bookId", cur.get("bookId"));
            book.put("bookNum", cur.get("bookNum"));
            books.add(book);
        }
        order.put("books", books);
        System.out.println(order);
        orderProducer.sendMsg(order);
        return Msg.success(null, "订单正在处理");
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
