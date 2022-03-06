package com.example.bookstore.service;

import com.example.bookstore.entity.User;
import com.example.bookstore.dto.UserResult;
import com.example.bookstore.utils.msgutils.Msg;

import java.util.List;

public interface UserService {
    Msg uploadAvatar(Integer userId, String avatar);

    Msg getAvatar(Integer userId);

    Msg updateUser(User user);

    Msg activateUser(Integer userId);

    Msg banUser(Integer userId);

    User getUser(Integer userId);

    List<UserResult> getAllUser();
}
