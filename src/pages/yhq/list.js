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
    Spin
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';

class A extends React.Component {
    state = {
        data: [],
        loading: true,
        type: 0
    }
    componentWillMount() {
        baseApi(`/api/v1/admin/coupon/list`, {}, (res) => {
            let A = [], B = [];
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].type == "0") A.push(res.data[i]);
                else B.push(res.data[i]);
            }

            this.setState({ data: res.data, loading: false, zk: B, mj: A })
        });
    }
    render() {

        const zk = [
            {
                title: '优惠券名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <b>{text}</b>
            },
            {
                title: '发行量',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: '折扣',
                dataIndex: 'discount',
                key: 'discount',
            },
            {
                title: '领取限制',
                dataIndex: 'limit',
                key: 'limit',
            },
            {
                title: '使用范围',
                dataIndex: 'scope',
                key: 'scope',
                render:text=>{
                    if(text=="0") return <span>通用</span>
                    else return <span>品牌</span>
                }
            },
            {
                title: '品牌ID',
                dataIndex: 'brandId',
                key: 'brandId',
                render:text=>{
                    if(text=="0") return <span>不支持</span>
                    else return <span>{text}</span>
                }
            },
            {
                title: '生效时间',
                dataIndex: 'startTime',
                key: 'startTime',
            },
            {
                title: '失效时间',
                dataIndex: 'endTime',
                key: 'endTime',
            },
            {
                title: '说明',
                dataIndex: 'explanation',
                key: 'explanation',
            },
        ];
        const mj = [
            {
                title: '优惠券名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <b>{text}</b>
            },
            {
                title: '发行量',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: '满减门槛',
                dataIndex: 'threshold',
                key: 'threshold',
            },
            {
                title: '减去金额',
                dataIndex: 'cash',
                key: 'cash',
            },
            {
                title: '领取限制',
                dataIndex: 'limit',
                key: 'limit',
            },
            {
                title: '使用范围',
                dataIndex: 'scope',
                key: 'scope',
                render:text=>{
                    if(text=="0") return <span>通用</span>
                    else return <span>品牌</span>
                }
            },
            {
                title: '品牌ID',
                dataIndex: 'brandId',
                key: 'brandId',
                render:text=>{
                    if(text=="0") return <span>不支持</span>
                    else return <span>{text}</span>
                }
            },
            {
                title: '生效时间',
                dataIndex: 'startTime',
                key: 'startTime',
            },
            {
                title: '失效时间',
                dataIndex: 'endTime',
                key: 'endTime',
            },
            {
                title: '说明',
                dataIndex: 'explanation',
                key: 'explanation',
            },
        ];

        return (
            <div>
                <PageHeaderWrapper
                    content={
                        <Cascader
                            options={[
                                {
                                    label: "满减优惠券",
                                    value: 0
                                },
                                {
                                    label: "折扣优惠券",
                                    value: 1
                                },
                            ]}
                            placeholder="请选择"
                            style={{ marginTop: "15px" }}
                            defaultValue={[0]}
                            onChange={value => this.setState({ type: value })}
                        />
                    }
                >
                    <Card style={{ width: "100%" }}>
                        <Spin spinning={this.state.loading}>
                            <Table columns={this.state.type == 0 ? mj : zk} dataSource={this.state.type == 0 ? this.state.mj : this.state.zk} />
                        </Spin>
                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}
export default A;