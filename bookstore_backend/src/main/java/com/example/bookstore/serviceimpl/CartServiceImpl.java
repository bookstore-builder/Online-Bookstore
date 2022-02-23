package com.example.bookstore.serviceimpl;

import com.example.bookstore.dao.CartDao;
import com.example.bookstore.dto.CartResult;
import com.example.bookstore.entity.UserCart;
import com.example.bookstore.service.CartService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartDao cartDao;

    @Override
    public UserCart getCart(Integer userId) { return cartDao.getCart(userId); };

    @Override
    public List<UserCart> getCarts() { return cartDao.getCarts(); };

    @Override
    public Msg addItem(Integer bookId, Integer bookNum, Integer userId) { return cartDao.addItem(bookId, bookNum, userId); };

    @Override
    public List<CartResult> getCartBooks(Integer userId) { return cartDao.getCartBooks(userId); };

    @Override
    public Msg changeBookNum(Integer bookId, Integer bookNum, Integer userId) { return cartDao.changeBookNum(bookId, bookNum, userId);};

    @Override
    public Boolean deleteItem(Integer userId, Integer bookId) {return cartDao.deleteItem(userId, bookId);};

    @Override
    public Msg deleteCartItems(Integer userId, List<Integer> books) {return cartDao.deleteCartItems(userId, books);};
}
