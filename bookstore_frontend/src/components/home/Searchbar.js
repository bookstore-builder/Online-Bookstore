import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import '../../css/searchbar.css';

export class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = 
            this.handleFilterTextChange.bind(this);
        this.handleClick = 
            this.handleClick.bind(this);
        this.state = {
            text: '',
        };
    }
    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }
    handleClick(){
        this.props.onClicked();
    }

    render() {

        return (
            <div className="global-search-wrapper" style={{ width: this.props.width, float: this.props.float, marginLeft: this.props.marginLeft }}>
                <Input
                    className="global-search"
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="input here"
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                    onPressEnter={this.handleClick}
                    suffix={
                        <Button
                            className="search-btn"
                            style={{ marginRight: -12 }}
                            size="large"
                            type="primary"
                            onClick={this.handleClick}
                        >
                            <Icon type="search" />
                        </Button>
                    }
                >
                </Input>
            </div>
        );
    }
}