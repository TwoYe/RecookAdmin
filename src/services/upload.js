import request from '@/utils/request';

export async function deletes(params) {

    fetch(`http://rkk.nbqq.cn/api/v1/admin/files/goods/photo/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ mobile: this.state.username, password: this.state.password })
      }).then(res => res.json()).then(
        data => {
          if (data.code == "SUCCESS") {
            if (data.data.code != "SUCCESS") {
                this.setState({ 
                    vailUser:{status:"error",help:"用户名、密码不匹配，请检查后重新输入！"},
                    btnLoading:false
                });
            }
            else {
                setAuthority("admin");
              localStorage.setItem("token",data.data.data.token);
              localStorage.setItem("id",data.data.data.id);
              cookie.save('token', data.data.data.token);
              cookie.save('id', data.data.data.id);
              window.location.href= '/';
            }

          } else {
            this.setState({ 
                vailUser:{status:"error",help:data.msg},
                btnLoading:false
            });
          }
        }
      );
    //return request('http://rkk.nbqq.cn/api/v1/admin/files/goods/photo/remove?${stringify(params)}');
}