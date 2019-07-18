
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
    Switch
} from 'antd';
import Up from './upload';



export default class A extends React.Component {

    //声明构造函数用来给子组件赋值
    constructor(props) {
        super(props)
        this.updateParent = this.updateParent.bind(this);
    }

    updateParent(someValue) {
        this.props.second(someValue)
    }
    render() {

        return (
            <div className="mainBorder">
                <Up updateParent={this.updateParent} />
            </div>
        );
    }
}