package com.example.bookstore.serviceimpl;

import com.example.bookstore.dao.CommentDao;
import com.example.bookstore.dto.CommentResult;
import com.example.bookstore.entity.CommentItem;
import com.example.bookstore.service.CommentService;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDao commentDao;

    public List<CommentResult> getBookComments(Integer bookId) { return commentDao.getBookComments(bookId); }

    public Msg addComment(Integer bookId, Integer userId, String comment, String time) {
        return commentDao.addComment(bookId, userId, comment, time);
    }
}
