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
    Radio,
    InputNumber,
    Table,
    Tag,
    Alert,
    Switch,
    Spin
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { thisTypeAnnotation } from '@babel/types';
import Count from './count';
import Weight from './weight';
import By from './by';
import { baseApi } from '@/services/base';

const ButtonGroup = Button.Group;

class A extends React.Component {

    state = {
        choose: 0,
        loading: false,
        name:"",
        fhd:""
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
        const choose = [
            <Count name={this.state.name} fhd={this.state.fhd}/>,
            <Weight name={this.state.name} fhd={this.state.fhd}/>,
            <By  name={this.state.name} fhd={this.state.fhd}/>
        ]
        return (
            <div>
                <PageHeaderWrapper>
                    <Card style={{ width: "100%" }}>
                        <div style={{ width: "100%", margin: "50px auto", }}>
                            <Spin spinning={this.state.loading}>
                                <Form {...formItemLayout}>
                                    <Form.Item
                                        label="模板名称"
                                        required
                                    >
                                        <Input onChange={e=>this.setState({name:e.target.value})}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="发货地"
                                        required
                                    >
                                        <Input onChange={e=>this.setState({fhd:e.target.value})}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="计费方式"
                                        required
                                    >
                                        <Radio.Group defaultValue={0} onChange={value => this.setState({ choose: value.target.value })}>
                                            <Radio value={0}>按商品数量计费</Radio>
                                            <Radio value={1}>按商品重量计费</Radio>
                                            <Radio value={2}>全国包邮</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                        label="区域设置"
                                        required
                                    >
                                        {choose[this.state.choose]}
                                    </Form.Item>

                                </Form>
                            </Spin>
                        </div>
                    </Card>
                </PageHeaderWrapper>

            </div>
        );
    }
}
export default A;