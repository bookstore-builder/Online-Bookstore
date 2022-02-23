import { message } from 'antd';
import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const getAllCart = (data, callback) => {
    const url = `${config.apiUrl}/getAllCart`;
    postRequest(url, data, callback);
};

export const changeBookNum = (data) => {
    const url = `${config.apiUrl}/changeCartNum`;
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

export const getCartItems = (userId, callback) => {
    const data = {userId: userId};
    const url = `${config.apiUrl}/getCartBooks`;
    postRequest_v2(url, data, callback);
}

export const deleteCartItems = (userId, books, callback) => {
    let data = {userId: userId};
    data.books = books;
    const url = `${config.apiUrl}/deleteCartItems`;
    postRequest_v2(url, data, callback);
}
