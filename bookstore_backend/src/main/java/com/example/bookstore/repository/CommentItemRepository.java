package com.example.bookstore.repository;

import com.example.bookstore.entity.CommentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentItemRepository extends JpaRepository<CommentItem, Integer> {

    @Query("from CommentItem where book.bookId = :bookId")
    List<CommentItem> getBookComments(Integer bookId);
}
