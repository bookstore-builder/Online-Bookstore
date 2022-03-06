import React from 'react'
import { Table, Input, Button, Icon, Avatar, Tag, Popconfirm, message } from 'antd';
import Highlighter from 'react-highlight-words'
import head from "../../assets/head.png"
import * as userService from "../../services/userService"

export class UserTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    filteredInfo: null,
    data: [],
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <span>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90, background: "#46A3FF", border: "none" }}
          >
            Search <Icon type="search" />
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90, marginLeft: "10px" }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </span>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleChange = (pagination, filters) => {
    this.setState({
      filteredInfo: filters,
    });
  };

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key )})
  }

  clearFilters = () => {
    this.setState({
      filteredInfo: null
    });
  };

  activateConfirm = (key) => {
    for (let product in this.state.data) {
      if(this.state.data[product].key === key){
        if(this.state.data[product].tags === '正常'){
          message.warning("用户已经处于激活态");
        }
        else{
          userService.activateUser(this.state.data[product].userId);
        }
        break;
      }
    }
  }

  banConfirm = (key) => {
    for (let product in this.state.data) {
      if(this.state.data[product].key === key){
        if(this.state.data[product].tags === '禁用'){
          message.warning("用户已经处于禁用态");
        }
        else{
          userService.banUser(this.state.data[product].userId);
        }
        break;
      }
    }
  }

  cancel = (e) => {
    message.warning("撤销");
  }

  componentDidMount() {
    userService.getAllUser((data) => { this.setState({ data: data }); })
  }

  render() {
    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (avatar) => {
          if (avatar !== null) 
            return <Avatar size={64} src={avatar} />
          else 
            return <Avatar size={64} src={head} />
        },
        width: 150,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: "总消费",
        dataIndex: 'cost',
        key: 'cost',
      },
      {
        title: '状态',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => {
          if(tags === "正常") return (
            <Tag color={"green"}>
                  {tags}
            </Tag>
          ); else return (
            <Tag color={"volcano"}>
                  {tags}
            </Tag>
          )
        },
        filterMultiple: false,
        filters: [
          { text: '正常', value: '正常' },
          { text: '禁用', value: '禁用' },
        ],
        filteredValue: filteredInfo.tags || null,
        onFilter: (value, record) => record.tags === value,
        ellipsis: true,
        width: 100,
      },
      {
        title: "注册时间",
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <span>
            <Popconfirm
            title = "确认要激活此用户吗？"
            onConfirm={()=>{this.activateConfirm(record.key)}}
            onCancel={this.cancel}
            okText="是"
            cancelText="否"
            >
            <Button>激活</Button>
            </Popconfirm>
            <Popconfirm
            title = "确认要禁用此用户吗？"
            onConfirm={()=>{this.banConfirm(record.key)}}
            onCancel={this.cancel}
            okText="是"
            cancelText="否"
            >
            <Button style={{ marginLeft: '20px' }}>禁用</Button>
            </Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <Table columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
    )
  }
}