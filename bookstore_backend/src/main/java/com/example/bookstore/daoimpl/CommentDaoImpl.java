package com.example.bookstore.daoimpl;

import com.example.bookstore.dao.CommentDao;
import com.example.bookstore.dto.CommentResult;
import com.example.bookstore.dto.OrderResult;
import com.example.bookstore.entity.Book;
import com.example.bookstore.entity.CommentItem;
import com.example.bookstore.entity.UserAvatar;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.repository.CommentItemRepository;
import com.example.bookstore.repository.UserAvatarRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Repository
public class CommentDaoImpl implements CommentDao {

    @Autowired
    private CommentItemRepository commentItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAvatarRepository userAvatarRepository;

    public List<CommentResult> getBookComments(Integer bookId) {
        List<CommentResult> commentResults = new ArrayList<>();
        Integer key = 0;
        List<CommentItem> commentItems = commentItemRepository.getBookComments(bookId);
        for(CommentItem commentItem: commentItems) {
            CommentResult commentResult = new CommentResult();
            key++;
            commentResult.setKey(key);
            commentResult.setComment(commentItem.getComment());
            commentResult.setTime(commentItem.getTime());
            commentResult.setAuthor(userRepository.findByUserId(commentItem.getUserId()).getName());
            commentResult.setAvatar("");
            UserAvatar userAvatar = userAvatarRepository.findByUserId(commentItem.getUserId());
            if (userAvatar != null) commentResult.setAvatar(userAvatar.getImageBase64());
            commentResults.add(commentResult);
        }
        commentResults.sort(Comparator.comparing(CommentResult::getTime).reversed());
        return commentResults;
    }

    public Msg addComment(Integer bookId, Integer userId, String comment, String time) {
        Book curBook = bookRepository.getBookByBookId(bookId);

        CommentItem commentItem = new CommentItem();
        commentItem.setUserId(userId);
        commentItem.setComment(comment);
        commentItem.setTime(time);
        commentItem.setBook(curBook);
        curBook.addItem(commentItem);

        commentItemRepository.save(commentItem);
        return Msg.success(null, "已评论");
    }
}
