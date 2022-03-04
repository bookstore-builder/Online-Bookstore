package com.example.bookstore.config;

import com.example.bookstore.utils.RedisUtil;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class BootConfig implements ApplicationRunner {
    private final RedisUtil redisUtil;

    @Override
    public void run(ApplicationArguments args) {
        redisUtil.initializeRecord();
    }
}
