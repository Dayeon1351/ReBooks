package com.sparta.makingchallenge.controller;

import com.sparta.makingchallenge.dto.BookMyReviewRequestDto;
import com.sparta.makingchallenge.dto.BookRequestDto;
import com.sparta.makingchallenge.dto.ItemDto;
import com.sparta.makingchallenge.model.Book;
import com.sparta.makingchallenge.repository.BookRepository;
import com.sparta.makingchallenge.security.UserDetailsImpl;
import com.sparta.makingchallenge.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BookRestController {
    private final BookRepository bookRepository;
    private final BookService bookService;


    @GetMapping("/api/books")
    public List<Book> getBooks(){
        return bookRepository.findAll();
    }

    @GetMapping("/api/books/{title}")
    public List<Book> getReviews(@PathVariable String title){
        return bookRepository.findAllByTitleContaining(title);
    }

    @PostMapping("/api/books")
    public Book createBook(@RequestBody BookRequestDto requestDto, @AuthenticationPrincipal UserDetailsImpl userDetails){
        Long userId = userDetails.getUser().getId();
        Book book = bookService.createBook(requestDto,userId);
        return book;
    }

    @PutMapping("/api/books/{id}")
    public Long updateBook(@PathVariable Long id, @RequestBody BookMyReviewRequestDto requestDto){
        return bookService.update(id,requestDto);
    }

    @DeleteMapping("api/books/{id}")
    public Long deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
        return id;
    }



}
