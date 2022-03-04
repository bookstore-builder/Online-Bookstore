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
@Table(name = "comment_item")
public class CommentItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    private Integer userId;
    private String time;
    private String comment;

    @ManyToOne(targetEntity = Book.class, fetch = FetchType.LAZY)
    @JsonBackReference(value = "commentReference")
    @JoinColumn(name = "book_id")
    private Book book;
}
