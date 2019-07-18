import { Upload, Icon, Modal, message } from 'antd';
import { baseApi } from '../../services/base';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ file, fileList }) => {
        const status = file.status;
        const { name } = this.props;
        const that = this.props;
        that.loading();
        if (status !== 'uploading') { }
        if (status === 'done') {
            //获取图片的宽高
            let getKey = (imgUrl) => {
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = imgUrl;
                    img.onload = () => {
                        let w = img.width;
                        let h = img.height;

                        let key = {
                            width: w,
                            height: h
                        }
                        resolve(key);
                    }
                    img.onerror = () => reject()
                })
            }
            let result = getKey("http://rkk.nbqq.cn/files" + file.response.data.data.url);
            let key;
            result.then(resp => {
                key = resp;
                let A = sessionStorage.getItem(name) == null ? [] : JSON.parse(sessionStorage.getItem(name));
                A.push({
                    name: file.response.data.data.url,
                    width: key.width,
                    height: key.height
                });
                sessionStorage.setItem(name, JSON.stringify(A));
                message.success("图片上传成功");
                that.loaded();
            })
        } else if (status === 'error') message.error(`图片上传失败`);
        this.setState({ fileList });
    };


    delete = (file) => {
        const that = this.props;
        that.loading();
        let A = sessionStorage.getItem(that.name) == null ? [] : JSON.parse(sessionStorage.getItem(that.name));
        for (let i = 0; i < A.length; i++) {
            if (A[i].name == file.response.data.data.url) {
                A.splice(A[i], 1)
                break;
            }
        }
        sessionStorage.setItem(that.name,JSON.stringify(A));
        baseApi(`/api/v1/admin/files/photo/remove`,
            {
                url: file.response.data.data.url
            }, (res) => {
                that.loaded();
                if (res.code == "0_0") message.success("图片删除成功！");
                else message.error("图片删除失败！");
            }
        )
    }

    //checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject阻止图片上传
    checkImageWH(file) {
        let self = this;
        return new Promise(function (resolve, reject) {
            let filereader = new FileReader();
            if (file.type != "image/jpeg" && file.type != "image/gif" && file.type != "image/png") {
                message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片');
                reject();
            }
            else {
                filereader.onload = e => {
                    let src = e.target.result;
                    const image = new Image();
                    image.onload = function () {
                        if (this.width / this.height != 1) {
                            message.error('请上传宽高比例为 1:1 的图片');
                            reject();
                        }
                        else {
                            resolve();
                        }
                    };
                    image.onerror = reject;
                    image.src = src;
                };
            }
            filereader.readAsDataURL(file);
        });
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">点此上传</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="http://rkk.nbqq.cn/api/v1/admin/files/photo/upload"
                    listType="picture-card"
                    fileList={fileList}
                    name="photo"
                    headers={
                        {
                            'TOKEN': localStorage.getItem("token"),
                            'ID': parseInt(localStorage.getItem("id"))
                        }
                    }
                    data={
                        {
                            token: localStorage.getItem("token"),
                            id: localStorage.getItem("id"),
                        }
                    }
                    onPreview={this.handlePreview}
                    onChange={info => this.handleChange(info)}
                    beforeUpload={this.props.is11 ? this.checkImageWH : null}
                    onRemove={this.delete}
                >
                    {fileList.length >= this.props.max ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall;