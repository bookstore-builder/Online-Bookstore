package com.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;
    private Integer bookNum;
    private String time;
    private Integer bookId;

    @ManyToOne(targetEntity = UserCart.class, fetch = FetchType.LAZY)
    @JsonBackReference(value = "cartReference")
    @JoinColumn(name = "user_id")
    private UserCart userCart;
}
