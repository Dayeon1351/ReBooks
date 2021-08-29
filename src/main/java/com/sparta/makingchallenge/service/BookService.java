package com.sparta.makingchallenge.service;

import com.sparta.makingchallenge.dto.BookMyReviewRequestDto;
import com.sparta.makingchallenge.dto.BookRequestDto;
import com.sparta.makingchallenge.model.Book;
import com.sparta.makingchallenge.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class BookService {
    private final BookRepository bookRepository;

    @Transactional
    public Long update(Long id, BookMyReviewRequestDto requestDto){
        Book book = bookRepository.findById(id).orElseThrow(
                () -> new NullPointerException("해당 아이디가 존재하지 않습니다.")
        );
        book.updateMyReview(requestDto);
        return id;
    }

    @Transactional // 메소드 동작이 SQL 쿼리문임을 선언합니다.
    public Book createBook(BookRequestDto requestDto, Long userId ) {
        // 요청받은 DTO 로 DB에 저장할 객체 만들기
        Book book = new Book(requestDto, userId);
        bookRepository.save(book);
        return book;
    }

}
