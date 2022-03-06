package com.example.bookstore.websocket;

import com.example.bookstore.parser.*;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.example.bookstore.message.*;

@ServerEndpoint(
        value = "/websocket",
        decoders = {MessageDecoder.class},
        encoders = {ChatMsgEncoder.class, InfoMsgEncoder.class, JoinMsgEncoder.class, UserMsgEncoder.class}
)
@Component
public class BotEndPoint {
    private static final Logger logger = Logger.getLogger("BotEndpoint");
    private static Queue<Session> mySession = new ConcurrentLinkedDeque<>();

    @OnOpen
    public void openConnection(Session session) {
        mySession.add(session);
        session.getUserProperties().put("active", false);
        logger.log(Level.INFO, "Connection opened.");
    }

    @OnMessage
    public void message(final Session session, Message msg) {
        logger.log(Level.INFO, "Received: {0}");
        if (msg instanceof JoinMessage) {
            /* Add the new user and notify everybody */
            JoinMessage joinMessage = (JoinMessage) msg;
            session.getUserProperties().put("user", joinMessage.getUser());
            session.getUserProperties().put("active", true);
            logger.log(Level.INFO, "Received: {0}", joinMessage.toString());
            sendAll(session, new InfoMessage(joinMessage.getUser() + " has joined the chat."));
            sendAll(session, new UsersMessage(this.getUserList(session)));
        } else if (msg instanceof ChatMessage) {
            ChatMessage chatMessage = (ChatMessage) msg;
            session.getUserProperties().put("user", chatMessage.getUser());
            session.getUserProperties().put("receiver", chatMessage.getReceiver());
            session.getUserProperties().put("message", chatMessage.getMessage());
            session.getUserProperties().put("img", chatMessage.getImg());
            logger.log(Level.INFO, "Received: {0}", chatMessage.toString());
            if (chatMessage.getReceiver().equals("all"))
                sendAll(session, new ChatMessage(chatMessage.getUser(), chatMessage.getReceiver(), chatMessage.getMessage(), chatMessage.getImg()));
        }
    }

    @OnClose
    public void closedConnection(Session session) {
        session.getUserProperties().put("active", false);
        if (session.getUserProperties().containsKey("user")) {
            String name = session.getUserProperties().get("user").toString();
            sendAll(session, new InfoMessage(name + " has left the chat"));

            mySession.remove(session);
            sendAll(session, new UsersMessage(this.getUserList(session)));
        }
    }

    @OnError
    public void error(Session session, Throwable throwable) {
        logger.log(Level.INFO, "Connection error {0}", throwable.toString());
    }

    /* Forward a message to all connected clients
     * The endpoint figures what encoder to use based on the message type */
    public synchronized void sendAll(Session session, Object msg) {
        try {
            for (Session s : mySession) {
                if (s.isOpen()) {
                    s.getBasicRemote().sendObject(msg);
                    logger.log(Level.INFO, "Sent {0}", msg.toString());
                }
            }
        } catch (IOException | EncodeException e) {
            logger.log(Level.INFO, e.toString());
        }
    }

    /* Returns the list of users from the properties of all open sessions */
    public List<String> getUserList(Session session) {
        List<String> users = new ArrayList<>();
        for (Session s : mySession) {
            if (s.isOpen() && (boolean) s.getUserProperties().get("active")
                    && !users.contains(s.getUserProperties().get("user").toString())) // 防止重复添加
                users.add(s.getUserProperties().get("user").toString());
        }
        return users;
    }

}
