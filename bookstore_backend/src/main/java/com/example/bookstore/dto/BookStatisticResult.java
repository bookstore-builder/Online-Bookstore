package com.example.bookstore.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BookStatisticResult implements  Comparable<BookStatisticResult>{
    private Integer key;
    private Integer bookId;
    private String image;
    private String name;
    private String type;
    private Integer num;
    private BigDecimal money;

    public int compareTo(BookStatisticResult o) {
        if(this.num == null) {
            return 1;
        }
        if(o.num == null) {
            return -1;
        }
        return o.getNum().compareTo(this.num);
    }
}
