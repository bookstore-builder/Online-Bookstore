package com.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Table(name = "user_cart")
@Entity
@Getter
@Setter
public class UserCart {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Integer cartId;

    @OneToOne(fetch = FetchType.LAZY, targetEntity = UserAuth.class)
    @JsonBackReference
    @JoinColumn(name = "user_id", unique = true)
    private UserAuth userAuth;

    private BigDecimal totalPrice;

    @JsonManagedReference(value = "cartReference")
    @OneToMany(cascade={CascadeType.PERSIST, CascadeType.REMOVE},
            targetEntity = CartItem.class, mappedBy = "userCart", fetch = FetchType.EAGER)
    private List<CartItem> itemList;

    public void addItem(CartItem cartItem) {
        cartItem.setUserCart(this);
        itemList.add(cartItem);
    }

    public void init(UserAuth userAuth) {
        this.userAuth = userAuth;
        // this.cartId = userAuth.getUserId();
        this.totalPrice = new BigDecimal("0.0");
        itemList = new ArrayList<>();
    }

    public void addTotalPrice(BigDecimal price) { totalPrice = totalPrice.add(price); }

}
