import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { I18n } from 'react-redux-i18n'
import axios from 'axios'

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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      branchId: "",
      role: "",
      phone: "",
      email: "",
    }
  }

  handleSignUp = element => {
    let { username, password, branchId, role, phone, email } = this.state
    let dem = 0
    console.log(username, password, branchId, role)
    // check validate username
    if (username == undefined || username.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erName: true,
          messName: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erName: false,
            messName: '',
        })
    }
    // check validate role
    if (role == undefined || role.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erRole: true,
          messRole: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erRole: false,
            messRole: '',
        })
    }
     // check validate phone
     if (phone == undefined || phone.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erPhone: true,
          messPhone: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erPhone: false,
            messPhone: '',
        })
    }
     // check validate email
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
    // check validate branchId
    if (branchId == undefined || branchId.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erBranchId: true,
          messbranchId: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erBranchId: false,
            messbranchId: '',
        })
    }
    // check validate pass
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
    if(dem == -6){
      console.log('OKKKK')
      axios.post('http://localhost:3000/api/register/',{
        username: username,
        password: password,
        branchId: branchId,
        role: role
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
      this.props.history.push(`/Dashboard/${element}`)
    }
  }

  render() {
    const { classes } = this.props
    const { username, password, branchId, role, phone, email } = this.state
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="UserName"
                  variant="outlined"
                  required
                  fullWidth
                  id="UserName"
                  label="User Name"
                  autoFocus
                  value={username}
                  onChange={(e) => this.setState({
                    username: e.currentTarget.value,
                    erName: undefined,
                    messName: '',
                })}
                  error={this.state.erName}
                  helperText={this.state.messName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Role"
                  label="Role"
                  name="Role"
                  autoComplete="lname"
                  value={role}
                  onChange={(e) => this.setState({
                    role: e.currentTarget.value,
                    erRole: undefined,
                    messRole: '',
                })}
                  error={this.state.erRole}
                  helperText={this.state.messRole}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="BranchId"
                  label="BranchId"
                  name="email"
                  autoComplete="BranchId"
                  value={branchId}
                  onChange={(e) => this.setState({
                    branchId: e.currentTarget.value,
                    erBranchId: undefined,
                    messbranchId: '',
                })}
                  error={this.state.erBranchId}
                  helperText={this.state.messbranchId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Phone"
                  label="Phone"
                  name="phone"
                  autoComplete="Phone"
                  value={phone}
                  onChange={(e) => this.setState({
                    phone: e.currentTarget.value,
                    erPhone: undefined,
                    messPhone: '',
                })}
                  error={this.state.erPhone}
                  helperText={this.state.messPhone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Email"
                  label="Email"
                  name="email"
                  autoComplete="Email"
                  value={email}
                  onChange={(e) => this.setState({
                    email: e.currentTarget.value,
                    erEmail: undefined,
                    messEmail: '',
                })}
                  error={this.state.erEmail}
                  helperText={this.state.messEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSignUp}
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    )
  }
}
export default withStyles(styles)(Register);