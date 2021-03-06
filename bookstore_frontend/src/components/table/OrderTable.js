import React from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words'
import {Link} from 'react-router-dom'
import * as orderService from "../../services/orderService"
import moment from 'moment';

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
        var time = moment().subtract(3650,'days').format("YYYY/MM/DD");
        // fetch
        orderService.getOrderPage(pagination.current, pagination.pageSize, '', time, userId,
          (data) => {
            this.setState({data: data.objectList, 
              pagination: {total: data.total, current: data.currentPage, pageSize: data.pageSize}});
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
          var time = moment().subtract(3650,'days').format("YYYY/MM/DD");
      
          if(filters.name){
            if(filters.name[0])
              search = filters.name[0];
          }
          if(filters.date){
            if(filters.date[0])
              time = moment().subtract(filters.date[0]-1, 'days').format("YYYY/MM/DD");
          }

          this.setState({
              filteredInfo: filters,
              pagination: pagination,
          }); 
          // fetch
          orderService.getOrderPage(pagination.current, pagination.pageSize, search, time, userId,
            (data) => {
              this.setState({data: data.objectList, 
                pagination: {total: data.total, current: data.currentPage, pageSize: data.pageSize}});
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
              title: '?????????',
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
                title: '??????',
                dataIndex: 'book',
                key: 'book',
                render: (value,record) => <Link to={{
                  pathname: '/bookDetails',
                  search: '?id=' + record.bookId}}
                  target="_blank"
                  ><img width={100} src={value}/></Link>,
            },
            {
                title: '??????',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '??????',
                dataIndex: 'type',
                key: 'type',
                ellipsis: true,
            },
            {
                title: '??????',
                dataIndex: 'num',
                key: 'num',
            },
            {
              title: '??????(??)',
              dataIndex: 'money',
              key: 'money',
            },
            {
              title: '????????????',
              dataIndex: 'date',
              key: 'date',
              filterMultiple: false,
              filters: [
                  { text: '??????', value: 1 },
                  { text: '?????????', value: 7 },
                  { text: '????????????', value: 15 },
                  { text: '????????????', value: 30 },
                  { text: '????????????', value: 90 },
                  { text: '?????????', value: 365 },
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
                title: '?????????',
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
              title: '????????????(??)',
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