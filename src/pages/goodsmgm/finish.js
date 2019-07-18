
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



export default class A extends React.Component {

    reset=()=>{
        this.props.reset();
    }

    render() {
        return (
            <div className="mainBorder">
                <p style={{textAlign:"center"}}>
                <Icon type="check-circle" style={{fontSize:"50px",color:"#52c41a"}} theme="filled"/>
                </p>
                <div style={{  color: '#000',textAlign:"center",fontSize:"20px",fontWeight:"bold"}}>恭喜！商品发布成功<br />
                <Button style={{marginTop:"20px"}} type="primary" onClick={this.reset}>再添加一个</Button>
                </div>
            </div>
        );
    }
}