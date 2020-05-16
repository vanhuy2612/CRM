import React, { Component } from "react"
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { I18n } from 'react-redux-i18n'
import moment from 'moment'
// import Header from '../Component/Header'

const style = theme => ({
    formContentItemFeedback: {
        marginBottom: '-12px'
    },
    buttonSendMessager: {
        marginLeft: '12px',
        marginBottom: '15px',
    },
})
class TblReports extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    Send(){
        const {id,name, phone,address, content, email } = this.state
        let dem = 0
        // check validate name
        if(name == undefined || name.length == 0){
            dem = parseInt(dem) + 1
            this.setState({
                erName: true,
                mesName: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        }else{
            dem = parseInt(dem) - 1
            this.setState({
                erName: false,
                mesName: "",
            })
        }
        // check valdate phone ( chưa check phải là số và nhỏ hơn 12 )
        if(phone == undefined || phone.length == 0){
            dem = parseInt(dem) + 1
            this.setState({
                erPhone: true,
                mesPhone: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        }else{
            dem = parseInt(dem) - 1
            this.setState({
                erPhone: false,
                mesPhone: "",
            })
        }
        // check validate email
        if(email == undefined || email.length == 0){
            dem = parseInt(dem) + 1
            this.setState({
                erEmail: true,
                mesEmail: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        }else{
            dem = parseInt(dem) - 1
            this.setState({
                erEmail: false,
                mesEmail: "",
            })
        }
        // Check validate address
        if(address == undefined || address.length == 0){
            dem = parseInt(dem) + 1
            this.setState({
                erAddress: true,
                mesAddress: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        }else{
            dem = parseInt(dem) - 1
            this.setState({
                erAddress: false,
                mesAddress: "",
            })
        }
        // check validate content
        if(content == undefined || content.length == 0){
            dem = parseInt(dem) + 1
            this.setState({
                erContent: true,
                mesContent: I18n.t("Vui lòng nhập đầy đủ thông tin")
            })
        }else{
            dem = parseInt(dem) - 1
            this.setState({
                erContent: false,
                mesContent: "",
            })
        }
        if (dem == -5) {
            console.log('YOU OKKKKK')
          }
    }
    render() {
        let { classes, theme } = this.props
        return (
                <div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    id="outlined-name"
                                    label="Họ và tên"
                                    className={classes.formContentItemFeedback}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.name}
                                    error={this.state.erName}
                                    helperText={this.state.mesName}
                                    onChange={(e) => this.setState({
                                        name: e.currentTarget.value,
                                        erName: false,
                                        mesName: '',
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    id="outlined-name"
                                    label="Số điện thoại"
                                    className={classes.formContentItemFeedback}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.phone}
                                    error={this.state.erPhone}
                                    helperText={this.state.mesPhone}
                                    onChange={(e) => this.setState({
                                        phone: e.currentTarget.value,
                                        erPhone: false,
                                        mesPhone: '',
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    id="outlined-name"
                                    label="Địa chỉ email"
                                    className={classes.textFformContentItemFeedbackield}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.email}
                                    error={this.state.erEmail}
                                    helperText={this.state.mesEmail}
                                    onChange={(e) => this.setState({
                                        email: e.currentTarget.value,
                                        erEmail: false,
                                        mesEmail: '',
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    id="outlined-name"
                                    label="Địa chỉ thường trú"
                                    className={classes.formContentItemFeedback}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.address}
                                    error={this.state.erAddress}
                                    helperText={this.state.mesAddress}
                                    onChange={(e) => this.setState({
                                        address: e.currentTarget.value,
                                        erAddress: false,
                                        mesAddress: '',
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <TextField
                                    name="messager"
                                    id="outlined-multiline-static"
                                    label="Lời nhắn"
                                    multiline rows="4"
                                    className={classes.formMessagertItemFeedback}
                                    onChange={this.onChangeMesager}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.content}
                                    error={this.state.erContent}
                                    helperText={this.state.mesContent}
                                    onChange={(e) => this.setState({
                                        content: e.currentTarget.value,
                                        erContent: false,
                                        mesContent: '',
                                    })}
                                />
                            </Grid>
                            <Button variant="contained" size="small" color="primary" className={classes.buttonSendMessager} onClick={() => this.Send()}>
                                PHẢN HỒI TIN NHẮN <SendIcon> send</SendIcon>
                            </Button>
                        </Grid>
                    </form>
                </div>
        )
    }
}
export default withStyles(style, { withTheme: true })(TblReports)

