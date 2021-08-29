package com.sparta.makingchallenge.repository;

import com.sparta.makingchallenge.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findAllByTitleContaining(String title);
}
