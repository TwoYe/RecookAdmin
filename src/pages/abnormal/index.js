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
    Row,
    Col,
    Alert
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';



class A extends React.Component {

    state = {
        lm: { type: "success", desc: "-" },
        pp: { type: "success", desc: "-" },
        yf: { type: "success", desc: "-" },
        yj: { type: "success", desc: "-" },
        loading: true
    }

    componentWillMount() {


        //lm
        baseApi(`/api/v1/admin/monitor/category`,
            { userID: parseInt(localStorage.getItem("id")) },
            (res) => {
                if (res.code == "0_0") {
                    this.setState({
                        lm: { type: res.data.warning == "正常" ? "success" : "error", desc: res.data.warning }
                    })
                }
            })

        //pp
        baseApi(`/api/v1/admin/monitor/brand`,
            { userID: parseInt(localStorage.getItem("id")) },
            (res) => {
                if (res.code == "0_0") {
                    this.setState({
                        pp: { type: res.data.warning == "正常" ? "success" : "error", desc: res.data.warning }
                    })
                }
            })

        //yf
        baseApi(`/api/v1/admin/monitor/freight_template`,
            { userID: parseInt(localStorage.getItem("id")) },
            (res) => {
                if (res.code == "0_0") {
                    this.setState({
                        yf: { type: res.data.warning == "正常" ? "success" : "error", desc: res.data.warning }
                    })
                }
            })

        //yf
        baseApi(`/api/v1/admin/monitor/commission_rate`,
            { userID: parseInt(localStorage.getItem("id")) },
            (res) => {
                if (res.code == "0_0") {
                    this.setState({
                        yj: { type: res.data.warning == "正常" ? "success" : "error", desc: res.data.warning }
                    })
                }
            })

        this.setState({ loading: false })
    }

    render() {
        return (
            <div>
                <PageHeaderWrapper>
                    <Spin spinning={this.state.loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                        <Card style={{ width: "100%" }}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={6}>
                                    <Alert
                                        message="类目检测"
                                        type={this.state.lm.type}
                                        showIcon
                                        description={this.state.lm.desc}
                                    />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Alert
                                        message="品牌检测"
                                        type={this.state.pp.type}
                                        showIcon
                                        description={this.state.pp.desc}
                                    />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Alert
                                        message="运费模板检测"
                                        type={this.state.yf.type}
                                        showIcon
                                        description={this.state.yf.desc}
                                    />
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Alert
                                        message="佣金比例检测"
                                        type={this.state.yj.type}
                                        showIcon
                                        description={this.state.yj.desc}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Spin>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default A;