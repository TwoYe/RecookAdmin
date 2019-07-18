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
    Switch,
    message,
    Spin
} from 'antd';
const Dragger = Upload.Dragger;
import BUP from './baseUp';

export default class A extends React.Component {

    constructor(props) {
        super(props)
        this.loading = this.loading.bind(this);
        this.loaded = this.loaded.bind(this);
    }
    state = {
        loading: false
    }

    loading = () => {
        this.setState({ loading: true })
    }
    loaded = () => {
        this.setState({ loading: false })
    }

    next = () => {
        const zt = sessionStorage.getItem("zt") == null ? [] : JSON.parse(sessionStorage.getItem("zt")),
            pt = sessionStorage.getItem("pt") == null ? [] : JSON.parse(sessionStorage.getItem("pt")),
            hdt = sessionStorage.getItem("hdt") == null ? [] : JSON.parse(sessionStorage.getItem("hdt"));
        let main = [];
        if (zt.length == 0) message.error("请至少上传一张主图");
        else if (pt.length == 0) message.error("请至少上传一张配图");
        else {
            for (let i = 0; i < zt.length; i++) {
                main.push({
                    isMaster: i == 0 ? 1 : 0,
                    orderNo: i,
                    width: zt[i].width,
                    height: zt[i].height,
                    url: zt[i].name
                });
            }
            let pts = [];
            for (let i = 0; i < pt.length; i++) {
                pts.push({
                    isMaster: 0,
                    orderNo: i,
                    width: pt[i].width,
                    height: pt[i].height,
                    url: pt[i].name
                });
            }
            let result = {
                mainPictures: main,
                detailPictures: pts,
                promotionPicture: hdt == [] ? [] : [
                    {
                        width: hdt[0].width,
                        height: hdt[0].height,
                        url: hdt[0].name
                    }
                ],
                video: { url: sessionStorage.getItem("video") }
            }
        this.props.updateParent({ step: 2, result: result });
            //alert(JSON.stringify(result))
        }



    }

    render() {
        const props = {
            name: 'file',
            multiple: false,
            action: 'http://rkk.nbqq.cn/api/v1/admin/files/video/upload',
            name: "video",
            headers: {
                'TOKEN': localStorage.getItem("token"),
                'ID': parseInt(localStorage.getItem("id"))
            },
            data: {
                token: localStorage.getItem("token"),
                id: localStorage.getItem("id"),
            },
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success("视频上传成功");
                    sessionStorage.setItem("video", info.file.response.data.data.url);
                } else if (status === 'error') {
                    message.error(`视频上传失败`);
                }
            },
        };
        return (
            <Spin spinning={this.state.loading} tip="数据处理中，这可能需要一点时间，请耐心等待" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                <div>
                    <h3>必填项</h3>
                    <p style={{ marginTop: "15px" }}>商品主要图片（宽高比例为 1:1，其中第一张为主图） - 至少 1 张，至多 5 张</p>
                    <BUP max={5} name="zt" is11={true} loading={this.loading} loaded={this.loaded} />
                    <p style={{ marginTop: "15px" }}>商品详情图 - 至少 1 张，至多 15 张</p>
                    <BUP max={15} name="pt" is11={false} loading={this.loading} loaded={this.loaded} />
                    <h3 style={{ marginTop: "30px" }}>选填项</h3>
                    <p style={{ marginTop: "15px" }}>商品活动图 - 至多 1 张</p>
                    <BUP max={1} name="hdt" is11={false} loading={this.loading} loaded={this.loaded} />
                    <p style={{ marginTop: "15px" }}>视频</p>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="youtube" />
                        </p>
                        <p className="ant-upload-text" style={{ color: "#999" }}>点击此处，或将视频文件拖拽至此</p>
                    </Dragger>
                    <Divider />
                    <Button type="primary" onClick={this.next}>下一步</Button>
                </div>
            </Spin>
        );
    }
}