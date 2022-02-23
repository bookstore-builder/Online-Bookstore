import React from 'react'
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words'
import {Link} from 'react-router-dom'

export class CartTable extends React.Component{
      state = {
        searchText: '',
        searchedColumn: '',
        filteredInfo: null,
        selectedRowKeys: [],
        visible: false,
      };

      onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        let data = this.props.data;
        let books = [];
        let info = [];
        for(let i = 0; i < data.length; i++){
          if(selectedRowKeys.includes(data[i].key)){
            books.push(data[i].bookId);
            info.push(data[i]);
          }
        }
        // console.log(books);
        this.props.handleSelect(books, info);
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

      handleChange = ( pagination, filters ) => {
          console.log('Various parameters', pagination, filters);
          this.setState({
              filteredInfo: filters,
          });
      };

      clearFilters = () => {
          this.setState({
              filteredInfo: null
          });
      };

    render(){
      let{ filteredInfo, selectedRowKeys } = this.state;

      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
      };

        filteredInfo = filteredInfo || {};
        const columns = [
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
                filterMultiple: false,
                filters: [
                    { text: '编程', value: '编程' },
                    { text: '魔幻小说', value: '魔幻小说' },
                    { text: '世界名著', value: '世界名著' },
                    { text: '科幻小说', value: '科幻小说' },
                    { text: '武侠小说', value: '武侠小说' },
                    { text: '儿童文学', value: '儿童文学' },
                ],
                filteredValue: filteredInfo.type || null,
                onFilter: (value, record) => record.type.includes(value),
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
                title: '添加日期',
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
                onFilter: (value, record) => {
                    var d1 = new Date(record.date);
                    var d2 = new Date();
                    return ( (d2.getTime() - d1.getTime()) < value * 24 * 3600 * 1000 );
                },
                ellipsis: true,
            },
        ]

        return(
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.data} onChange={this.handleChange} />
        )
    }
}