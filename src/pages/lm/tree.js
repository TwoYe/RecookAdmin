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
    Spin,
    Tree
} from 'antd';
import { baseApi } from '../../services/base';

const { TreeNode } = Tree;

class Demo extends React.Component {


    state = {
        treeData: [],
    };
    componentWillMount() {
        baseApi(`/api/v1/admin/goods/categories/first`,{},(res)=>{
            if(res.code=="0_0") {
                let A=[];
                for(let i=0;i<res.data.length;i++){
                    A.push({
                        title:res.data[i].name,
                        key:i,
                        id:res.data[i].id
                    })
                }
                this.setState({
                    treeData:A
                })
            }
        })
    }

    onLoadData = treeNode =>
        new Promise(resolve => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            let A=[];
            baseApi(`/api/v1/admin/goods/categories/children`,{
                parentID:treeNode.props.id
            },(res)=>{
                if(res.code=="0_0") {
                    for(let i=0;i<res.data.length;i++){
                        A.push({
                            title:res.data[i].name,
                            key:i,
                            id:res.data[i].id
                        })
                    }
                }
            })
            setTimeout(() => {
                treeNode.props.dataRef.children = A;
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        });

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />;
        });

    render() {
        return (
            <Spin spinning={false} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} tip="数据加载中，请稍后">
                <Tree loadData={this.onLoadData}>{this.renderTreeNodes(this.state.treeData)}</Tree>
            </Spin>
        );
    }
}

export default Demo;