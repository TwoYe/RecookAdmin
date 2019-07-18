
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
    Radio,
    InputNumber,
    DatePicker,
    Tooltip,
    Spin,
    message,
    Alert
} from 'antd';
import { baseApi } from '../../services/base';

function replacePos(strObj, pos, replacetext) {
    var str = strObj.substr(0, pos - 1) + replacetext + strObj.substring(pos, strObj.length);
    return str;
}

export default class A extends React.Component {

    state = {
        step: 0,
        name: "",
        lm: "",
        pp: "",
        zt: 1,
        sjsj: "",
        xjsj: "",
        yjbl: 20,
        zkfw: 5,
        ad: { vail: "", help: "" },
        bd: { vail: "", help: "" },
        cd: { vail: "", help: "" },
        dd: { vail: "", help: "" },
        ed: { vail: "", help: "" },
        fd: { vail: "", help: "" },
        gd: { vail: "", help: "" },
        hd: { vail: "", help: "" },
        loading: false
    }

    componentWillMount() {
        //获取类目列表
        baseApi(`/api/v1/admin/goods/categories/all`,
            {}, (result) => {
                if (result.code === "-1") message.error("服务器失去响应！");
                else if (result === "0_-1") message.error("获取类目列表失败！");
                else {
                    let main = result.data;
                    let bd = [];
                    for (let i = 0; i < main.length; i++) {
                        let main2 = main[i].children;
                        let bd2 = [];
                        for (let j = 0; j < main2.length; j++) {
                            bd2.push({
                                label: main2[j].name,
                                value: main2[j].id
                            });
                        }
                        bd.push({
                            label: main[i].name,
                            value: main[i].id,
                            children: bd2
                        });

                    }

                    this.setState({ data: bd });
                }
            });
        baseApi(`/api/v1/admin/goods/brands/list`, {},
            (result) => {
                if (result.code === "-1") message.error(result.msg);
                else if (result === "0_-1") message.error("获取类目列表失败！");
                else {
                    let main = result.data;
                    let bd = [];
                    for (let i = 0; i < main.length; i++) {
                        bd.push({
                            label: main[i].name,
                            value: main[i].id,
                        });
                    }
                    this.setState({ data2: bd });
                }
            }
        )
    }

    test = () => {
        alert(this.state.xjsj)
    }

    //下一步
    next = () => {
        let data = this.state;
        if (data.name == "") this.setState({ ad: { vail: "error", help: "商品名称不可以为空" } })
        else if (data.lm == "") this.setState({ ad: { vail: "", help: "" }, bd: { vail: "error", help: "请选择商品类目" } })
        else if (data.pp == "") this.setState({ bd: { vail: "", help: "" }, cd: { vail: "error", help: "请选择商品品牌" } })
        else if (data.zt == "") this.setState({ cd: { vail: "", help: "" }, dd: { vail: "error", help: "请选择商品发布状态" } })
        else if (data.yjbl == "") this.setState({ fd: { vail: "", help: "" }, gd: { vail: "error", help: "请选择商品佣金比例" } })
        else if (data.zkfw == "") this.setState({ gd: { vail: "", help: "" }, hd: { vail: "error", help: "请选择商品折扣范围" } })
        else {
            this.setState({ hd: { vail: "", help: "" }, loading: true });
            let theData = {
                brandID: parseInt(data.pp),
                goodsName: data.name,
                categoryID: parseInt(data.lm.toString().split(',')[1]),
                publishStatus: parseInt(data.zt.target.value),
                commissionRate: parseFloat(data.yjbl),
                discount: parseFloat(data.zkfw),
                description: (data.fbt == null || data.fbt == "") ? "" : data.fbt
            }
            this.props.first({ step: 1, data: theData });
            //alert(JSON.stringify(theData))
        }

    }

    render() {
        //css样式
        const styles = <style global jsx>{`
                .theSteps{
                    width:70%;
                    margin:0 auto;
                }
                .mainBorder{
                    width:50%;
                    margin:50px auto;
                }
             `}</style>
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 5 },
            },
        };
        return (
            <div>
                <div className="mainBorder">
                    <Spin
                        spinning={this.state.loading}
                        tip="数据提交中..."
                    >
                        <Form {...formItemLayout}>
                            <Form.Item
                                label="商品名称"
                                validateStatus={this.state.ad.vail}
                                help={this.state.ad.help}
                                required
                            >
                                <Input placeholder="请在此输入商品的名称" onChange={e => this.setState({ name: e.target.value })} maxLength="35" minLength="5" />
                            </Form.Item>
                            <Form.Item
                                label="商品副标题"
                            >
                                <Input placeholder="请在此输入商品的副标题" onChange={e => this.setState({ fbt: e.target.value })} maxLength="30" />
                            </Form.Item>
                            <Form.Item
                                label="商品类目"
                                validateStatus={this.state.bd.vail}
                                help={this.state.bd.help}
                                required
                            >
                                <Cascader options={this.state.data} placeholder="请选择类目" onChange={value => this.setState({ lm: value })} />
                            </Form.Item>
                            <Form.Item
                                label="商品品牌"
                                validateStatus={this.state.cd.vail}
                                help={this.state.cd.help}
                                required
                            >
                                <Cascader options={this.state.data2} placeholder="请选择品牌" onChange={value => this.setState({ pp: value })} />
                            </Form.Item>
                            <Form.Item
                                label="发布状态"
                                validateStatus={this.state.dd.vail}
                                help={this.state.dd.help}
                                required
                            >
                                <Radio.Group onChange={value => this.setState({ zt: value })} defaultValue={1}>
                                    <Radio value={1}>立即上架</Radio>
                                    <Radio value={0}>存入仓库</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="佣金比例"
                                validateStatus={this.state.gd.vail}
                                help={this.state.gd.help}
                                required
                            >
                                <InputNumber
                                    min={1}
                                    max={50}
                                    defaultValue={1}
                                    step={1}
                                    style={{ marginRight: "10px" }}
                                    onChange={value => this.setState({ yjbl: value })}
                                    defaultValue={20}
                                />
                                <span>%</span>
                            </Form.Item>
                            <Form.Item
                                label="折扣范围"
                                validateStatus={this.state.hd.vail}
                                help={this.state.hd.help}
                                required
                            >
                                <InputNumber
                                    min={1}
                                    max={9.9}
                                    defaultValue={1}
                                    step={0.1}
                                    style={{ marginRight: "10px" }}
                                    onChange={value => this.setState({ zkfw: value })}
                                    defaultValue={5}
                                />
                                <span>折</span>
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" onClick={this.next}>下一步</Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                    {styles}

                </div>
                <Divider />
                <h3 style={{ textIndent: "2cm", color: "#999" }}>说明</h3>
                <h4 style={{ textIndent: "2cm", color: "#999" }}>1、带星号的为必填项，不可以为空</h4>
                <h4 style={{ textIndent: "2cm", color: "#999" }}>2、佣金选项中，20代表百分之20，取值范围1-50</h4>
                <h4 style={{ textIndent: "2cm", color: "#999" }}>3、折扣范围中，范围1.0-9.9，9.0代表9折</h4>
            </div>
        );
    }
}