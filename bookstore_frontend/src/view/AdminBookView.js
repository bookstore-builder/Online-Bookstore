import React from 'react';
import { Button } from 'antd';
import { Navigator } from '../components/home/Navigator';
import { BookSideBar } from '../components/sidebar/BookSidebar';
import { BookDetail } from '../components/book/BookDetail';
import { EditBookDetail } from '../components/book/EditBookDetail';
import { LineChart } from '../components/statistic/Charts'
import { withRouter } from "react-router-dom";
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

let data = []
const searchData = []

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

class AdminBookView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            info: info,
            delete: '',
            data: [],
            chartData: [],
        };
    }

    handleName = (name) => {
        info.name = name;
        this.setState({
            info: info,
            data: data,
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
        searchData.length = 0;
        data.forEach((product) => {
            if(product.name.includes(name) || name == '')
                searchData.push(product);
        })
        this.setState({data: searchData,});
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
        const callback = (allData) => {
            for(let i = 0; i < allData.length; i++){
                let book = {};
                book.name = allData[i].name;
                book.id = allData[i].bookId;
                data.push(book);
            }
            this.setState({data: data});
        }
        bookService.getBooks({"search":null}, callback);

        let user = localStorage.getItem("user");
        this.setState({user:user});
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        this.setState({bookId: bookId});
        bookService.getBook(bookId, (data) => {info = data; this.setState({info: data})});
        let date = new Date();
        getBookSale(bookId, date.format("yyyy/MM/dd"), (data) => {
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
                    handleSearch={this.handleSearch}
                    handleSubmit={this.handleSubmit}
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
                        <div className="Clear"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminBookView);