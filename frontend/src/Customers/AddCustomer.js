import React, { Component } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { I18n } from 'react-redux-i18n'
import FileBase64 from 'react-file-base64'
import axios from 'axios'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography } from '@material-ui/core'

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
class AddCustomer extends Component {
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
        const {urlAvatar} = this.props.location.state
        let user = this.props.match.params.id
        let { address, job, sex, type, phone, email, selectedFile, name, branchId, birthDate, country } = this.state
        let dem = 0
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
        // check validate branchId
        if (branchId == undefined || branchId.length == 0) {
            dem = parseInt(dem) + 1
            this.setState({
                erBranchId: true,
                messBranchId: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        } else {
            dem = parseInt(dem) - 1
            this.setState({
                erBranchId: false,
                messBranchId: '',
            })
        }
        // check validate address
        if (address == undefined || address.length == 0) {
            dem = parseInt(dem) + 1
            this.setState({
                erAddress: true,
                messAddress: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        } else {
            dem = parseInt(dem) - 1
            this.setState({
                erAddress: false,
                messAddress: '',
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
        // check validate type
        if (type == undefined || type.length == 0) {
            dem = parseInt(dem) + 1
            this.setState({
                erType: true,
                messType: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        } else {
            dem = parseInt(dem) - 1
            this.setState({
                erType: false,
                messType: '',
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
        // check validate sex
        if (sex == undefined || sex.length == 0) {
            dem = parseInt(dem) + 1
            this.setState({
                erSex: true,
                messSex: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        } else {
            dem = parseInt(dem) - 1
            this.setState({
                erSex: false,
                messSex: '',
            })
        }
        // check validate job
        if (job == undefined || job.length == 0) {
            dem = parseInt(dem) + 1
            this.setState({
                erJob: true,
                messJob: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        } else {
            dem = parseInt(dem) - 1
            this.setState({
                erJob: false,
                messJob: '',
            })
        }
        // check validate country
        if (country == undefined || country.length == 0) {
            dem = parseInt(dem) + 1
            this.setState({
                erCountry: true,
                messCountry: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        } else {
            dem = parseInt(dem) - 1
            this.setState({
                erCountry: false,
                messCountry: '',
            })
        }
        if (dem == -10) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            let URL = process.env.REACT_APP_BASE_URL + '/api/customer/';
            
            // create formdata
            let formdata = new FormData() 
            formdata.append('avatar', this.state.selectedFile)
            formdata.append('name', name);
            formdata.append('address',address)
            formdata.append('birthDate',birthDate)
            formdata.append('sex',sex)
            formdata.append('type',type)
            formdata.append('country',country)
            formdata.append('job',job)
            formdata.append('branchId',branchId)
            formdata.append('phone',phone)
            formdata.append('email',email)
            let options = { content: formdata}
            //console.log('form-data',formdata.getAll('avatar'))
            // end create formdata
            axios.post(URL, formdata)
                .then(function (response) {
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
            window.location.reload(
                this.props.history.push({
                    pathname: `/Customers/${user}`,
                    state: {urlAvatar: urlAvatar },
                  })
            )
        }
    }

    render() {
        const { classes } = this.props
        const { address, branchId, sex, phone, email, country, birthDate, name, type, job } = this.state
        // const dataValue=[
        //     {lable: "Địa chỉ",value: address, error: this.state.erAddres, mess: this.state.messAddress },
        //     {lable: "Địa chỉ",value: address, error: this.state.erAddres, mess: this.state.messAddress },
        //     {lable: "Địa chỉ",value: address, error: this.state.erAddres, mess: this.state.messAddress },
        //     {lable: "Địa chỉ",value: address, error: this.state.erAddres, mess: this.state.messAddress },
        //     {lable: "Địa chỉ",value: address, error: this.state.erAddres, mess: this.state.messAddress },
        // ]
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Thêm Khách hàng
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            {/* {dataValue.map((element) =>(
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Name"
                                    label={element.lable}
                                    name="name"
                                    autoComplete="Name"
                                    value={element.value}
                                    onChange={(e) => this.setState({
                                        name: e.currentTarget.value,
                                        erName: undefined,
                                        messName: '',
                                    })}
                                    error={element.error}
                                    helperText={element.mess}
                                />
                            </Grid>
                            ))} */}
                            {/* imput nhập tên khách hàng */}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Tên khách hàng"
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
                            {/* input nhập địa chỉ khách hàng */}
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="Address"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Address"
                                    label="Địa chỉ"
                                    autoFocus
                                    value={address}
                                    onChange={(e) => this.setState({
                                        address: e.currentTarget.value,
                                        erAddress: undefined,
                                        messAddress: '',
                                    })}
                                    error={this.state.erAddress}
                                    helperText={this.state.messAddress}
                                />
                            </Grid>
                            {/* input nhập giới tính */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="sex"
                                    label="Giới tính"
                                    name="sex"
                                    autoComplete="sex"
                                    value={sex}
                                    onChange={(e) => this.setState({
                                        sex: e.currentTarget.value,
                                        erSex: undefined,
                                        messSex: '',
                                    })}
                                    error={this.state.erSex}
                                    helperText={this.state.messSex}
                                />
                            </Grid>
                            {/* input nhập type khách hàng */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Type"
                                    label="Type"
                                    name="type"
                                    autoComplete="Type"
                                    value={type}
                                    onChange={(e) => this.setState({
                                        type: e.currentTarget.value,
                                        erType: undefined,
                                        messType: '',
                                    })}
                                    error={this.state.erType}
                                    helperText={this.state.messType}
                                />
                            </Grid>
                            {/* input nhập Công việc khách hàng */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Job"
                                    label="Job"
                                    name="job"
                                    autoComplete="Job"
                                    value={job}
                                    onChange={(e) => this.setState({
                                        job: e.currentTarget.value,
                                        erJob: undefined,
                                        messJob: '',
                                    })}
                                    error={this.state.erJob}
                                    helperText={this.state.messJob}
                                />
                            </Grid>
                            {/* input nhập Phone khách hàng */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Phone"
                                    label="phone"
                                    name="Phone"
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
                            {/* input nhập Chi nhánh khách hàng */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="BranchId"
                                    label="Chi nhánh "
                                    name="BranchId"
                                    autoComplete="BranchId"
                                    value={branchId}
                                    onChange={(e) => this.setState({
                                        branchId: e.currentTarget.value,
                                        erBranchId: undefined,
                                        messbranchId: '',
                                    })}
                                    error={this.state.erBranchId}
                                    helperText={this.state.messBranchId}
                                />
                            </Grid>
                            {/* input nhập country khách hàng */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="country"
                                    label="country"
                                    name="country"
                                    autoComplete="country"
                                    value={country}
                                    onChange={(e) => this.setState({
                                        country: e.currentTarget.value,
                                        erCountry: undefined,
                                        messCountry: '',
                                    })}
                                    error={this.state.erCountry}
                                    helperText={this.state.messCountry}
                                />
                            </Grid>
                            {/* input nhập Email khách hàng */}
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
                            {/* input nhập birthDate khách hàng */}
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
                            <h4>Vui lòng chọn ảnh đại diện</h4>
                            { // upload image product
                                <FileBase64
                                    multiple={true}
                                    onDone={this.getFiles.bind(this)}
                                />
                            }
                        </Grid>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSignUp}
                        >
                            Add Customer
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
export default withStyles(styles)(AddCustomer);