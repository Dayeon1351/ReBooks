package com.sparta.makingchallenge.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

import javax.swing.*;


@NoArgsConstructor
@Getter
public class ItemDto {
    private String title;
    private String author;
    private String publisher;
    private String image;

    public ItemDto(JSONObject itemJson) {
        this.title = itemJson.getString("title");
        this.author = itemJson.getString("author");
        this.publisher = itemJson.getString("publisher");
        this.image = itemJson.getString("image");
    }



}
