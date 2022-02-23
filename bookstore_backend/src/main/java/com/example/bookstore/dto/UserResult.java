package com.example.bookstore.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UserResult {
    private Integer key;
    private Integer userId;
    private String avatar;
    private String name;
    private String address;
    private String time;
    private BigDecimal cost;
    private String tags;
}
