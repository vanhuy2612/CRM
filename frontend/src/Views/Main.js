import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../Components/Header'
import MainFeaturedPost from '../Components/MainFeaturedPost'
import Footer from '../Components/Footer'
import { Button, formatMs, Container, CssBaseline, Grid } from '@material-ui/core';
//image
import img from '../bgr.jpg'
import lead from '../images/lead.PNG'
import contact from '../images/contact.PNG'
import deal from '../images/deal.PNG'
import activiti from '../images/activitis.PNG'
import report from '../images/report.PNG'
import marketing from '../images/marketing.PNG'

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

const mainFeaturedPost = {
  title: 'Your Company. United.',
  description:
    "Free. Unlimited. Online.",
  image: img,
  imgText: 'main image description',
};


export default function Blog(props) {
  const classes = useStyles();

  function handleChangeRegister(element) {
    props.history.push(`/Register/${element}`)
  }
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
          <MainFeaturedPost
            post={mainFeaturedPost}
            link={props}
          />
          <Grid item md={12} className={classes.grid} spacing={10}>
            <h2>Why should you use CRM?</h2>
            <ul>
              <li>
                <strong>Free Forever</strong> - Hầu hết hệ thống CRM chỉ cung cấp 3 tháng dùng thử miễn phí.
                Bitrix24 CRM <strong>Free Forever</strong> với Cấp miễn phí của chúng tôi. Chỉ nâng cấp khi doanh nghiệp của bạn phát triển.
             </li>
              <li>
                <strong>Scalable</strong> - Không phải lo lắng về hiệu suất khi Doanh nghiệp & Khách hàng của bạn tăng lên.
               Hệ thống Bitrix24 CRM được xây dựng trên kiến ​​trúc đa đối tượng SAAS dựa trên đám mây với nhiều dịch vụ & cơ sở dữ liệu vi mô cho các giải pháp trực tuyến có cấu hình cao phục vụ nhu cầu của bạn.
               Lý tưởng để mở rộng các doanh nghiệp vừa và nhỏ.
             </li>
              <li>
                <strong>Customizable</strong> - Kinh doanh khác nhau có các yêu cầu dữ liệu chuyên ngành khác nhau.
               Hệ thống CRM Bitrix24 có khả năng tùy biến cao, thêm nhiều trường / loại dữ liệu cụ thể mà doanh nghiệp của bạn yêu cầu để quản lý Khách hàng tiềm năng, Khách hàng và Ưu đãi của bạn.
               Không có chi phí bổ sung, luôn <strong>Free</strong> , đơn giản để sử dụng.
             </li>
              <li>
                <strong>Easy To Use </strong>- Không giống như Salesforce và các hệ thống CRM khác đòi hỏi nhiều giờ đào tạo và các hoạt động phức tạp,
               hệ thống Bitrix24 CRM rất trực quan và đơn giản để làm chủ. Không có các bước phức tạp, không có tính năng khó hiểu,
               không có mánh lới công nghệ cao, chắc chắn dễ sử dụng. Trực tuyến mọi nơi, mọi lúc.
             </li>
              <li>
                <strong>Very Attractive Subscription </strong>Không phải lo lắng khi doanh nghiệp của bạn phát triển từ nhỏ đến lớn,
               nâng cấp lên cấp cao hơn rất phải chăng với mức giá $ 1 / ngày, $ 5 / ngày. Chúng tôi cũng đang tặng <strong>MIỄN PHÍ 3 THÁNG HÀNG THÁNG</strong> cho bất kỳ nâng cấp nào.
             </li>
              <li>
                <strong>Free Tech Support </strong>- Đào tạo miễn phí, tư vấn miễn phí, hỗ trợ miễn phí,
               chỉ cần liên hệ với chúng tôi.
               Tuyệt vời cho doanh nghiệp vừa và nhỏ.
             </li>
              <li>
                <strong>100% Secured Cloud Based CRM System</strong>- Bitrix24 CRM được lưu trữ trên đám mây AWS hàng đầu trong ngành,
               chúng tôi cũng được chứng nhận Dấu bảo vệ dữ liệu (đang chờ xử lý). An toàn, mạnh mẽ, luôn trực tuyến.
             </li>
            </ul>
          </Grid>
          <Grid container spacing={0} className={classes.BxInPlace}>
            <Grid item lg={12} className={classes.crm}>
              <h1>CRM</h1>
            </Grid>
            <Grid item lg={4} className={classes.crm}>
              <img src={lead} />
              <p style={{ fontSize: 25, color: '#FF8300' }}><strong>Lead management</strong></p>
              <p>Create the ordered</p>
              <p>structure in your</p>
              <p>company</p>
              <a onClick={handleChangePage}>LEARN MORE</a>
            </Grid>
            <Grid item lg={4} className={classes.crm}>
            <img src={contact} />
              <p style={{ fontSize: 25, color: '#FF8300' }}><strong>Contact Management</strong></p>
              <p>Track all information</p>
              <p>and communication</p>
              <p>activities</p>
              <a onClick={handleChangePage}>LEARN MORE</a>
            </Grid>
            <Grid item lg={4} className={classes.crm}>
            <img src={deal} />
              <p style={{ fontSize: 25, color: '#FF8300' }}><strong>Deal Management</strong></p>
              <p>Improve the</p>
              <p>strategy. Celebrate</p>
              <p>sales.</p>
              <a onClick={handleChangePage}>LEARN MORE</a>
            </Grid>
            <Grid item lg={4} className={classes.crm}>
            <img src={activiti} />
              <p style={{ fontSize: 25, color: '#FF8300' }}><strong>Activities</strong></p>
              <p>Engage new</p>
              <p>customers and make</p>
              <p>them stay</p>
              <a onClick={handleChangePage}>LEARN MORE</a>
            </Grid>
            <Grid item lg={4} className={classes.crm}>
            <img src={report} />
              <p style={{ fontSize: 25, color: '#FF8300' }}><strong>Reports & Dashboard</strong></p>
              <p>Consider a fresh</p>
              <p>approach to</p>
              <p>technology</p>
              <a onClick={handleChangePage}>LEARN MORELEARN MORE</a>
            </Grid>
            <Grid item lg={4} className={classes.crmMKT}>
            <img src={marketing} />
              <p style={{ fontSize: 25, color: '#FF8300' }}><strong>Marketing Campaigns</strong></p>
              <p>Promote a product</p>
              <p>through different</p>
              <p>media</p>
              <a onClick={handleChangePage}>LEARN MORE</a>
            </Grid>
          </Grid>
          <Grid item md={12} style={{ textAlign: 'center', fontFamily: 'auto', marginBottom: 40 }} >
            <p style={{ fontSize: 50 }}>Bạn muốn thử ?</p>
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