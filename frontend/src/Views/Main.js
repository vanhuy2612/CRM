import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Header from '../Components/Header'
import MainFeaturedPost from '../Components/MainFeaturedPost'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import img from '../bgr.jpg'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Công cụ', url: '#' },
  { title: 'Giá cả', url: '#' },
  { title: 'Đối tác', url: '#' },
  { title: 'Ứng dụng', url: '#' },
  { title: 'Blog', url: '#' },
  { title: 'Hỗ Trợ', url: '#' },
];

const mainFeaturedPost = {
  title: 'Your Company. United.',
  description:
    "Free. Unlimited. Online.",
  image: img,
  imgText: 'main image description',
};


const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header sections={sections} />
        <main>
        <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}