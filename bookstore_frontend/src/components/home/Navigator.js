import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import * as userService from '../../services/userService'
import logo from "../../assets/logo.svg";
import head from "../../assets/head.png";
import '../../css/navigator.css';

export class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "thunderboy",
        }
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        let username = JSON.parse(user).username;
        this.setState({ username: username });
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/profile"><Icon type="user" />我的信息</Link>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={userService.logout}>
                        <Icon type="import" />注销
                    </a>
                </Menu.Item>
            </Menu>
        );

        let user = localStorage.getItem("user");
        let userType = JSON.parse(user).userType;

        if(userType === 1){
            return (
                <div className="top">
                    <Link className="logo" to="/">
                        <img src={logo} />
                    </Link>
                    <h2>Book Store</h2>
                    <div class="top_right">
                        <ul>
                            <li><Link to="/cart"><Icon type="shopping-cart" /></Link></li>
                            <li><Link style={{ fontSize: "15px" }} to="/cart">购物车</Link></li>
                            <li class="vl"></li>
                            <li><Link to={{
                                pathname: '/bookDetails',
                                search: '?id=' + 1
                            }}
                                target="_blank"
                            ><Icon type="read" /></Link></li>
                            <li><Link 
                                style={{ fontSize: "15px" }} 
                                to={{
                                pathname: '/bookDetails',
                                search: '?id=' + 1
                            }}
                                target="_blank"
                            >书籍</Link></li>
                            <li className="vl"></li>
                            <li><Link to="/order"><Icon type="solution" /></Link></li>
                            <li><Link style={{ fontSize: "15px" }} to="/order">订单</Link></li>
                            <li className="vl"></li>
                            <li><Link to="/statistic"><Icon type="monitor" /></Link></li>
                            <li><Link style={{ fontSize: "15px" }} to="/statistic">统计</Link></li>
                            <li className="vl"></li>
                            <li style={{ fontSize: "15px", marginTop: "-2px" }}>Hi,{this.state.username}!
                            <Dropdown overlay={menu} placement="bottomRight">
                                    <img src={head} className="round_icon_" />
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="top">
                    <Link className="logo" to="/">
                        <img src={logo} />
                    </Link>
                    <h2>Book Store</h2>
                    <div class="top_right">
                        <ul>
                            <li><Link to="/userManage"><Icon type="user" /></Link></li>
                            <li><Link style={{ fontSize: "15px" }} to="/userManage">用户</Link></li>
                            <li class="vl"></li>
                            <li><Link to={{
                                pathname: '/bookManage',
                                search: '?id=' + 1
                            }}
                                target="_blank"
                            ><Icon type="read" /></Link></li>
                            <li><Link 
                            style={{ fontSize: "15px" }} 
                            to={{
                                pathname: '/bookManage',
                                search: '?id=' + 1
                            }}
                                target="_blank"
                            >书籍</Link></li>
                            <li className="vl"></li>
                            <li><Link to="/order"><Icon type="solution" /></Link></li>
                            <li><Link style={{ fontSize: "15px" }} to="/order">订单</Link></li>
                            <li className="vl"></li>
                            <li><Link to="/statistic"><Icon type="monitor" /></Link></li>
                            <li><Link style={{ fontSize: "15px" }} to="/adminStatistic">统计</Link></li>
                            <li className="vl"></li>
                            <li style={{ fontSize: "15px", marginTop: "-2px" }}>Hi,{this.state.username}!
                            <Dropdown overlay={menu} placement="bottomRight">
                                    <img src={head} className="round_icon_" />
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

