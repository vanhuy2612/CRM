import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '../Components/Avatar'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid, Link, Paper, formatMs } from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Activity, Products, Deals, Contacts, Accounts, Maketing } from '../Components/ListItems';
import axios from 'axios'
import _ from 'lodash'
import Send from './TblReportCostomers'
import Chart from './Chart'
import moment from 'moment'

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
    }
});

class RecentReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            dataCustomer: [],
            dataOrderChart: []
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
    handleToMaketing = element => {
        this.props.history.push(`/Maketing/${element}`)
      }

    // lấy data customers
    async componentDidMount() {
        let dataVip = []
        let dataOrderChart = []
        let lengthdataReport = 0
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token;
        let URLCustomer = process.env.REACT_APP_BASE_URL + '/api/customer/';
        let dataCustomer = await (axios.get(URLCustomer))
        let data = _.get(dataCustomer, "data", [])
        // get all customer difficunt normal
        for (let i = 0; i < data.length; i++) {
            let type = data[i].type
            if (type !== "normal") {
                dataVip.push(data[i])
            }
        }
        // get phone and email 
        for (let i = 0; i < dataVip.length; i++) {
            let contacts = dataVip[i].contacts;
            contacts.map((element) => {
                if (element.type == "phone") {
                    dataVip[i].phone = element.link
                } else if (element.type == "email") {
                    dataVip[i].email = element.link
                }
            })
        }
        // get data Chart Order
        let URLOrder = process.env.REACT_APP_BASE_URL + '/api/order/';
        let dataOrder = await (axios.get(URLOrder))
        let dataReport = _.get(dataOrder, "data", [])


        for (let i = 0; i < dataReport.length; i++) {
            let time = (((_.get(dataReport[i], "createdAt", 0)).split('T')[0]).split('-')[2])
            let price = _.get(data[i], "items.orderdetails.price", 0)
            console.log('price', price)
            let quantity = _.get(data[i], "items.orderdetails.quantity", 0)
            console.log('quantity', quantity)
            let amount = parseInt(price) * parseInt(quantity)
            console.log('amount', amount)
            console.log('time', time)
            if (lengthdataReport == 0) {
                dataOrderChart.push({ time: time, amount: amount })
                lengthdataReport++
            }
            else {
                let index = -1;
                dataOrderChart.forEach(ele => {
                    if (ele.time == time) {
                        index = dataOrderChart.indexOf(ele);
                    }
                })
                if (index == - 1) {
                    dataOrderChart.push({ time: time, amount: amount })
                } else {
                    dataOrderChart[index].amount += amount
                }
            }
        }

        this.setState({
            dataCustomer: dataVip,
            dataOrderChart: dataOrderChart
        })
    }



    render() {
        const { open } = this.state
        const { classes } = this.props
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
                            Report
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
                    <List onClick={this.handleToMaketing}>{Maketing}</List>
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
                            {/* report doanh thu  */}
                            <Grid item xs={12}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart data={this.state.dataOrderChart} />
                                </Paper>
                            </Grid>
                            {/* report khach hang tiem nang */}
                            <Grid item xs={12}>
                                <Send data={this.state.dataCustomer} />
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(RecentReport);
