import React from 'react'
import {withRouter} from "react-router-dom";
import {UserTable} from "../components/table/UserTable"
import {Navigator} from "../components/home/Navigator"

class UserView extends React.Component{
    render(){
        return(
            <div className="Container">
                <Navigator/>
                <div className="Content">
                    <h1 style={{float:'left',marginTop:'15px',marginLeft:'10px'}}>用户列表</h1>
                    <UserTable/>
                </div>
            </div>
        )
    }
}

export default withRouter(UserView);