package com.example.bookstore.repository;

import com.example.bookstore.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    @Query("from User where userAuth.userId = :userId")
    User findByUserId(@Param("userId") Integer userId);

    @Query("from User where name = :name")
    User findByUserName(@Param("name") String name);

    @Query("from User where userAuth.userType = 1")
    List<User> findAllCustomers();
}
