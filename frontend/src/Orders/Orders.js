import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '../Components/Avatar'
import {IconButton, Tooltip, CssBaseline, Drawer,Box, AppBar,Toolbar, List, Typography,Divider, Badge, Container, Grid, Link} from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Activity, Products, Deals, Contacts, Accounts } from '../Components/ListItems';
import TblCustomers from './TblOrders'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
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
class RecentOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      dataOrder: [],
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

  // lấy data order
  async componentDidMount() {
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    let URL = process.env.REACT_APP_BASE_URL + '/api/order/';
    let dataOrder = await (axios.get(URL))
    let data = _.get(dataOrder, "data", [])
    for( let i=0; i< data.length; i++){
      data[i].createdAt = moment(data[i].createdAt).format('YYYY/MM/DD')
      // let items = data[i].items
      // for(let j=0;j< items.length; j++){
      //   let productId = items[j].productId
      //   let price = items[j].orderdetails.price
      //   let quantity = items[j].orderdetails.quantity
      //   console.log('productId', productId, "price", price, "quantity", quantity)
      //   data[i].productId = productId 
      //   data[i].price = price
      //   data[i].quantity = quantity  
      // }
    }
    this.setState({ dataOrder: data })
  }
  render() {
    const { open } = this.state
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
              Order
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
                <TblCustomers data={this.state.dataOrder} />
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(RecentOrder);
