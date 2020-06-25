import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Col, Row } from 'reactstrap'
import Grid from '@material-ui/core/Grid'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Sidebar from '../Components/Sidebar'
const style = theme => ({
  footer: {
    backgroundColor: '#20c997',
    marginTop: '20px',
  },
  service: {
    marginTop: '30px',
    marginBottom: '10px',
    marginLeft: 10,
    cursor: 'pointer',
    color: '#f8f9fa',
    fontFamily: 'auto',
    fontSize: 20,
  },
  root: {
    flexGrow: 1,
  },
  mainGrid: {
    marginTop: theme.spacing(2),
    color:'#6c757d'
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
            <Grid item md={2} className={classes.service}>
              <span style={{color: '#6c757d'}}>CRM Team</span>
              <p>CRM Team</p>
              <p>Giá cả</p>
              <p>Giới thiệu</p>
              <p>Công cụ báo chí</p>
              <p>Liên hệ với chung tôi</p>
              <p>Trong báo chí</p>
            </Grid>
            <Grid item md={3} className={classes.service}>
              <span style={{color: '#6c757d'}}>HỖ TRỢ</span>
              <p>Bộ phận hỗ trợ</p>
              <p>Hội thảo Web</p>
              <p>Video hướng dẫn</p>
              <p>Liên kết với bộ phận hỗ trợ</p>
              <p>Xếp lịch demo</p>
              <p>Trang trạng thái CRM Team</p> 
            </Grid>
            <Grid item md={2} className={classes.service}>
              <span style={{color: '#6c757d'}}>TÀI NGUYÊN</span>
              <p>Giải pháp</p>
              <p>Lời khen tặng</p>
              <p>Thay thế</p>
              <p>Sử dụng</p>
            </Grid>
            <Grid item md={2} className={classes.service}>
            <span style={{color: '#6c757d'}}>ĐỐI TẮC</span>
              <p>Tìm đối tác</p>
              <p>Trở thành đối tác</p>
              <p>Đăng nhập cho đối tác</p>
            </Grid>
            <Grid spacing={2} className={classes.mainGrid}>
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