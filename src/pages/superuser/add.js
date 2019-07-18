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

const { Step } = Steps;


class B extends React.Component {

    state = {
        name: "",
        tel: "",
        sex: "",
        Vail_name: { vail: "", help: "" },
        Vail_tel: { vail: "", help: "" },
        Vail_sex: { vail: "", help: "" },
    }

    t = () => {
        const { name, tel,sex } = this.state;
        if (name == "") this.setState({ Vail_name: { vail: "error", help: "昵称不可以为空" } });
        else if (tel == "") this.setState({ Vail_name: { vail: "", help: "" }, Vail_tel: { vail: "error", help: "手机号码不可以为空" } });
        else if (sex == "") this.setState({ Vail_tel: { vail: "", help: "" }, Vail_sex: { vail: "error", help: "请选择性别" } });
        else {
            this.setState({ Vail_sex: { vail: "", help: "" } });
            baseApi(`/api/v1/admin/top/user/create`,
            {
                nickname:name,
                mobile:tel,
                gender:sex.target.value
            },
            (res)=>this.props.t()
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
                        label="昵称"
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
                        label="性别"
                        required
                        validateStatus={this.state.Vail_sex.vail}
                        help={this.state.Vail_sex.help}
                    >
                        <Radio.Group onChange={e=>this.setState({sex:e})}>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>
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
                <div style={{ color: '#000', textAlign: "center", fontSize: "20px", fontWeight: "bold", }}>顶级用户添加成功</div>
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