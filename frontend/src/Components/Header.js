import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { IconButton, Tooltip } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle'
import logo from '../logoCRM.png'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'greenyellow'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

export default function PersistentDrawerRight(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { sections } = props;
  const preventDefault = (event) => event.preventDefault();

  function handleDrawerOpen(element) {
    props.link.history.push(`/Login/${element}`)
  }

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h5" noWrap className={classes.title} onClick={() => window.location.reload()}>
            <img src={logo} style={{height: 100, width: 120}} />
          </Typography>
          <Typography variant="h6" noWrap className={classes.title}>
            {sections.map((element, index) => {
              return (
                <span style={{ textAlign: 'center', padding: 30, fontFamily: 'auto' }}>
                  <Link href="#" onClick={preventDefault} color='inherit'>
                    {element.title}
                  </Link>
                </span>
              )
            })}
          </Typography>
          <Tooltip title="Đăng nhập" key="Login">
            <IconButton
              color="inherit"
              aria-label="đăng nhập"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}