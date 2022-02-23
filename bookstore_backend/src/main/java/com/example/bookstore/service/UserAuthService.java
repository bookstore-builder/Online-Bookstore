package com.example.bookstore.service;

import com.example.bookstore.utils.msgutils.Msg;
import com.example.bookstore.entity.UserAuth;

public interface UserAuthService {

    Msg checkUserAuth (UserAuth userAuth);

    Msg checkUserName (String userName);

    Msg addUserAuth (UserAuth userAuth);
}
