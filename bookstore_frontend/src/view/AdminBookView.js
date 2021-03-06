import React from 'react';
import { Button } from 'antd';
import { Navigator } from '../components/home/Navigator';
import { BookSideBar } from '../components/sidebar/BookSidebar';
import { BookDetail } from '../components/book/BookDetail';
import { CommentList } from '../components/book/CommentList';
import { EditBookDetail } from '../components/book/EditBookDetail';
import { LineChart } from '../components/statistic/Charts'
import { withRouter } from "react-router-dom";
import moment from 'moment';
import * as bookService from "../services/bookService";
import { getBookSale } from "../services/orderService";
import '../css/bookdetail.css';

let info = {
    image: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg",
    name: "Java核心技术卷II",
    author: "凯S.霍斯特曼",
    type: "编程",
    class: 1,
    isbn: 1,
    price: 95.2,
    inventory: 1000,
    description: "本书是Java领域有影响力和价值的著作之一，由拥有20多年教学与研究经验的Java技术专家撰写（获Jolt大奖），与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。第10版根据JavaSE8全面更新，同时修正了第9版中的不足，系统全面讲解了Java语言的核心概念、语法、重要特性和开发方法，包含大量案例，实践性强。"
};

class AdminBookView extends React.Component {
    constructor(props) {
        super(props);
        let user = localStorage.getItem("user");
        let userId = JSON.parse(user).userId;
        let userName = JSON.parse(user).username;
        let query = this.props.location.search;
        let arr = query.split('&');
        let bookId = arr[0].substr(4);
        this.state = {
            flag: false,
            info: info,
            delete: '',
            searchText: '',
            data: [],
            chartData: [],
            pagination: {
                current: 0,
                pageSize: 12,
            },
            userId: userId,
            userName: userName,
            bookId: bookId,
        };
    }

    handleName = (name) => {
        info.name = name;
        this.setState({
            info: info,
        });
    }

    handleAuthor = (author) => {
        info.author = author;
        this.setState({
            info: info,
        });
    }

    handleClass = (type) => {
        info.class = type;
        switch (type) {
            case 1: info.type = "编程";
                break;
            case 2: info.type = "小说";
                break;
            case 3: info.type = "名著";
                break;
            default:
                break;
        }
        this.setState({
            info: info,
        });
    }

    handleImage = (image) => {
        info.image = image;
        this.setState({
            info: info,
        });
    }

    handlePrice = (price) => {
        info.price = parseFloat(price);
        this.setState({
            info: info,
        });
    }

    handleISBN = (isbn) => {
        info.isbn = isbn;
        this.setState({
            isbn: isbn,
        });
    }

    handleInventory = (inventory) => {
        info.inventory = parseInt(inventory);
        this.setState({
            info: info,
        });
    }

    handleDescription = (description) => {
        info.description = description;
        this.setState({
            info: info,
        });
    }

    handleDelete = () => {
        bookService.deleteBook(this.state.bookId);
    }

    handleSearch = (name) => {
        this.setState({
            searchText: name,
        });
        const { pagination } = this.state;
        bookService.searchBookPage(name, pagination.current, pagination.pageSize,
            (_data) => {
                this.setState({data: _data.objectList, 
                pagination: {total: _data.total, current: _data.currentPage, pageSize: _data.pageSize}});
            });
    }

    handlePage = (current, pageSize) => {
        const { searchText } = this.state;
        bookService.searchBookPage(searchText, current, pageSize,
            (_data) => {
                this.setState({data: _data.objectList, 
                pagination: {total: _data.total, current: _data.currentPage, pageSize: _data.pageSize}});
            });
    }

    onEdit = () => {
        this.setState({
            flag: true,
        });
    }

    onSave = () => {
        bookService.updateBook(this.state.info);
        this.setState({
            flag: false,
        });
    }

    componentDidMount() {
        const { pagination } = this.state;
        bookService.getBookPage(pagination.current, pagination.pageSize,
            (_data) => {
                this.setState({data: _data.objectList, 
                pagination: {total: _data.total, current: _data.currentPage, pageSize: _data.pageSize}});
            });

        let user = localStorage.getItem("user");
        this.setState({user:user});
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        this.setState({bookId: bookId});
        bookService.getBook(bookId, (data) => {info = data; this.setState({info: data})});
        getBookSale(bookId, moment().format("YYYY/MM/DD"), (data) => {
            this.setState({
                chartData: data
            });
        });
    }

    render() {
        return (
            <div className="Container">
                <Navigator />
                <div className="Content">
                    <BookSideBar 
                    data={this.state.data}
                    pagination={this.state.pagination}
                    handleSearch={this.handleSearch}
                    handleSubmit={this.handleSubmit}
                    handlePage={this.handlePage}
                    />
                    <div className="Content-main">
                        {this.state.flag ?
                            <EditBookDetail info={this.state.info}
                                handleName={this.handleName}
                                handleAuthor={this.handleAuthor}
                                handleClass={this.handleClass}
                                handlePrice={this.handlePrice}
                                handleInventory={this.handleInventory}
                                handleDescription={this.handleDescription}
                                handleDelete={this.handleDelete}
                                handleImage={this.handleImage}
                                handleISBN={this.handleISBN}
                            />
                            : <BookDetail info={this.state.info} />}
                        <div className="statistics" style={{ width: '410px', height: '350px', marginTop: "50px" }}><LineChart data={this.state.chartData}/></div>
                        <div className={"button-groups"} style={{ marginTop: "30px" }}>
                            <Button type="primary" onClick={this.onEdit} icon="form" style={{ background: "#46A3FF", border: "none" }}>
                                编辑
                            </Button>
                            <Button type="primary" onClick={this.onSave} icon="save" style={{ marginLeft: "20px", background: "#46A3FF", border: "none" }}>
                                保存
                            </Button>
                        </div>
                        <div style={{ width: "600px", marginLeft: "20px", float: "left" }}>
                            <CommentList userId={this.state.userId} userName={this.state.userName} bookId={this.state.bookId}/>
                        </div>
                        <div className="Clear"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminBookView);