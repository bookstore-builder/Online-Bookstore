package com.example.bookstore.repository;

import com.example.bookstore.entity.UserCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCartRepository extends JpaRepository<UserCart, Integer> {

    @Query("from UserCart where userAuth.userId = :id")
    UserCart findByUserId(Integer id);

}
