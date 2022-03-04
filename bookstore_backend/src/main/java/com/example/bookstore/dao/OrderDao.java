package com.example.bookstore.dao;

import com.example.bookstore.dto.BookStatisticResult;
import com.example.bookstore.dto.DataPage;
import com.example.bookstore.dto.OrderResult;
import com.example.bookstore.dto.UserStatisticResult;
import com.example.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;

import java.util.List;
import java.util.Map;

public interface OrderDao {

    Msg addItem(Integer bookId, Integer bookNum, Integer orderId);

    List<OrderResult> getOrderBooks(Integer userId);

    List<OrderResult> getAllOrderBooks();

    DataPage<OrderResult> getOrderPage(Integer pageNum, Integer pageSize, String search, String time, Integer userId);

    Msg changeBooksNum(JSONObject order);

    List<Integer> getBookSale(Integer bookId, String time);

    Msg updateTopBooks(String time);

    List<BookStatisticResult> getBookStatistic(String time);

    List<BookStatisticResult> getUserBookStatistic(Integer userId, String time);

    List<UserStatisticResult> getUserStatistic(String time);

    List<Map<String,String>>  getUserBookType(Integer userId);
}
