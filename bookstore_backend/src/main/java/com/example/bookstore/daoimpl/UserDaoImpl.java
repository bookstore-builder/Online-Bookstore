package com.example.bookstore.daoimpl;

import com.example.bookstore.dao.UserDao;
import com.example.bookstore.entity.Book;
import com.example.bookstore.entity.OrderItem;
import com.example.bookstore.entity.User;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.repository.OrderItemRepository;
import com.example.bookstore.dto.UserResult;
import com.example.bookstore.repository.UserAuthRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.lang.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private BookRepository bookRepository;

    public Msg updateUser(User user) {
//        System.out.print(user.getName());
        User searchUser = userRepository.findByUserId(user.getUserId());
//        User searchUser = userRepository.findByUserName(user.getName());
        if(searchUser == null) {
            return Msg.failed("用户不存在！");
        } else {
            searchUser.setName(user.getName());
            searchUser.setDescription(user.getDescription());
            searchUser.setEmail(user.getEmail());
            searchUser.setAddress(user.getAddress());
            searchUser.setBirthday(user.getBirthday());
            searchUser.setSex(user.getSex());
            searchUser.setTel(user.getTel());
            userRepository.save(searchUser);
            return Msg.success(null, "已更新用户信息！");
        }
    }

    public Msg activateUser(Integer userId) {
        User searchUser = userRepository.findByUserId(userId);
        if(searchUser == null) {
            return Msg.failed("用户不存在！");
        } else {
            searchUser.setState(1);
            userRepository.save(searchUser);
            return Msg.success(null, "已激活用户！");
        }
    }

    public Msg banUser(Integer userId) {
        User searchUser = userRepository.findByUserId(userId);
        if(searchUser == null) {
            return Msg.failed("用户不存在！");
        } else {
            searchUser.setState(0);
            userRepository.save(searchUser);
            return Msg.success(null, "已禁用用户！");
        }
    }

    public User getUser(Integer userId) {
        return userRepository.findByUserId(userId);
    }

    public List<UserResult> getAllUser() {
        List<UserResult> userResults = new ArrayList<>();
        Integer key = 0;
        List<User> users = userRepository.findAllCustomers();
        for(User user: users) {
            UserResult userResult = new UserResult();
            key++;
            userResult.setKey(key);
            userResult.setUserId(user.getUserId());
            userResult.setName(user.getName());
            userResult.setAddress(user.getAddress());
            userResult.setTime(user.getTime());
            Integer state = user.getState();
            if(state == 1) {
                userResult.setTags("正常");
            } else {
                userResult.setTags("禁用");
            }
            List<OrderItem> orderItems = orderItemRepository.getUserItems(user.getUserId());
            BigDecimal money = new BigDecimal("0.0");
            for(OrderItem userItem: orderItems){
                Book book = bookRepository.getBookByBookId(userItem.getBookId());
                money = money.add(book.getPrice().multiply(new BigDecimal(userItem.getBookNum())));
            }
            userResult.setCost(money);
            userResults.add(userResult);
        }
        return userResults;
    }

}
