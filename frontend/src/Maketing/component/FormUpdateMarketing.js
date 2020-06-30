import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import { Form, Input, Button, } from 'antd';
import { RollbackOutlined, HighlightOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios'
import _ from 'lodash'

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
class FormUpdateMarketing extends Component {
    constructor(props) {
        super(props)
        this.UpdateDetailMarketing = this.UpdateDetailMarketing.bind(this)
        this.UpdateMarketing = this.UpdateMarketing.bind(this)
        this.state = {
        }
    }
    UpdateDetailMarketing(element){
        const {data} = this.props
        const  {subject, name, type, contents, startDate, endDate, status} = this.state
       
        let select = this.state
        select.id = data[0].id       
                    
        // console.log(select)
        this.UpdateMarketing(select)
    }
    async UpdateMarketing(data){
        console.log(data)
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token;
        let URL = process.env.REACT_APP_BASE_URL + '/api/marketing/' + data.id;
        let dataCustomer = await (axios.put(URL, data))
        let dataRecive = _.get(dataCustomer, "data", [])
        
        if(dataRecive.errors != undefined) {
            console.log(dataRecive)           
        } else window.location.reload()
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
        const { data, classes } = this.props
        console.log('data update', data)
        return (
            <div>
                {data.map((element, index) => (
                    <Grid container spacing={0} key={index} className={classes.grid}>
                           <Grid item xs={12}>
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ remember: true }}
                                >
                                    <Form.Item
                                        label="Chủ đề"
                                        name="subject"
                                        initialValue={element.subject}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input
                                            value={element.subject}
                                            onChange={(element) => this.setState({subject: element.currentTarget.value})}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Tên"
                                        name="name"
                                        initialValue={element.name}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input  
                                            value={element.name}
                                            onChange={(element) => this.setState({name: element.currentTarget.value})}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Thể loại"
                                        name="type"
                                        initialValue={element.type}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input  
                                            value={element.type}
                                            onChange={(element) => this.setState({type: element.currentTarget.value})}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        name= 'Nội dung' 
                                        label="contents"
                                        initialValue={element.contents}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input.TextArea 
                                            value={element.contents}
                                            onChange={(element) => this.setState({contents: element.currentTarget.value})}  
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ngày bắt đầu"
                                        name="startDate"
                                        initialValue={element.startDate}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input  
                                            value={element.startDate}
                                            onChange={(element) => this.setState({startDate: element.currentTarget.value})}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ngày kết thúc"
                                        name="endDate"
                                        initialValue={element.endDate}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input  
                                            value={element.endDate}
                                            onChange={(element) => this.setState({endDate: element.currentTarget.value})}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Trạng thái"
                                        name="status"
                                        initialValue={element.status}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input  
                                            value={element.status}
                                            onChange={(element) => this.setState({status: element.currentTarget.value})}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ảnh đại diện"
                                        name="urlImage"
                                        initialValue={element.urlImage}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input  
                                            value={element.status}
                                            onChange={(element) => this.setState({urlImage: element.currentTarget.value})}
                                        />
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit" icon={<SendOutlined />} style={{borderRadius: 20}}
                                            onClick={this.UpdateDetailMarketing}
                                        >
                                            Update 
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Grid>
                    </Grid>
                ))}
            </div>
        )
    }
}
export default withStyles(styles)(FormUpdateMarketing);
