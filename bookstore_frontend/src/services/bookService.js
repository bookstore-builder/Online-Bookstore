import { message } from 'antd';
import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const getBooks = (data, callback) => {
    const url = `${config.apiUrl}/getBooks`;
    postRequest(url, data, callback);
};

export const getSimilarBooks = (type, callback) => {
    const data = {type: type};
    const url = `${config.apiUrl}/getSimilarBooks`;
    postRequest_v2(url, data, callback);
};

export const getTopBooks = (callback) => {
    const data = {search: null};
    const url = `${config.apiUrl}/getTopBooks`;
    postRequest_v2(url, data, callback);
}

export const getBook = (id, callback) => {
    const data = {id: id};
    const url = `${config.apiUrl}/getBook`;
    postRequest_v2(url, data, callback);
};

export const getBookByName = (bookName, callback) => {
    const data = {bookName: bookName};
    const url = `${config.apiUrl}/searchBook`;
    postRequest_v2(url, data, callback);
}

export const addBook = (data) => {
    const url = `${config.apiUrl}/addBook`;
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

export const deleteBook = (id) => {
    const data = {id: id};
    const url = `${config.apiUrl}/deleteBook`;
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

export const updateBook = (data) => {
    const url = `${config.apiUrl}/updateBook`;
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