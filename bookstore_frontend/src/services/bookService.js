import { message } from 'antd';
import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";

export const addViewsCount = (data, callback) => {
    const url = `${config.apiUrl}/addViewsCount`;
    postRequest(url, data, callback);
}

export const getBookPage = (pageNum, pageSize, callback) => {
    const data = {pageNum: pageNum, pageSize: pageSize};
    const url = `${config.apiUrl}/getBookPage`;
    postRequest_v2(url, data, callback);
}

export const searchTypeBookPage = (word, type, pageNum, pageSize, callback) => {
    const data = {word: word, type: type, pageNum: pageNum, pageSize: pageSize};
    const url = `${config.apiUrl}/searchTypeBookPage`;
    postRequest_v2(url, data, callback);
} 

export const fullTextSearch = (text, callback) => {
    const url = `${config.apiUrl}/fullTextSearchBook`;
    const data = {text: text};
    postRequest_v2(url, data, callback);
}

export const fullTextSearchType = (text, type, callback) => {
    const url = `${config.apiUrl}/fullTextSearchTypeBook`;
    const data = {text: text, type: type};
    postRequest_v2(url, data, callback);
}

export const searchBookPage = (word, pageNum, pageSize, callback) => {
    const data = {word: word, pageNum: pageNum, pageSize: pageSize};
    const url = `${config.apiUrl}/searchBookPage`;
    postRequest_v2(url, data, callback);
} 

export const getSimilarBooks = (type, pageNum, pageSize, callback) => {
    const data = {type: type, pageNum: pageNum, pageSize: pageSize};
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