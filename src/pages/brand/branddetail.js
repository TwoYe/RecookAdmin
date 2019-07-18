//新增商品组件
import React from 'react';
import {
    PageHeader,
    Divider,
    Steps,
    Icon,
    Form,
    Input,
    Cascader,
    Button,
    Card,
    Upload,
    message
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';

class A extends React.Component {


    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (sessionStorage.getItem("logo") == "") message.error("你还没有上传logo呢！");
                else if (sessionStorage.getItem("sq") == "") message.error("你还没有上传授权书呢！");
                else {
                    values["logoUrl"] = sessionStorage.getItem("logo");
                    values["authUrl"] = sessionStorage.getItem("sq");

                    baseApi(`/api/v1/admin/goods/brands/entry`, values,
                        (result) => {
                            if (result.code == "0_0") this.props.updateParent();
                            else message.error("数据提交失败，请重试！");
                        })
                }
            } else {

            }
        });
    };

    render() {
        const props2 = {
            action: 'http://rkk.nbqq.cn/api/v1/admin/files/photo/upload',
            listType: 'picture',
            multiple: false,
            name: "photo",
            headers: {
                'TOKEN': localStorage.getItem("token"),
                'ID': parseInt(localStorage.getItem("id"))
            },
            data: {
                token: localStorage.getItem("token"),
                id: localStorage.getItem("id"),
            },
            onChange({ file, fileList }) {
                if (file.status !== 'uploading') {
                    if (file.response.data.code == "SUCCESS") {
                        sessionStorage.setItem("logo", file.response.data.data.url);
                        message.success("上传成功！");
                    }
                } else if (file.status !== 'done') {
                    //do nothing
                }
            },
            onRemove() {
                baseApi(`/api/v1/admin/files/goods/photo/remove`,
                    { url: sessionStorage.getItem("logo") },
                    (result) => {
                        if (result.code == "0_0") message.success("Logo 删除成功！");
                        else message.error("Logo 删除失败！");
                    })
            }
        };
        const props3 = {
            action: 'http://rkk.nbqq.cn/api/v1/admin/files/photo/upload',
            listType: 'picture',
            multiple: false,
            name: "photo",
            headers: {
                'TOKEN': localStorage.getItem("token"),
                'ID': parseInt(localStorage.getItem("id"))
            },
            data: {
                token: localStorage.getItem("token"),
                id: localStorage.getItem("id"),
            },
            onChange({ file, fileList }) {
                if (file.status !== 'uploading') {
                    if (file.response.data.code == "SUCCESS") {
                        sessionStorage.setItem("sq", file.response.data.data.url);
                        message.success("上传成功！");
                    }
                } else if (file.status !== 'done') {
                    //do nothing
                }
            },
            onRemove() {
                baseApi(`/api/v1/admin/files/goods/photo/remove`,
                    { url: sessionStorage.getItem("sq") },
                    (result) => {
                        if (result.code == "0_0") message.success("删除成功！");
                        else message.error("删除失败！");
                    })
            }
        };
        const styles = <style jsx>{
            `
            .theBorder{
                width:40%;
                margin:0 auto;
                margin-top:50px;
            }
            .input{
                width:200px;
            }
            `
        }</style>
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 5 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (

            <div>
                <div className="theBorder">

                    <Form {...formItemLayout}>
                        <Form.Item
                            label="名称"
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '名称不可以为空！',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="品牌描述"
                            required={true}
                        >
                            {getFieldDecorator('desc', {
                                rules: [
                                    {
                                        required: true,
                                        message: '品牌描述不可以为空！',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="联系电话"
                            required={true}
                        >
                            {getFieldDecorator('tel', {
                                rules: [
                                    {
                                        required: true,
                                        message: '联系电话不可以为空！',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="品牌网站"
                            required={true}
                        >
                            {getFieldDecorator('web', {
                                rules: [
                                    {
                                        required: true,
                                        message: '品牌网站不可以为空！',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item
                            label="品牌logo"
                            required={true}
                        >
                            <Upload
                                {...props2}
                            >
                                <Button><Icon type="upload" /> 点此上传</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="授权书"
                            required={true}
                        >
                            <Upload
                                {...props3}
                            >
                                <Button><Icon type="upload" /> 点此上传</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        </Form.Item>
                    </Form>
                </div>
                {styles}
            </div>
        );
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(A);

export default WrappedApp;