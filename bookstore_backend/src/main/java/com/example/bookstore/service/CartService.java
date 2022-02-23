package com.example.bookstore.service;

import com.example.bookstore.entity.UserCart;
import com.example.bookstore.dto.CartResult;
import com.example.bookstore.utils.msgutils.Msg;

import java.util.List;

public interface CartService {

    UserCart getCart(Integer userId);

    List<UserCart> getCarts();

    Msg addItem(Integer bookId, Integer bookNum, Integer userId);

    List<CartResult> getCartBooks(Integer userId);

    Msg changeBookNum(Integer bookId, Integer bookNum, Integer userId);

    public Boolean deleteItem(Integer userId, Integer bookId);

    public Msg deleteCartItems(Integer userId, List<Integer> books);
}
