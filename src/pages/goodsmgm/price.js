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
    Alert,
    Upload,
    Switch,
    Modal,
    message,
    Row,
    Col,
    InputNumber
} from 'antd';
import { baseApi } from '../../services/base';

const confirm = Modal.confirm;
const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    multiple: false,
    accept: "image/*"
};


class TheChildren extends React.Component {

    state = {
        componnetArray: [0],
        data: []
    };

    addComponent = () => {
        let arr = [...this.state.componnetArray];
        let last = arr[arr.length - 1] + 1;
        arr.push(last);
        this.setState({
            componnetArray: arr
        })
    }

    reduceComp = (e, i) => {
        let arr = [...this.state.componnetArray];
        let arr2 = [...this.state.data];
        let that = this;
        if (arr.length == 1) message.error("请至少保留一个子项！");
        else {
            confirm({
                title: '移除询问',
                content: '你确定要移除这一子项吗?',
                onOk() {
                    arr.splice(i, 1);

                    const I = arr2.find(({ item }) => i === item);
                    if (I) {
                        for (let j = 0; j < arr2.length; j++) {
                            if (arr2[i].item == j) {
                                arr2.splice(j, 1);
                                that.setState({
                                    data: arr2
                                });
                                break;
                            }
                        }
                    }
                    that.setState({
                        componnetArray: arr
                    });
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }



    change = (e, items) => {
        let v = e.target.value;
        if (v != "") {
            let arr = [...this.state.data];
            const I = arr.find(({ item }) => items === item);
            if (I) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].item == items) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }

            arr.push({ item: items, value: v });
            this.setState({ data: arr });
        }
    }

    ok = () => {
        this.props.updateParent([...this.state.data]);
        //message.info("保存成功！");
    }

    render() {
        const styles = <style jsx>{`
        .delete{
            font-size:20px;
            color:#999;
            cursor:pointer;
        }
        .add{
            width:100%;
            border:1px dashed #ddd;
            text-align:center;
            line-height:40px;
            font-size:20px;
            color:#999;
            cursor:pointer;
            background:#fafafa;
            margin-bottom:10px;
        }
    `}</style>
        return (
            <div>
                {
                    (this.state.componnetArray).map((item, index) =>
                        <div key={item}>
                            <p style={{ textAlign: "right", marginBottom: "-25px" }}> <Icon type="minus-circle" className="delete" onClick={e => this.reduceComp(e, item)} /></p>
                            <p>
                                子项 {index + 1}：<Input style={{ width: "100px", marginRight: "10px" }} onChange={e => this.change(e, item)} />
                            </p>
                            <Divider />
                        </div>
                    )

                }
                <div
                    className="add"
                    onClick={this.addComponent}
                >+</div>
                <Button type="primary" onClick={this.ok}>确定</Button>
                {styles}
            </div>
        );
    }
}
//↓↓向下传递data数据

class TheChildren2 extends React.Component {

    constructor(props) {
        super(props)
        this.updateParent = this.updateParent.bind(this);
    }

    state = {
        name: ""
    }
    //接收子组件传递的data
    updateParent(someValue) {
        if (this.state.name == "" || this.state.name == null) message.error("选项卡名称不可以为空！")
        else {
            let data = { name: this.state.name, children: someValue };
            this.props.encapsulation(data)
        }
    }

    render() {
        const styles = <style jsx>{
            `
            .A{
                border:1px solid #ddd;
                padding:20px;
                margin-bottom:10px;
            }
            .A .B{
                text-align:right;
                margin-bottom:-15px;
            }
            .A .C{
                font-size:20px;
                color:#999;
                cursor:pointer;
            }
            .A .D{
                width:150px;
                margin-right:10px;
            }
            .E{
                width:100%;
                border:1px dashed #ddd;
                text-align:center;
                line-height:40px;
                font-size:20px;
                color:#999;
                cursor:pointer;
                background:#fafafa;
                margin-bottom:10px;
            }
            `}
        </style>
        return (
            <div>
                <p>选项卡名称： <Input className="D" onChange={e => this.setState({ name: e.target.value })} /></p>
                <Divider />
                <TheChildren updateParent={this.updateParent} />
            </div>
        );
    }

}
//↓↓组合封装name，向下传递封装数据


//接收封装数据，加入到新数组中
class TheParent extends React.Component {

    constructor(props) {
        super(props)
        this.encapsulation = this.encapsulation.bind(this);
    }

