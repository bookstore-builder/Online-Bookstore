package com.example.bookstore.repository;

import com.example.bookstore.entity.UserAvatar;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserAvatarRepository extends MongoRepository<UserAvatar, Integer> {
    UserAvatar findByUserId(Integer userId);

    UserAvatar deleteByUserId(Integer userId);
}
