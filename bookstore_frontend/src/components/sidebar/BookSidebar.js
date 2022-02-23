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
                <Search placeholder="input book name" allowClear style={{ width: 183 }} onPressEnter={this.handleSearch} />
                <List
                    header={<div style={{ marginLeft: "21px", fontSize: "20px", fontWeight: "bold" }}>书库
                    <BookForm/>
                    </div>}
                    bordered
                    dataSource={this.props.data}
                    pagination={{simple: true, size: "small", marginRight:"5px"}}
                    renderItem={item => {
                        return (
                            <List.Item>
                                <span>
                                    <Link to={{
                                        pathname: '/bookManage',
                                        search: '?id=' + item.id
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