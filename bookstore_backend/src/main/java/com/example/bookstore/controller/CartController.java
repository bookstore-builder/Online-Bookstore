package com.example.bookstore.controller;

import com.example.bookstore.dto.CartResult;
import com.example.bookstore.entity.UserCart;
import com.example.bookstore.service.CartService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.lang.*;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping(value = "/getCart")
    public UserCart getCart(@RequestParam("userId") Integer id) { return cartService.getCart(id); };

    @RequestMapping(value = "/getAllCart")
    public List<UserCart> getAllCart() { return cartService.getCarts(); };

    @RequestMapping(value = "/addItem")
    public Msg addItem(@RequestBody Map<String, Integer> params) {
        Integer bookId = params.get("bookId");
        Integer bookNum = params.get("bookNum");
        Integer userId = params.get("userId");
        return cartService.addItem(bookId, bookNum, userId);
    }

    @RequestMapping(value = "/getCartBooks")
    public List<CartResult> getCartBooks(@RequestParam("userId") Integer id ) { return cartService.getCartBooks(id); };

    @RequestMapping(value = "/changeCartNum")
    public Msg changeBookNum(@RequestBody Map<String, Integer> params) {
        Integer bookId = params.get("bookId");
        Integer bookNum = params.get("bookNum");
        Integer userId = params.get("userId");
        return cartService.changeBookNum(bookId, bookNum, userId);
    }

    @RequestMapping(value = "/deleteCartItems")
    public Msg deleteCartItems(@RequestParam("userId") Integer userId, @RequestParam("books") List<Integer> books) {
        return cartService.deleteCartItems(userId, books);
    }

    @RequestMapping(value = "/deleteItem")
    public Boolean deleteItem(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId) {
        return cartService.deleteItem(userId, bookId);
    }
}
