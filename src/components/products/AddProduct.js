import React, {Component} from 'react';
import {Modal} from 'antd';
import AddProductFrm from "./AddProductFrm";
class AddProduct extends Component {

    closeModal=()=>{
        this.props.close();
    };

    render() {
        return (
            <Modal visible={this.props.visible} onCancel={this.props.close} title="添加商品" okText="添加" cancelText="取消" destroyOnClose width="800px">
                <AddProductFrm closeModal={this.closeModal}></AddProductFrm>
            </Modal>
        );
    }
}

export default AddProduct;