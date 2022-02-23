import { message } from 'antd';
import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const getOrderItems = (userId, callback) => {
    const data = {userId: userId};
    const url = `${config.apiUrl}/getOrderBooks`;
    postRequest_v2(url, data, callback);
}

export const getUserBookType = (userId, callback) => {
    const data = {userId: userId};
    const url = `${config.apiUrl}/getUserBookType`;
    postRequest_v2(url, data, callback);
}

export const getUserBookStatistic = (userId, time, callback) => {
    const data = {userId: userId, time: time};
    const url = `${config.apiUrl}/getUserBookStatistic`;
    postRequest_v2(url, data, callback);
}

export const getBookSale = (bookId, time, callback) => {
    const data = {bookId: bookId, time: time};
    const url = `${config.apiUrl}/getBookSale`;
    postRequest_v2(url, data, callback);
}

export const updateTopBooks = (time) => {
    const data = {time: time};
    const url = `${config.apiUrl}/updateTopBooks`;
    const callback = (data) => {
        if(data.code === 200) {
            message.success(data.message);
        }
        else{
            message.error(data.message);
        }
    };
    postRequest_v2(url, data, callback);
}

export const getAllOrderItems = (callback) => {
    const data = {search: null};
    const url = `${config.apiUrl}/getAllOrderBooks`;
    postRequest_v2(url, data, callback);
}

export const getOrderPage = (pageNum, pageSize, search, time, userId, callback) => {
    const data = {pageNum: pageNum, pageSize: pageSize, search: search, time: time, userId: userId};
    const url = `${config.apiUrl}/getOrderPage`;
    postRequest_v2(url, data, callback);
}

export const getBookStatistic = (time, callback) => {
    const data = {time: time};
    const url = `${config.apiUrl}/getBookStatistic`;
    postRequest_v2(url, data, callback);
}

export const getUserStatistic = (time, callback) => {
    const data = {time: time};
    const url = `${config.apiUrl}/getUserStatistic`;
    postRequest_v2(url, data, callback);
}

export const changeBookNums = (data) => {
    const url = `${config.apiUrl}/changeOrderNums`;
    const callback = (data) => {
        if(data.code === 200) {
            // message.success(data.message);
        }
        else{
            message.error(data.message);
        }
    };
    postRequest(url, data, callback);
}