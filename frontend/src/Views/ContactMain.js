import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Button, formatMs, Container, CssBaseline, Grid } from '@material-ui/core'
// icon
import LocationOn from '@material-ui/icons/LocationOn'
import Phone from '@material-ui/icons/Phone'
import Mail from '@material-ui/icons/Mail'
import bgr from '../BxInSplce.PNG'

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
    marginTop: 60,
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

  function handleChangePage(element){
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
          <Grid item xs={3}>
              <h2>Address</h2>
              <p><LocationOn />km10-Nguyễn Trãi-Thanh Xuân-Hà Đông-Hà Nội</p>
              <h2>Office Number</h2>
              <p><Phone />: 032-660-9183</p>
              <h2>Office Mail</h2>
              <p><Mail />: huy98ptit@gmail.com</p>
          </Grid>
          <Grid item xs={9} style={{textAlign: 'center'}}>
              <img src={bgr} />
          </Grid>
          {/* <Grid item xs={12}>
              <h2>Thắc mắc và Feedback</h2>
          </Grid> */}
        </Grid>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}