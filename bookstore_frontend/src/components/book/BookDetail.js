import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import React from 'react';
import { Descriptions } from 'antd';
import '../../css/bookdetail.css';

export class BookDetail extends React.Component {

    render() {
        const {info} = this.props;
        if(info == null) return null;
        return (
            <div className="book-detail">
                <img className="book-img" src={info.image}/>
                <div class="descriptions">
                    <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                            <Descriptions.Item label={"ISBN编号"} span={3}>{info.isbn}</Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>{info.author}</Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                    </Descriptions>
                </div>                   
            </div>
        )
    }
}