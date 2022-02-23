import React from 'react'
import {withRouter} from "react-router-dom";
import {Profile} from "../components/profile/Profile"
import {Navigator} from "../components/home/Navigator"

class ProfileView extends React.Component{

    render(){
        return(
            <div className="Container">
                <Navigator/>
                <div className="Content">
                    <Profile/>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileView);