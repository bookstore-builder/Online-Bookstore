package com.example.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "book")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "bookId")
public class Book {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    private Integer top;
    private String isbn;
    private String name;
    private String type;
    private String author;
    private BigDecimal price;
    private String description;
    private Integer inventory;
    private String image;

    @JsonManagedReference(value = "commentReference")
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
            targetEntity = CommentItem.class, mappedBy = "book", fetch = FetchType.EAGER)
    private List<CommentItem> itemList = new ArrayList<>();

    public void addItem(CommentItem commentItem) {
        commentItem.setBook(this);
        itemList.add(commentItem);
    }
}
