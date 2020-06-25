import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import { Form, Input, Button, } from 'antd';
import { RollbackOutlined, HighlightOutlined, SendOutlined } from '@ant-design/icons';
import FileBase64 from 'react-file-base64'
import axios from 'axios'

const styles = theme => ({
    grid: {
        textAlign: 'left',
        fontSize: '20px',
        fontFamily: 'auto'
    },
    subject: {
        fontSize: '30px',
        textAlign: 'center',
        fontFamily: 'auto'
    }
})
class FormAddMarketing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null
        }
        this.onStoreMarketing = this.onStoreMarketing.bind(this)
        this.storeMarketing = this.storeMarketing.bind(this)
    }
    // khai báo upload image
    getFiles(files) {
        this.setState({ selectedFile: files[0].file })
        //console.log(files)
    }
    onStoreMarketing = element => {
        const { subject, name, type, contents, startDate, endDate, status, selectedFile } = this.state
        let select = this.state
        console.log(select)
        this.storeMarketing(select)
    }
    async storeMarketing(data) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        let URL = process.env.REACT_APP_BASE_URL + '/api/marketing/';

        // create formdata
        const { subject, name, type, contents, startDate, endDate, status, selectedFile } = data
        let formdata = new FormData()
        formdata.append('avatar', selectedFile)
        formdata.append('subject', subject);
        formdata.append('type', type);
        formdata.append('contents', contents);
        formdata.append('startDate', startDate);
        formdata.append('endDate', endDate);
        formdata.append('status', status);
        formdata.append('name', name);

        let options = { content: formdata }
        axios.post(URL, formdata)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload()
    }
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        }
        const { open, subject, content } = this.state
        const { classes } = this.props
        // console.log('data update', data)
        return (
            <div>

                <Grid container spacing={0} className={classes.grid}>
                    <Grid item xs={12}>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                label="Chủ đề"
                                name="subject"
                                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                            >
                                <Input
                                    placeholder="subject"
                                    onChange={(element) => this.setState({ subject: element.currentTarget.value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                            >
                                <Input
                                    placeholder="name"
                                    onChange={(element) => this.setState({ name: element.currentTarget.value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Thể loại"
                                name="type"
                                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                            >
                                <Input
                                    placeholder="type"
                                    onChange={(element) => this.setState({ type: element.currentTarget.value })}
                                />
                            </Form.Item>
                            <Form.Item
                                name='Nội dung'
                                label="contents"
                                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                            >
                                <Input.TextArea
                                    placeholder="contents"
                                    onChange={(element) => this.setState({ contents: element.currentTarget.value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Ngày bắt đầu"
                                name="startDate"
                                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                            >
                                <Input
                                    placeholder="startDate format: yyyy/mm/dd hh:mm:ss"
                                    onChange={(element) => this.setState({ startDate: element.currentTarget.value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Ngày kết thúc"
                                name="endDate"
                                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                            >
                                <Input
                                    placeholder="endDate format: yyyy/mm/dd hh:mm:ss"
                                    onChange={(element) => this.setState({ endDate: element.currentTarget.value })}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Trạng thái"
                                name="status"
                                rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                            >
                                <Input
                                    placeholder="start / doing / exprired / complete / lose "
                                    onChange={(element) => this.setState({ status: element.currentTarget.value })}
                                />
                            </Form.Item>
                            <h4>Vui lòng chọn ảnh đại diện</h4>
                            { // upload image product
                                <FileBase64
                                    multiple={true}
                                    onDone={this.getFiles.bind(this)}
                                />
                            }
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" icon={<SendOutlined />}
                                    onClick={this.onStoreMarketing}
                                >
                                    Save
                                        </Button>
                            </Form.Item>
                        </Form>
                    </Grid>
                </Grid>

            </div>
        )
    }
}
export default withStyles(styles)(FormAddMarketing);
