import { Result, Icon, Button } from 'antd';

export default class A extends React.Component {
    t=()=>{
        this.props.reset();
    }
    render() {
        return (
            <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title="非常好，我们已经完成了所有步骤并提交成功！"
                extra={<Button type="primary" onClick={this.t}>返回继续添加</Button>}
            />
        );
    }
}