package com.example.bookstore.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrderPage {
    private final List<OrderResult> orderList;
    private final Integer total;
    private final Integer PageNum;
    private final Integer pageSize;
}
