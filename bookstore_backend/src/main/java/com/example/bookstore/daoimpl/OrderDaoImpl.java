package com.example.bookstore.daoimpl;

import com.example.bookstore.dao.OrderDao;
import com.example.bookstore.entity.*;
import com.example.bookstore.repository.*;
import com.example.bookstore.dto.BookStatisticResult;
import com.example.bookstore.dto.DataPage;
import com.example.bookstore.dto.OrderResult;
import com.example.bookstore.dto.UserStatisticResult;
import com.example.bookstore.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.*;
import java.text.SimpleDateFormat;
import java.lang.*;
import java.util.stream.Stream;

@Repository
public class OrderDaoImpl implements OrderDao{

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;
    @Autowired
    private UserRepository userRepository;

    public Msg addItem(Integer bookId, Integer bookNum, Integer orderId) {
            Book curBook = bookRepository.getBookByBookId(bookId);
            curBook.setInventory(curBook.getInventory() - bookNum);

            Order order = orderRepository.findByOrderId(orderId);
            OrderItem orderItem = new OrderItem();
            orderItem.setBookId(bookId);
            orderItem.setBookNum(bookNum);
            orderItem.setOrder(order);
            order.addItem(orderItem);

            bookRepository.save(curBook);
            orderItemRepository.save(orderItem);
            return Msg.success(null,"已加入订单");
    }

    public Msg changeBooksNum(List<Map<String, Integer>> books) {
        Order order = new Order();
        SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
        String time = df.format(new Date());
        order.setTime(time);
        Integer userId = books.get(0).get("userId");
        UserAuth userAuth = userAuthRepository.findByUserId(userId);
        order.setUserAuth(userAuth);
        orderRepository.save(order);
        userAuth.addItem(order);
        userAuthRepository.save(userAuth);

        for(Map<String, Integer> cur: books){
            Integer bookId = cur.get("bookId");
            Integer bookNum = cur.get("bookNum");
            addItem(bookId, bookNum, order.getOrderId());
        }
        return Msg.success(null,"已加入订单");
    }

