package com.example.bookstore.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChatMessage extends Message{
    private String user;
    private String receiver;
    private String message;
    private String img;

    @Override
    public String toString() {
        return "[ChatMessage] " + user + " " + receiver + "-" + message;
    }
}
