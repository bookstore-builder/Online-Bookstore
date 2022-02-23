package com.example.bookstore.dto;

import lombok.Setter;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Setter
public class UserStatisticResult {
    private Integer key;
    private String avatar;
    private String name;
    private Integer num;
    private BigDecimal money;
}
