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
    Spin,
    Tooltip,
    message,
    Popconfirm,
    Modal
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { thisTypeAnnotation } from '@babel/types';
import City from './citys';
import { baseApi } from '@/services/base';
import Item from 'antd/lib/list/Item';





class A extends React.Component {
    constructor(props) {
        super(props);
        this.updateLock = this.updateLock.bind(this)
    }
    state = {
        IsNeed: true,
        lock: [], //锁数据
        data: [],
        loading: false,
        area: [],
        sj: [],
        sf: [],
        xj: [],
        xf: [],
        byj: [],
        deliveryProvinces: [],
        mr_sj: 1,
        mr_sf: 1.0,
        mr_xj: 1,
        mr_xf: 1.0,
        mr_byj: 1,
        noSend: []
    }


    componentWillMount() {
        baseApi(`/api/v1/admin/region/provinces`, {}, (res) => {
            if (res.code == "0_0") {
                const A = res.data;
                let B = [];

                //此处得到原始数据B
                for (let i = 0; i < A.length; i++) {
                    B.push(A[i].name);
                }
                this.setState({ qbsf: B });
            }
        })
    }


    updateLock = (data) => {
        let { newlock, checked, item } = data;
        let area = this.state.area;
        //判断是不发货地区还是，动态增加的地区
        this.setState({ lock: newlock });
        if (item == -1) {
            //不发或地区
            this.setState({ noSend: checked });
        }
    }


    save = () => {
        if (this.props.name == "") message.error("模板名称不可以为空！")
        else if (this.props.fhd == "") message.error("发货地址不可以为空！")
        else {
            let A = [];
            let { area, sj, sf, xj, xf, byj, qbsf, lock, mr_sj, mr_sf, mr_xj, mr_xf, mr_byj, noSend } = this.state;

            let B = {
                name: this.props.name,
                shippingAddr: this.props.fhd,
                nonDeliveryProvinces: noSend
            }

            baseApi(`/api/v1/admin/freight_template/free_shipping/add`, B,
                (res) => {
                    if (res.code == "0_0") {
                        Modal.success({
                            title: '模板添加成功！',
                            content: "你可以点击模板列表查看添加的模板",
                            okText: "我知道了",
                            onOk: () => {
                                window.location.reload();
                            }
                        });
                    }
                }
            )

        }
    }


    render() {

        return (
            <div>
                <Alert message={
                    <span>
                        <p>
                            <span><b>不发货地区</b> - 可不填</span>
                        </p>
                        <City maxwidth={"1200px"} lock={this.state.lock} updateLock={this.updateLock} item={-1} />
                    </span>

                } type="info" style={{ margin: "15px 0" }} />

                <Button type="primary" onClick={this.save}>提交</Button>
            </div>
        );
    }
}

export default A;