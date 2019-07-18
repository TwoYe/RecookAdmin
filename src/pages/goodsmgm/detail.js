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
    Card,
    Empty,
    Row,
    Col,
    message,
    Spin
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { thisTypeAnnotation } from '@babel/types';
import Masonry from 'react-masonry-component';
import { baseApi } from '@/services/base';

const { Search } = Input;
class A extends React.Component {

    state = {
        data: [],
        step: 0,
        loading: false
    }

    search = (text) => {
        if (text == null || text == "") message.error("搜索关键字不可以为空！");
        else {
            this.setState({ loading: true })
            baseApi(`/api/v1/admin/goods/search`, {
                text: text
            }, (res) => {
                if (res.code == "0_0") {
                    if (res.data.length == 0) {
                        this.setState({
                            data: [],
                            step: 0,
                            loading: false
                        })
                    }
                    else {
                        this.setState({
                            data: res.data,
                            step: 1,
                            loading: false
                        })
                    }

                }
            })
        }
    }

    render() {
        const A = [
            <Empty />,
            <div>
                <Row gutter={16}>
                    <Masonry>
                        {
                            (this.state.data || []).map((item, index) =>
                                <Col span={2} key={index}>
                                    <div style={{ cursor: "pointer", marginTop: "30px" }}>
                                        <img src={"http://rkk.nbqq.cn/files" + item.url} style={{ width: "100%" }} />
                                        <p style={{ marginTop: "5px" }}>{item.goodsName}</p>
                                    </div>
                                </Col>
                            )
                        }
                    </Masonry>
                </Row>
                <Divider />
                <p style={{  color: "#999" }}>点击卡片进入详情页</p>
            </div>

        ];
        return (
            <div>
                <PageHeaderWrapper
                    content={
                        <Search
                            placeholder="输入商品标题"
                            onSearch={value => this.search(value)}
                            style={{ width: 300, marginTop: "10px" }}
                        />
                    }
                >
                    <Card style={{ width: "100%" }}>
                        <Spin spinning={this.state.loading}>
                            {A[this.state.step]}
                        </Spin>

                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default A;