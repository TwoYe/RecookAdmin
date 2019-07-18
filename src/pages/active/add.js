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
    Alert
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';
import BQ from './bq';
import Masonry from 'react-masonry-component';

const { Step } = Steps;
const { RangePicker } = DatePicker;


class B extends React.Component {

    constructor(props) {
        super(props)
        this.tj = this.tj.bind(this);
    }

    tj = (e) => {
        this.setState({ bq: e })
    }

    state = {
        name: "",
        bq: "",
        zk: 1.0,
        start: "",
        end: "",
        Vail_name: { vail: "", help: "" },
        Vail_bq: { vail: "", help: "" },
        Vail_zk: { vail: "", help: "" },
        Vail_start: { vail: "", help: "" },
        Vail_end: { vail: "", help: "" },
    }

    t = () => {
        const { name, bq, zk, start, end } = this.state;
        if (name == "") this.setState({ Vail_name: { vail: "error", help: "名称不可以为空" } });
        else if (bq == "") this.setState({ Vail_name: { vail: "", help: "" }, Vail_bq: { vail: "error", help: "请选择标签" } });
        else if (zk == "" || zk == null) this.setState({ Vail_bq: { vail: "", help: "" }, Vail_zk: { vail: "error", help: "请选择折扣" } });
        else if (start == "") this.setState({ Vail_zk: { vail: "", help: "" }, Vail_start: { vail: "error", help: "请选择开始时间" } });
        else if (end == "") this.setState({ Vail_start: { vail: "", help: "" }, Vail_end: { vail: "error", help: "请选择结束时间" } });
        else {
            this.setState({ Vail_end: { vail: "", help: "" } });
            this.props.t({
                name: name,
                labels: bq,
                discount: zk,
                startTime: start,
                endTime: end
            });
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
                        label="名称"
                        validateStatus={this.state.Vail_name.vail}
                        help={this.state.Vail_name.help}
                        required
                    >
                        <Input onChange={e => this.setState({ name: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label="标签"
                        required
                        validateStatus={this.state.Vail_bq.vail}
                        help={this.state.Vail_bq.help}
                    >
                        <BQ tj={this.tj} />
                    </Form.Item>
                    <Form.Item
                        label="折扣"
                        required
                        validateStatus={this.state.Vail_zk.vail}
                        help={this.state.Vail_zk.help}
                    >
                        <InputNumber
                            min={1.0}
                            max={9.9}
                            step={0.1}
                            defaultValue={1.0}
                            onChange={value => this.setState({ zk: parseFloat(value) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="开始时间"
                        required
                        validateStatus={this.state.Vail_start.vail}
                        help={this.state.Vail_start.help}
                    >
                        <DatePicker
                            showTime
                            placeholder="开始时间"
                            disabledDate={this.disabledStartDate}
                            onChange={value => this.setState({ start: Math.round(new Date(value) / 1000) })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="结束时间"
                        required
                        validateStatus={this.state.Vail_end.vail}
                        help={this.state.Vail_end.help}
                    >
                        <DatePicker
                            showTime
                            placeholder="结束时间"
                            disabledDate={this.disabledStartDate}
                            onChange={value => this.setState({ end: Math.round(new Date(value) / 1000) })}
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

class C extends React.Component {

    state = {
        data: [],
        loading: true,
        select: []
    }


    componentWillMount() {
        baseApi(`/api/v1/admin/promotion/list/goods/time`, {
            startTime: this.props.data.startTime,
            endTime: this.props.data.endTime
        }, (res) => {
            let hh = [];
            for (let i = 0; i < res.data.length; i++) {
                res.data[i]["select"] = false;
                hh.push(res.data[i]);
            }
            this.setState({ data: hh, loading: false });
        })
    }

    do = (e, index) => {
        const { data } = this.state;
        this.setState({ loading: true })

        const A = data[index].select;

        data[index]["select"] = !A;

        this.setState({ data: data, loading: false })
    }

    t = () => {
        const { data } = this.state;
        const old = this.props.data;
        let A = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].select) A.push(data[i].id);
        }
        old["goodsIDs"] = A;
       this.setState({loading:true});
     baseApi(`/api/v1/admin/promotion/add`,old,(res)=>{
         if(res.code=="0_-1") message.error(res.msg);
         else{
            this.setState({loading:false});
            this.props.finish();
         }
     })
    }
    render() {
        return (
            <div>
                <Alert message="以下商品可以参与本次活动，请选择（选择方法：鼠标点击商品即可，红色代表选中）" type="info" style={{ marginBottom: "25px" }} />
                <Spin spinning={this.state.loading} tip="数据生成中">
                    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                        <Masonry>
                            {
                                (this.state.data || []).map((item, index) =>
                                    <Col span={6} key={index}>
                                        <div style={{ cursor: "pointer", border: (this.state.data[index].select ? "1px solid red" : "1px solid #fff"), marginTop: "30px" }}
                                            onClick={e => this.do(e, index)}
                                        >
                                            <img src={"http://rkk.nbqq.cn/files" + item.url} style={{ width: "100%" }} />
                                            <p style={{ marginTop: "5px" }}>{item.goodsName}</p>
                                        </div>
                                    </Col>
                                )
                            }
                        </Masonry>
                    </Row>
                </Spin>

                <Divider />
                <Button type="primary" onClick={this.t}>提交</Button>
            </div>
        );
    }
}




//母页面
class A extends React.Component {
    constructor(props) {
        super(props)
        this.t = this.t.bind(this);
        this.finish=this.finish.bind(this);
    }


    state = {
        step: 0
    }


    t = (e) => {
        this.setState({ step: 1, data: e })
    }


    finish=()=>{
        this.setState({ step: 2})
    }

    reset=()=>{
        this.setState({ step:0 })
    }

    render() {
        const P = [
            <B t={this.t} />,
            <C data={this.state.data} finish={this.finish}/>,
            <div>
            <p style={{ textAlign: "center",marginTop:"50px"}}>
                <Icon type="check-circle" style={{ fontSize: "50px", color: "#52c41a" }} theme="filled" />
            </p>
            <div style={{ color: '#000', textAlign: "center", fontSize: "20px", fontWeight: "bold",}}>活动添加成功</div>
            <Button type="primary" style={{display:"block",margin:"40px auto"}} onClick={this.reset}>返回继续添加</Button>
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
                            <Step title="填写基本信息" />
                            <Step title="选择参加商品" />
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