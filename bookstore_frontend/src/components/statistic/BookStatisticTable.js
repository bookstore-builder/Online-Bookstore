import React from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words'
import {Link} from 'react-router-dom'

export class BookStatisticTable extends React.Component{
    state = {
        searchText: '',
        searchedColumn: '',
        filteredInfo: null,
        sortedInfo: null,
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

      handleChange = ( pagination, filters, sorter ) => {
          console.log('Various parameters', pagination, filters);
          this.setState({
              filteredInfo: filters,
              sortedInfo: sorter,
          });
      };

      clearFilters = () => {
          this.setState({
              filteredInfo: null
          });
      };

      clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
      };

      setNumSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'num',
          },
        });
      };

      setMoneySort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'money',
          },
        });
      };

    render(){
        let{ sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
                title: '书籍',
                dataIndex: 'image',
                key: 'image',
                render: (item,record) => <Link to={{
                  pathname: '/bookManage',
                  search: '?id=' + record.bookId
              }}
                  target="_blank"
              ><img width={100} src={item}/></Link>,
                width: 150,
            },
            {
                title: '书名',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
                width: 150,
            },
            {
                title: '分类',
                dataIndex: 'type',
                key: 'type',
                filterMultiple: false,
                filters: [
                    { text: '编程', value: '编程' },
                    { text: '小说', value: '小说' },
                    { text: '名著', value: '名著' },
                    { text: '科幻', value: '科幻' },
                ],
                filteredValue: filteredInfo.type || null,
                onFilter: (value, record) => record.type.includes(value),
                ellipsis: true,
                width: 100,
            },
            {
                title: '销量（本）',
                dataIndex: 'num',
                key: 'num',
                width: 150,
                sorter: (a, b) => a.num - b.num,
                sortOrder: sortedInfo.columnKey === 'num' && sortedInfo.order,
            },
            {
                title: '销售额（元）',
                dataIndex: 'money',
                key: 'money',
                sorter: (a, b) => a.money - b.money,
                sortOrder: sortedInfo.columnKey === 'money' && sortedInfo.order,
            }
        ];

        return(
            <Table columns={columns} dataSource={this.props.data} onChange={this.handleChange} pagination={{ pageSize: 10 }} scroll={{ y: 400 }} style={{width:"700px", float: "left"}}/>
        )
    }
}