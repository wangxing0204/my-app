import React, {Component} from 'react';
import {Table, Button} from "antd";
import "antd/dist/antd.css"
import axios from "axios";
import {IMGAPI} from "../config";

class GoodsList extends Component {

    state = {
        dataSource: [],
    };

    lodDate = () => {
        axios.get("api/v1/admin/products/findAll").then((res) => {
            this.setState({dataSource: res.data.result});
        });
    }

    componentDidMount() {
        this.lodDate();
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
                render: (record) => <img src={`${IMGAPI}` + record} style={{width: 200, height: 200}}/>,
            },
            {
                title: '操作',
                dataIndex: 'cid',
                key: 'cid',
                render: (record) => <Button type="primary">删除</Button>,
            },
        ];
        return <Table rowKey="id" dataSource={this.state.dataSource} columns={columns}/>;
    }
}

export default GoodsList;