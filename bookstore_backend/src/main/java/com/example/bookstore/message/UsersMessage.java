package com.example.bookstore.message;

import java.util.List;

public class UsersMessage extends Message{
    private List<String> userlist;

    public UsersMessage(List<String> userlist) { this.userlist = userlist; }

    public List<String> getUserlist() { return userlist; }

    /* For logging purposes */
    @Override
    public String toString() {
        return "[UsersMessage] " + userlist.toString();
    }
}
