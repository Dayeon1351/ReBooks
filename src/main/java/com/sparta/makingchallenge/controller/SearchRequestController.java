package com.sparta.makingchallenge.controller;

import com.sparta.makingchallenge.dto.ItemDto;
import com.sparta.makingchallenge.util.NaverBookSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SearchRequestController {
    private final NaverBookSearch naverBookSearch;

    @GetMapping("/api/search")
    public List<ItemDto> getItems(@RequestParam String query){
        String resultString = naverBookSearch.search(query);
        return naverBookSearch.fromJSONtoItems(resultString);
    }
}
