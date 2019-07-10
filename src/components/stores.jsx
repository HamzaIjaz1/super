import React, { Component } from "react";
import { Table, Input, Button, Icon, Popconfirm, Skeleton, message } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

class Stores extends Component {
  state = {
    searchText: ""
  };
  componentDidMount() {
    axios.get("https://api.pulsespace.com/shops/all").then(res => {
      console.log("Stores received in response is", res.data);
      this.setState({ Stores: res.data });
    });
  }
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
        // .toString()
        // .toLowerCase()
        .includes(value),
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
        textToHighlight={text}
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

  toggleUser(id) {
    // event.preventDefault();
    console.log("Disabling shop", id);
    axios
    .post(
        "https://api.pulsespace.com/shops/inactive/" + id
    )
    .then(res => {
        // this.setState({ faqs: faqsdata });
        var data=this.state.Stores;
        message.success("User Disabled");
        const index=this.state.Stores.findIndex(x => x.id === id);

        data[index].is_active=0;
        this.setState({Stores:data});

    })
    .catch(err => {
        console.log("Error occured while disabling shop");
        throw err;
    });
  }
  disableUser(id) {
    // event.preventDefault();
    console.log("Enabling shop", id);
    axios
    .post(
        "https://api.pulsespace.com/shop/active/" + id
    )
    .then(res => {
        // this.setState({ faqs: faqsdata });
        var data=this.state.Stores;
        message.success("User Enabled");
        const index=this.state.Stores.findIndex(x => x.id === id);

        data[index].is_active=1;
        this.setState({Stores:data});

    })
    .catch(err => {
        console.log("Error occured while Enabling user");
        throw err;
    });
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
        width: "10%"
        // ...this.getColumnSearchProps("id")
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "reviews",
        width: "10%"
              },
      {
        title: "Actions",
        dataIndex: "id",
        key: "actions",
        render: (text, record) => (
          <div>
            {record.is_active ? (
              <Button
                onClick={() => {
                  this.toggleUser(record.id);
                }}
              >
                Disable
              </Button>
            ) : (
              <Button
                onClick={event => {
                  this.disableUser(record.id);
                }}
              >
                Enable
              </Button>
            )}
          </div>
          // ...this.getColumnSearchProps('address'),
        )
      }
    ];
    return (
      <div>
        {this.state.Stores ? (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.Stores}
          />
        ) : (
          <Skeleton />
        )}
      </div>
    );
  }
}

export default Stores;
