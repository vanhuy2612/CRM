import React, { Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AddIcon from '@material-ui/icons/Add'
import { Form, Input, Button, } from 'antd';
import { RollbackOutlined, HighlightOutlined, SendOutlined } from '@ant-design/icons';
import Avatar from '../Components/Avatar'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Products, Deals, Contacts, Accounts, Maketing } from '../Components/ListItems';
import axios from 'axios'
import _ from 'lodash'
import PerformMarketing from './component/PerformMarketing'
import TableMember from './component/TableMember'
import TableCustomer from './component/TableCustomer'
import FormUpDateMarketing from './component/FormUpdateMarketing'
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
class DetailMarketing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            dataMail: [],
            display: true,
            detail: []
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
    handleToOrders = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
           pathname: `/Orders/${user}`,
           state : {urlAvatar: urlAvatar}
       })
      }
    handleToDashboard = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
           pathname: `/Dashboard/${user}`,
           state : {urlAvatar: urlAvatar}
       })
      }
      handleToDashReports = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
          pathname: `/Reports/${user}`,
          state: {urlAvatar: urlAvatar},
        })
      }
      handleToAccounts = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
          pathname: `/Accounts/${user}`,
          state: {urlAvatar: urlAvatar},
        })
      }
      handleToCustomers = element =>{
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
          pathname: `/Customers/${user}`,
          state: {urlAvatar: urlAvatar},
        })
      }
      // handleToActivity = element => {
      //   let user = this.props.match.params.id
      //   this.props.history.push(`/Activity/${user}`)
      // }
      handleToProducts = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
          pathname: `/Products/${user}`,
          state: {urlAvatar: urlAvatar },
        })
      }
      handleToDeals = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
          pathname: `/Deals/${user}`,
          state: {urlAvatar: urlAvatar },
        })
      }
      handleToContacts = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
          pathname: `/Contacts/${user}`,
          state: {urlAvatar: urlAvatar },
        })
      }
      handleToMaketing = element => {
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        this.props.history.push({
          pathname: `/Maketing/${user}`,
          state: {urlAvatar: urlAvatar },
        })
      }
      BackToMarketing = element => {
        const {urlAvatar, user} = this.props.location.state
        console.log('user', user)
        this.props.history.push({
            pathname: `/Maketing/${user}`,
            state: {urlAvatar: urlAvatar },
          })
      }
    // Send Mail
    sendMail = element => {
        let to = this.props.location.state.data.from
        let { subject, content } = this.state
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
    // Get Detail of Marketing:
    async detailMarketing(id) {
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token
        let URLDetailMarketing = process.env.REACT_APP_BASE_URL + `/api/marketing/${id}`
        let res = await axios.get(URLDetailMarketing);
        let data = res.data
        this.setState({ detail: data });
    }
    componentDidMount = element => {
        const marketingId = this.props.match.params.id
        console.log('param', marketingId)
        this.detailMarketing(marketingId)
    }

    // Add Member To Marketing
    AddMemberToMarketing = element => {
        console.log('AddMemberToMarketing')
    }
    // Add Customer To Marketing
    AddCustomerToMarketing = element => {
        console.log('AddCustomerToMarketing')
    }
    // Update Detail Marketing
    UpdateDetailMarketing = element => {
        console.log('UpdateDetailMarketing')
    }
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        }
        const {urlAvatar} = this.props.location.state
        const { open, subject, content } = this.state
        const { classes } = this.props
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
                            Chi tiết chiếm lược Marketing
                        </Typography>
                        <Avatar data={urlAvatar} />
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
                    <List onClick={this.handleToMaketing}>{Maketing}</List>
                    <List onClick={this.handleToProducts}>{Products}</List>
                    <List onClick={this.handleToDeals}>{Deals}</List>
                    <List onClick={this.handleToContacts}>{Contacts}</List>
                    <List onClick={this.handleToAccounts}>{Accounts}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chi tiết về Marketing */}
                            <Grid item xs={12}>
                                <PerformMarketing data={this.state.detail} />
                            </Grid>
                            <Grid item xs={12} className={classes.ButtonMail}>
                                <Button type="primary" icon={<RollbackOutlined />} size={'large'} style={{borderRadius: 20}} onClick={this.BackToMarketing}>
                                    Back
                                </Button>
                                <Button type="primary" icon={<HighlightOutlined />} size={'large'}  style={{ marginLeft: 20, borderRadius: 20 }} onClick={() => this.setState({ display: !this.state.display })}
                                >
                                    Cập nhật
                                </Button>
                            </Grid>
                            {/* From cập nhật thông tin marketing */}
                            <Grid item xs={12} hidden={this.state.display}>
                                <FormUpDateMarketing
                                    data={this.state.detail}
                                    link={this.props}
                                />
                            </Grid>
                            {/* Danh sách member có trong chiến dịch Marketing đó */}
                            <Grid item xs={12}>
                                <TableMember data={this.state.detail} />
                            </Grid>
                            {/* Danh sách khách hàng có trong chiến dịch Marketing */}
                            <Grid item xs={12}>
                                <Tooltip title="Add Customer To Marketing">
                                    <IconButton onClick={this.AddCustomerToMarketing}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <TableCustomer data={this.state.detail} />
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(DetailMarketing);
