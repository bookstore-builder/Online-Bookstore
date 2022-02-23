package com.example.bookstore.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class User {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JsonIgnore
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY, targetEntity = UserAuth.class)
    @JsonBackReference
    @JoinColumn(name = "user_id", unique = true)
    private UserAuth userAuth;

    private String name;
    private String tel;
    private String address;
    private String email;
    private Integer sex;
    private String birthday;
    private String description;
    private Integer state;
    private String time;

    public void init(UserAuth userAuth) {
        this.userAuth = userAuth;
        // this.userId = userAuth.getUserId();
        this.sex = 0;
        this.state = 1;
        this.name = userAuth.getUsername();
        this.email = userAuth.getEmail();
        SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
        String time = df.format(new Date());
        this.time = time;
    }
}
