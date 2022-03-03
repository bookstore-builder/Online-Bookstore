import React from 'react'
import { Radio } from 'antd'
import { withRouter } from "react-router-dom";
import { Navigator } from "../components/home/Navigator"
import { BookStatisticTable } from "../components/statistic/BookStatisticTable"
import { UserStatisticTable } from "../components/statistic/UserStatisticTable"
import { BookBarChart, UserBarChart } from "../components/statistic/Charts";
import moment from 'moment';
import * as orderService from "../services/orderService";
import '../css/statistic.css';

class AdminStatisticView extends React.Component {
    state={
        userData: [],
        bookData: [],
        bookChartData: {num:[], name:[]},
        userChartData: {num:[], name:[]},
    }

    handleBookTime = (e) => {
        let value = 0;
        switch(e.target.value) {
            case 1:
                break;
            case 2:
                value = 7;
                break;
            case 3:
                value = 30;
                break;
            case 4:
                value = 90;
                break;
            case 5:
                value = 365;
                break;
            case 6:
                value = 3650;
                break;
            default:
                break;
        }
        var time = moment().subtract(value, 'days').format("YYYY/MM/DD");
        orderService.getBookStatistic(time, (data) => {
            let bookNum = [];
            let bookName = [];
            for(let product in data){
                bookNum.push(data[product].num);
                bookName.push(data[product].name);
            }
            let bookChartData = {};
            bookChartData.num = bookNum;
            bookChartData.name = bookName;
            this.setState({bookData: data, bookChartData: bookChartData});
        });
    }

    handleUserTime = (e) => {
        let value = 1;
        switch(e.target.value) {
            case 1:
                break;
            case 2:
                value = 7;
                break;
            case 3:
                value = 30;
                break;
            case 4:
                value = 90;
                break;
            case 5:
                value = 365;
                break;
            case 6:
                value = 3650;
                break;
            default:
                break;
        }
        var time = moment().subtract(value, 'days').format("YYYY/MM/DD");
        console.log(time);
        orderService.getUserStatistic(time, (data) => {
            let bookNum = [];
            let userName = [];
            for(let product in data){
                bookNum.push(data[product].num);
                userName.push(data[product].name);
            }
            let userChartData = {};
            userChartData.num = bookNum;
            userChartData.name = userName;
            this.setState({userData: data, userChartData: userChartData});
        });
    }

    componentDidMount() {
        orderService.getBookStatistic("2020/05/06", (data) => {
            console.log(data);
            let bookNum = [];
            let bookName = [];
            for(let product in data){
                bookNum.push(data[product].num);
                bookName.push(data[product].name);
            }
            let bookChartData = {};
            bookChartData.num = bookNum;
            bookChartData.name = bookName;
            this.setState({bookData: data, bookChartData: bookChartData});
        });
        orderService.getUserStatistic("2020/05/06", (data) => {
            let bookNum = [];
            let userName = [];
            for(let product in data){
                bookNum.push(data[product].num);
                userName.push(data[product].name);
            }
            let userChartData = {};
            userChartData.num = bookNum;
            userChartData.name = userName;
            this.setState({userData: data, userChartData: userChartData});
        });
    }

    render() {
        return (
            <div className="Container">
                <Navigator />
                <div className="Content">
                <h2 style={{marginTop: "10px"}}>书籍销量统计</h2>
                    <div className="bookinfo">
                        <BookStatisticTable data={this.state.bookData}/>
                        <div className="barChart">
                            <Radio.Group name="bookTime" style={{marginBottom:"20px", marginLeft: '30px'}} defaultValue={6} onChange={this.handleBookTime}>
                                <Radio value={1}>今天</Radio>
                                <Radio value={2}>近一周</Radio>
                                <Radio value={3}>近一个月</Radio>
                                <Radio value={4}>近三个月</Radio>
                                <Radio value={5}>近一年</Radio>
                                <Radio value={6}>全部</Radio>
                            </Radio.Group>
                            <BookBarChart bookChartData={this.state.bookChartData} text={"Top10书籍销量热榜（本）"}/>
                        </div>
                    </div>
                    <div className="Clear" />
                <h2 style={{marginTop: "10px"}}>用户消费量统计</h2>
                    <div className="userinfo">
                        <UserStatisticTable data={this.state.userData}/>
                        <div className="barChart" style={{marginTop:"10px"}}>
                        <Radio.Group name="userTime" style={{marginBottom:"20px", marginLeft: '30px'}} defaultValue={6} onChange={this.handleUserTime}>
                                <Radio value={1}>今天</Radio>
                                <Radio value={2}>近一周</Radio>
                                <Radio value={3}>近一个月</Radio>
                                <Radio value={4}>近三个月</Radio>
                                <Radio value={5}>近一年</Radio>
                                <Radio value={6}>全部</Radio>
                            </Radio.Group>
                            <UserBarChart userChartData={this.state.userChartData}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminStatisticView);