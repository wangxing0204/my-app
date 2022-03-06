import React, {Component} from 'react';
import {Table, Button, Popconfirm, message, Card, Input, Space} from "antd";
import "antd/dist/antd.css"
import axios from "axios";
import AddProduct from "../components/products/AddProduct";
import image from "../image/01.jpg";

const {Search} = Input;

class GoodsList extends Component {

    state = {
        dataSource: [],//存储商品数据
        total: 0,//总的记录数
        pageSize: 3,
        pageNum: 1,
        searchContent: '',//搜索条件
        showAddProductDialog: false,//控制添加商品窗口的显示与隐藏
    };

    //查询 (分页)
    loadDate = () => {
        const params = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            search: this.state.searchContent,
        };
        axios.get("api/v1/admin/products/findPage", {params}).then((res) => {
            this.setState({dataSource: res.data.result.list, total: res.data.result.total});
        });

    };
    //删除
    handleDelete = (pid) => {
        axios.delete("api/v1/admin/products/delete", {params: {id: pid}}).then(res => {
            if (res.data.success === true) {
                message.info("删除成功");
                this.loadDate();
            } else {
                message.error("删除失败");
            }
        })
    };
    //分页
    changePage = (pageNum, pageSize) => {
        // const params = {
        //     pageNum: pageNum,
        //     pageSize: pageSize,
        // };
        // this.loadDate(params);
        this.setState({pageNum: pageNum, pageSize: pageSize}, () => {
            this.loadDate();
        });
    };
    //搜索
    onSearch = (value) => {
        this.setState((preState) => {
            preState.searchContent = value;
        }, () => {
            this.loadDate();
        })
    };
    //添加商品
    handleAdd = () => {
        this.setState({showAddProductDialog: true});
    };
    //关闭添加商品窗口
    closeAddDialog = () => {
        this.setState({showAddProductDialog: false}, () => {
            this.loadDate();
        });
    };

    componentDidMount() {
        this.loadDate();
    }

    render() {
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '商品图片',
                dataIndex: 'thumbnail',
                key: 'thumbnail',
                render: (record) => <img src={image} style={{width: 200, height: 200}}/>,
            },
            {
                title: '操作',
                dataIndex: 'id',
                key: 'id',
                render: (record) => (
                    <Popconfirm okText="确认" cancelText="取消" title="你确定要删除该记录吗?" onConfirm={() => {
                        this.handleDelete(record);
                    }}>
                        <Button type="primary">删除</Button>
                    </Popconfirm>),
            },
        ];
        return (
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{width: 400, marginBottom: 20, marginTop: 10}}
                    onSearch={this.onSearch}
                />
                <Button type="primary" style={{margin: 15, marginBottom: 20, marginTop: 10, height: 40}}
                        onClick={this.handleAdd}>添加商品</Button>
                <Table rowKey="id" dataSource={this.state.dataSource} columns={columns}
                       pagination={{
                           pageSize: this.state.pageSize,
                           defaultCurrent: this.state.pageNum,
                           onChange: this.changePage,
                           total: this.state.total,
                       }}/>
                <AddProduct visible={this.state.showAddProductDialog} close={this.closeAddDialog}></AddProduct>
            </div>
        );
    }
}

export default GoodsList;