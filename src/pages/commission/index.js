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
    Alert
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';



class A extends React.Component {

    state = {
        loading: false
    }

    componentWillMount() {
        baseApi(`/api/v1/admin/commission_rate/detail`,
            { userID: parseInt(localStorage.getItem("id")) },
            (res) => {
                let A = [
                    {
                        title: "见习",
                        bl: res.data.level0Rate,
                        jf: res.data.level0Credit
                    },
                    {
                        title: "正式",
                        bl: res.data.level1Rate,
                        jf: res.data.level1Credit
                    },
                    {
                        title: "铜牌",
                        bl: res.data.level2Rate,
                        jf: res.data.level2Credit
                    },
                    {
                        title: "银牌",
                        bl: res.data.level3Rate,
                        jf: res.data.level3Credit
                    },
                    {
                        title: "金牌",
                        bl: res.data.level4Rate,
                        jf: res.data.level4Credit
                    },
                    {
                        title: "钻石",
                        bl: res.data.level5Rate,
                        jf: res.data.level5Credit
                    },
                ];
                this.setState({ data: A })
            })
    }

    render() {
        const columns = [
            {
                title: '等级名称',
                dataIndex: 'title',
                key: 'title',
                render:text=><b>{text}</b>
            },
            {
                title: '分佣比例',
                dataIndex: 'bl',
                key: 'bl',
                render: text => <span>{text} %</span>
            },
            {
                title: '所需积分',
                dataIndex: 'jf',
                key: 'jf',
            }
        ];
        return (
            <div>
                <PageHeaderWrapper>
                    <Spin spinning={this.state.loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                        <Card style={{ width: "100%" }}>
                            <Table columns={columns} dataSource={this.state.data} pagination={false}/>
                        </Card>
                    </Spin>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default A;