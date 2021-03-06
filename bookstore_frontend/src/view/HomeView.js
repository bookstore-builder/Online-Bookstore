import React from 'react';
import { withRouter } from "react-router-dom";
import { Icon, Menu, Dropdown } from 'antd';
import { Navigator } from '../components/home/Navigator';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Searchbar } from '../components/home/Searchbar';
import { BookCarousel } from '../components/home/BookCarousel';
import { Booklist } from '../components/book/Booklist';
import * as bookService from "../services/bookService";
import '../css/home.css';

class HomeView extends React.Component {
    state = {
        filterText: '',
        filterClass: "全部",
        books: [],
        pagination: {
            current: 0,
            pageSize: 16,
        },
    }

    componentDidMount() {
        const { pagination } = this.state;
        bookService.addViewsCount({ "search": null }, (data) => { });
        bookService.getBookPage(pagination.current, pagination.pageSize,
            (data) => {
                this.setState({
                    books: data.objectList,
                    pagination: { total: data.total, current: data.currentPage, pageSize: data.pageSize }
                });
            });
        bookService.getTopBooks((data) => { this.setState({ topBooks: data }); });
    }

    menu = (
        <Menu>
            <Menu.Item key="0" onClick={(e) => { this.setState({ filterClass: "全部" }, () => { this.handleFullTextSearch(); }) }}>
                全部
            </Menu.Item>
            <Menu.Item key="1" onClick={(e) => { this.setState({ filterClass: "编程" }, () => { this.handleFullTextSearch(); }) }}>
                编程
            </Menu.Item>
            <Menu.Item key="2" onClick={(e) => { this.setState({ filterClass: "魔幻小说" }, () => { this.handleFullTextSearch(); }) }}>
                魔幻小说
            </Menu.Item>
            <Menu.Item key="3" onClick={(e) => { this.setState({ filterClass: "科幻小说" }, () => { this.handleFullTextSearch(); }) }}>
                科幻小说
            </Menu.Item>
            <Menu.Item key="4" onClick={(e) => { this.setState({ filterClass: "武侠小说" }, () => { this.handleFullTextSearch(); }) }}>
                武侠小说
            </Menu.Item>
            <Menu.Item key="5" onClick={(e) => { this.setState({ filterClass: "悬疑/推理小说" }, () => { this.handleFullTextSearch(); }) }}>
                悬疑/推理小说
            </Menu.Item>
            <Menu.Item key="6" onClick={(e) => { this.setState({ filterClass: "世界名著" }, () => { this.handleFullTextSearch(); }) }}>
                世界名著
            </Menu.Item>
            <Menu.Item key="7" onClick={(e) => { this.setState({ filterClass: "儿童文学" }, () => { this.handleFullTextSearch(); }) }}>
                儿童文学
            </Menu.Item>
            <Menu.Item key="8" onClick={(e) => { this.setState({ filterClass: "中小学教辅" }, () => { this.handleFullTextSearch(); }) }}>
                中小学教辅
            </Menu.Item>
        </Menu>
    );

    handleFilterTextChange = (filterText) => {
        this.setState({ filterText: filterText });
    }

    handleFullTextSearch = () => {
        const { filterText, filterClass, pagination } = this.state;
        if (filterText === "") {
            if (filterClass === "全部")
                bookService.searchBookPage(filterText, pagination.current, pagination.pageSize,
                    (data) => {
                        this.setState({
                            books: data.objectList,
                            pagination: { total: data.total, current: data.currentPage, pageSize: data.pageSize }
                        });
                    });
            else 
                bookService.searchTypeBookPage(filterText, filterClass, pagination.current, pagination.pageSize,
                    (data) => {
                        this.setState({
                            books: data.objectList,
                            pagination: { total: data.total, current: data.currentPage, pageSize: data.pageSize }
                        });
                    });
        } else {
            if (filterClass === "全部")
                bookService.fullTextSearch(filterText, (data) => {
                    this.setState({ books: data })
                });
            else 
                bookService.fullTextSearchType(filterText, filterClass, (data) => {
                    console.log(data);
                    this.setState( {books: data })
                });
        }
    }

    handlePage = (current, pageSize) => {
        const { filterText, filterClass } = this.state;
        if (filterClass === "全部")
            bookService.searchBookPage(filterText, current, pageSize,
                (data) => {
                    this.setState({
                        books: data.objectList,
                        pagination: { total: data.total, current: data.currentPage, pageSize: data.pageSize }
                    });
                });
        else
            bookService.searchTypeBookPage(filterText, filterClass, current, pageSize,
                (data) => {
                    this.setState({
                        books: data.objectList,
                        pagination: { total: data.total, current: data.currentPage, pageSize: data.pageSize }
                    });
                });
    }

    render() {
        return (
            <div className="container">
                <Navigator />
                <div className="Content">
                    <Sidebar data={this.state.topBooks} />
                    <Searchbar marginLeft={"400px"}
                        filterText={this.state.filterText}
                        onFilterTextChange={this.handleFilterTextChange}
                        onClicked={this.handleFullTextSearch}
                    />
                    <BookCarousel marginLeft={"200px"} width={"750px"} />
                    <Dropdown overlay={this.menu} trigger={['click']} className="dropDown">
                        <a className="ant-dropdown-link">
                            筛选 <Icon type="down" />
                        </a>
                    </Dropdown>
                    <Booklist
                        marginLeft={"400px"} width={"750px"} marginTop={"20px"}
                        books={this.state.books} pagination={this.state.pagination}
                        handlePage={this.handlePage}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(HomeView);