import React, { Component } from "react";
import { Table, Input, Button, Icon, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";

const data = [
  {
    id: "1",
    name: "John Brown",
    email: "someone@somemail.com",
    active: true,
    phone: "090078601",
    age: 32,
    address: "New York No. 1 Lake Park",
    totalreviews: 5
  },
  {
    id: "2",
    name: "Jane White",
    email: "JaneWhite@mail.com",
    active: true,
    phone: "090078601",
    age: 32,
    address: "New York No. 1 Lake Park",
    totalreviews: 5
  },
  {
    id: "3",
    name: "Jim Black",
    email: "JimBlack@mail.com",
    active: true,
    phone: "090078601",
    age: 32,
    address: "New York No. 1 Lake Park",
    totalreviews: 5
  },
  {
    id: "4",
    name: "Julia Pink",
    email: "JuliaPink@somemail.com",
    active: false,
    phone: "090078601",
    age: 32,
    address: "New York No. 1 Lake Park",
    totalreviews: 5
  }
];
class Users extends Component {
  state = {
    searchText: ""
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  toggleUser (event,id){
    event.preventDefault();
    console.log('toggling user', id);
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        width: "10%",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "30%",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Number of Reviews",
        dataIndex: "totalreviews",
        key: "reviews",
        width: "5%"
        // ...this.getColumnSearchProps('age'),
      },
      {
        title: "Actions",
        dataIndex: "id",
        key: "actions",
        render: (text,record )=> (
          <div>
            {/* <Popconfirm
                  title="Are you sure delete this product?"
                  onConfirm={event =>
                      this.handleDelete(event, record)
                  }
                  onCancel={this.popCancel}
                  okText="Yes"
                  cancelText="No"
              >
                  <Button
                      type="danger"
                      icon="delete"
                      style={{ margin: 10 }}
                  />
              </Popconfirm>
              <Button
                  icon="edit"
                  onClick={event => this.handleEdit(event, record)}
              /> */}
          { record.active && (
            <div
              onClick={() => {
                this.toggleUser(record.id);
              }}
            >
              Disable
            </div>
            ) 
          
        }
        {!record.active &&  ( <div  onClick={(event) => {
                this.toggleUser(event,record.id);
              }}>Enable</div>)}

        </div>
        // ...this.getColumnSearchProps('address'),
        )}
    ];
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
        ,
      </div>
    );
  }
}

export default Users;
