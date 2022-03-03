package com.example.bookstore.controller;

import com.example.bookstore.dto.CommentResult;
import com.example.bookstore.entity.CommentItem;
import com.example.bookstore.service.CommentService;
import com.example.bookstore.utils.msgutils.Msg;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@AllArgsConstructor
public class CommentController {

    @Autowired
    private CommentService commentService;

    @RequestMapping(value = "/getBookComments")
    public List<CommentResult> getBookComments(@RequestParam("bookId") Integer id) { return commentService.getBookComments(id); }

    @RequestMapping(value = "/addComment")
    public Msg addComment(@RequestParam("bookId") Integer bookId, @RequestParam("userId") Integer userId,
                          @RequestParam("comment") String comment, @RequestParam("time") String time) {
        return commentService.addComment(bookId, userId, comment, time);
    }
}
