package com.example.bookstore.message;

public class ChatMessage extends Message{
    private String user;
    private String receiver;
    private String message;

    public ChatMessage(String sender, String receiver, String message) {
        this.user = sender;
        this.receiver = receiver;
        this.message = message;
    }

    public String getUser() {
        return user;
    }

    public String getReceiver() {
        return receiver;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "[ChatMessage] " + user + " " + receiver + "-" + message;
    }
}
