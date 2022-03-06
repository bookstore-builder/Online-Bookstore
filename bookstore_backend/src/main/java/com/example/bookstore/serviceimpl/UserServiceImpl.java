package com.example.bookstore.serviceimpl;

import com.example.bookstore.dao.UserDao;
import com.example.bookstore.entity.User;
import com.example.bookstore.dto.UserResult;
import com.example.bookstore.service.UserService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public Msg uploadAvatar(Integer userId, String avatar) { return userDao.uploadAvatar(userId, avatar); }

    @Override
    public Msg getAvatar(Integer userId) { return userDao.getAvatar(userId); }

    @Override
    public Msg updateUser(User user) { return userDao.updateUser(user); }

    @Override
    public Msg activateUser(Integer userId) { return userDao.activateUser(userId); }

    @Override
    public Msg banUser(Integer userId) { return userDao.banUser(userId); }

    @Override
    public User getUser(Integer userId) { return userDao.getUser(userId); }

    @Override
    public List<UserResult> getAllUser() { return userDao.getAllUser(); }
}
