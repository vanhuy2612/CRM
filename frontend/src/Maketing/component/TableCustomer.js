import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import { Form, Input, Button, } from 'antd';
import { RollbackOutlined, HighlightOutlined, SendOutlined } from '@ant-design/icons'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        backgroundColor: '#D6E2F3',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    ButtonMail: {
        textAlign: 'center',
        padding: 40,
    }
});

class TblCustomers extends Component {
    constructor(props) {
        super(props)
        this.showSendMailForm = this.showSendMailForm.bind(this);
        this.sendMail = this.sendMail.bind(this);

        this.state = {
            open: true,
            display: true
        }
        this.columns = [
            { title: 'Avatar', field: 'urlImage', type: "String", render: rowData => <img src={rowData.urlImage} style={{ width: 50, borderRadius: '50%' }} /> },
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Address', field: 'address', type: "String" },
            { title: 'Nghề nghiệp', field: 'job', type: "String" },
            { title: 'Phone', field: 'phone', type: "String" },
            { title: 'Email', field: 'email', type: 'String' },
            { title: 'Type', field: 'type', type: "String" },
            { title: 'Chi nhánh', field: 'branchId', type: "String" },
            { title: 'Ngày tạo', field: 'createdAt', type: 'Date' },
            { title: 'Thay đổi gần nhất', field: 'createdAt', type: 'Date' },
        ]
    }
    // Send Mail
    sendMail = element => {
        let { to, subject, content } = this.state
        console.log(subject, content, to)
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token;
        let URLSendMail = process.env.REACT_APP_BASE_URL + '/api/mail/sendmail';
        axios.post(URLSendMail, {
            to: to,
            subject: subject,
            content: content
        }).then(function (response) {
            console.log(response.data)
        })
            .catch(function (error) {
                console.log(error);
            }); window.location.reload()
    }
    // Click send mail to show sendmail form:
    showSendMailForm() {
        this.setState({
            display: false
        })
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
        const { columns } = this
        const { data, classes } = this.props
        console.log('data', data)
        let customers  // Danh sách khách hàng
        let listEmail // Danh sách email của khách hàng

        data.map((elemMar, index) => { // loop in marketing
            customers = elemMar.customers
            customers.map((customer, index) => { // loop in customer
                let contacts = customer.contacts
                contacts.map((contact, index) => { // loop in contact
                    if (contact.type == "phone") {
                        customer.phone = contact.link
                    } else if (contact.type == "email") {
                        customer.email = contact.link
                        listEmail = `${listEmail},<${contact.link}>`
                    }
                })
            })

        })
        console.log("customers:", customers)
        console.log("list email:", listEmail)

        return (
            <>
                <MaterialTable
                    title="Danh sách các khách hàng trong chiến dịch Marketing:"
                    columns={columns}
                    data={customers}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        console.log('Chưa có api update customer')
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    console.log('Chưa có api delete customer')
                                }, 600);
                            }),
                    }}
                />
                {/* Button show form send mail */}
                <Grid item xs={12} className={classes.ButtonMail}>
                    <Button type="primary" icon={<RollbackOutlined />} size={'large'} onClick={(element) => this.props.history.push(`/Contacts/${element}`)}>
                        Back
                                </Button>
                    <Button type="primary" icon={<HighlightOutlined />} size={'large'} style={{ marginLeft: 20 }}
                        onClick={this.showSendMailForm}
                    >
                        Gửi mail cho khách hàng
                                </Button>
                </Grid>
                {/* Form send mail */}
                <Grid item xs={12} hidden={this.state.display}>
                    <Form
                        {...layout}
                        name="basic"
                    // initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="Người nhận"
                            name="to"
                            // initialValue={listEmail}
                            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                        >
                            <Input
                                value={listEmail}
                                onChange={(element) => this.setState({ to: element.currentTarget.value })}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Chủ đề"
                            name="subject"
                            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                        >
                            <Input
                                value={subject}
                                onChange={(element) => this.setState({ subject: element.currentTarget.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            name='Nội dung'
                            label="Nội dung"
                            rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                        >
                            <Input.TextArea
                                value={content}
                                onChange={(element) => this.setState({ content: element.currentTarget.value })}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" icon={<SendOutlined />}
                                onClick={this.sendMail}
                            >
                                Gửi
                                        </Button>
                        </Form.Item>
                    </Form>
                </Grid>
            </>
        )
    }
}
export default withStyles(styles)(TblCustomers);