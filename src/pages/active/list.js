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
        loading: true

    }
    componentWillMount() {
        baseApi(`/api/v1/admin/promotion/list/active`, {}, (res) => {
            this.setState({ data: res.data, loading: false })
        });
    }
    change = (e) => {
        if(e=="") return false;
        this.setState({ loading: true });
        baseApi(e, {}, (res) => {
            this.setState({ data: res.data, loading: false })
        });
    }
    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '标签',
                dataIndex: 'labels',
                key: 'labels',
            },
            {
                title: '折扣',
                dataIndex: 'discount',
                key: 'discount',
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                key: 'startTime',
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',

            }
        ];
        const options = [
            {
                value: '/api/v1/admin/promotion/list/waiting',
                label: '待生效活动',
            },
            {
                value: '/api/v1/admin/promotion/list/active',
                label: '生效中的活动',
            },
            {
                value: '/api/v1/admin/promotion/list/expired',
                label: '过期的活动',
            },
        ];
        return (
            <div>
                <PageHeaderWrapper
                    content={
                        <div style={{marginTop:"10px"}}>
                            <Cascader
                                options={options}
                                onChange={value => this.change(value)}
                                placeholder="请选择"
                                defaultValue={['/api/v1/admin/promotion/list/active']}
                            />
                        </div>
                    }
                >
                    <Card style={{ width: "100%" }}>
                        <Spin spinning={this.state.loading}>
                            <Table columns={columns} dataSource={this.state.data} />
                        </Spin>
                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}
export default A;