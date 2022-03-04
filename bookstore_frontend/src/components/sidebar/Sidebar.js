import React from 'react';
import { List, Icon } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import '../../css/sidebar.css';
import {updateTopBooks} from "../../services/orderService"
import moment from 'moment';

export class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    handleUpdate = () => {
        let time = moment().subtract(6,'days').format("YYYY/MM/DD");
        updateTopBooks(time);
    }

    render() {
        let user = localStorage.getItem("user");
        let userType = JSON.parse(user).userType;
        if(userType === 0){
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