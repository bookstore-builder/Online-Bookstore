package com.example.bookstore.daoimpl;

import com.example.bookstore.dao.UserAuthDao;
import com.example.bookstore.entity.User;
import com.example.bookstore.entity.UserAuth;
import com.example.bookstore.entity.UserCart;
import com.example.bookstore.repository.UserCartRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.utils.msgutils.Msg;
import net.sf.json.JSONObject;
import com.example.bookstore.utils.sessionutils.SessionUtil;
import com.example.bookstore.repository.UserAuthRepository;
import net.sf.json.JsonConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserAuthDaoImpl implements UserAuthDao {
    @Autowired
    private UserAuthRepository userAuthRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserCartRepository userCartRepository;

    @Override
    public Msg checkUserAuth (UserAuth userAuth) {
        UserAuth checkedUserAuth = userAuthRepository.checkUser(userAuth.getUsername(), userAuth.getPassword());
        if (checkedUserAuth != null) {
            if(checkedUserAuth.getUser().getState() != 1) {
                return Msg.failed("用户已被禁用！");
            } else {
                JSONObject obj = new JSONObject();
                obj.put("userId", checkedUserAuth.getUserId());
                obj.put("username", checkedUserAuth.getUsername());
                obj.put("userType", checkedUserAuth.getUserType());
                SessionUtil.setSession(obj);

//            JSONObject data = JSONObject.fromObject(checkedUserAuth);
//            data.remove("password");
                if(checkedUserAuth.getUserType() == 0){
                    return Msg.success(checkedUserAuth, "Admin");
                }
                else {
                    return Msg.success(checkedUserAuth, "User");
                }
            }
        } else {
            return Msg.failed("用户名或密码错误");
        }
    }

    @Override
    public Msg checkUserName(String userName) {
        UserAuth searchedUserAuth = userAuthRepository.findByUsername(userName);
        if (searchedUserAuth != null) {
            return Msg.failed("用户名已存在！");
        } else {
            return Msg.success(null);
        }
    }

    @Override
    public Msg addUserAuth (UserAuth userAuth) {
        UserAuth searchedUserAuth = userAuthRepository.findByUsername(userAuth.getUsername());
        if (searchedUserAuth != null) {
            return Msg.failed("用户已注册！");
        } else {
            userAuthRepository.save(userAuth);
            User user = new User();
            user.init(userAuth);
            userRepository.save(user);
            userAuth.setUser(user);

            UserCart userCart = new UserCart();
            userCart.init(userAuth);
            userCartRepository.save(userCart);
            userAuth.setUser(user);

            JSONObject obj = new JSONObject();
            obj.put("userId", userAuth.getUserId());
            obj.put("username", userAuth.getUsername());
            obj.put("userType", userAuth.getUserType());
            SessionUtil.setSession(obj);

            JsonConfig jsonConfig=new JsonConfig();
            jsonConfig.setExcludes(new String[]{"user","userCart"});
            JSONObject data = JSONObject.fromObject(userAuth, jsonConfig);
            data.remove("password");
            return Msg.success(userAuth, "注册成功");
        }
    }

}
