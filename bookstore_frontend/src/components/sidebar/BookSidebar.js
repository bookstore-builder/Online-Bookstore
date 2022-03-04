import React from 'react'
import { List, Input } from 'antd';
import { BookForm } from "../book/BookForm";
import { Link } from 'react-router-dom';
import '../../css/sidebar.css';

const { Search } = Input;

export class BookSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
        }
    };

    handleSearch(e) {
        this.props.handleSearch(e.target.value);
    }

    render() {
        return (
            <div className="sidebar">
                <Search placeholder="input book name" allowClear style={{ width: 190 }} onPressEnter={this.handleSearch} />
                <List
                    header={<div style={{ marginLeft: "21px", fontSize: "18px", fontWeight: "bold" }}>书库
                    <BookForm/>
                    </div>}
                    bordered
                    dataSource={this.props.data}
                    pagination={{
                        simple: true, size: "small", marginRight:"10px",
                        onChange: (current, pageSize) => {
                            this.props.handlePage(current-1, pageSize);
                        },
                        current: this.props.pagination.current+1,
                        pageSize: this.props.pagination.pageSize,
                        total: this.props.pagination.total,
                    }}
                    renderItem={item => {
                        return (
                            <List.Item>
                                <span>
                                    <Link to={{
                                        pathname: '/bookManage',
                                        search: '?id=' + item.bookId
                                    }}
                                        target="_blank"
                                    >
                                        {item.name}
                                    </Link>
                                </span>
                            </List.Item>
                        )
                    }
                    }
                />
            </div>
        )
    }
}