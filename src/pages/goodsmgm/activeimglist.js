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
import AddImg from './activeimgadd';
import Fqwa from './fqwa';

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
}

const { confirm } = Modal;

class A extends React.Component {
    state = {
        data: [],
        loading: true
    }
    componentWillMount() {
        baseApi(`/api/v1/admin/goods/list/promotion/photo`, {}, (res) => {
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
                key: 'id',
            },
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
            },
            {
                title: '图片',
                dataIndex: 'promotionPhoto',
                key: 'promotionPhoto',
                render: text => {
                    if (text == null) return <span>未设置活动图</span>
                    else {

                        return <img src={"http://rkk.nbqq.cn/files" + text.url} style={{ width: "80px" }} />
                    }
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href={"/goodsmgm/activeImglist?position=1&id="+record.id}>设置发圈文案</a>
                        <Divider type="vertical" />
                        <a href={"/goodsmgm/activeImglist?position=2&id="+record.id}>设置商品活动图</a>
                    </span>
                ),
            },
        ];
        return (
            <div>

                <Spin spinning={this.state.loading}>
                    <Table columns={columns} dataSource={this.state.data} />
                </Spin>

            </div>
        );
    }
}

class Main extends React.Component {

    state = {
        step: 0
    }

    componentWillMount() {
        const position = GetQueryString("position");
        if (position == null || position == "0") this.setState({ step: 0 })
        else if (position == "1") this.setState({ step: 1 })
        else this.setState({ step: 2 })
    }

    render() {
        const D = [<A />,<Fqwa />,<AddImg />];
        return (
            <PageHeaderWrapper>
                <Card style={{ width: "100%" }}>
                    {D[this.state.step]}
                </Card>
            </PageHeaderWrapper>

        );
    }
}
export default Main;