package com.example.bookstore.repository;

import com.example.bookstore.entity.BookImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookImageRepository extends MongoRepository<BookImage, Integer> {
    BookImage findByBookId(Integer bookId);

    BookImage deleteByBookId(Integer bookId);
}
