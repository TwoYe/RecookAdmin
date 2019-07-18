
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
import Ag from './price';



export default class A extends React.Component {
    constructor(props) {
        super(props)
        this.wc = this.wc.bind(this)
    }

    wc() {
        this.props.finish()
    }

    render() {


        return (
            <div className="mainBorder">
                <Ag yi={this.props.firstd} er={this.props.secondd} wc={this.wc}/>
            </div>
        );
    }
}