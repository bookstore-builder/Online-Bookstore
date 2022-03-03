import React from 'react';
import { Card } from 'antd';
import {Link} from 'react-router-dom'

const { Meta } = Card;

export class Book extends React.Component{
    
    render() {
        const { info } = this.props;

        let user = localStorage.getItem("user");
        let userType = JSON.parse(user).userType;

        if(userType === 1){
            return (
                <Link to={{
                    pathname: '/bookDetails',
                    search: '?id=' + info.bookId}}
                    target="_blank"
                    >
                <Card
                    hoverable
                    style = {{width: 181}}
                    cover = {<img src={info.image} className={"bookImg"}/>}
                >
                    <Meta title={info.name} description={'¥' + info.price}/>
                </Card>
                </Link>
            )
        }
        else {
            return (
                <Link to={{
                    pathname: '/bookManage',
                    search: '?id=' + info.bookId}}
                    target="_blank"
                    >
                <Card
                    hoverable
                    style = {{width: 181}}
                    cover = {<img src={info.image} className={"bookImg"}/>}
                >
                    <Meta title={info.name} description={'¥' + info.price}/>
                </Card>
                </Link>
            )
        }
    }
}