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
    Spin,
    Modal
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';


const { confirm } = Modal;
class A extends React.Component {
    state = {
        data: [],
        loading: true
    }
    componentWillMount() {
        baseApi(`/api/v1/admin/user/list`, {}, (res) => {
            this.setState({ data: res.data, loading: false })
        });
    }
    delete = (id, name) => {

    }
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '联系方式',
                dataIndex: 'mobile',
                key: 'mobile',
            },
            {
                title: '角色',
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: '登录时间',
                dataIndex: 'loginTime',
                key: 'loginTime',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;" onClick={() => {
                            confirm({
                                title: '删除用户提醒',
                                content: '你真的要删除 ' + record.name + ' 吗？',
                                okText: "确定删除",
                                cancelText: "取消",
                                onOk() {
                                    baseApi(`/api/v1/admin/user/delete`, {
                                        deleteID: parseInt(record.id),
                                        id:parseInt(localStorage.getItem("id")),
                                        password:localStorage.getItem("password")
                                    }, (res) => { if(res.code=="0_0") message.success("员工删除成功！");window.location.reload();});
                                },
                                onCancel() {
                                    console.log('Cancel');
                                },
                            });
                        }}>删除该员工</a>
                    </span>
                ),
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