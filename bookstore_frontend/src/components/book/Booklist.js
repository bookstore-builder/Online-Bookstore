import React from 'react';
import {List} from 'antd'
import {Book} from './Book'

export class Booklist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    render() {
        return (
            <List
                style={{marginLeft:this.props.marginLeft,width:this.props.width,marginTop:this.props.marginTop}}
                grid={{gutter: 10, column: 4}}
                dataSource={this.props.books}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 16,
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