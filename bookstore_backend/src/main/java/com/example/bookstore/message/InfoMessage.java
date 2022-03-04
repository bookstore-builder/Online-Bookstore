package com.example.bookstore.message;

public class InfoMessage extends Message{
    private String info;

    public InfoMessage(String info) { this.info = info; }

    public String getInfo() { return info; }

    public String toString() { return "[InfoMessage]" + info; }

}
