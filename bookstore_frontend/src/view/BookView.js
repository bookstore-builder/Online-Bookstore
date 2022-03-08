import React from 'react';
import { withRouter } from "react-router-dom";
import { Icon, Button, Modal, InputNumber, Input, message } from 'antd';
import { Navigator } from '../components/home/Navigator';
import { BookDetail } from '../components/book/BookDetail';
import { Booklist } from '../components/book/Booklist';
import { CommentList } from '../components/book/CommentList';
import { LineChart } from '../components/statistic/Charts'
import { getBook, getSimilarBooks } from '../services/bookService';
import { getBookSale } from "../services/orderService";
import moment from 'moment';
import * as cartService from '../services/cartService';
import * as orderService from '../services/orderService';
import '../css/bookdetail.css';

class BookView extends React.Component {

    constructor(props) {
        super(props);
        let user = localStorage.getItem("user");
        let userId = JSON.parse(user).userId;
        let userName = JSON.parse(user).username;
        let query = this.props.location.search;
        let arr = query.split('&');
        let bookId = arr[0].substr(4);
        this.state = {
            visible: false,
            _visible: false,
            __visible: false,
            books: null,
            number: 1,
            _number: 1,
            name: "",
            telephone: "",
            address: "",
            bookInfo: [],
            similarBooks: [],
            chartData: [],
            pagination: {
                current: 0,
                pageSize: 16,
            },
            comments: [],
            user: user,
            userId: userId,
            userName: userName,
            bookId: bookId,
        }
    }

    componentDidMount(){
        const { pagination } = this.state;
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        getBook(bookId, (data) => {
            this.setState({bookInfo: data});
            getSimilarBooks(data.type, pagination.current, pagination.pageSize,
                (data) => {
                this.setState({similarBooks: data.objectList,
                pagination: {total: data.total, current: data.currentPage, pageSize: data.pageSize}});
            });
        });
        getBookSale(bookId, moment().format("YYYY/MM/DD"), (data) => {
            this.setState({
                chartData: data
            });
        });
    }   

    handleNumber = (value) => {
        this.setState({
            number: value,
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    _showModal = () => {
        this.setState({
            _visible: true,
        });
    };

    handleOK = () => {
        let data = {};
        data.userId = JSON.parse(this.state.user).userId;
        data.bookId = this.state.bookInfo.bookId;
        data.bookNum = this.state.number;
        cartService.changeBookNum(data);
        this.setState({ visible: false, });
    }

    handleCancel = () => {
        this.setState({ visible: false, });
    }

    _handleNumber = (value) => {
        this.setState({
            _number: value,
        });
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
        if (this.state.name === '')
            message.error("请输入名称！")
        else if (this.state.telephone === '')
            message.error("请输入电话！")
        else if (this.state.address === '')
            message.error("请输入地址！")
        else {
            let allData = [];
            let data = {};
            data.userId = JSON.parse(this.state.user).userId;
            data.bookId = this.state.bookId;
            data.bookNum = this.state._number;
            allData.push(data);
            orderService.changeBookNums(allData);
            this.setState({ _visible: false, __visible: true, });
            message.success("已成功购买!");
        }
    }

    _handleCancel = () => {
        this.setState({ _visible: false, __visible: false, });
    }

    __handleOK = () => {
        this.setState({ __visible:false, });
    }

    __handleCancel = () => {
        this.setState({ __visible:false, });
    }

    handlePage = (current, pageSize) => {
        const { bookInfo } = this.state;
        getSimilarBooks(bookInfo.type, current, pageSize,
            (data) => {
            this.setState({similarBooks: data.objectList,
            pagination: {total: data.total, current: data.currentPage, pageSize: data.pageSize}});
        });
    }

    render() {
        return (
            <div className="Container">
                <Navigator />
                <div className="Content">
                    <BookDetail info={this.state.bookInfo} />
                    <div class="statistics">
                    <LineChart data={this.state.chartData}/>
                    </div>
                    <div class="Clear"></div>
                    <div className="button-groups">
                        <Button type="danger" icon="shopping-cart" size={"large"} onClick={this.showModal}>
                            加入购物车
                    </Button>

                        <Button type="danger" icon="pay-circle" size={"large"} style={{ marginLeft: "15%" }} onClick={this._showModal} ghost>
                            立即购买
                    </Button>
                        <Modal title="请选择数量" visible={this.state.visible} onOk={this.handleOK} onCancel={this.handleCancel} width={300}>
                            <span>
                                数量：
                            <InputNumber min={1} max={Math.min(100, this.state.bookInfo.inventory)} defaultValue={1} onChange={this.handleNumber}/>
                            </span>
                        </Modal>
                        <Modal title="请输入个人信息" visible={this.state._visible} onOk={this._handleOK} onCancel={this._handleCancel} width={300}>
                            <span>
                                数量：
                            <InputNumber min={1} max={Math.min(100, this.state.bookInfo.inventory)} defaultValue={1} onChange={this._handleNumber}/>
                            </span>
                            <br/><br/>
                            <span>
                                姓名：
                                <Input prefix={<Icon type="user" />} style={{ width: "150px" }} onChange={this.handleName}/>
                            </span>
                            <br/><br/>
                            <span>
                                电话：
                                <Input prefix={<Icon type="phone" />} style={{ width: "150px" }} onChange={this.handleTelephone}/>
                            </span>
                            <br/><br/>
                            <span>
                                地址：
                                <Input prefix={<Icon type="environment" />} style={{ width: "150px" }} onChange={this.handleAddress}/>
                            </span>
                            <br/>
                        </Modal>
                        <Modal title="订单详情" visible={this.state.__visible} width={300} onOk={this.__handleOK} onCancel={this.__handleCancel}>
                        <span>
                            姓名：
                                {this.state.name}
                        </span>
                        <p />
                        购买书籍:
                            <ul>
                                <li>{this.state.bookInfo.name} *{this.state._number} ¥{this.state.bookInfo.price * this.state._number}</li>
                            </ul>
                        <p />
                        <span>
                            电话：
                                {this.state.telephone}
                        </span>
                        <br/><br/>
                        <span>
                            地址：
                                {this.state.address}
                        </span>
                        <br/>
                        <span style={{float:"right"}}>
                            总消费:¥{this.state.bookInfo.price * this.state._number}
                        </span>
                        <p/>
                    </Modal>
                    </div>
                    <div style={{ width: "670px", marginLeft: "20px" }}>
                        <CommentList bookId={this.state.bookId} userId={this.state.userId} userName={this.state.userName}/>
                    </div>
                    <h1 style={{ marginLeft: "30px" }}>类似书籍</h1>
                    <Booklist 
                    books={this.state.similarBooks} pagination={this.state.pagination}
                    handlePage={this.handlePage}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(BookView);