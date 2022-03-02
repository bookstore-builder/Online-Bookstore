import React from 'react';
import {List} from 'antd'
import {Book} from './Book'
import * as bookService from "../../services/bookService"

export class Booklist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            pagination: {
                current: 1,
                pageSize: 10,
            },
        };
    }

    render() {
        return (
            <List
                style={{marginLeft:this.props.marginLeft,width:this.props.width,marginTop:this.props.marginTop}}
                grid={{gutter: 10, column: 4}}
                dataSource={this.props.books}
                pagination={{
                    onChange: (current, pageSize) => {
                        this.props.handlePage(current-1, pageSize);
                    },
                    current: this.props.pagination.current+1,
                    pageSize: this.props.pagination.pageSize,
                    total: this.props.pagination.total,
                }}

                renderItem={item => (
                    <List.Item style={{width: "182px"}}>
                        <Book info={item} />
                    </List.Item>
                )}
            />
        )
    }
};