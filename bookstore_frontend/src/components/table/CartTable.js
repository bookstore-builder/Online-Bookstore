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
                filterMultiple: false,
                filters: [
                    { text: '??????', value: '??????' },
                    { text: '????????????', value: '????????????' },
                    { text: '????????????', value: '????????????' },
                    { text: '????????????', value: '????????????' },
                    { text: '????????????', value: '????????????' },
                    { text: '????????????', value: '????????????' },
                ],
                filteredValue: filteredInfo.type || null,
                onFilter: (value, record) => record.type.includes(value),
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