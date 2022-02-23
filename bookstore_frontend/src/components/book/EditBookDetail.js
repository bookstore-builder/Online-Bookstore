import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import React from 'react';
import { Form, Input, Radio, Icon, Button, Modal, Popconfirm } from 'antd';
import book from '../../assets/bookexp.jpg';
import '../../css/bookdetail.css';

export class EditBookDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    confirm = () => {
        //console.log(this.props.info.name);
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

    handleUrl= (e) => {
        this.props.handleImage(e.target.value);
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
                            <Button onClick={this.showModal}><Icon type="upload"/>Upload</Button>
                            <Modal title="请输入图片Url" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} width={300}>
                                <span>
                                    Url：
                                <Input prefix={<Icon type="picture"/>} style={{ width: "150px" }} onChange={this.handleUrl} />
                                </span>
                            </Modal>
                            <Popconfirm
                                title="确认要删除这本书吗？"
                                onConfirm={this.confirm}
                                okText="是"
                                cancelText="否"
                            >
                                <Button style={{ float: "right", marginTop: "0px", marginRight: "70px" }}>
                                    <Icon type="delete" /> 删除
                            </Button>
                            </Popconfirm>
                        </span>
                    </div>
                </div>
                <div className="form">
                    <Form.Item>
                        <span>
                            书名:<Input value={this.props.info.name} onChange={this.onNameChange} className="input-format" />
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            ISBN:<Input value={this.props.info.isbn} onChange={this.onISBNChange} className="input-format" />
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            作者:<Input value={this.props.info.author} onChange={this.onAuthorChange} className="input-format"></Input>
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            分类:
                            <Radio.Group style={{ marginLeft: '10px' }} value={this.props.info.class} onChange={this.onClassChange}>
                                <Radio value={1}>编程</Radio>
                                <Radio value={2}>小说</Radio>
                                <Radio value={3}>名著</Radio>
                            </Radio.Group>
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            价格:<Input prefix={"¥"} value={this.props.info.price} onChange={this.onPriceChange} className="input-format"></Input>
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            库存:<Input suffix={"件"} value={this.props.info.inventory} onChange={this.onInventoryChange} className="input-format"></Input>
                        </span>
                    </Form.Item>
                        简介:
                        <Form.Item>
                        <textarea value={this.props.info.description} onChange={this.onDescriptionChange} className="input-format" style={{ height: "80px", width: "300px", lineHeight: 1.5 }}></textarea>
                    </Form.Item>
                </div>
                <div className="Clear"></div>
            </div>
        )
    }
}