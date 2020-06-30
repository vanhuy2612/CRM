import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Button, formatMs, Container, CssBaseline, Grid } from '@material-ui/core';

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
        <main>
            <p>Hiện Chưa Update</p>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}