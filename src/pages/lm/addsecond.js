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
        Vail_fj: { vail: "", help: "" },
        Vail_lmt: { vail: "", help: "" }
    }

    t = () => {
        let A = (sessionStorage.getItem("lmt") == null || sessionStorage.getItem("lmt") == "[]") ? [] : JSON.parse(sessionStorage.getItem("lmt"));
        if (this.state.name == null || this.state.name == "") this.setState({ Vail_name: { vail: "error", help: "类目名称不可以为空！" } })
        else if (A.length == 0) this.setState({ Vail_name: { vail: "", help: "" }, Vail_lmt: { vail: "error", help: "请上传类目图" } })
        else {
            this.setState({ Vail_lmt: { vail: "", help: "" }, loading: true });
            baseApi(`/api/v1/admin/goods/categories/entry`, {
                name: this.state.name,
                parentID: 0,
                depth: 1,
                logoUrl: A[0].name
            }, (res) => {
                if (res.code == "0_0") {
                    sessionStorage.clear();
                    this.props.finsh();
                }
            })
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
                        label="类目名称"
                        validateStatus={this.state.Vail_name.vail}
                        help={this.state.Vail_name.help}
                        required
                    >
                        <Input onChange={e => this.setState({ name: e.target.value })} maxLength="35" minLength="5" />
                    </Form.Item>
                    <Form.Item
                        label="类目图片"
                        validateStatus={this.state.Vail_lmt.vail}
                        help={this.state.Vail_lmt.help}
                        required
                    >
                        <UP max={1} name="lmt" is11={false} loading={this.loading} loaded={this.loaded} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.t}>提交</Button>
                    </Form.Item>
                </Form>
                <div>
                </div>
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
                <PageHeaderWrapper>
                    <Card style={{ width: "100%", paddingTop: "50px" }}>

                        <Steps current={0} style={{ width: "40%", margin: "0 auto", marginBottom: "50px" }}>
                            <Step title="填写基本信息" />
                            <Step title="完成" />
                        </Steps>
                        {C[this.state.Step]}

                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default main;