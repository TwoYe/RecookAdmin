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
    Alert,
    InputNumber
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';
import Success from '../result/success';

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

const styles = <style jsx>
    {
        `
        .border{
            width:60%;
            margin:0 auto;
            margin-top:50px;
        }
        .span{
            margin:0 10px;
        }
        `
    }
</style>
class A extends React.Component {


    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
    }

    state = {
        loading: false,
        step: 0
    }

    t = () => {
        let { level0Rate, level1Rate, level2Rate, level3Rate, level4Rate, level5Rate, level0Credit, level1Credit, level2Credit, level3Credit, level4Credit, level5Credit } = this.state;
        let B = {
            userID: parseInt(localStorage.getItem("id")),
            password: localStorage.getItem("password"),
            level0Rate: level0Rate,
            level1Rate: level1Rate,
            level2Rate: level2Rate,
            level3Rate: level3Rate,
            level4Rate: level4Rate,
            level5Rate: level5Rate,
            level0Credit: level0Credit,
            level1Credit: level1Credit,
            level2Credit: level2Credit,
            level3Credit: level3Credit,
            level4Credit: level4Credit,
            level5Credit: level5Credit,
        }
        baseApi(`/api/v1/admin/commission_rate/update`, B, (res) => { if (res.code == "0_0") { this.setState({ step: 1 }) } })
    }

    reset = () => {
        this.setState({ step: 0 });
    }
    componentWillMount() {
        baseApi(`/api/v1/admin/commission_rate/detail`,
            { userID: parseInt(localStorage.getItem("id")) },
            (res) => {
                this.setState({
                    level0Rate: res.data.level0Rate,
                    level1Rate: res.data.level1Rate,
                    level2Rate: res.data.level2Rate,
                    level3Rate: res.data.level3Rate,
                    level4Rate: res.data.level4Rate,
                    level5Rate: res.data.level5Rate,
                    level0Credit: res.data.level0Credit,
                    level1Credit: res.data.level1Credit,
                    level2Credit: res.data.level2Credit,
                    level3Credit: res.data.level3Credit,
                    level4Credit: res.data.level4Credit,
                    level5Credit: res.data.level5Credit,
                    do: <div className="border">
                        <Form {...formItemLayout}>
                            <Form.Item
                                label="见习"
                                required
                            >
                                <span className="span">分佣比例</span>
                                <InputNumber
                                    min={0.5} step={0.1} max={30} defaultValue={res.data.level0Rate}
                                    onChange={value => this.setState({ level0Rate: value })}
                                /> %，<span className="span">所需积分</span>
                                <InputNumber
                                    defaultValue={res.data.level0Credit} min={1} max={10000} step={1}
                                    onChange={value => this.setState({ level0Credit: value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="正式"
                                required
                            >
                                <span className="span">分佣比例</span>
                                <InputNumber
                                    min={0.5} step={0.1} max={30} defaultValue={res.data.level1Rate}
                                    onChange={value => this.setState({ level1Rate: value })}
                                /> %，<span className="span">所需积分</span>
                                <InputNumber defaultValue={res.data.level1Credit} min={1} max={10000} step={1}
                                    onChange={value => this.setState({ level1Credit: value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="铜牌"
                                required
                            >
                                <span className="span">分佣比例</span>
                                <InputNumber
                                    min={0.5} step={0.1} max={30} defaultValue={res.data.level2Rate}
                                    onChange={value => this.setState({ level2Rate: value })}
                                /> %，<span className="span">所需积分</span>
                                <InputNumber defaultValue={res.data.level2Credit} min={1} max={10000} step={1}
                                    onChange={value => this.setState({ level2Credit: value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="银牌"
                                required
                            >
                                <span className="span">分佣比例</span>
                                <InputNumber
                                    min={0.5} step={0.1} max={30} defaultValue={res.data.level3Rate}
                                    onChange={value => this.setState({ level3Rate: value })}
                                /> %，<span className="span">所需积分</span>
                                <InputNumber defaultValue={res.data.level3Credit} min={1} max={10000} step={1}
                                    onChange={value => this.setState({ level3Credit: value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="金牌"
                                required
                            >
                                <span className="span">分佣比例</span>
                                <InputNumber
                                    min={0.5} step={0.1} max={30} defaultValue={res.data.level4Rate}
                                    onChange={value => this.setState({ level4Rate: value })}
                                /> %，<span className="span">所需积分</span>
                                <InputNumber defaultValue={res.data.level4Credit} min={1} max={10000} step={1}
                                    onChange={value => this.setState({ level4Credit: value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="钻石"
                                required
                            >
                                <span className="span">分佣比例</span>
                                <InputNumber
                                    min={0.5} step={0.1} max={30} defaultValue={res.data.level5Rate}
                                    onChange={value => this.setState({ level5Rate: value })}
                                /> %，<span className="span">所需积分</span>
                                <InputNumber defaultValue={res.data.level5Credit} min={1} max={10000} step={1}
                                    onChange={value => this.setState({ level5Credit: value })}
                                />
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" onClick={this.t}>提交</Button>
                            </Form.Item>
                        </Form>
                    </div>

                })
            })
    }

    render() {
        const A = [
            this.state.do,
            <Success reset={this.reset} />
        ];
        return (
            <div>
                <PageHeaderWrapper>
                    <Spin spinning={this.state.loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                        <Card style={{ width: "100%" }}>
                            {A[this.state.step]}
                            {styles}
                        </Card>
                    </Spin>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default A;