import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Header from '../Components/Header'
import MainFeaturedPost from '../Components/MainFeaturedPost'
import Footer from '../Components/Footer'
import img from '../bgr.jpg'
import Slider from '../Components/Slider'
import { Button } from '@material-ui/core';
import BxInPlace from '../bgr.jpg'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  BxInPlace: {
    marginTop: 30,
    marginbutton: 30,
    fontFamily: 'auto'
  }
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


export default function Blog(props) {
  const classes = useStyles();

  function handleChangeRegister(){
    props.history.push('/Register/12')
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header 
            sections={sections} 
            link = {props}
        />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid item md={12}>
            <span>
              <Slider />
            </span>
          </Grid>
          <Grid container spacing={0} className={classes.BxInPlace}>
            <Grid item md={4}>
              <h1>BiTrix tại chỗ</h1>
              <span>
                Bạn có thể sử dụng phiên bản Bitrix24 tự lưu trữ để chạy trên máy chủ của bạn.
                Bạn sẽ có kiểm soát toàn diện đối với dữ liệu,
                truy cập mã nguồn và các công cụ bổ sung như bộ phận hỗ trợ và học tập điện tử,
                cũng như các tùy chọn tích hợp và tùy chỉnh.
              </span> <br />
              <Button variant="contained" color="primary" style={{ borderRadius: 30, marginTop: 20, fontFamily: 'auto' }} >
                Tìm hiểu thêm
            </Button>
            </Grid>
            <Grid item md={8}>
              // thêm ảnh vô đây 
            </Grid>
          </Grid>
          <Grid item md={12} style={{ textAlign: 'center', fontFamily: 'auto', marginBottom: 40 }}>
            <p style={{fontSize: 50}}>Bạn muốn thử ?</p>
            <Button variant="outlined" color="secondary" size='large' onClick={handleChangeRegister} style={{ borderRadius: 30, fontFamily: 'auto' }} >
              Đăng ký miễn phí
            </Button>
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}