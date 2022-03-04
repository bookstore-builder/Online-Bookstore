package com.example.bookstore.message;

public class JoinMessage extends Message{
    private String user;

    public JoinMessage(String user) { this.user = user; }

    public String getUser() {
        return user;
    }

    @Override
    public String toString() { return "[JoinMessage]" + user; }
}
