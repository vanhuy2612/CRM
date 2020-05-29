import React, { Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Form, Input, Button, } from 'antd';
import { RollbackOutlined, HighlightOutlined, SendOutlined } from '@ant-design/icons';
import Avatar from '../Components/Avatar'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Activity, Products, Deals, Contacts, Accounts } from '../Components/ListItems';
import axios from 'axios'
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
class ViewMails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            dataMail: [],
            display: true
        }
    }

    handleDrawerOpen = () => {
        this.setState({
            open: true
        })
    };
    handleDrawerClose = () => {
        this.setState({
            open: false
        })
    };
    handleLogOut = () => {
        this.props.history.push('/')
    }

    // login 
    handleLogOut = () => {
        this.props.history.push('/')
    }
    // rent to order or dashboard or ...
    handleToOrders = (element) => {
        this.props.history.push(`/Orders/${element}`)
    }
    handleToCustomers = (element) => {
        this.props.history.push(`/Customers/${element}`)
    }
    handleToDashboard = (element) => {
        this.props.history.push(`/Dashboard/${element}`)
    }
    handleToDashReports = (element) => {
        this.props.history.push(`/Reports/${element}`)
    }
    handleToAccounts = (element) => {
        this.props.history.push(`/Accounts/${element}`)
    }
    handleToActivity = (element) => {
        this.props.history.push(`/Activity/${element}`)
    }
    handleToProducts = (element) => {
        this.props.history.push(`/Products/${element}`)
    }
    handleToDeals = (element) => {
        this.props.history.push(`/Deals/${element}`)
    }
    handleToContacts = (element) => {
        this.props.history.push(`/Contacts/${element}`)
    }
    // Send Mail
    sendMail = element => {
        let to = this.props.location.state.data.from
        let {subject, content} = this.state
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
        const { data } = this.props.location.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Contatcs
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Tooltip title="Đăng xuất" key="logout">
                        <List style={{ marginLeft: '80px', marginRight: '90px', }} onClick={this.handleLogOut}>{Login}</List>
                    </Tooltip>
                    <Divider />
                    <List onClick={this.handleToDashboard}>{Dashboard}</List>
                    <List onClick={this.handleToOrders}>{Order}</List>
                    <List onClick={this.handleToCustomers}>{Customers}</List>
                    <List onClick={this.handleToDashReports}>{Reports}</List>
                    <Divider />
                    <List onClick={this.handleToActivity}>{Activity}</List>
                    <List onClick={this.handleToProducts}>{Products}</List>
                    <List onClick={this.handleToDeals}>{Deals}</List>
                    <List onClick={this.handleToContacts}>{Contacts}</List>
                    <List onClick={this.handleToAccounts}>{Accounts}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <div dangerouslySetInnerHTML={{ __html: data.html }} />
                            </Grid>
                            <Grid item xs={12} className={classes.ButtonMail}>
                                <Button type="primary" icon={<RollbackOutlined />} size={'large'} onClick={(element) => this.props.history.push(`/Contacts/${element}`)}>
                                    Back
                                </Button>
                                <Button type="primary" icon={<HighlightOutlined />} size={'large'} style={{ marginLeft: 20 }}
                                    onClick={() => this.setState({display: false})}
                                >
                                    Trả lời
                                </Button>
                            </Grid>
                            <Grid item xs={12} hidden={this.state.display}>
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ remember: true }}
                                >
                                    <Form.Item
                                        label="Người nhận"
                                        name="to"
                                        initialValue={data.from}
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input 
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Chủ đề"
                                        name="subject"
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input  
                                            value={subject}
                                            onChange={(element) => this.setState({subject: element.currentTarget.value})}
                                        />
                                    </Form.Item>

                                    <Form.Item 
                                        name= 'Nội dung' 
                                        label="Nội dung"
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }]}
                                    >
                                        <Input.TextArea 
                                            value={content}
                                            onChange={(element) => this.setState({content: element.currentTarget.value})}
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
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(ViewMails);
