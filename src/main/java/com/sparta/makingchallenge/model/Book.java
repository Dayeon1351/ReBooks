package com.sparta.makingchallenge.model;

import com.sparta.makingchallenge.dto.BookMyReviewRequestDto;
import com.sparta.makingchallenge.dto.BookRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Book extends Timestamped {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String publisher;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String myreview;

    @Column(nullable = false)
    private Long userId;


    // 리뷰 등록시 사용
    public Book(BookRequestDto requestDto,Long userId){
        this.userId = userId;
        this.title = requestDto.getTitle();
        this.author = requestDto.getAuthor();
        this.publisher = requestDto.getPublisher();
        this.image = requestDto.getImage();
        this.myreview = requestDto.getMyreview();

    }

    // 한줄 리뷰 변경시 사용합니다.
    public void updateMyReview(BookMyReviewRequestDto requestDto) {
        this.myreview = requestDto.getMyreview();
    }
}
