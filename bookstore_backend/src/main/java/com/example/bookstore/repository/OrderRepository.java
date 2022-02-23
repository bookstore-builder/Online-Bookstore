package com.example.bookstore.repository;

import com.example.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{

    @Query("from Order where orderId = :orderId")
    Order findByOrderId(Integer orderId);

    @Query("from Order where time >= :time")
    List<Order> getOrdersByTime(String time);

    @Query("from Order where userAuth.userId = :userId and time >= :time")
    List<Order> getUserBookStatistic(Integer userId, String time);
}
