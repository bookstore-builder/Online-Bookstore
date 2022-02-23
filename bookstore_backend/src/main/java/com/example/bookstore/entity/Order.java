package com.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table(name = "orders")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    private String time;

    @ManyToOne(targetEntity = UserAuth.class, fetch = FetchType.EAGER)
    @JsonBackReference(value = "userAuthReference")
    @JoinColumn(name = "user_id")
    private UserAuth userAuth;

    @JsonManagedReference(value = "orderReference")
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            targetEntity = OrderItem.class, mappedBy = "order", fetch = FetchType.EAGER)
    private final List<OrderItem> itemList = new ArrayList<>();

    public void addItem(OrderItem orderItem) { itemList.add(orderItem); }
}
