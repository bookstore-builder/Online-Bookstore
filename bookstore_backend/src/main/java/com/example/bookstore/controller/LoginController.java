package com.example.bookstore.controller;

import com.example.bookstore.entity.User;
import com.example.bookstore.entity.UserAuth;
import com.example.bookstore.service.UserAuthService;
import com.example.bookstore.utils.msgutils.Msg;
import com.example.bookstore.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.lang.*;

@RestController
public class LoginController {

    @Autowired
    private UserAuthService userAuthService;

    @RequestMapping(value = "/login")
    public Msg login(@RequestBody Map<String, String> params) {
        UserAuth userAuth = new UserAuth();
        String username = params.get("username");
        String password = params.get("password");
        userAuth.setUsername(username);
        userAuth.setPassword(password);
        return userAuthService.checkUserAuth(userAuth);
    }

    @RequestMapping(value = "/signup")
    public Msg signup(@RequestBody Map<String, String> params) {
        UserAuth userAuth = new UserAuth();
        String email = params.get("email");
        String username = params.get("username");
        String password = params.get("password");
        userAuth.setUsername(username);
        userAuth.setEmail(email);
        userAuth.setPassword(password);
        userAuth.setUserType(1);
        return userAuthService.addUserAuth(userAuth);
    }

    @RequestMapping(value = "/checkUserName")
    public Msg checkName(@RequestParam("userName") String userName) {
        return userAuthService.checkUserName(userName);
    }

    @RequestMapping(value = "/logout")
    public Msg logout(){
        Boolean status = SessionUtil.removeSession();

        if(status){
            return Msg.success(null,"已注销！");
        }
        return Msg.failed();
    }

    @RequestMapping(value = "/checkSession")
    public Msg checkSession(){
        JSONObject auth = SessionUtil.getAuth();

        if(auth == null){
            return Msg.unauthorized();
        }
        else{
            return Msg.success(auth);
        }
    }

    @RequestMapping(value = "/checkAdminSession")
    public Msg checkAdminSession(){
        JSONObject auth = SessionUtil.getAuth();

        if(auth == null){
            return Msg.unauthorized();
        }
        else{
            if(auth.getInt("userType") == 0){
                return Msg.success(auth);
            }
            else{
                return Msg.failed("非管理员账号！");
            }
        }
    }

}
