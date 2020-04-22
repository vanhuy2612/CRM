import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Header from '../Components/Header'
import MainFeaturedPost from '../Components/MainFeaturedPost'
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
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}