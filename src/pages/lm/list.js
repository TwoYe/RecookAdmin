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
    message,
    Table,
    Spin
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { baseApi } from '../../services/base';
import Tree from './tree';


class A extends React.Component{
    render(){
        return(
            <div>
                <PageHeaderWrapper>
                    <Card style={{width:"100%"}}>
                        <Tree />
                    </Card>
                </PageHeaderWrapper>
            </div>
        );
    }
}

export default A;