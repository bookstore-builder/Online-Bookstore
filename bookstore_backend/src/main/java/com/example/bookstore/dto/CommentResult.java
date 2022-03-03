package com.example.bookstore.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResult {
    private Integer key;
    private String author;
    private String comment;
    private String time;
}
