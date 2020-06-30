import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Print from '@material-ui/icons/Print'
import Avatar from '../Components/Avatar'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Container, Grid, Link } from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Products, Deals, Contacts, Accounts, Maketing } from '../Components/ListItems';
import axios from 'axios'
import _ from 'lodash'
import TableToExcel from '@linways/table-to-excel'
import TblAccounts from './TblAccounts'
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
      dataUser: [],
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
    const {urlAvatar} = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Orders/${user}`,
      state: {urlAvatar: urlAvatar },
    })
  }
  handleToCustomers = element => {
    const {urlAvatar} = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Customers/${user}`,
      state: {urlAvatar: urlAvatar },
    })
  }
  handleToDashboard = element => {
    const {urlAvatar} = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Dashboard/${user}`,
      state: {urlAvatar: urlAvatar },
    })
  }
  handleToDashReports = element => {
    const {urlAvatar} = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Reports/${user}`,
      state: {urlAvatar: urlAvatar },
    })
  }
  handleToAccounts = element => {
    window.location.reload()
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
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Maketing/${user}`,
      state: {urlAvatar: this.state.urlAvatar },
    })
  }
  // Print Table To Excel
  PrintTableToExcel = element => {
    let table = document.querySelector('table')
    TableToExcel.convert(table, {
      name: 'Account.xlsx'
    })
  }
  // lấy data order
  async componentDidMount(props) {
    let user = this.props.match.params.id
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    let URL = process.env.REACT_APP_BASE_URL + '/api/member/';
    let dataCustomer = await (axios.get(URL))
    let data = _.get(dataCustomer, "data", [])
    for (let i = 0; i < data.length; i++) {
      data[i].role = data[i].role.name
      if(data[i].username = user){
        this.setState({
          urlAvatar: data[i].urlImage
        })
      }
    }
    this.setState({ dataUser: data })
  }
  render() {
    const { open , urlAvatar} = this.state
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
              Accounts
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
              {/* print table to excel */}
              <Grid item xs={12}>
                <Tooltip title="Print to Excel">
                  <IconButton onClick={this.PrintTableToExcel}>
                    <Print />
                  </IconButton>
                </Tooltip>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <TblAccounts data={this.state.dataUser} />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles)(RecentOrder);