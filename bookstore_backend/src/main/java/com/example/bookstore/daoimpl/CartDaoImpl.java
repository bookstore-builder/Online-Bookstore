package com.example.bookstore.daoimpl;

import com.example.bookstore.dao.CartDao;
import com.example.bookstore.entity.*;
import com.example.bookstore.repository.CartItemRepository;
import com.example.bookstore.repository.UserAuthRepository;
import com.example.bookstore.repository.UserCartRepository;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.dto.CartResult;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.lang.*;

@Repository
public class CartDaoImpl implements CartDao{

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserCartRepository userCartRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;

    public UserCart getCart(Integer userId) { return userCartRepository.findByUserId(userId); }

    public List<UserCart> getCarts() { return userCartRepository.findAll(); }

    public Msg addItem(Integer bookId, Integer bookNum, Integer userId) {
        CartItem searchItem = cartItemRepository.findByBothId(bookId, userId);
        if (searchItem != null) {
            return Msg.failed();
        } else {
            UserCart curUser = userCartRepository.findByUserId(userId);
            Book curBook = bookRepository.getBookByBookId(bookId);
            CartItem cartItem = new CartItem();
            cartItem.setBookId(bookId);
            cartItem.setBookNum(bookNum);
            SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
            String time = df.format(new Date());
            cartItem.setTime(time);
            curUser.addItem(cartItem);
            curUser.addTotalPrice(curBook.getPrice().multiply(new BigDecimal(bookNum)));
            cartItemRepository.save(cartItem);
            return Msg.success(null, "已加入购物车");
        }
    }

    public List<CartResult> getCartBooks(Integer userId) {
        List<CartResult> cartResults = new ArrayList<>();
        Integer key = 0;
        UserCart curUser = userCartRepository.findByUserId(userId);
        List<CartItem> cart = userCartRepository.findByUserId(userId).getItemList();
        for (CartItem curItem: cart) {
            CartResult cartResult = new CartResult();
            Book curBook = bookRepository.getBookByBookId(curItem.getBookId());
            key++;
            cartResult.setKey(key);
            cartResult.setBook(curBook.getImage());
            cartResult.setName(curBook.getName());
            cartResult.setType(curBook.getType());
            cartResult.setDate(curItem.getTime());
            cartResult.setNum(curItem.getBookNum());
            cartResult.setMoney(curBook.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
            cartResult.setBookId(curBook.getBookId());
            cartResults.add(cartResult);
        }
        return cartResults;
     }

    public Msg changeBookNum(Integer bookId, Integer bookNum, Integer userId) {
        CartItem searchItem = cartItemRepository.findByBothId(bookId, userId);
        if (searchItem == null) {
            return addItem(bookId, bookNum, userId);
        } else {
            Integer oldNum = searchItem.getBookNum();
            Book curBook = bookRepository.getBookByBookId(bookId);
            UserCart curUser = userCartRepository.findByUserId(userId);
            searchItem.setBookNum(oldNum + bookNum);
            curUser.addTotalPrice(curBook.getPrice().multiply(new BigDecimal(bookNum)));
            SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
            String time = df.format(new Date());
            searchItem.setTime(time);
            cartItemRepository.save(searchItem);
            userCartRepository.save(curUser);
            return Msg.success(null, "已加入购物车");
        }
    }

    public Boolean deleteItem(Integer userId, Integer bookId) {
        CartItem searchItem = cartItemRepository.findByBothId(bookId, userId);
        if (searchItem == null) {
            return false;
        } else {
            return true;
        }
    }

    public Msg deleteCartItems(Integer userId, List<Integer> books) {
        UserCart curUser = userCartRepository.findByUserId(userId);
        List<CartItem> cart = userCartRepository.findByUserId(userId).getItemList();
        List<Integer> items = new ArrayList<>();
        BigDecimal price = new BigDecimal("0.0");
        for(CartItem curItem: cart) {
            if (books.contains(curItem.getBookId())) {
                Integer itemId = curItem.getItemId();
                Book book = bookRepository.getBookByBookId(curItem.getBookId());
                items.add(itemId);
                price = price.add(book.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
            }
        }
        cartItemRepository.deleteByItemIds(items);
        curUser.addTotalPrice(price);
        userCartRepository.save(curUser);
        return Msg.success(null,"已成功购买!");
    }
}