    state = {
        componnetArray: [0],
        data: []
    };

    //接收子组件传递的data
    encapsulation(someValue) {
        //判断name是否存在
        let arr2 = [...this.state.data];
        const I = arr2.find(({ name }) => someValue.name === name);
        if (I) {
            for (let i = 0; i < arr2.length; i++) {
                if (arr2[i].name == someValue.name) {
                    arr2.splice(i, 1);
                    break;
                }
            }
        }
        arr2.push(someValue);
        this.setState({ data: arr2 });
    }


    test = () => {
        //alert(JSON.stringify(this.state.data));
        let data = this.state.data;
        let result = [];
        //一个选项卡
        if (data.length == 1) {
            for (let i = 0; i < data[0].children.length; i++) {
                let news = data[0].children[i].value;
                result.push(news);
            }
        }
        //两个选项卡
        if (data.length == 2) {
            for (let i = 0; i < data[0].children.length; i++) {
                for (let j = 0; j < data[1].children.length; j++) {
                    let news = data[0].children[i].value + ","
                        + data[1].children[j].value;
                    result.push(news);
                }
            }
        }
        //三个选项卡
        if (data.length == 3) {
            for (let i = 0; i < data[0].children.length; i++) {
                for (let j = 0; j < data[1].children.length; j++) {
                    for (let k = 0; k < data[2].children.length; k++) {
                        let news = data[0].children[i].value + ","
                            + data[1].children[j].value + ","
                            + data[2].children[k].value
                            ;
                        result.push(news);
                    }
                }
            }
        }
        this.props.encapsulation({ res: result, position: 1, data: this.state.data });
    }
    addComponent = () => {
        let arr = [...this.state.componnetArray];
        let last = arr[arr.length - 1] + 1;
        arr.push(last);
        this.setState({
            componnetArray: arr
        })
    }