    public List<OrderResult> getOrderBooks(Integer userId) {
        List<OrderResult> orderResults = new ArrayList<>();
        Integer key = 0;
        List<Order> orders = userAuthRepository.findByUserId(userId).getOrderList();
        for(Order order: orders) {
            BigDecimal money = new BigDecimal("0.0");
            for (OrderItem curItem : order.getItemList()) {
                Book curBook = bookRepository.getBookByBookId(curItem.getBookId());
                money = money.add(curBook.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
            }
            for (OrderItem curItem: order.getItemList()) {
                OrderResult orderResult = new OrderResult();
                Book curBook = bookRepository.getBookByBookId(curItem.getBookId());
                key++;
                orderResult.setKey(key);
                orderResult.setBook(curBook.getImage());
                orderResult.setOrderId(order.getOrderId());
                orderResult.setName(curBook.getName());
                orderResult.setType(curBook.getType());
                orderResult.setDate(order.getTime());
                orderResult.setNum(curItem.getBookNum());
                orderResult.setMoney(curBook.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
                orderResult.setTotalMoney(money);
                orderResult.setBookId(curBook.getBookId());
                orderResult.setReceiver(userAuthRepository.findByUserId(userId).getUsername());
                orderResults.add(orderResult);
            }
        }
        return orderResults;
    }

    public List<OrderResult> getAllOrderBooks(){
        List<OrderResult> orderResults = new ArrayList<>();
        Integer key = 0;
        List<Order> orders = orderRepository.findAll();
        for(Order order: orders){
            BigDecimal money = new BigDecimal("0.0");
            for (OrderItem curItem : order.getItemList()) {
                Book curBook = bookRepository.getBookByBookId(curItem.getBookId());
                money = money.add(curBook.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
            }
            for (OrderItem curItem: order.getItemList()) {
                OrderResult orderResult = new OrderResult();
                Book curBook = bookRepository.getBookByBookId(curItem.getBookId());
                key++;
                orderResult.setKey(key);
                orderResult.setBook(curBook.getImage());
                orderResult.setOrderId(order.getOrderId());
                orderResult.setName(curBook.getName());
                orderResult.setType(curBook.getType());
                orderResult.setDate(order.getTime());
                orderResult.setNum(curItem.getBookNum());
                orderResult.setMoney(curBook.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
                orderResult.setTotalMoney(money);
                orderResult.setBookId(curBook.getBookId());
                orderResult.setReceiver(order.getUserAuth().getUsername());
                orderResults.add(orderResult);
            }
        }
        return orderResults;
    }

    public DataPage<OrderResult> getOrderPage(Integer pageNum, Integer pageSize, String search, String time, Integer userId){
        List<OrderResult> orderResults = new ArrayList<>();
        Integer key = 0;
        Integer userType = userAuthRepository.findByUserId(userId).getUserType();
        List<Order> allOrders = userType==0 ? orderRepository.getOrdersByTime(time) : orderRepository.getUserBookStatistic(userId, time);
        List<Order> orders = search.isBlank() ? new ArrayList<>(allOrders) : new ArrayList<>();
        if(!search.isBlank()) {
            for(Order order : allOrders) {
                Stream<OrderItem> orderItemStream = order.getItemList().stream();
                if(orderItemStream.anyMatch(orderItem -> bookRepository.getBookByBookId(orderItem.getBookId()).getName().contains(search))) {
                    orders.add(order);
                }
            }
        }

        for(Order order: orders){
            BigDecimal money = new BigDecimal("0.0");
            for (OrderItem curItem : order.getItemList()) {
                Book curBook = bookRepository.getBookByBookId(curItem.getBookId());
                money = money.add(curBook.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
            }
            for (OrderItem curItem: order.getItemList()) {
                OrderResult orderResult = new OrderResult();
                Book curBook = bookRepository.getBookByBookId(curItem.getBookId());
                key++;
                orderResult.setKey(key);
                orderResult.setBook(curBook.getImage());
                orderResult.setOrderId(order.getOrderId());
                orderResult.setName(curBook.getName());
                orderResult.setType(curBook.getType());
                orderResult.setDate(order.getTime());
                orderResult.setNum(curItem.getBookNum());
                orderResult.setMoney(curBook.getPrice().multiply(new BigDecimal(curItem.getBookNum())));
                orderResult.setTotalMoney(money);
                orderResult.setBookId(curBook.getBookId());
                orderResult.setReceiver(order.getUserAuth().getUsername());
                orderResults.add(orderResult);
            }
        }
        orderResults.sort(Comparator.comparing(OrderResult::getDate).reversed());
        int fromIndex = (pageNum-1) * pageSize;
        int toIndex = Math.min((pageNum)*pageSize, orderResults.size());
        long total_size = orderResults.size();
        return new DataPage<OrderResult>(orderResults.subList(fromIndex, toIndex), total_size, pageNum, pageSize);
    }

    public List<BookStatisticResult> getBookStatistic(String time) {
        List<BookStatisticResult> bookStatisticResults = new ArrayList<>();
        List<Book> books = bookRepository.findAll();
        Integer key = 0;
        for(Book book: books){
            key++;
            BookStatisticResult bookStatisticResult = new BookStatisticResult();
            Integer bookNum = orderItemRepository.getBookNum(book.getBookId(), time);
            if(bookNum == null) {
                bookStatisticResult.setNum(0);
                bookStatisticResult.setMoney(new BigDecimal("0.0"));
            } else {
                bookStatisticResult.setNum(bookNum);
                bookStatisticResult.setMoney(book.getPrice().multiply(new BigDecimal(bookNum)));
            }
            bookStatisticResult.setKey(key);
            bookStatisticResult.setBookId(book.getBookId());
            bookStatisticResult.setType(book.getType());
            bookStatisticResult.setName(book.getName());
            bookStatisticResult.setImage(book.getImage());
            bookStatisticResults.add(bookStatisticResult);
        }
        bookStatisticResults.sort(Comparator.comparing(BookStatisticResult::getNum).reversed());
        int toIndex = Math.min(10, bookStatisticResults.size());
        return bookStatisticResults.subList(0, toIndex);
    }

    public List<BookStatisticResult> getUserBookStatistic(Integer userId, String time){
        List<BookStatisticResult> bookStatisticResults = new ArrayList<>();
        List<Order> orders = orderRepository.getUserBookStatistic(userId, time);
        Integer key = 0;

        List<Integer> bookIds = new ArrayList<>();
        for(Order order: orders){
            for(OrderItem orderItem: order.getItemList()){
                if(bookIds.contains(orderItem.getBookId())){
                    continue;
                } else {
                    bookIds.add(orderItem.getBookId());
                }
            }
        }

        for(Integer bookId: bookIds){
            key++;
            BookStatisticResult bookStatisticResult = new BookStatisticResult();
            Book book = bookRepository.getBookByBookId(bookId);
            Integer bookNum = orderItemRepository.getUserBookNum(bookId, userId, time);
            bookStatisticResult.setNum(bookNum);
            bookStatisticResult.setMoney(book.getPrice().multiply(new BigDecimal(bookNum)));
            bookStatisticResult.setKey(key);
            bookStatisticResult.setBookId(book.getBookId());
            bookStatisticResult.setType(book.getType());
            bookStatisticResult.setName(book.getName());
            bookStatisticResult.setImage(book.getImage());
            bookStatisticResults.add(bookStatisticResult);
        }
        bookStatisticResults.sort(Comparator.comparing(BookStatisticResult::getNum).reversed());
        int toIndex = Math.min(10, bookStatisticResults.size());
        return bookStatisticResults.subList(0, toIndex);
    }

    public Msg updateTopBooks(String time){
        List<BookStatisticResult> bookStatisticResults = getBookStatistic(time);
        Collections.sort(bookStatisticResults);
        Integer top = 10;
        for(BookStatisticResult bookStatisticResult: bookStatisticResults){
            top--;
            if(top >= 0){
                Book curBook = bookRepository.getBookByBookId(bookStatisticResult.getBookId());
                curBook.setTop(1);
                bookRepository.save(curBook);
            }
            else {
                Book curBook = bookRepository.getBookByBookId(bookStatisticResult.getBookId());
                curBook.setTop(0);
                bookRepository.save(curBook);
            }
        }
        return Msg.success(null, "已更新热榜！");
    }

    public List<Integer> getBookSale(Integer bookId, String time) {
        List<Integer> bookSales = new ArrayList<>();
        SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
        try{
            Date date = df.parse(time);
            for(int i = 0; i < 7; ++i) {
                Date day = new Date(date.getTime() - i * 24 * 3600 * 1000);
                String dayString = df.format(day);
                Integer num = orderItemRepository.getBookSale(bookId, dayString);
                if(num == null) num = 0;
                bookSales.add(num);
            }
        } catch (ParseException e){
            e.printStackTrace();
        }
    return bookSales;
    }

    public List<UserStatisticResult> getUserStatistic(String time) {
        List<UserStatisticResult> userStatisticResults = new ArrayList<>();
        List<User> users = userRepository.findAll();
        Integer key = 0;
        for(User user: users){
            key ++;
            UserStatisticResult userStatisticResult = new UserStatisticResult();
            Integer bookNum = 0;
            BigDecimal money = new BigDecimal("0.0");
            List<OrderItem> userItems = orderItemRepository.getUserTimeItems(user.getUserId(), time);
            if(userItems == null){
                userStatisticResult.setNum(0);
                userStatisticResult.setMoney(new BigDecimal("0.0"));
            } else{
                for(OrderItem userItem: userItems){
                    bookNum += userItem.getBookNum();
                    Book book = bookRepository.getBookByBookId(userItem.getBookId());
                    money = money.add(book.getPrice().multiply(new BigDecimal(userItem.getBookNum())));
                }
                userStatisticResult.setNum(bookNum);
                userStatisticResult.setMoney(money);
            }
            userStatisticResult.setKey(key);
            userStatisticResult.setName(user.getName());
            userStatisticResults.add(userStatisticResult);
        }
        userStatisticResults.sort(Comparator.comparing(UserStatisticResult::getNum).reversed());
        int toIndex = Math.min(10, userStatisticResults.size());
        return userStatisticResults.subList(0, toIndex);
    }

    public List<Map<String, String>> getUserBookType(Integer userId) {
        List<OrderItem> orderItems = orderItemRepository.getUserItems(userId);
        List<Map<String, String>> userBookTypes = new ArrayList<>();
        List<String> types = new ArrayList<>();
        for(OrderItem orderItem: orderItems){
            Book book = bookRepository.getBookByBookId(orderItem.getBookId());
            String bookType = book.getType();
            Integer index = types.indexOf(bookType);
            if(index == -1){
                types.add(bookType);
                index = types.indexOf(bookType);
                Map<String,String> type = new HashMap<>();
                type.put("name",bookType);
                type.put("value","0");
                userBookTypes.add(type);
            }
            userBookTypes.get(index).replace("value",
                    Integer.toString(Integer.valueOf(userBookTypes.get(index).get("value"))+orderItem.getBookNum()));
        }
        return userBookTypes;
    }
}
