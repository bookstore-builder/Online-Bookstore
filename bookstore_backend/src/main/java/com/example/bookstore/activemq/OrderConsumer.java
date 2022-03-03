package com.example.bookstore.activemq;

import com.example.bookstore.service.OrderService;
import com.example.bookstore.utils.msgutils.Msg;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;
import org.apache.activemq.command.ActiveMQObjectMessage;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;

@Component
@Slf4j
public class OrderConsumer implements CommandLineRunner {
    private static QueueConsumer queueConsumer;

    @Autowired
    private OrderService orderService;

    @Override
    public void run(String... args) {
        queueConsumer = new QueueConsumer("order");
        Logger LOG = queueConsumer.getLOG();
        MessageConsumer messageConsumer = queueConsumer.getConsumer();

        receiveAndExecuteMsg(LOG, messageConsumer);
    }

    private void receiveAndExecuteMsg(Logger LOG, MessageConsumer messageConsumer) {
        try {
            messageConsumer.setMessageListener(new MessageListener() {
                @Override
                public void onMessage(Message message) {
                    try {
                        ActiveMQObjectMessage activeMQObjectMessage = (ActiveMQObjectMessage) message;
                        JSONObject order = (JSONObject) activeMQObjectMessage.getObject();
                        LOG.info(Thread.currentThread().getName() + " receive a message : {}", activeMQObjectMessage.getObject());
                        try {
                            execute(order);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } catch (JMSException e) {
                        LOG.error("" + e);
                    }
                }
            });
        } catch (JMSException e) {
            LOG.error("" + e);
        }
    }

    private Msg execute(JSONObject order) throws Exception{
        try {
            return orderService.changeBooksNum(order);
        } catch (Exception e) {
            return Msg.success(null, "订单未接受");
        }
    }

}
