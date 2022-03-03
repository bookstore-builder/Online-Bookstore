package com.example.bookstore.serviceimpl;

import com.example.bookstore.dao.OrderDao;
import com.example.bookstore.dto.BookStatisticResult;
import com.example.bookstore.dto.DataPage;
import com.example.bookstore.dto.OrderResult;
import com.example.bookstore.dto.UserStatisticResult;
import com.example.bookstore.service.OrderService;
import com.example.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderDao orderDao;

    @Override
    public Msg addItem(Integer bookId, Integer bookNum, Integer orderId) { return orderDao.addItem(bookId, bookNum, orderId); }

    @Override
    public List<OrderResult> getOrderBooks(Integer userId) { return orderDao.getOrderBooks(userId); }

    @Override
    public List<OrderResult> getAllOrderBooks() { return orderDao.getAllOrderBooks(); }

    @Override
    public DataPage<OrderResult> getOrderPage(Integer pageNum, Integer pageSize, String search, String time, Integer userId)
    {
        return orderDao.getOrderPage(pageNum, pageSize, search, time, userId);
    }

    @Override
    public List<Integer> getBookSale(Integer bookId, String time) { return orderDao.getBookSale(bookId, time); }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public Msg changeBooksNum(JSONObject order) { return orderDao.changeBooksNum(order); }

    @Override
    public List<BookStatisticResult> getBookStatistic(String time) { return orderDao.getBookStatistic(time); }

    @Override
    public List<UserStatisticResult> getUserStatistic(String time) { return orderDao.getUserStatistic(time); }

    @Override
    public Msg updateTopBooks(String time) { return orderDao.updateTopBooks(time); }

    @Override
    public List<Map<String, String>> getUserBookType(Integer userId) { return orderDao.getUserBookType(userId); }

    @Override
    public List<BookStatisticResult> getUserBookStatistic(Integer userId, String time) { return orderDao.getUserBookStatistic(userId, time); }
}
