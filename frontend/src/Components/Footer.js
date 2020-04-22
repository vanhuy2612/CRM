import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Col, Row } from 'reactstrap'
import Grid from '@material-ui/core/Grid'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Sidebar from '../Components/Sidebar'
// import Map from './Map'
const style = theme => ({
  footer: {
    backgroundColor: '#ABBFB5',
    marginTop: '20px',
  },
  service: {
    marginTop: '20px',
    marginBottom: '10px',
    cursor: 'pointer'
  },
  root: {
    flexGrow: 1,
  },
  grid: {
    marginLeft: '15px',
    marginTop: '20px'
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
})

const sidebar = {
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  Send() {
    this.props.link.history.push('/Send/123')
  }
  Questions() {
    this.props.link.history.push('/Questions/124')
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <Col md="12" xs="12" className={classes.footer}>
          <Grid container className={classes.root} spacing={2} >
            <Grid item xs={0} md={3}>
              <h4>Hỗ Trợ Khách Hàng</h4>
              <h6 style={{ color: 'red', marginTop: '20px' }}>Hotline đặt hàng: 0326609183</h6>
              <span>(Hỗ trợ từ thứ 2 đến thứ 7)</span>
              <h6 style={{ color: 'red', marginTop: '10px' }}>Hotline chăm sóc khách hàng: 0326609183</h6>
              <p>(Hỗ trợ từ thứ 2 đến thứ 7)</p>
              <p><a className={classes.service}>Các câu hỏi thường gặp</a></p>
              <p className={classes.service}><a>Gửi yêu cầu hỗ trợ</a></p>
              <p className={classes.service}><a>Chính sách khách hàng</a></p>
              <p>Hỗ trợ khách hàng :admin@pro.com</p>
              <p>Báo lỗi bảo mật : sercurty@pro.com</p>
            </Grid>
            <Grid item xs={12} md={3}>
              <h4>Về PRO</h4>
              <p style={{ marginTop: '20px' }} className={classes.service}><a onClick={() => this.Questions()}>Giới thiệu về PRO</a></p>
              <p className={classes.service}><a>Chính sách bảo mật thanh toán</a></p>
              <p className={classes.service}><a>Chính sách bảo mật thông tin cá nhân</a></p>
              <p className={classes.service}><a>Chính sách giải quyết khiếu nại</a></p>
              <p className={classes.service}><a>Điều khoản sử dụng</a></p>
              <p className={classes.service}><a>PRO tư vấn</a></p>
            </Grid>
            <Grid spacing={5} className={classes.mainGrid}>
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                social={sidebar.social}
              />
            </Grid>
          </Grid>
        </Col>
      </div>
    )
  }
}
export default withStyles(style)(Footer);