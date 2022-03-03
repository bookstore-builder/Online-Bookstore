import { message } from 'antd';
import config from 'config';
import { postRequest_v2} from '../utils/ajax';

export const getBookComments = (bookId, callback) => {
    const data = {bookId: parseInt(bookId)};
    const url = `${config.apiUrl}/getBookComments`;
    postRequest_v2(url, data, callback);
}

export const addCommentItem = (bookId, userId, comment, time) => {
    const data = {bookId: parseInt(bookId), userId: userId, comment: comment, time: time};
    const url = `${config.apiUrl}/addComment`;
    const callback = (data) => {
        if(data.code === 200) {
            message.success(data.message);
        }else{
            message.error(data.message);
        }
    };
    postRequest_v2(url, data, callback);
}