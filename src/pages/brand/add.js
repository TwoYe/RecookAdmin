//新增商品组件
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
    message
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';
import A from './branddetail';

export default class B extends React.Component {

    constructor(props) {
        super(props)
        this.updateParent= this.updateParent.bind(this);
      }

      updateParent() {
        this.setState({ position:1})
      }

    state = {
        position: 0
    }

    reset=()=>{
        this.setState({position:0})
    }
    
    render() {
        const res = <div>
            <p style={{ textAlign: "center",marginTop:"50px"}}>
                <Icon type="check-circle" style={{ fontSize: "50px", color: "#52c41a" }} theme="filled" />
            </p>
            <div style={{ color: '#000', textAlign: "center", fontSize: "20px", fontWeight: "bold",}}>品牌录入成功</div>
            <Button type="primary" style={{display:"block",margin:"40px auto"}} onClick={this.reset}>返回继续添加</Button>
        </div>
        const HAHA = [
            <A updateParent= {this.updateParent}/>,
            res
        ];
        return (
            <div>
                <PageHeaderWrapper>
                <Card style={{ width: "100%" }}>
                    {HAHA[this.state.position]}
                </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}