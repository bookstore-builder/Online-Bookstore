package com.example.bookstore.serviceimpl;

import com.example.bookstore.entity.UserAuth;
import com.example.bookstore.service.UserAuthService;
import com.example.bookstore.dao.UserAuthDao;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAuthServiceImpl implements UserAuthService {

    @Autowired
    private UserAuthDao userAuthDao;

    public Msg checkUserAuth (UserAuth userAuth) { return userAuthDao.checkUserAuth(userAuth); }

    public Msg checkUserName (String userName) { return userAuthDao.checkUserName(userName); }

    public Msg addUserAuth (UserAuth userAuth) { return userAuthDao.addUserAuth(userAuth); }

}
