import React, { Component } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { I18n } from 'react-redux-i18n'
import FileBase64 from 'react-file-base64'
import axios from 'axios'
import {Avatar,Button,CssBaseline,TextField, FormControlLabel, Checkbox,Link,Grid,Box, Typography  } from '@material-ui/core'
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
      selectedFile: null
    }
  }
  // khai báo upload image
  getFiles(files){
    this.setState({ selectedFile: files[0].file })
    console.log(files)
  }

  handleSignUp = element => {
    let { username, password, branchId, role, phone, email, selectedFile, name, position, birthDate } = this.state
    let dem = 0
    //console.log(username, password, branchId, role, phone, email, selectedFile, name, position, birthDate )
     // check validate birthDate
     if (birthDate == undefined || birthDate.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erBirthDate: true,
          messBirthDate: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erBirthDate: false,
            messBirthDate: '',
        })
    }
     // check validate position
     if (position == undefined || position.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erPosition: true,
          messPosition: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erPosition: false,
            messPosition: '',
        })
    }
    // check validate username
    if (username == undefined || username.length == 0) {
      dem = parseInt(dem) + 1
      this.setState({
          erUserName: true,
          messUserName: I18n.t("Vui lòng nhập đầy đủ thông tin")
      })
    } else {
        dem = parseInt(dem) - 1
        this.setState({
            erUserName: false,
            messUserName: '',
        })
    }
    // check validate name
    if (name == undefined || name.length == 0) {
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
    if(dem == -9){
      console.log('OKKKK')
      // create formdata
      let formdata = new FormData() 
      formdata.append('avatar', this.state.selectedFile)
      formdata.append('username', username);
      formdata.append('password',password)
      formdata.append('birthDate',birthDate)
      formdata.append('roleId',role)
      formdata.append('name',name)
      formdata.append('position',position)
      formdata.append('branchId',branchId)
      formdata.append('phone',phone)
      formdata.append('email',email)
      let options = { content: formdata}
      //console.log('form-data',formdata.getAll('avatar'))
      // end create formdata
      let URL = process.env.REACT_APP_BASE_URL + '/api/register/';
      axios.post(URL, formdata)
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
    const { username, password, branchId, role, phone, email, position, birthDate, name } = this.state
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
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  name="name"
                  autoComplete="Name"
                  value={name}
                  onChange={(e) => this.setState({
                    name: e.currentTarget.value,
                    erName: undefined,
                    messName: '',
                })}
                  error={this.state.erName}
                  helperText={this.state.messName}
                />
              </Grid>
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
                    erUserName: undefined,
                    messUserName: '',
                })}
                  error={this.state.erUserName}
                  helperText={this.state.messUserName}
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
                  autoComplete="Role"
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
                  id="Position"
                  label="Position"
                  name="position"
                  autoComplete="Position"
                  value={position}
                  onChange={(e) => this.setState({
                    position: e.currentTarget.value,
                    erPosition: undefined,
                    messPosition: '',
                })}
                  error={this.state.erPosition}
                  helperText={this.state.messPosition}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="birthDate"
                  label="birthDate"
                  name="birthDate"
                  autoComplete="birthDate"
                  value={birthDate}
                  onChange={(e) => this.setState({
                    birthDate: e.currentTarget.value,
                    erBirthDate: undefined,
                    messBirthDate: '',
                })}
                  error={this.state.erBirthDate}
                  helperText={this.state.messBirthDate}
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
              <h4>Vui lòng chọn ảnh đại diện</h4>
              { // upload image product
                                    <FileBase64
                                        multiple={true}
                                        onDone={this.getFiles.bind(this)} 
                                        />
                                }
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Thông tin bạn nhập là hoàn toàn chính xác"
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
              Đăng ký
          </Button>
          </form>
        </div>
      </Container>
    )
  }
}
export default withStyles(styles)(Register);