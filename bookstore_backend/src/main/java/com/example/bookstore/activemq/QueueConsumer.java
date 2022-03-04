package com.example.bookstore.activemq;

import com.example.bookstore.config.ActiveMqConifg;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jms.*;

public class QueueConsumer {
    private final Logger LOG = LoggerFactory.getLogger(QueueConsumer.class);

    private Connection connection;
    private Session session;
    private MessageConsumer consumer;

    public QueueConsumer (String name) {
        try {
            ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(ActiveMqConifg.BROKEN_URL);
            connectionFactory.setTrustAllPackages(true);
            connection = connectionFactory.createConnection();
            connection.start();
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            Queue queue = session.createQueue(name);
            consumer = session.createConsumer(queue);
        } catch (JMSException e) {
            LOG.error("" + e);
        }
    }

    public MessageConsumer getConsumer() {
        return consumer;
    }

    public Logger getLOG() {
        return LOG;
    }
}
