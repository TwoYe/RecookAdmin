import React from 'react';
import {
    PageHeader,
    Divider,
    Steps,
    Icon,
    Form,
    Input,
    Button
} from 'antd';
import { setAuthority } from '../../utils/authority';
import { baseApi } from '../../services/base';


export default class A extends React.Component {
    state = {
        vailUser: { status: "", help: "" },
        vailPass: { status: "", help: "" },
        btnLoading: false
    }

    tj = () => {
        if (this.state.username == "") this.setState({ vailUser: { status: "error", help: "用户名不可以为空！" } })
        else if (this.state.password == "") this.setState({ vailUser: { status: "", help: "" }, vailPass: { status: "error", help: "密码也可以为空！" } });
        else {
            this.setState({
                vailUser: { status: "", help: "" },
                vailPass: { status: "", help: "" },
                btnLoading: true
            });

            baseApi("/api/v1/admin/user/login",
                { mobile: this.state.username, password: this.state.password },
                (result) => {
                    if (result.code == "-1") this.setState({ vailUser: { status: "error", help: result.msg }, btnLoading: false });
                    else if (result.code == "0_-1") this.setState({ vailUser: { status: "error", help: "账户密码有误，请重试！" }, btnLoading: false });
                    else{
                        setAuthority("admin");
                        localStorage.setItem("token", result.data.token);
                        localStorage.setItem("id", result.data.id);
                        localStorage.setItem("name", result.data.name);
                        localStorage.setItem("password", this.state.password);
                        window.location.href = '/';
                    }
                });
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
                  width:300px;
                  margin:50px auto;
                  margin-top:100px;
              }
           `}</style>


        return (
            <div>
                <Form className="mainBorder">
                    <Form.Item
                        validateStatus={this.state.vailUser.status}
                        help={this.state.vailUser.help}
                    >
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            size="large"
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.state.vailPass.status}
                        help={this.state.vailPass.help}
                    >
                        <Input
                            placeholder="密码"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            size="large"
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            block
                            size="large"
                            onClick={this.tj}
                            loading={this.state.btnLoading}
                        >
                            登 录
                            </Button>
                    </Form.Item>
                </Form>
                {styles}
            </div>
        );
    }
}