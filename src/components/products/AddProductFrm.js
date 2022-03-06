import React, {Component} from 'react';
import {Form, Input, Button, Upload, message} from 'antd';
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {UploadOutlined} from '@ant-design/icons';
import axios from "axios";

class AddProductFrm extends Component {
    state = {
        editorText: "",
    };

    onFinish = (values) => {
        console.log(values)
        var params={
            name:values.title,
            price:values.price,
            // thumbanail:values.thumbanail[0].response.msg,
            goodDetail:this.state.editorText,
        };
        axios.post('',params).then(res=>{
            message.info("添加商品成功")
            this.props.closeModal();
        }).catch(err=>{
            message.info("添加商品失败")
        })
    };
    onFinishFailed = () => {
    };

    onEditorStateChange = (editorState) => {
        let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({editorState: html});
    };

    normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    render() {
        return (
            <div>
                <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <Form.Item label="商品名称" name="name" rules={[{required: true, message: "请输入商品名称"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="商品价格" name="price" rules={[{required: true, message: "请输入商品价格"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="商品图片" name="thumbanail" rules={[{ message: "请上传商品图片"}]}
                               valuePropName="fileList"
                               getValueFromEvent={this.normFile}>
                        <Upload action="" listType="picture">
                            <Button icon={<UploadOutlined/>}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="商品详情" name="goodDetail" rules={[{required: true, message: "请输入商品详情"}]}>
                        <Editor wrapperClassName="wrapper-calss" editorClassName="ditor-calss"
                                toolbarClassName="toolbar-class" onEditorStateChange={this.onEditorStateChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default AddProductFrm;