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
        baseApi(`/api/v1/admin/user/top/list`, {}, (res) => {
            this.setState({ data: res.data, loading: false })
        });
    }
    render() {
        const columns = [
            {
                title: '昵称',
                dataIndex: 'nickname',
                key: 'nickname',
            },
            {
                title: '联系方式',
                dataIndex: 'mobile',
                key: 'mobile',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                render:text=>{
                    if(text=="0")return <p>男</p>
                    else return <p>女</p>
                }
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