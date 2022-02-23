import React from 'react';
import { Carousel } from 'antd';
import '../../css/carousel.css'

export class BookCarousel extends React.Component{

    createContent = (ctx) => {
        const images = ctx.keys().map(ctx);
        let result = [];
        for (let i = 0; i < ctx.keys().length; i++) {
            let img = images[i];
            result.push(<div><img alt={i} src={img}/></div>);
        }
        return result;
    };


    render(){
        const requireContext = require.context("../../assets/carousel", true, /^\.\/.*\.jpg$/);

        return (
            <Carousel autoplay style={{marginLeft: this.props.marginLeft, width: this.props.width}}>
                {this.createContent(requireContext)}
            </Carousel>
        )
    }
}


