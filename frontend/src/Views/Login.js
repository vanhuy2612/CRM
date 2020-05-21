import React, { Component } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { I18n } from 'react-redux-i18n'
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,Link, Paper, Box, Grid, Typography } from '@material-ui/core';

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

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password:"",
    }
  }
  handelRegister = element => {
    this.props.history.push(`/Register/${element}`)
  }
  handleCheckEmail = element =>{
    this.setState({
      email: element.currentTarget.value
    })
  }
  handleCheckPassword = element => {
    this.setState({
      password: element.currentTarget.value
    })
  }
  handleLogin = element => {
    let props = this.props
    let dem = 0
    let {email, password} = this.state
    if (email == undefined || email.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erEmail: true,
          messEmail: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erEmail: false,
            messEmail: '',
        })
    }
    if (password == undefined || password.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erPass: true,
          messPass: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erPass: false,
            messPass: '',
        })
    }
    if(dem == -2){
      axios.post('http://localhost:3000/api/login/',{
      username: email,
      password: password
    })
    .then(function (response) {
      let messLogin = response.data
      console.log('data res', messLogin)
      localStorage.setItem('token', messLogin)
      if(messLogin.message !== undefined){
        console.log('Fail', messLogin.message)
      }else{
          localStorage.setItem('token', messLogin)
          console.log('Đăng nhập thành công')
          props.history.push(`/Dashboard/${element}`)
      }
    })
    }
  }

  render() {
    const { classes } = this.props;
    const {email, password} = this.state
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
         </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => this.setState({
                  email: e.currentTarget.value,
                  erEmail: undefined,
                  messEmail: '',
              })}
                error={this.state.erEmail}
                helperText={this.state.messEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => this.setState({
                  password: e.currentTarget.value,
                  erPass: undefined,
                  messPass: '',
              })}
                error={this.state.erPass}
                helperText={this.state.messPass}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleLogin}
              >
                Sign In
            </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link onClick={this.handelRegister} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(Login);