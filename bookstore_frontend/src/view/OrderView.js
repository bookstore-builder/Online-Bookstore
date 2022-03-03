import React from 'react'
import { withRouter } from "react-router-dom";
import { Button, Icon } from 'antd'
import { OrderTable } from "../components/table/OrderTable"
import { Navigator } from "../components/home/Navigator"
import {history} from "../utils/history";
import "../css/order.css"

class OrderView extends React.Component {
    toAnalyze = () => {
        history.push("/statistic");
    }

    render() {
        return (
            <div className="Container">
                <Navigator />
                <div className="Content">
                    <div className="analyze">
                    <Button className="statistic-button" onClick={this.toAnalyze}>
                        <Icon type="monitor"/>
                                统计
                        </Button>
                        <h1 style={{ float: "left", marginTop: "12px", marginLeft: "420px" }}>全部订单</h1>
                    </div>
                    <OrderTable/>
                </div>
            </div>
        )
    }
}

export default withRouter(OrderView);