import React from 'react'
import { withRouter } from "react-router-dom";
import { Icon, Button, Popconfirm, message, Modal, Input } from 'antd';
import { Navigator } from '../components/home/Navigator'
import { CartTable } from '../components/table/CartTable'
import * as cartService from '../services/cartService'
import * as orderService from '../services/orderService'
import '../css/bookdetail.css';

class CartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            visible: false,
            selectedBooks: [],
            _visible: false,
            name: "",
            telephone: "",
            address: "",
            books: [],
            totalPrice: 0,
        }
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({ user: user });
        let userId = JSON.parse(user).userId;
        cartService.getCartItems(userId, (data) => { this.setState({ data: data }); })
    }

    handleSelect = (books, info) => {
        let bookInfo = [];
        let totalPrice = 0;
        for (let i = 0; i < info.length; i++) {
            let book = {};
            book.num = info[i].num;
            book.money = info[i].money;
            book.name = info[i].name;
            book.bookId = info[i].bookId;
            bookInfo.push(book);
            totalPrice += book.money;
        }
        this.setState({
            selectedBooks: books,
            books: bookInfo,
            totalPrice: totalPrice,
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOK = () => {
        let userId = JSON.parse(this.state.user).userId;
        cartService.deleteCartItems(userId, this.state.selectedBooks, (data) => {
            if (data.code === 200) {
                message.success(data.message);
            }
        });
        let allData = [];
        for (let i = 0; i < this.state.books.length; i++) {
            let data = {};
            data.userId = JSON.parse(this.state.user).userId;
            data.bookId = this.state.books[i].bookId;
            data.bookNum = this.state.books[i].num;
            allData.push(data);
        }
        orderService.changeBookNums(allData);
        this.setState({ visible: false, _visible: true });
    }

    handleCancel = () => {
        message.warning("撤销");
        this.setState({ visible: false, });
    }

    handleName = (e) => {
        this.setState({ name: e.target.value, });
    }

    handleTelephone = (e) => {
        this.setState({ telephone: e.target.value, });
    }

    handleAddress = (e) => {
        this.setState({ address: e.target.value, });
    }

    _handleOK = () => {
        this.setState({ _visible: false, });
    }

    _handleCancel = () => {
        this.setState({ _visible: false, });
    }

    confirm = () => {
        let userId = JSON.parse(this.state.user).userId;
        console.log(this.state.selectedBooks);
        cartService.deleteCartItems(userId, this.state.selectedBooks, (data) => {
            if (data.code === 200) {
                message.success("已清除指定书目！");
            }
        });
    }

    render() {
        return (
            <div className="Container">
                <Navigator />
                <div class="Content">
                    <h1 style={{ marginLeft: "30px", marginTop: "20px" }}>我的购物车</h1>
                    <CartTable data={this.state.data} handleSelect={this.handleSelect} />
                    <div>
                        <Button type="danger" size='large' style={{ marginLeft: '650px', marginTop: "20px", float: "left" }} onClick={this.showModal}>
                            <span>
                                <Icon type="shopping-cart" style={{ marginRight: "10px" }} />
                        购买
                        </span>
                        </Button>
                        <Popconfirm
                            title="确认要移除这些书吗？"
                            onConfirm={this.confirm}
                            onCancel={this.cancel}
                            okText="是"
                            cancelText="否"
                        >
                        <Button type="danger" size='large' style={{ marginLeft: "20px", marginTop: "20px" }} ghost>
                            <span>
                                <Icon type="exclamation-circle" style={{ marginRight: "10px" }} />
                        删除
                        </span>
                        </Button>
                        </Popconfirm>
                    </div>
                    <Modal title="请填写个人信息" visible={this.state.visible} onOk={this.handleOK} onCancel={this.handleCancel} width={300}>
                        <span>
                            姓名：
                                <Input prefix={<Icon type="user" />} style={{ width: "150px" }} onChange={this.handleName} />
                        </span>
                        <p />
                        <span>
                            电话：
                                <Input prefix={<Icon type="phone" />} style={{ width: "150px" }} onChange={this.handleTelephone} />
                        </span>
                        <p />
                        <span>
                            地址：
                                <Input prefix={<Icon type="environment" />} style={{ width: "150px" }} onChange={this.handleAddress} />
                        </span>
                        <p />
                        <span style={{ float: "right" }}>
                            总消费:¥{this.state.totalPrice}
                        </span>
                        <p />
                    </Modal>
                    <Modal title="订单详情" visible={this.state._visible} onOk={this._handleOK} onCancel={this._handleCancel} width={300}>
                        <span>
                            姓名：
                                {this.state.name}
                        </span>
                        <p />
                        购买书籍:
                            <ul>
                            {
                                this.state.books.map(function (item) {
                                    return <li>{item.name} *{item.num} ¥{item.money}</li>
                                })
                            }
                        </ul>
                        <p />
                        <span>
                            电话：
                                {this.state.telephone}
                        </span>
                        <p />
                        <span>
                            地址：
                                {this.state.address}
                        </span>
                        <p />
                        <span style={{ float: "right" }}>
                            总消费:¥{this.state.totalPrice}
                        </span>
                        <p />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withRouter(CartView);