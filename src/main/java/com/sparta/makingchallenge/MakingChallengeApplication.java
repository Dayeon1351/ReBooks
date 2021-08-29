package com.sparta.makingchallenge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MakingChallengeApplication {

    public static void main(String[] args) {
        SpringApplication.run(MakingChallengeApplication.class, args);
    }

}
