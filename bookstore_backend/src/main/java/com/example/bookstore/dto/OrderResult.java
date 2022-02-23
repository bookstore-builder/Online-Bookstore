package com.example.bookstore.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderResult {
    private Integer key;
    private Integer orderId;
    private String book;
    private String name;
    private String type;
    private String date;
    private Integer num;
    private BigDecimal money;
    private BigDecimal totalMoney;
    private Integer bookId;
    private String receiver;
}
