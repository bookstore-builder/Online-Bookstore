package com.example.bookstore.parser;

import com.example.bookstore.message.JoinMessage;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import java.io.StringWriter;

public class JoinMsgEncoder implements Encoder.Text<JoinMessage> {
    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(JoinMessage joinMessage) throws EncodeException {
        StringWriter stringWriter = new StringWriter();
        try (JsonGenerator jsonGenerator = Json.createGenerator(stringWriter)) {
            jsonGenerator.writeStartObject()
                    .write("type", "join")
                    .write("user", joinMessage.getUser())
                    .writeEnd();
        }
        return stringWriter.toString();
    }
}
