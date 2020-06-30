import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Button, formatMs, Container, CssBaseline, Grid } from '@material-ui/core';
import logo from '../logoCRM.png'

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    BxInPlace: {
        textAlign: 'center',
        marginTop: 30,
        marginbutton: 30,
        fontFamily: 'auto'
    },
    grid: {
        fontFamily: 'auto',
        padding: 20,
        fontSize: 20,
    },
    crm: {
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 20,
        fontSize: 20,
    },
    crmMKT: {
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 40,
        fontSize: 20,
    }
}));


export default function Blog(props) {
    const classes = useStyles();

    function handleChangePage(element) {
        props.history.push(`Login/${element}`)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header
                    link={props}
                />
                <Grid container spacing={0} className={classes.grid}>
                    <Grid item xs={6} >
                        <h2>Thông tin về CRM </h2>
                        <p>Về CRM đây là Hệ thống quản trị quan hệ khách hàng (CRMCustomer Relationship Management)
                        Là hệ thống tích hợp giúp quản lý và liên kết toàn diện các
                        quan hệ với khách hàng thông qua nhiều kênh và bộ phận chức năng khác nhau</p>
                    </Grid>
                    <Grid item xs={6} style={{textAlign: 'center'}}>
                        <img src={logo} />
                    </Grid>
                    <Grid item xs={6}>
                        <h2>Đội ngữ CRM Team</h2>
                        <p>Đỗ Tiến Dương</p>
                        <p>Đinh Văn Huy</p>
                        <p>Bùi Viết Ngọc</p>
                        <p>Nguyễn Ngọc Ba</p>
                        <p>Trần Trung Hiếu</p>
                    </Grid>
                </Grid>
            </Container>
            <Footer title="Footer" description="Something here to give the footer a purpose!" />
        </React.Fragment>
    );
}