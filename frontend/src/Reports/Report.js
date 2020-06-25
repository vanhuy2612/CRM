import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '../Components/Avatar'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid, Link, Paper, formatMs } from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Products, Deals, Contacts, Accounts, Maketing } from '../Components/ListItems';
import axios from 'axios'
import _ from 'lodash'
import Send from './TblReportCostomers'
import Chart from './Chart'
import Chart10year from './Chart10years'
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
            dataOrderChart: [],
            dataReport10year: []
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
        let user = this.props.match.params.id
        this.props.history.push(`/Orders/${user}`)
    }
    handleToCustomers = (element) => {
        let user = this.props.match.params.id
        this.props.history.push(`/Customers/${user}`)
    }
    handleToDashboard = (element) => {
        let user = this.props.match.params.id
        this.props.history.push(`/Dashboard/${user}`)
    }
    handleToDashReports = (element) => {
        window.location.reload()
    }
    handleToAccounts = (element) => {
        let user = this.props.match.params.id
        this.props.history.push(`/Accounts/${user}`)
    }
    // handleToActivity = (element) => {
    //     let user = this.props.match.params.id
    //     this.props.history.push(`/Activity/${user}`)
    // }
    handleToProducts = (element) => {
        let user = this.props.match.params.id
        this.props.history.push(`/Products/${user}`)
    }
    handleToDeals = (element) => {
        let user = this.props.match.params.id
        this.props.history.push(`/Deals/${user}`)
    }
    handleToContacts = (element) => {
        let user = this.props.match.params.id
        this.props.history.push(`/Contacts/${user}`)
    }
    handleToMaketing = element => {
        let user = this.props.match.params.id
        this.props.history.push(`/Maketing/${user}`)
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
        // get data return of 12 months
        let URLOrder = process.env.REACT_APP_BASE_URL + '/api/invoice/12months';
        let dataOrder = await (axios.get(URLOrder))
        let dataReport = _.get(dataOrder, "data", [])

        // get data return of 10 years
        let URLReport10year = process.env.REACT_APP_BASE_URL + '/api/invoice/10years';
        let dataReport10year = await (axios.get(URLReport10year))
            dataReport10year = _.get(dataReport10year, "data", [])

        this.setState({
            dataCustomer: dataVip,
            dataOrderChart: dataReport,
            dataReport10year: dataReport10year
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
                    {/* <List onClick={this.handleToActivity}>{Activity}</List> */}
                    <List onClick={this.handleToProducts}>{Products}</List>
                    <List onClick={this.handleToDeals}>{Deals}</List>
                    <List onClick={this.handleToContacts}>{Contacts}</List>
                    <List onClick={this.handleToAccounts}>{Accounts}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* report doanh thu 12 tháng gần đây */}
                            <Grid item xs={12}>
                                {/* <Paper className={fixedHeightPaper}> */}
                                    <Chart data={this.state.dataOrderChart} />
                                {/* </Paper> */}
                            </Grid>
                            {/* report doanh thu 10 năm gần đây */}
                            <Grid item xs={12}>
                                <Paper className={fixedHeightPaper}>
                                    <Chart10year data={this.state.dataReport10year} />
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
