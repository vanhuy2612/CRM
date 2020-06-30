import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Button} from 'antd'
import Avatar from '../Components/Avatar'
import { IconButton, Tooltip, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid, Link } from '@material-ui/core';
import { Login, Dashboard, Order, Customers, Reports, Products, Deals, Contacts, Accounts, Maketing } from '../Components/ListItems';
import axios from 'axios'
import _ from 'lodash'
import TblMaketing from './TblMaketing'
import BoardTrello from './BoardTrello'
import FormAddMarketing from './component/FormAddMarketing'
import AddIcon from '@material-ui/icons/Add'

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
class RecentMaketing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      dataMaketing: [],
      showFormAddMarketing: true
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
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Orders/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  handleToCustomers = element => {
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Customers/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  handleToDashboard = element => {
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Dashboard/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  handleToDashReports = element => {
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Reports/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  handleToAccounts = element => {
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Accounts/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  // handleToActivity = element => {
  //   let user = this.props.match.params.id
  //   this.props.history.push(`/Activity/${user}`)
  // }
  handleToProducts = element => {
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Products/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  handleToDeals = element => {
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Deals/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  handleToContacts = element => {
    const { urlAvatar } = this.props.location.state
    let user = this.props.match.params.id
    this.props.history.push({
      pathname: `/Contacts/${user}`,
      state: { urlAvatar: urlAvatar },
    })
  }
  handleToMaketing = element => {
    window.location.reload()
  }

  // lấy danh sách marketing
  async componentDidMount() {
    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    let URL = process.env.REACT_APP_BASE_URL + '/api/marketing/';
    let dataMaketing = await (axios.get(URL))
    let data = _.get(dataMaketing, "data", [])
    this.setState({
      dataMaketing: data
    })
  }
  render() {
    const { urlAvatar } = this.props.location.state
    const user = this.props.match.params.id
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
              Maketing
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
              {/* Form Add Marketing */}
              <Grid item xs={12}>
                <Tooltip title="Add Marketing">
                  <Button type="primary" icon={<AddIcon />} size={'large'} style={{ borderRadius: 20, marginRight: 15 }} onClick={() => this.setState({ showFormAddMarketing: !this.state.showFormAddMarketing })}>
                    <span style={{ paddingBottom: 20, paddingLeft: 10 }}>Add Marketing</span>
                  </Button>
                </Tooltip>
                <Grid item xs={12} hidden={this.state.showFormAddMarketing}>
                  <FormAddMarketing />
                </Grid>
              </Grid>
              {/* ------------------- */}
              {/* List of Marketing */}
              <Grid item xs={12}>
                <BoardTrello
                  data={this.state.dataMaketing}
                  link={this.props}
                  user={user}
                  urlAvatar={urlAvatar}
                />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(RecentMaketing);
