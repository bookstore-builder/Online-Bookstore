import React from 'react'
import { withRouter } from "react-router-dom";
import { Radio } from 'antd'
import { Navigator } from "../components/home/Navigator"
import { BookStatisticTable } from "../components/statistic/BookStatisticTable"
import { BookBarChart, UserPieChart } from "../components/statistic/Charts"
import moment from 'moment'
import * as orderService from "../services/orderService"
import '../css/statistic.css';

class StatisticView extends React.Component {
    state = {
        bookData: [],
        data: [],
        bookChartData: { num: [], name: [] },
    }

    handleBookTime = (e) => {
        let value = 0;
        switch (e.target.value) {
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

        orderService.getUserBookStatistic(this.state.userId, time, (data) => {
            let bookNum = [];
            let bookName = [];
            let totalNum = 0;
            let totalPrice = 0;
            for (let product in data) {
                totalNum += data[product].num;
                totalPrice += data[product].money;
                bookNum.push(data[product].num);
                bookName.push(data[product].name);
            }
            let bookChartData = {};
            bookChartData.num = bookNum;
            bookChartData.name = bookName;

            this.setState({ bookData: data, bookChartData: bookChartData, totalNum: totalNum, totalPrice: totalPrice });
        });
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        let userId = JSON.parse(user).userId;
        this.setState({ userId: userId });
        orderService.getUserBookStatistic(userId, "2020/05/06", (data) => {
            let bookNum = [];
            let bookName = [];
            let totalNum = 0;
            let totalPrice = 0;
            for (let product in data) {
                totalNum += data[product].num;
                totalPrice += data[product].money;
                bookNum.push(data[product].num);
                bookName.push(data[product].name);
            }
            let bookChartData = {};
            bookChartData.num = bookNum;
            bookChartData.name = bookName;
            this.setState({ bookData: data, bookChartData: bookChartData, totalNum: totalNum, totalPrice: totalPrice.toFixed(2) });
        });
        orderService.getUserBookType(userId, (data) => { this.setState({ data: data }); });
    }

    render() {
        return (
            <div className="Container">
                <Navigator />
                <div className="Content">
                    <h2 style={{ marginTop: "10px" }}>书籍购买量统计</h2>
                    <div className="bookinfo">
                        <BookStatisticTable data={this.state.bookData} />
                        <div className="barChart">
                            <Radio.Group name="bookTime" style={{ marginBottom: "20px", marginLeft: '30px' }} defaultValue={6} onChange={this.handleBookTime}>
                                <Radio value={1}>今天</Radio>
                                <Radio value={2}>近一周</Radio>
                                <Radio value={3}>近一个月</Radio>
                                <Radio value={4}>近三个月</Radio>
                                <Radio value={5}>近一年</Radio>
                                <Radio value={6}>全部</Radio>
                            </Radio.Group>
                            <BookBarChart bookChartData={this.state.bookChartData} text={"书籍购买量排行榜（本）"} />
                        </div>
                    </div>
                    <div className="Clear" />
                    <div className="userStatistic">
                        <div className="statisticResults">
                            <span>
                                <p style={{ fontSize: "20px" }}>购书总本数：{this.state.totalNum}本</p>
                                <p style={{ fontSize: "20px" }}>总消费额：¥{this.state.totalPrice}</p>
                            </span>
                        </div>
                        <div className="charts">
                            <UserPieChart data={this.state.data} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(StatisticView);