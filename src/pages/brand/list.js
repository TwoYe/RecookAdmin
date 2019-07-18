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
        baseApi(`/api/v1/admin/goods/brands/list`, {}, (res) => {
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
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '联系方式',
                dataIndex: 'tel',
                key: 'tel',
            },
            {
                title: '网址',
                dataIndex: 'web',
                key: 'web',
                render: text => <a href={text}>点我访问</a>
            },
            {
                title: '图标',
                dataIndex: 'logoUrl',
                key: 'logoUrl',
                render: text => <img src={"http://rkk.nbqq.cn/files" + text} style={{ width: "100px" }} />
            },
            {
                title: '授权书',
                dataIndex: 'authUrl',
                key: 'authUrl',
                render: text => <img src={"http://rkk.nbqq.cn/files" + text} style={{ width: "100px" }} />
            },
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