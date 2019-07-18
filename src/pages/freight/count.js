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

    //更新数据
    updateSJ = (value, item, type) => {
        let { sj, sf, xj, xf, byj } = this.state;

        if (type == "sj") {
            //动态增加的首件
            for (let i = 0; i < sj.length; i++) {
                if (sj[i].theitem == item) {
                    sj.splice(i, 1);
                }
            }
            sj.push({
                theitem: item,
                value: value
            })
            this.setState({ sj: sj })
        }
        else if (type == "sf") {
            //动态增加的首费
            for (let i = 0; i < sf.length; i++) {
                if (sf[i].theitem == item) {
                    sf.splice(i, 1);
                }
            }
            sf.push({
                theitem: item,
                value: value
            })
            this.setState({ sf: sf })
        }
        else if (type == "xj") {
            //动态增加的续建
            for (let i = 0; i < xj.length; i++) {
                if (xj[i].theitem == item) {
                    xj.splice(i, 1);
                }
            }
            xj.push({
                theitem: item,
                value: value
            })
            this.setState({ xj: xj })
        }
        else if (type == "xf") {
            //动态增加的续费
            for (let i = 0; i < xf.length; i++) {
                if (xf[i].theitem == item) {
                    xf.splice(i, 1);
                }
            }
            xf.push({
                theitem: item,
                value: value
            })
            this.setState({ xf: xf })
        }
        else if (type == "byj") {
            //动态增加的续费
            for (let i = 0; i < byj.length; i++) {
                if (byj[i].theitem == item) {
                    byj.splice(i, 1);
                }
            }
            byj.push({
                theitem: item,
                value: value
            })
            this.setState({ byj: byj })
        }
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
        else {
            //动态增加的地区
            for (let i = 0; i < this.state.area.length; i++) {
                if (this.state.area[i].theitem == item) {
                    area.splice(i, 1);
                }
            }
            area.push({
                theitem: item,
                checked: checked
            })
            this.setState({ area: area })
        }
    }

    //新增
    add = () => {
        if (this.state.lock.length == 31) {
            message.error("已经没有可供选择的地区啦，如要继续，请释放其他条件的区域以供选择！");
        }
        else {
            let A = this.state.data;
            if (A.length == 0) {
                A.push(0);
                this.setState({ data: A })
            }
            else {
                let B = A.slice(-1);
                let C = parseInt(B) + 1;
                A.push(C);
                this.setState({ data: A })
            }
        }
    }


    save = () => {
        if (this.props.name == "") message.error("模板名称不可以为空！")
        else if (this.props.fhd == "") message.error("发货地址不可以为空！")
        else {
            let A = [];
            let { area, sj, sf, xj, xf, byj, qbsf, lock, mr_sj, mr_sf, mr_xj, mr_xf, mr_byj, noSend } = this.state;
            //使用默认标准的省份，全部省份与锁定的省份的补集。
            let mr = qbsf.filter(function (v) { return !(lock.indexOf(v) > -1) }).concat(lock.filter(function (v) { return !(qbsf.indexOf(v) > -1) }));
            A.push({
                firstNumber: mr_sj,
                firstNumberFee: mr_sf,
                additionalNumber: mr_xj,
                additionalNumberFee: mr_xf,
                freeNumberThreshold: mr_byj,
                children: mr
            });

            for (let i = 0; i < sj.length; i++) {
                if (area[i] != undefined && sj[i] != undefined && sf[i] != undefined && xj[i] != undefined && xf[i] != undefined && byj[i] != undefined) {
                    A.push({
                        firstNumber: sj[i].value == null ? 1 : sj[i].value,
                        firstNumberFee: sf[i].value == null ? 1.0 : sf[i].value,
                        additionalNumber: xj[i].value == null ? 1 : xj[i].value,
                        additionalNumberFee: xf[i].value == null ? 1.0 : xf[i].value,
                        freeNumberThreshold: byj[i].value == null ? 1 : byj[i].value,
                        children: area[i].checked
                    })
                }

            }
            let B = {
                name: this.props.name,
                shippingAddr: this.props.fhd,
                deliveryProvinces: A,
                nonDeliveryProvinces: noSend
            }

            baseApi(`/api/v1/admin/freight_template/number/add`, B,
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

    //删除
    sc = (e, index, item) => {

        let A = this.state.data;
        let lock = this.state.lock;


        A.splice(index, 1);

        let { area, sj, sf, xj, xf, byj } = this.state;
        let BJ = [];
        for (let i = 0; i < area.length; i++) {
            if (area[i].theitem == item) {
                //释放删除的地区
                let theArea = area[i].checked;

                //当前锁定和被删除的补集
                BJ = lock.filter(function (v) { return !(theArea.indexOf(v) > -1) }).concat(theArea.filter(function (v) { return !(lock.indexOf(v) > -1) }));
                area.splice(i, 1);
            }
            if (sj[i].theitem == item) {
                sj.splice(i, 1);
            }
            if (sf[i].theitem == item) {
                sf.splice(i, 1);
            }
            if (xj[i].theitem == item) {
                xj.splice(i, 1);
            }
            if (xf[i].theitem == item) {
                xf.splice(i, 1);
            }
            if (byj[i].theitem == item) {
                byj.splice(i, 1);
            }
        }

        this.setState({ data: A, area: area, lock: BJ, sj: sj, sf: sf, xj: xj, xf: xf, byj: byj })

    }

    render() {

        const columns = [
            {
                title: '运送到',
                dataIndex: 'area',
                key: 'area',

            },
            {
                title: '首件',
                dataIndex: 'sz',
                key: 'sz',
            },
            {
                title: '首费(元)',
                dataIndex: 'sf',
                key: 'sf',
            },
            {
                title: '续件',
                dataIndex: 'xz',
                key: 'xz',
            },
            {
                title: '续费(元)',
                dataIndex: 'xf',
                key: 'xf',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;">删除</a>
                    </span>
                ),
            },
        ];
        const AA = [
            <Spin
                spinning={this.state.loading}
                indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
            >

                <table style={{ width: "100%", margin: "10px 0" }} cellpadding="10" >
                    <tr style={{ padding: "10px", fontWeight: "bold" }}>
                        <td>运送至</td>
                        <td>首件数(件)</td>
                        <td>首费(元)</td>
                        <td>续件数(件)</td>
                        <td>续费(元)</td>
                        <td>达到几件包邮</td>
                        <td>操作</td>
                    </tr>
                    {
                        (this.state.data).map((item, index) =>

                            <tr key={item} style={{ height: "40px" }}>
                                <td>
                                    <City maxwidth={"180px"} lock={this.state.lock} updateLock={this.updateLock} item={item} />
                                </td>
                                <td>
                                    <InputNumber min={1} onChange={value => this.updateSJ(value, item, "sj")} />
                                </td>
                                <td>
                                    <InputNumber min={1} onChange={value => this.updateSJ(value, item, "sf")} step={0.1} />
                                </td>
                                <td>
                                    <InputNumber min={1} onChange={value => this.updateSJ(value, item, "xj")} />
                                </td>
                                <td>
                                    <InputNumber min={1} onChange={value => this.updateSJ(value, item, "xf")} step={0.1} />
                                </td>
                                <td>
                                    <InputNumber min={1} onChange={value => this.updateSJ(value, item, "byj")} />
                                </td>
                                <td>
                                    <Popconfirm title="你确定要删除这一项吗？" okText="是的" cancelText="取消" onConfirm={e => this.sc(e, index, item)}>
                                        <a href="javascript:;">删除</a>
                                    </Popconfirm>
                                </td>
                            </tr>
                        )
                    }
                </table>

                <a href="javascript:;" onClick={this.add}><Icon type="plus-circle" /> 新增 </a>
            </Spin>,
            <p></p>
        ]

        return (
            <div>
                <Alert
                    message={
                        <span>
                            <p>
                                <span style={{ marginRight: "5px" }}><b>默认运费</b> - 必填项</span>
                                <Tooltip title="如果某个地域未指定运费，则按此默认运费标准计算。如果地域指定了运费，则不受此默认运费的影响。" >
                                    <Icon type="question-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            </p>

                            <InputNumber min={1} defaultValue={1} onChange={value => this.setState({ mr_sj: value })} />
                            <span> 件内 </span>
                            <InputNumber min={1} defaultValue={1.0} onChange={value => this.setState({ mr_sf: value })} step={0.1} />
                            <span> 元，每增加 </span>
                            <InputNumber min={1} defaultValue={1} onChange={value => this.setState({ mr_xj: value })} />
                            <span> 件，增加运费 </span>
                            <InputNumber min={1} defaultValue={1.0} onChange={value => this.setState({ mr_xf: value })} step={0.1} />
                            <span> 元。</span>
                            <Divider />
                            <span> 达到 </span>
                            <InputNumber min={1} defaultValue={1} onChange={value => this.setState({ mr_byj: value })} />
                            <span> 件后包邮。</span>
                        </span>
                    }
                    type="error"
                    style={{ margin: "15px 0" }}
                />

                <Alert message={
                    <span>
                        <p>
                            <span><b>指定区域的运费</b> - 可不填</span>
                        </p>
                        {AA[this.state.IsNeed ? 0 : 1]}
                    </span>

                } type="info" style={{ margin: "15px 0" }} />

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