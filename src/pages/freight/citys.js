import React from 'react';
import { Checkbox, Divider, Button, Popover, Icon,message} from 'antd';
import { baseApi } from '@/services/base';

const CheckboxGroup = Checkbox.Group;

export default class A extends React.Component {

    state = {
        checkedList: [],
        area: [],
        text: ""
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
                this.setState({ area: B });
            }
        })
        if(this.props.lock.length==31){message.error("已经没有可供选择的地区啦")}
    }

    onChange = checkedList => {

        //请传递锁定数组，和更新锁定数组的方法。
        let lock = this.props.lock;

        //判断加锁还是去锁
        if (checkedList.length >= this.state.checkedList.length) {
            //加锁
            var newLock = lock.concat(checkedList.filter(function (v) { return !(lock.indexOf(v) > -1) }));
            this.props.updateLock({
                newlock:newLock,
                checked:checkedList,
                item:this.props.item
            });//传递新的锁定值
        }
        else {
            //去锁
            let a = checkedList;
            let b = this.state.checkedList;
            //补集
            let c = a.filter(function (v) { return !(b.indexOf(v) > -1) }).concat(b.filter(function (v) { return !(a.indexOf(v) > -1) }));
            var newLock = lock.filter(function (v) { return !(c.indexOf(v) > -1) }).concat(c.filter(function (v) { return !(lock.indexOf(v) > -1) }));
            this.props.updateLock({
                newlock:newLock,
                checked:checkedList,
                item:this.props.item
            });//传递新的锁定值
        }


        if (checkedList.length == 0) {
            this.setState({ text: "" })
        }
        else {
            this.setState({ text: <span><hr />{JSON.stringify(checkedList).replace("[", "").replace("]", "").replace(/\"/g, "").replace(/,/g, "、")}</span> })
        }

        this.setState({
            checkedList: checkedList
        });

    };

    render() {
        let lock = this.props.lock;
        let B = this.state.area;
        var list = B.filter(function (v) { return !(lock.indexOf(v) > -1) }).concat(lock.filter(function (v) { return !(B.indexOf(v) > -1) }));
        var select = this.state.checkedList;
        var res = select.concat(list.filter(function (v) { return !(select.indexOf(v) > -1) }));
        return (
            <div>
                <Popover
                    content={<CheckboxGroup
                        options={res}
                        onChange={this.onChange}
                        style={{ width: "400px" }}
                    />}
                    trigger="click"
                >
                    <a href="javascript:;" style={{ color: "#555" }}><Icon type="environment" /> 选择地区</a>
                </Popover>
                <div style={{ maxWidth: this.props.maxwidth }}>
                    {this.state.text}
                </div>
            </div>
        );
    }
}