package com.example.bookstore.repository;

import com.example.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("select b from Book b")
    List<Book> getBooks();

    @Query("select b from Book b where b.type = :type")
    List<Book> getSimilarBooks(String type);

    @Query("select b from Book b where b.bookId = :id")
    Book getBookByBookId(Integer id);

    @Query("select b from Book b where lower(b.name) like concat('%', :name, '%')")
    Book getBookByName(String name);

    @Query("select b from Book b where b.top = 1")
    List<Book> getTopBooks();

    @Transactional
    @Modifying
    @Query("delete from Book where bookId = :id")
    void deleteByItemId(Integer id);
}
