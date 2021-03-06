package com.example.bookstore.parser;

import com.example.bookstore.message.ChatMessage;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import java.io.StringWriter;

public class ChatMsgEncoder implements Encoder.Text<ChatMessage> {
    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(ChatMessage chatMessage) throws EncodeException {
        StringWriter stringWriter = new StringWriter();
        try (JsonGenerator jsonGenerator = Json.createGenerator(stringWriter)) {
            jsonGenerator.writeStartObject()
                    .write("type", "chat")
                    .write("user", chatMessage.getUser())
                    .write("receiver", chatMessage.getReceiver())
                    .write("message", chatMessage.getMessage())
                    .write("img", chatMessage.getImg())
                    .writeEnd();
        }
        return stringWriter.toString();
    }
}
