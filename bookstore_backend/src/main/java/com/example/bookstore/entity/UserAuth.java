package com.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "userAuth")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "userId")
public class UserAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String username;
    private  String password;
    private Integer userType;
    private String email;

    @JsonManagedReference
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL,
            mappedBy = "userAuth", targetEntity = User.class)
    // @JoinColumn(name="userId", referencedColumnName = "userId")
    private User user;

    @JsonManagedReference
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL,
            mappedBy = "userAuth", targetEntity = UserCart.class)
    // @JoinColumn(name="userId", referencedColumnName = "userId")
    private UserCart userCart;

    @JsonManagedReference(value = "userAuthReference")
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            targetEntity = Order.class, mappedBy = "userAuth")
    private List<Order> orderList = new ArrayList<>();

    public void addItem(Order order) { orderList.add(order); }
}
