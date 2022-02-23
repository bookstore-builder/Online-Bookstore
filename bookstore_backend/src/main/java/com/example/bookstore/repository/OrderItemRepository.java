package com.example.bookstore.repository;

import com.example.bookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>{

    @Query("select sum(bookNum) from OrderItem where bookId = :bookId and order.time >= :time")
    Integer getBookNum(Integer bookId, String time);

    @Query("from OrderItem where order.userAuth.userId = :userId and order.time >= :time")
    List<OrderItem> getUserTimeItems(Integer userId, String time);

    @Query("select sum(bookNum) from OrderItem  where bookId = :bookId and order.userAuth.userId = :userId and order.time >= :time")
    Integer getUserBookNum(Integer bookId, Integer userId, String time);

    @Query("select sum(bookNum) from OrderItem  where bookId = :bookId and order.time = :time")
    Integer getBookSale(Integer bookId, String time);

    @Query("from OrderItem where order.userAuth.userId = :userId")
    List<OrderItem> getUserItems(Integer userId);
}
