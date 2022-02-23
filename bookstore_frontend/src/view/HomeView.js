import React from 'react';
import { withRouter } from "react-router-dom";
import { Icon, Menu, Dropdown } from 'antd';
import { Navigator } from '../components/home/Navigator';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Searchbar } from '../components/home/Searchbar';
import { BookCarousel } from '../components/home/BookCarousel';
import { Booklist } from '../components/book/Booklist';
import {getBooks, getTopBooks} from "../services/bookService";
import '../css/home.css';

let allData = []
const _data = []

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            filterClass: "全部",
            books: [], 
        };
        this.handleFilterTextChange =
            this.handleFilterTextChange.bind(this);
        this.handleSearch =
            this.handleSearch.bind(this);
        this.handleFilter = 
            this.handleFilter.bind(this);
    }

    componentDidMount() {
        const callback = (data) => {
            allData = data;
            this.setState({books:data});
        }
        getBooks({"search":null}, callback);
        getTopBooks((data) => {this.setState({topBooks: data});});
    }

    menu = (
        <Menu>
            <Menu.Item key="0" onClick={(e) => {this.setState({filterClass: "全部"},()=>{this.handleFilter();})}}>
                全部
            </Menu.Item>
            <Menu.Item key="1" onClick={(e) => {this.setState({filterClass: "编程"},()=>{this.handleFilter();})}}>
                编程
            </Menu.Item>
            <Menu.Item key="2" onClick={(e) => {this.setState({filterClass: "魔幻小说"},()=>{this.handleFilter();})}}>
                魔幻小说
            </Menu.Item>
            <Menu.Item key="3" onClick={(e) => {this.setState({filterClass: "科幻小说"},()=>{this.handleFilter();})}}>
                科幻小说
            </Menu.Item>
            <Menu.Item key="4" onClick={(e) => {this.setState({filterClass: "武侠小说"},()=>{this.handleFilter();})}}>
                武侠小说
            </Menu.Item>
            <Menu.Item key="5" onClick={(e) => {this.setState({filterClass: "悬疑/推理小说"},()=>{this.handleFilter();})}}>
                悬疑/推理小说
            </Menu.Item>
            <Menu.Item key="6" onClick={(e) => {this.setState({filterClass: "世界名著"},()=>{this.handleFilter();})}}>
                世界名著
            </Menu.Item>
            <Menu.Item key="7" onClick={(e) => {this.setState({filterClass: "儿童文学"},()=>{this.handleFilter();})}}>
                儿童文学
            </Menu.Item>
            <Menu.Item key="8" onClick={(e) => {this.setState({filterClass: "中小学教辅"},()=>{this.handleFilter();})}}>
                中小学教辅
            </Menu.Item>
        </Menu>
    );

    handleFilterTextChange(filterText) {
        this.setState({ filterText: filterText });
    }

    handleSearch() {
        _data.length = 0;
        allData.forEach((product) => {
            if (product.name.includes(this.state.filterText) || this.state.filterText == '')
                _data.push(product);
        })
        this.setState({ books: _data });
    }

    handleFilter() {
        console.log("handle");
        _data.length = 0;
        allData.forEach((product) => {
            if (product.type.includes(this.state.filterClass) || this.state.filterClass == "全部")
                _data.push(product);
        })
        this.setState({ books: _data });
    }

    render() {
        return (
            <div className="container">
                <Navigator />
                <div className="Content">
                    <Sidebar data={this.state.topBooks}/>
                    <Searchbar marginLeft={"400px"}
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                        onClicked={this.handleSearch}
                    />
                    <BookCarousel marginLeft={"200px"} width={"750px"} />
                    <Dropdown overlay={this.menu} trigger={['click']} className="dropDown">
                        <a className="ant-dropdown-link">
                            筛选 <Icon type="down" />
                        </a>
                    </Dropdown>
                    <Booklist
                        marginLeft={"400px"} width={"750px"} marginTop={"20px"}
                        books={this.state.books}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(HomeView);