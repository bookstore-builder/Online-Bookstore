import React from 'react';
import { List, Icon } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import '../../css/sidebar.css';
import {updateTopBooks} from "../../services/orderService"

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    handleUpdate = () => {
        let date = new Date();
        let time = new Date(date.getTime() - 6 * 24 * 3600 * 1000).format("yyyy/MM/dd");
        updateTopBooks(time);
    }

    render() {
        let user = localStorage.getItem("user");
        let userType = JSON.parse(user).userType;
        if(userType == 0){
            return (
                <div class="sidebar">
                    <List
                        header={
                            <div style={{ marginTop: "10px" }}><h2>Top Books</h2></div>
                        }
                        footer={
                            <span>
                                <a onClick={this.handleUpdate}><Icon type="form"></Icon>Update</a>
                            </span>
                        }
                        bordered
                        dataSource={this.props.data}
                        renderItem={item => {
                            return (
                                <List.Item>
                                    <Link to={{
                                        pathname: '/bookManage',
                                        search: '?id=' + parseInt(item.bookId)
                                    }}
                                        target="_blank"
                                    >
                                        {item.name}
                                    </Link>
                                </List.Item>
                            )
                        }
                        }
                    />
                </div>
            )
        }
        else {
            return (
                <div class="sidebar">
                    <List
                        header={
                            <div style={{ marginTop: "10px" }}><h2>Top Books</h2></div>
                        }
                        bordered
                        dataSource={this.props.data}
                        renderItem={item => {
                            return (
                                <List.Item>
                                    <Link to={{
                                        pathname: '/bookDetails',
                                        search: '?id=' + parseInt(item.bookId)
                                    }}
                                        target="_blank"
                                    >
                                        {item.name}
                                    </Link>
                                </List.Item>
                            )
                        }
                        }
                    />
                </div>
            )
        }
        
    }
}