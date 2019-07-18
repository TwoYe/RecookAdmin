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
    Radio
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';
import B from '../result/success'
import UP from '../goodsmgm/baseUp';

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
}

const { Step } = Steps;


class A extends React.Component {

    constructor(props) {
        super(props);
        this.loading = this.loading.bind(this);
        this.loaded = this.loaded.bind(this);
    }

    loading = () => this.setState({ loading: true });
    loaded = () => this.setState({ loading: false });

    state = {
        treeData: [],
        loading: false,
        Vail_name: { vail: "", help: "" },
        Vail_gid: { vail: "", help: "" },
        Vail_lmt: { vail: "", help: "" }
    }
    t = () => {
        let A = (sessionStorage.getItem("hd") == null || sessionStorage.getItem("hd") == "[]") ? [] : JSON.parse(sessionStorage.getItem("hd"));
        if (A.length == 0) this.setState({ Vail_lmt: { vail: "error", help: "请上传图片" } })
        else {
            this.setState({ loading: true });

            baseApi(`/api/v1/admin/goods/promotion/photo/update`, {
                goodsID: parseInt(GetQueryString("id")),
                url: A[0].name,
                width: A[0].width,
                height: A[0].height
            }, (res) => {
                if (res.code == "0_0") {
                    sessionStorage.clear();
                    this.props.finsh();
                }
            });
        }

    }

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
            <Spin spinning={this.state.loading} tip="数据处理中" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                <div>
                    <Form {...formItemLayout} style={{ width: "40%", margin: "0 auto" }}>
                        <Form.Item
                            label="活动图片"
                            validateStatus={this.state.Vail_lmt.vail}
                            help={this.state.Vail_lmt.help}
                            required
                        >
                            <UP max={1} name="hd" is11={false} loading={this.loading} loaded={this.loaded} />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" onClick={this.t}>提交</Button>
                        </Form.Item>
                    </Form>

                </div>
            </Spin>
        );
    }
}


class main extends React.Component {

    constructor(props) {
        super(props);
        this.finsh = this.finsh.bind(this);
        this.reset = this.reset.bind(this);
    }

    state = {
        Step: 0
    }

    finsh = () => this.setState({ Step: 1 })

    reset = () => this.setState({ Step: 0 })

    render() {
        const C = [
            <A finsh={this.finsh} />,
            <B reset={this.reset} />
        ];
        return (
            <div>
                <PageHeader onBack={() => window.location.href = '/goodsmgm/activeImglist'} title="返回列表" />
                <Steps current={0} style={{ width: "40%", margin: "0 auto", marginBottom: "50px", marginTop: "50px" }}>
                    <Step title="填写基本信息" />
                    <Step title="完成" />
                </Steps>
                {C[this.state.Step]}

            </div>
        );
    }
}

export default main;