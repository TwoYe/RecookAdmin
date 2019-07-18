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


class X extends React.Component {

    state = {
        type: "",
        name: "",
        fw: "",
        fxl: 1,
        lqxz: 1,
        startTime: "",
        endTime: "",
        sm: "",
        Vail_type: { vail: "", help: "" },
        Vail_sm: { vail: "", help: "" },
        Vail_name: { vail: "", help: "" },
        Vail_fw: { vail: "", help: "" },
        Vail_fxl: { vail: "", help: "" },
        Vail_lqxz: { vail: "", help: "" },
        Vail_start: { vail: "", help: "" },
        Vail_end: { vail: "", help: "" },
    }

    t = () => {
        const { type, name, fw, fxl, lqxz, startTime, endTime, sm } = this.state;
        if (type == "") this.setState({ Vail_type: { vail: "error", help: "请选择优惠券类型" } });
        else if (name == "") this.setState({ Vail_type: { vail: "", help: "" }, Vail_name: { vail: "error", help: "优惠券名称不可以为空" } });
        else if (sm == "") this.setState({ Vail_name: { vail: "", help: "" }, Vail_sm: { vail: "error", help: "说明不可以为空" } });
        else if (fw == "") this.setState({ Vail_sm: { vail: "", help: "" }, Vail_fw: { vail: "error", help: "请选择范围" } });
        else if (fxl == "") this.setState({ Vail_fw: { vail: "", help: "" }, Vail_fxl: { vail: "error", help: "发行量不可以为空" } });
        else if (lqxz == "") this.setState({ Vail_fxl: { vail: "", help: "" }, Vail_lqxz: { vail: "error", help: "领取限制不可以为空" } });
        else if (startTime == "") this.setState({ Vail_lqxz: { vail: "", help: "" }, Vail_start: { vail: "error", help: "生效时间不可以为空" } });
        else if (endTime == "") this.setState({ Vail_start: { vail: "", help: "" }, Vail_end: { vail: "error", help: "失效时间不可以为空" } });
        else {
            this.setState({ Vail_end: { vail: "", help: "" } });
            let A = {
                type: type[0],
                fw: fw.target.value,
                first: {
                    name: name,
                    scope: fw.target.value,
                    quantity: fxl,
                    limit: lqxz,
                    startTime: startTime,
                    endTime: endTime,
                    explanation: sm
                }
            }
            //alert(JSON.stringify(A))
            this.props.t(A);
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
                        label="优惠券类型"
                        validateStatus={this.state.Vail_type.vail}
                        help={this.state.Vail_type.help}
                        required
                    >
                        <Cascader
                            options={
                                [
                                    { label: "折扣优惠券", value: 0 },
                                    { label: "满减优惠券", value: 1 }
                                ]
                            }
                            placeholder="请选择优惠券类型"
                            onChange={value => this.setState({ type: value })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="优惠券名称"
                        validateStatus={this.state.Vail_name.vail}
                        help={this.state.Vail_name.help}
                        required
                    >
                        <Input onChange={e => this.setState({ name: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label="说明"
                        validateStatus={this.state.Vail_sm.vail}
                        help={this.state.Vail_sm.help}
                        required
                    >
                        <Input onChange={e => this.setState({ sm: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label="使用范围"
                        required
                        validateStatus={this.state.Vail_fw.vail}
                        help={this.state.Vail_fw.help}
                    >
                        <Radio.Group
                            onChange={e => this.setState({ fw: e })}
                        >
                            <Radio value={0}>通用</Radio>
                            <Radio value={1}>品牌</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="发行量"
                        required
                        validateStatus={this.state.Vail_fxl.vail}
                        help={this.state.Vail_fxl.help}
                    >
                        <InputNumber
                            min={1}
                            step={1}
                            defaultValue={1}
                            onChange={value => this.setState({ fxl: parseFloat(value) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="领取限制"
                        required
                        validateStatus={this.state.Vail_lqxz.vail}
                        help={this.state.Vail_lqxz.help}
                    >
                        <InputNumber
                            min={1}
                            step={1}
                            defaultValue={1}
                            onChange={value => this.setState({ lqxz: parseFloat(value) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="生效时间"
                        required
                        validateStatus={this.state.Vail_start.vail}
                        help={this.state.Vail_start.help}
                    >
                        <DatePicker
                            showTime
                            placeholder="生效时间"
                            disabledDate={this.disabledStartDate}
                            onChange={value => this.setState({ startTime: Math.round(new Date(value) / 1000) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="失效时间"
                        required
                        validateStatus={this.state.Vail_end.vail}
                        help={this.state.Vail_end.help}
                    >
                        <DatePicker
                            showTime
                            placeholder="失效时间"
                            disabledDate={this.disabledStartDate}
                            onChange={value => this.setState({ endTime: Math.round(new Date(value) / 1000) })}
                        />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.t}>下一步</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

//满减
class Xs extends React.Component {

    state = {
        mk: 1,
        je: "",
        pp: "",
        Vail_mk: { vail: "", help: "" },
        Vail_je: { vail: "", help: "" },
        Vail_pp: { vail: "", help: "" },
    }
    componentWillMount() {
        baseApi(`/api/v1/admin/goods/brands/list`, {},
            (result) => {
                if (result.code === "-1") message.error(result.msg);
                else if (result === "0_-1") message.error("获取品牌列表失败！");
                else {
                    let main = result.data;
                    let bd = [];
                    for (let i = 0; i < main.length; i++) {
                        bd.push({
                            label: main[i].name,
                            value: main[i].id,
                        });
                    }
                    this.setState({ data2: bd });
                }
            }
        )
    }
    t = () => {
        const { mk, je, pp } = this.state;
        const { brand, first } = this.props;
        //不需要品牌
        if (brand == 0) {
            if (je == "") this.setState({ Vail_je: { vail: "error", help: "金额不可以为空" } });
            else {
                this.setState({ Vail_pp: { vail: "", help: "" } });
                first["cash"] = je;
                first["threshold"]=mk;
                first["brandID"] =0;
                //alert(JSON.stringify(first));
                baseApi(`/api/v1/admin/coupon/reduce/create`,first,(res)=>this.props.finish());
            }
        }
        //需要品牌
        else {
            if (je == "") this.setState({ Vail_je: { vail: "error", help: "金额不可以为空" } });
            else if (pp == "") this.setState({ Vail_je: { vail: "", help: "" }, Vail_pp: { vail: "error", help: "品牌不可以为空" } });
            else {
                this.setState({ Vail_pp: { vail: "", help: "" } });
                first["cash"] = je;
                first["threshold"]=mk;
                first["brandID"] = pp[0];
                //alert(JSON.stringify(first));
                baseApi(`/api/v1/admin/coupon/reduce/create`,first,(res)=>this.props.finish());
            }
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
        const { brand } = this.props;
        return (
            <div>
                <Form
                    {...formItemLayout}
                >
                    <Form.Item
                        label="满减门槛"
                        validateStatus={this.state.Vail_mk.vail}
                        help={this.state.Vail_mk.help}
                        required
                    >
                        <InputNumber
                            min={1}
                            step={1}
                            defaultValue={1}
                            onChange={value => this.setState({ mk: parseFloat(value) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="减去金额"
                        validateStatus={this.state.Vail_je.vail}
                        help={this.state.Vail_je.help}
                        required
                    >
                        <InputNumber
                            min={0}
                            step={1}
                            defaultValue={0}
                            onChange={value => this.setState({ je: parseFloat(value) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="选择品牌"
                        validateStatus={this.state.Vail_pp.vail}
                        help={this.state.Vail_pp.help}
                        required
                        style={{ display: brand == 1 ? "block" : "none" }}
                    >
                        <Cascader options={this.state.data2} placeholder="请选择品牌" onChange={value => this.setState({ pp: value })} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.t}>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

//折扣
class XsMax extends React.Component {
    state = {
        zk:1.0,
        pp: "",
        Vail_zk: { vail: "", help: "" },
        Vail_pp: { vail: "", help: "" },
    }

    componentWillMount() {
        baseApi(`/api/v1/admin/goods/brands/list`, {},
            (result) => {
                if (result.code === "-1") message.error(result.msg);
                else if (result === "0_-1") message.error("获取品牌列表失败！");
                else {
                    let main = result.data;
                    let bd = [];
                    for (let i = 0; i < main.length; i++) {
                        bd.push({
                            label: main[i].name,
                            value: main[i].id,
                        });
                    }
                    this.setState({ data2: bd });
                }
            }
        )
    }



    t = () => {
        const { zk, pp } = this.state;
        const { brand, first } = this.props;
        //不需要品牌
        if (brand == 0) {
            if (zk == "") this.setState({ Vail_zk: { vail: "error", help: "折扣不可以为空" } });
            else {
                this.setState({ vail_zk: { vail: "", help: "" }, Vail_pp: { vail: "", help: "" } });
                first["discount"] = zk;
                first["brandID"] = 0;
               // alert(JSON.stringify(first));
               baseApi(`/api/v1/admin/coupon/discount/create`,first,(res)=>this.props.finish());
            }
        }
        //需要品牌
        else {
            if (zk == "") this.setState({ Vail_zk: { vail: "error", help: "折扣不可以为空" } });
            else if (pp == "") this.setState({ Vail_zk: { vail: "", help: "" }, Vail_pp: { vail: "error", help: "品牌不可以为空" } });
            else {
                this.setState({ vail_zk: { vail: "", help: "" }, Vail_pp: { vail: "", help: "" } });
                first["discount"] = zk;
                first["brandID"] = pp[0];
              //  alert(JSON.stringify(first));
              baseApi(`/api/v1/admin/coupon/discount/create`,first,(res)=>this.props.finish());
            }
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
        const { brand } = this.props;
        return (
            <div>
                <Form
                    {...formItemLayout}
                >
                    <Form.Item
                        label="折扣"
                        validateStatus={this.state.Vail_zk.vail}
                        help={this.state.Vail_zk.help}
                        required
                    >
                        <InputNumber
                            min={1.0}
                            step={1.0}
                            max={9.9}
                            defaultValue={1.0}
                            onChange={value => this.setState({ zk: parseFloat(value) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="选择品牌"
                        validateStatus={this.state.Vail_pp.vail}
                        help={this.state.Vail_pp.help}
                        required
                        style={{ display: brand == 1 ? "block" : "none" }}
                    >
                        <Cascader options={this.state.data2} placeholder="请选择品牌" onChange={value => this.setState({ pp: value })} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>

                        <Button type="primary" onClick={this.t}>提交</Button>
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
        this.finish = this.finish.bind(this);
    }


    state = {
        step: 0,
        S: 0
    }


    t = (e) => {
        this.setState({ step: 1, data: e.first, S: e.type, fw: e.fw })
    }


    finish = () => {
        this.setState({ step: 2 })
    }

    reset = () => {
        this.setState({ step: 0 })
    }

    render() {
        const B = [
            <XsMax brand={this.state.fw} first={this.state.data} finish={this.finish}/>,
            <Xs brand={this.state.fw} first={this.state.data} finish={this.finish}/>
        ];
        const P = [
            <X t={this.t} />,
            B[this.state.S],
            <div>
                <p style={{ textAlign: "center", marginTop: "50px" }}>
                    <Icon type="check-circle" style={{ fontSize: "50px", color: "#52c41a" }} theme="filled" />
                </p>
                <div style={{ color: '#000', textAlign: "center", fontSize: "20px", fontWeight: "bold", }}>活动添加成功</div>
                <Button type="primary" style={{ display: "block", margin: "40px auto" }} onClick={this.reset}>返回继续添加</Button>
            </div>
        ];
        return (
            <div>
                <PageHeaderWrapper>
                    <Card style={{ width: "100%" }}>
                        <Steps
                            current={this.state.step}
                            style={{ width: "70%", margin: "40px auto" }}
                        >
                            <Step title="填写基础信息" />
                            <Step title="填写更多信息" />
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