    reduceComp = (e, i) => {
        let arr = [...this.state.componnetArray];
        let arr2 = [...this.state.data];
        let that = this;
        if (arr.length == 1) message.error("请至少保留一个选项卡！");
        else {
            confirm({
                title: '移除询问',
                content: '你确定要移除这一选项卡吗?',
                onOk() {
                    arr.splice(i, 1);
                    const I = arr2.find(({ name }) => arr2[i].name === name);
                    if (I) {
                        for (let j = 0; j < arr2.length; j++) {
                            if (arr2[j].name == arr2[i].name) {
                                arr2.splice(j, 1);
                                that.setState({
                                    data: arr2
                                });
                                break;
                            }
                        }
                    }
                    that.setState({
                        componnetArray: arr
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }

    render() {
        const styles = <style jsx>{
            `
            .A{
                border:1px solid #ddd;
                padding:20px;
                margin-bottom:10px;
            }
            .A .B{
                text-align:right;
                margin-bottom:-15px;
            }
            .A .C{
                font-size:20px;
                color:#999;
                cursor:pointer;
            }
            .A .D{
                width:150px;
                margin-right:10px;
            }
            .E{
                width:100%;
                border:1px dashed #ddd;
                text-align:center;
                line-height:40px;
                font-size:20px;
                color:#999;
                cursor:pointer;
                background:#fafafa;
                margin-bottom:10px;
            }
            `}
        </style>

        return (
            <div>
                <p>步骤一（修改选项卡时，请点击确定按钮保存）</p>
                {
                    (this.state.componnetArray).map((index, item) =>
                        <div key={item}>
                            <p>{index + 1}、</p>
                            <div className="A" >
                                <p className="B" ><Icon type="close" className="C" onClick={e => this.reduceComp(e, item)} /></p>
                                <TheChildren2 encapsulation={this.encapsulation} />
                            </div>
                        </div>
                    )
                }
                <div
                    className="E"
                    onClick={this.addComponent}
                >+</div>
                <Divider />
                <Button type="primary" onClick={this.test}>填写下一项</Button>
                {styles}
            </div>
        );
    }
}

class C extends React.Component {

    do = () => {
        let A = [];
        const data = this.props.datas;
        for (let i = 0; i < data.length; i++) {
            A.push({
                combineValue: data[i],
                picUrl: localStorage.getItem("img_" + i),
                code: localStorage.getItem("code_" + i) == null ? "" : localStorage.getItem("code_" + i),
                originalPrice: parseFloat(localStorage.getItem("price_" + i)),
                inventory: parseInt(localStorage.getItem("stock_" + i))
            });
        }
        let B = this.props.firstd;
        B["sku"] = A;
        B["attributes"] = this.props.old;
        B["mainPictures"] = this.props.secondd.mainPictures;
        B["promotionPicture"] = this.props.secondd.promotionPicture[0];
        B["detailPictures"] = this.props.secondd.detailPictures;
        B["video"] = this.props.secondd.video == null ? "" : this.props.secondd.video;
        // alert(JSON.stringify(B))
        baseApi(`/api/v1/admin/goods/info/publish`, B,
            (result) => { this.props.finish() }
        )
    }


    render() {
        const props2 = {
            action: 'http://rkk.nbqq.cn/api/v1/admin/files/photo/upload',
            listType: 'picture',
            multiple: false,
            name: "photo",
            headers: {
                'TOKEN': localStorage.getItem("token"),
                'ID': parseInt(localStorage.getItem("id"))
            },
            data: {
                token: localStorage.getItem("token"),
                id: localStorage.getItem("id"),
            }
        };
        return (
            <div>
                <p>步骤二：</p>
                <Alert message="根据你上一项填写的参数，生成如下组合，请完整填写以下数据：" type="info" />
                <div style={{ marginTop: "25px" }}>
                    {
                        (this.props.datas).map((item, index) =>
                            <div key={index}>
                                <p>{index + 1}、{item}</p>
                                <p style={{ textAlign: "right", marginTop: "-40px" }}>
                                    <Input
                                        style={{ width: "150px", marginRight: "10px" }}
                                        placeholder="商品码（选填）"
                                        onChange={e => localStorage.setItem("code_" + index, e.target.value)}
                                    />
                                    <InputNumber
                                        min={1}
                                        step={0.1}
                                        max={10000}
                                        prefix="￥"
                                        placeholder="价格"
                                        style={{ width: "100px", marginRight: "10px" }}
                                        onChange={e => localStorage.setItem("price_" + index, e)}
                                    />
                                    <InputNumber
                                        min={1}
                                        step={1}
                                        prefix="￥"
                                        placeholder="库存"
                                        style={{ width: "100px", marginRight: "10px" }}
                                        onChange={e => localStorage.setItem("stock_" + index, e)}
                                    />
                                    <Upload
                                        {...props2}
                                        onChange={
                                            ({ file, fileList }) => {
                                                if (file.status !== 'uploading') {
                                                    if (file.response.data.code == "SUCCESS") {
                                                        localStorage.setItem("img_" + index, file.response.data.data.url);
                                                        message.success("上传成功！");
                                                    }
                                                } else if (file.status !== 'done') {
                                                    //do nothing
                                                }
                                            }
                                        }
                                        onRemove={
                                            (index) => {
                                                baseApi(`/api/v1/admin/files/goods/photo/remove`,
                                                    { url: sessionStorage.getItem(index) },
                                                    (result) => {
                                                        if (result.code == "0_0") message.success(item + "删除成功！");
                                                        else message.error(item + "删除失败！");
                                                    })
                                            }
                                        }
                                    >
                                        <Button><Icon type="upload" /> 点此上传图片</Button>
                                    </Upload>

                                </p>
                                <Divider />
                            </div>
                        )
                    }
                </div>


                <Button type="primary" onClick={this.do}>完成</Button>
            </div>
        );
    }
}

export default class A extends React.Component {

    state = {
        position: 0
    }

    constructor(props) {
        super(props)
        this.encapsulation = this.encapsulation.bind(this);
        this.finish = this.finish.bind(this)
    }

    finish() {
        this.props.wc()
    }

    encapsulation(someValue) {
        let A = [];
        const B = someValue.data;
        for (let i = 0; i < B.length; i++) {
            let C = [];
            for (let j = 0; j < B[i].children.length; j++) {
                C.push(B[i].children[j].value);
            }
            A.push({
                name: B[i].name,
                children: C
            });
        }
        this.setState({ res: someValue.res, position: someValue.position, data: A })
    }

    render() {

        const step = [
            <TheParent encapsulation={this.encapsulation} />,
            <C datas={this.state.res} old={this.state.data} firstd={this.props.yi} secondd={this.props.er} finish={this.finish} />
        ];

        return (
            <div>
                {step[this.state.position]}
            </div>
        );
    }
}