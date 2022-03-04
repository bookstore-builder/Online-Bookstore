package com.example.bookstore.utils;

import com.example.bookstore.config.RedisConfig;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@AllArgsConstructor
@Slf4j
public class RedisUtil {
    private final StringRedisTemplate template;
    private final Object lock = new Object();

    public void initializeRecord() {
        ValueOperations<String, String> valueOperations = template.opsForValue();
        valueOperations.setIfAbsent(RedisConfig.VIEWS_KEY, "0");
    }

    public long addViewsRecord() {
        synchronized (lock) {
            template.opsForValue().increment(RedisConfig.VIEWS_KEY);
            long view_counts = getViewsRecord();
            log.info("总用户访问量："+ view_counts);
            return view_counts;
        }
    }

    public long getViewsRecord() {
        return Long.parseLong(Objects.requireNonNull(
                template.opsForValue().get(RedisConfig.VIEWS_KEY)
        ));
    }
}
