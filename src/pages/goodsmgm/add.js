//新增商品组件
import React from 'react';
import Step0 from './step0';
import Step1 from './step1';
import Step2 from './step2';
import Finish from './finish';
import {
    PageHeader,
    Divider,
    Steps,
    Icon,
    Form,
    Input,
    Cascader,
    Button,
    Card
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { thisTypeAnnotation } from '@babel/types';

const { Step } = Steps;
const routes = [
    {
        path: 'index',
        breadcrumbName: '商品管理',
    },
    {
        path: 'first',
        breadcrumbName: '新增商品',
    },
];
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

export default class A extends React.Component {

    constructor(props) {
        super(props)
        this.first = this.first.bind(this);
        this.second = this.second.bind(this);
        this.finish = this.finish.bind(this);
        this.reset=this.reset.bind(this);
    }

    state = {
        step: 0
    }


    //第一步
    first(someValue) {
        this.setState({ step: someValue.step, first: someValue.data });
    }

    //第二步
    second(someValue) {
        this.setState({ step: someValue.step, second: someValue.result });
    }

    //返回第一步
    reset(){
        this.setState({ step: 0 });
    }

    //完成
    finish() {
        sessionStorage.clear();
        this.setState({ step: 3 });
    }

    render() {
        const styles = <style global jsx>{`
                .theSteps{
                    width:70%;
                    margin:0 auto;
                    margin-top:70px;
                }
                .mainBorder{
                    width:50%;
                    margin:50px auto;
                }
             `}</style>

        const theStep = [
            <Step0 first={this.first} />,
            <Step1 second={this.second} />,
            <Step2 firstd={this.state.first} secondd={this.state.second} finish={this.finish}/>,
            <Finish reset={this.reset}/>
        ]

        return (
            <div>

                <PageHeaderWrapper>
                    <Card style={{ width: "100%" }}>
                        <Steps
                            current={this.state.step}
                            className="theSteps"
                        >
                            <Step title="商品基本信息" />
                            <Step title="商品视频图文" />
                            <Step title="价格" />
                            <Step title="完成" />
                        </Steps>
                        {theStep[this.state.step]}
                    </Card>
                </PageHeaderWrapper>
                {styles}
            </div>
        );
    }
}
