import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Avatar from '../Components/Avatar'
import { IconButton, Tooltip, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, Container, Grid, Link, Paper } from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Products, Deals, Contacts, Accounts, Maketing } from '../Components/ListItems';
import Chart from './Chart';
import Deposits from './Deposits';
import CustomerOrderToday from './CustomerOrderToday';
import _ from 'lodash'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import moment from 'moment';


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
class DashboardToday extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      dataCutomerOrder: [],
      SumOrderToday: '',
      dataCharts: [],
    }
  }
  // set open menu
  handleDrawerOpen = () => {
    this.setState({
      open: true
    })
  }
  handleDrawerClose = () => {
    this.setState({
      open: false
    })
  };

  handleLogOut = () => {
    this.props.history.push('/')
  }
  // rent to order or customer or ...
  handleToOrders = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Orders/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  handleToCustomers = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Customers/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  handleToDashboard = element => {
    window.location.reload()
  }
  handleToDashReports = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Reports/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  handleToAccounts = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Accounts/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  // handleToActivity = element => {
  //   let user = this.props.match.params.id
  //   this.props.history.push(`/Activity/${user}`)
  // }
  handleToProducts = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Products/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  handleToDeals = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Deals/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  handleToContacts = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Contacts/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  handleToMaketing = element => {
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Maketing/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }

  // get data thống kê doang thu theo khách hàng trong ngày and thống kê doanh thu trong ngày
  async componentDidMount() {
    // get data urlAvatar
    let user = this.props.match.params.id
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    let URLUser = process.env.REACT_APP_BASE_URL + '/api/member/';
    let dataUser = await (axios.get(URLUser))
    let dataAvatar = _.get(dataUser, "data", [])
    for (let i = 0; i < dataAvatar.length; i++) {
      if(dataAvatar[i].username = user){
        this.setState({
          urlAvatar: dataAvatar[i].urlImage
        })
      }
    }

    let SumOrderToday = 0
    let dataCharts = []
    let lenDataCharts = 0 // length dataChart

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    let URL = process.env.REACT_APP_BASE_URL + '/api/invoice/today/customer';
    let dataCustomer = await (axios.get(URL))
    let data = _.get(dataCustomer, "data", []) // 2 data giống nhau
    // data table Customer Order Today
    for (let i = 0; i < data.length; i++) {
      let price = _.get(data[i], "invoices.order.items.orderdetails.price", 0)
      let quantity = _.get(data[i], "invoices.order.items.orderdetails.quantity", 0)
      let dateOrder = _.get(data[i], "invoices.createdAt", 0)
      data[i].price = <NumberFormat value={price} displayType={'text'} thousandSeparator={true}/>
      data[i].quantity = quantity
      data[i].dateOrder = dateOrder
      data[i].sum = <NumberFormat value={parseInt(price) * parseInt(quantity)} displayType={'text'} thousandSeparator={true}/>
    }
    // Get time and amount
    for( let i=0;i<data.length;i++){
      let date = (_.get(data[i], "invoices.createdAt", 0)).split('T')[0]
      let time = ((_.get(data[i], "invoices.createdAt", 0)).split('T')[1]).split(':')[0]
      let price = _.get(data[i], "invoices.order.items.orderdetails.price", 0)
      let quantity = _.get(data[i], "invoices.order.items.orderdetails.quantity", 0)
      let amount = parseInt(price) * parseInt(quantity)
      
      if( lenDataCharts == 0) {
        dataCharts.push({time: time, amount: amount})
        lenDataCharts++
      }
      else {
        let index = -1;
        dataCharts.forEach( ele => {
          if(ele.time == time) {
            index = dataCharts.indexOf(ele);
          }
        })
        if(index == - 1) {
          dataCharts.push({time: time, amount: amount})
        } else {
          dataCharts[index].amount += amount
        }
      }
      
      // data tổng tiền trong ngày SumorderToday (Deposits)
      if(date == moment().format('YYYY-MM-DD')){
        SumOrderToday = (parseInt(SumOrderToday) + parseInt(amount))
      }
    }
    //
    this.setState({
      dataCutomerOrder: data,
      SumOrderToday: SumOrderToday,
      dataCharts: dataCharts
    })
  }
  render() {
    const { classes } = this.props
    const { open, urlAvatar } = this.state
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <Tooltip title="Danh mục" title="menu">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <Avatar data = {urlAvatar} />
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
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                  <Chart data={this.state.dataCharts}/>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                  <Deposits data={this.state.SumOrderToday} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <CustomerOrderToday data={this.state.dataCutomerOrder} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles)(DashboardToday);