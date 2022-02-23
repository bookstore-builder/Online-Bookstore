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
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;
    private Integer bookId;
    private Integer bookNum;

    @ManyToOne(targetEntity = Order.class, fetch = FetchType.LAZY)
    @JsonBackReference(value = "orderReference")
    @JoinColumn(name = "order_id")
    private Order order;
}
