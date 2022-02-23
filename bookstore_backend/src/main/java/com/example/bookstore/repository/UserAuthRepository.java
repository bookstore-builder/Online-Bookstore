package com.example.bookstore.repository;

import com.example.bookstore.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends JpaRepository<UserAuth,String>{

    @Query("from UserAuth where username = :username and password = :password")
    UserAuth checkUser(@Param("username") String username, @Param("password") String password);

    @Query("from UserAuth where username = :username")
    UserAuth findByUsername(@Param("username") String username);

    @Query("from UserAuth where userId = :userId")
    UserAuth findByUserId(@Param("userId") Integer userId);
}
