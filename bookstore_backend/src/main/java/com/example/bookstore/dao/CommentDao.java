package com.example.bookstore.dao;

import com.example.bookstore.dto.CommentResult;
import com.example.bookstore.entity.CommentItem;
import com.example.bookstore.utils.msgutils.Msg;

import java.util.List;

public interface CommentDao {

    List<CommentResult> getBookComments(Integer bookId);

    Msg addComment(Integer bookId, Integer userId, String comment, String time);
}
