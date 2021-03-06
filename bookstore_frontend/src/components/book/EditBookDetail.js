import React from 'react';
import { Form, Input, Radio, Icon, Button, Popconfirm } from 'antd';
import book from '../../assets/bookexp.jpg';
import '../../css/bookdetail.css';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export class EditBookDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    confirm = () => {
        this.props.handleDelete(this.props.info.name);
    }

    onNameChange = (e) => {
        this.props.handleName(e.target.value);
    }

    onAuthorChange = (e) => {
        this.props.handleAuthor(e.target.value);
    }

    onClassChange = (e) => {
        this.props.handleClass(e.target.value);
    }

    onISBNChange = (e) => {
        this.props.handleISBN(e.target.value);
    }

    onPriceChange = (e) => {
        this.props.handlePrice(e.target.value);
    }

    onInventoryChange = (e) => {
        this.props.handleInventory(e.target.value);
    }

    onDescriptionChange = (e) => {
        this.props.handleDescription(e.target.value);
    }

    handleUpload = (e) => {
        getBase64(e.target.files[0]).then(
            (result)=>{
                this.props.handleImage(result);
            }
        )
    }

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = () => {
        this.setState({
            visible: false,
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return (
            <div className="book-Detail">
                <div className="edit">
                    {this.props.info.image ? <img src={this.props.info.image} className="book-image" style={{ marginTop: "30px" }} />
                        : <img src={book} className="book-image" style={{ marginTop: "30px" }} />}
                    <div className="group">
                        <span>
                            <Input type="file" style={{ width:"200px", height: "38px", marginLeft: "-40px" }} onChange={this.handleUpload}></Input>
                            <Popconfirm
                                title="??????????????????????????????"
                                onConfirm={this.confirm}
                                okText="???"
                                cancelText="???"
                            >
                                <Button style={{ float: "right", height: "38px", marginTop: "0px", marginRight: "30px" }}>
                                    <Icon type="delete" /> ??????
                            </Button>
                            </Popconfirm>
                        </span>
                    </div>
                </div>
                <div className="form">
                    <Form.Item>
                        <span>
                            ??????:<Input value={this.props.info.name} onChange={this.onNameChange} className="input-format" />
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            ISBN:<Input value={this.props.info.isbn} onChange={this.onISBNChange} className="input-format" />
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            ??????:<Input value={this.props.info.author} onChange={this.onAuthorChange} className="input-format"></Input>
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            ??????:
                            <Radio.Group style={{ marginLeft: '10px' }} value={this.props.info.class} onChange={this.onClassChange}>
                                <Radio value={1}>??????</Radio>
                                <Radio value={2}>??????</Radio>
                                <Radio value={3}>??????</Radio>
                            </Radio.Group>
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            ??????:<Input prefix={"??"} value={this.props.info.price} onChange={this.onPriceChange} className="input-format"></Input>
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            ??????:<Input suffix={"???"} value={this.props.info.inventory} onChange={this.onInventoryChange} className="input-format"></Input>
                        </span>
                    </Form.Item>
                        ??????:
                        <Form.Item>
                        <textarea value={this.props.info.description} onChange={this.onDescriptionChange} className="input-format" style={{ height: "80px", width: "300px", lineHeight: 1.5 }}></textarea>
                    </Form.Item>
                </div>
                <div className="Clear"></div>
            </div>
        )
    }
}