package com.example.bookstore.controller;

import com.example.bookstore.entity.User;
import com.example.bookstore.dto.UserResult;
import com.example.bookstore.service.UserService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value="/uploadAvatar")
    public Msg uploadAvatar(@RequestParam("userId") Integer userId, @RequestParam("avatar") String avatar) {
        return userService.uploadAvatar(userId, avatar);
    }

    @RequestMapping(value="/getAvatar")
    public Msg getAvatar(@RequestParam("userId") Integer userId) {
        return userService.getAvatar(userId);
    }

    @RequestMapping(value = "/updateUser")
    public Msg updateUser(@RequestBody User user) { return userService.updateUser(user); }

    @RequestMapping(value = "/activateUser")
    public Msg activateUser(@RequestParam("userId") Integer userId) { return userService.activateUser(userId); }

    @RequestMapping(value = "/banUser")
    public Msg banUser(@RequestParam("userId") Integer userId) { return userService.banUser(userId); }

    @RequestMapping(value = "/getUser")
    public User getUser(@RequestParam("userId") Integer userId) { return userService.getUser(userId); }

    @RequestMapping(value = "/getAllUser")
    public List<UserResult> getAllUser() { return userService.getAllUser(); }
}
