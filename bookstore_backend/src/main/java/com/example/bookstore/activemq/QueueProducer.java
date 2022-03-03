package com.example.bookstore.activemq;

import com.example.bookstore.config.ActiveMqConifg;
import net.sf.json.JSONObject;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQObjectMessage;
import org.apache.activemq.command.ActiveMQTextMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jms.*;
public class QueueProducer {
    private final Logger LOG = LoggerFactory.getLogger(QueueProducer.class);
    private Connection connection;
    private Session session;
    private MessageProducer producer;

    public QueueProducer(String name) {
        try {
            ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(ActiveMqConifg.BROKEN_URL);
            connection = connectionFactory.createConnection();
            connection.start();
            session = connection.createSession(true, Session.AUTO_ACKNOWLEDGE);
            Queue queue = session.createQueue(name);
            producer = session.createProducer(queue);
        } catch (JMSException e) {
            System.out.println(e.getMessage());
        }
    }

    public void sendMsg(String message) {
        try {
            ActiveMQTextMessage msg = new ActiveMQTextMessage();
            msg.setText(message);
            producer.send(msg);
            session.commit();
            LOG.info(Thread.currentThread().getName() + " send a message: {}", msg.getText());
        } catch (JMSException e) {
            LOG.error("" + e);
        }
    }

    public void sendMsg(JSONObject jsonObject) {
        try {
            ActiveMQObjectMessage msg = new ActiveMQObjectMessage();
            msg.setObject(jsonObject);
            producer.send(msg);
            session.commit();
            LOG.info(Thread.currentThread().getName() + " send a message: {}", msg.getObject());
        } catch (JMSException e) {
            LOG.error("" + e);
        }
    }
}
