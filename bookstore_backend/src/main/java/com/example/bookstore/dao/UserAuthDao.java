package com.example.bookstore.dao;

import com.example.bookstore.entity.UserAuth;
import com.example.bookstore.utils.msgutils.Msg;

public interface UserAuthDao {

    Msg checkUserAuth (UserAuth userAuth);

    Msg checkUserName (String userName);

    Msg addUserAuth (UserAuth userAuth);
}
