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
        baseApi(`/api/v1/admin/freight_template/list`, {}, (res) => {
            this.setState({ data: res.data, loading: false })
        });
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '发货地',
                dataIndex: 'shippingAddr',
                key: 'shippingAddr',
            },
            {
                title: '不发货省份',
                dataIndex: 'nonDeliveryProvinces',
                key: 'nonDeliveryProvinces',
                render:text=><span>{JSON.stringify(text)}</span>
            }
        ];
        return (
            <div>
                <PageHeaderWrapper>
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