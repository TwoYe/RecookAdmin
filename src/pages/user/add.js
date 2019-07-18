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
    message,
    Table,
    Spin,
    InputNumber,
    DatePicker,
    Row,
    Col,
    Alert,
    Radio
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';

import Masonry from 'react-masonry-component';
import { interfaceDeclaration } from '@babel/types';

const { Step } = Steps;


class B extends React.Component {

    state = {
        name: "",
        tel: "",
        password: "100000",
        Vail_name: { vail: "", help: "" },
        Vail_tel: { vail: "", help: "" },
        Vail_password: { vail: "", help: "" },
    }

    t = () => {
        const { name, tel, password } = this.state;
        if (name == "") this.setState({ Vail_name: { vail: "error", help: "姓名不可以为空" } });
        else if (tel == "") this.setState({ Vail_name: { vail: "", help: "" }, Vail_tel: { vail: "error", help: "手机号码不可以为空" } });
        else if (password == "") this.setState({ Vail_tel: { vail: "", help: "" }, Vail_password: { vail: "error", help: "密码不可以为空" } });
        else {
            this.setState({ Vail_password: { vail: "", help: "" } });
            baseApi(`/api/v1/admin/user/create`,
                {
                    name: name,
                    mobile: tel,
                    password: password,
                    role: 2,
                    id: parseInt(localStorage.getItem("id"))
                },
                (res) => {
                    if (res.code == "0_0") this.props.t();
                }
            );
        }
    }

    disabledStartDate = startValue => {

        return startValue.valueOf() < Date.now();
    };

    render() {
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

        return (
            <div>
                <Form
                    {...formItemLayout}
                >
                    <Form.Item
                        label="姓名"
                        validateStatus={this.state.Vail_name.vail}
                        help={this.state.Vail_name.help}
                        required
                    >
                        <Input onChange={e => this.setState({ name: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="手机号码"
                        required
                        validateStatus={this.state.Vail_tel.vail}
                        help={this.state.Vail_tel.help}
                    >
                        <Input onChange={e => this.setState({ tel: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        required
                        validateStatus={this.state.Vail_password.vail}
                        help={this.state.Vail_password.help}
                    >
                        <InputNumber min={100000} max={999999} defaultValue={3} onChange={value => this.setState({ password: value.toString() })} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.t}>下一步</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}





//母页面
class A extends React.Component {
    constructor(props) {
        super(props)
        this.t = this.t.bind(this);
    }


    state = {
        step: 0
    }


    t = () => {
        this.setState({ step: 1 })
    }

    reset = () => {
        this.setState({ step: 0 })
    }

    render() {
        const P = [
            <B t={this.t} />,
            <div>
                <p style={{ textAlign: "center", marginTop: "50px" }}>
                    <Icon type="check-circle" style={{ fontSize: "50px", color: "#52c41a" }} theme="filled" />
                </p>
                <div style={{ color: '#000', textAlign: "center", fontSize: "20px", fontWeight: "bold", }}>员工添加成功</div>
                <Button type="primary" style={{ display: "block", margin: "40px auto" }} onClick={this.reset}>返回继续添加</Button>
            </div>
        ];
        return (
            <div>
                <PageHeaderWrapper>
                    <Card style={{ width: "100%" }}>
                        <Steps
                            current={this.state.step}
                            style={{ width: "40%", margin: "40px auto" }}
                        >
                            <Step title="填写基本信息" />
                            <Step title="完成" />
                        </Steps>
                        <div style={{ width: "50%", margin: "0 auto", marginTop: "80px" }}>
                            {P[this.state.step]}
                        </div>
                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}
export default A;