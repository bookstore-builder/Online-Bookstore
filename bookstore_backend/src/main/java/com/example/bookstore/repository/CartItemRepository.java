package com.example.bookstore.repository;

import com.example.bookstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    @Query("from CartItem i where i.bookId = :bookId and i.userCart.userAuth.userId = :userId")
    CartItem findByBothId(Integer bookId, Integer userId);

    @Transactional
    @Modifying
    @Query("delete from CartItem where itemId = :itemId")
    void deleteByItemId(Integer itemId);

    @Transactional
    @Modifying
    @Query("delete from CartItem where itemId in :itemIds")
    void deleteByItemIds(List<Integer> itemIds);
}
