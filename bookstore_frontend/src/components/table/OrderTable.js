import React from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words'
import {Link} from 'react-router-dom'
import * as orderService from "../../services/orderService"

Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
      "H+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const getRowSpans = (arr, key) => {
  let sameValueLength = 0;
  const rowSpans = [];
  for(let i = arr.length - 1; i >= 0; i--){
    if(i === 0) {
      rowSpans[i] = sameValueLength + 1;
      continue;
    }
    if(arr[i][key] === arr[i-1][key]) {
      rowSpans[i] = 0;
      sameValueLength++;
    } else {
      rowSpans[i] = sameValueLength + 1;
      sameValueLength = 0;
    }
  }
  return rowSpans;
};

let data = [];
let rowSpans = [];

export class OrderTable extends React.Component{
    state = {
        searchText: '',
        searchedColumn: '',
        filteredInfo: null,
        pagination: {
          current: 1,
          pageSize: 10,
        },
        data:[],
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
                style={{ width: 90, background:"#46A3FF", border:"none" }}
              >
                Search <Icon type="search" />
              </Button>
              <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90, marginLeft:"10px" }}>
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

      componentDidMount() {
        let user = localStorage.getItem("user");
        this.setState({ user: user });
        let userId = JSON.parse(user).userId;
        const { pagination } = this.state;
        var d2 = new Date();
        var time = new Date(d2.getTime() - 3650 * 24 * 3600 * 1000).format("yyyy/MM/dd");
        // fetch
        orderService.getOrderPage(pagination.current, pagination.pageSize, '', time, userId,
          (data) => {
            this.setState({data: data.orderList, 
              pagination: {total: data.total, current: data.pageNum, pageSize: data.pageSize}});
          });
      }
    
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

      handleChange = ( pagination, filters ) => {
        let user = localStorage.getItem("user");
        this.setState({ user: user });
        let userId = JSON.parse(user).userId;
          var search = '';
          var d2 = new Date();
          var time = new Date(d2.getTime() - 3650 * 24 * 3600 * 1000).format("yyyy/MM/dd");
      
          if(filters.name){
            if(filters.name[0])
              search = filters.name[0];
          }
          if(filters.date){
            if(filters.date[0])
              time = new Date(d2.getTime() - (filters.date[0]-1) * 24 * 3600 * 1000).format("yyyy/MM/dd");
          }

          this.setState({
              filteredInfo: filters,
              pagination: pagination,
          }); 
          // fetch
          orderService.getOrderPage(pagination.current, pagination.pageSize, search, time, userId,
            (data) => {
              this.setState({data: data.orderList, 
                pagination: {total: data.total, current: data.pageNum, pageSize: data.pageSize}});
            });
      };

      clearFilters = () => {
          this.setState({
              filteredInfo: null
          });
      };

    render(){
        let{ filteredInfo, pagination } = this.state;
        rowSpans = getRowSpans(this.state.data, "orderId");
        filteredInfo = filteredInfo || {};
        const columns = [
            {
              title: '订单号',
              dataIndex: 'orderId',
              key: 'orderId',
              render: (value, _, index) => {
                const obj = {
                  children: value,
                  props: {},
                };

                obj.props.rowSpan = rowSpans[index];
                return obj;
              },
            },
            {
                title: '书籍',
                dataIndex: 'book',
                key: 'book',
                render: (value,record) => <Link to={{
                  pathname: '/bookDetails',
                  search: '?id=' + record.bookId}}
                  target="_blank"
                  ><img width={100} src={value}/></Link>,
            },
            {
                title: '书名',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '分类',
                dataIndex: 'type',
                key: 'type',
                ellipsis: true,
            },
            {
                title: '数量',
                dataIndex: 'num',
                key: 'num',
            },
            {
              title: '金额(¥)',
              dataIndex: 'money',
              key: 'money',
            },
            {
              title: '购买日期',
              dataIndex: 'date',
              key: 'date',
              filterMultiple: false,
              filters: [
                  { text: '今天', value: 1 },
                  { text: '近一周', value: 7 },
                  { text: '近半个月', value: 15 },
                  { text: '近一个月', value: 30 },
                  { text: '近三个月', value: 90 },
                  { text: '近一年', value: 365 },
              ],
              filteredValue: filteredInfo.date || null,
              ellipsis: true,
              render: (value, _, index) => {
                const obj = {
                  children: value,
                  props: {},
                };

                obj.props.rowSpan = rowSpans[index];
                return obj;
              },
            },
            {
                title: '收货人',
                dataIndex: 'receiver',
                key: 'receiver',
                render: (value, _, index) => {
                  const obj = {
                    children: value,
                    props: {},
                  };
  
                  obj.props.rowSpan = rowSpans[index];
                  return obj;
                },
            },
            {
              title: '总消费额(¥)',
              dataIndex: 'totalMoney',
              key: 'totalMoney',
              render: (value, _, index) => {
                const obj = {
                  children: value,
                  props: {},
                };

                obj.props.rowSpan = rowSpans[index];
                return obj;
              },
          },
        ];

        return(
            <Table columns={columns} dataSource={this.state.data} pagination={pagination} onChange={this.handleChange} />
        )
    }
}