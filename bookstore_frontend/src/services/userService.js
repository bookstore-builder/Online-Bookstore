import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';

export const login = (data) => {
    const url = `${config.apiUrl}/login`;
    const callback = (data) => {
        if(data.code === 200) {
            localStorage.setItem('user', JSON.stringify(data.data));
            if(data.message === "User"){
                history.push("/");
            } else {
                history.push("/adminHome");
            }
            message.success("登录成功！");
        }
        else{
            message.error(data.message);
        }
    };
    postRequest(url, data, callback);
};

export const signup = (data) => {
    const url = `${config.apiUrl}/signup`;
    const callback = (data) => {
        if(data.code === 200) {
            localStorage.setItem('user', JSON.stringify(data.data));
            history.push("/");
            message.success("登录成功！");
        }
        else{
            message.error(data.message);
        }
    };
    postRequest(url, data, callback);
}

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.code === 200) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.message);
        }
        else{
            message.error(data.message);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

export const checkAdminSession = (callback) => {
    const url = `${config.apiUrl}/checkAdminSession`;
    postRequest(url, {}, callback);
}

export const updateUser = (data) => {
    const url = `${config.apiUrl}/updateUser`;
    const callback = (data) => {
        if(data.code === 200) {
            message.success(data.message);
        }
        else{
            message.error(data.message);
        }
    };
    postRequest(url, data, callback);
}

export const activateUser = (userId) => {
    const data = {userId: userId};
    const url = `${config.apiUrl}/activateUser`;
    const callback = (data) => {
        if (data.code === 200) {
            message.success(data.message);
        }
        else{
            message.error(data.message);
        }
    };
    postRequest_v2(url, data, callback);
}

export const banUser = (userId) => {
    const data = {userId: userId};
    const url = `${config.apiUrl}/banUser`;
    const callback = (data) => {
        if (data.code === 200) {
            message.success(data.message);
        }
        else{
            message.error(data.message);
        }
    };
    postRequest_v2(url, data, callback);
}

export const getUser = (userId, callback) => {
    const data = {userId: userId};
    const url = `${config.apiUrl}/getUser`;
    postRequest_v2(url, data, callback);
}

export const checkUserName = (userName) => {
    const url = `${config.apiUrl}/checkUserName`;
    const data = {userName: userName};
    const callback = (data) => {
        if(data.code === 200){
        }
        else{
            message.error(data.message);
        }
    };
    postRequest_v2(url, data, callback);
}

export const getAllUser = (callback) => {
    const data = {search: null};
    const url = `${config.apiUrl}/getAllUser`;
    postRequest_v2(url, data, callback);
}

