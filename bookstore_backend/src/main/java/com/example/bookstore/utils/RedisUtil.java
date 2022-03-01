package com.example.bookstore.utils;

import com.example.bookstore.config.RedisConfig;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@AllArgsConstructor
public class RedisUtil {
    private final StringRedisTemplate template;
    private final Object lock = new Object();

    public void initializeRecord() {
        ValueOperations<String, String> valueOperations = template.opsForValue();
        valueOperations.setIfAbsent(RedisConfig.VIEWS_KEY, "0");
    }

    public void addViewsRecord() {
        synchronized (lock) {
            template.opsForValue().increment(RedisConfig.VIEWS_KEY);
        }
    }

    public long getViewsRecord() {
        return Long.parseLong(Objects.requireNonNull(
                template.opsForValue().get(RedisConfig.VIEWS_KEY)
        ));
    }
}
