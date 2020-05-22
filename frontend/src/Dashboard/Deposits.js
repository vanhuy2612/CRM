import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title'
import moment from 'moment'


const styles = theme => ({
  depositContext: {
    flex: 1,
  },
});
class Deposits extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  preventDefault = event => {
    event.preventDefault();
  }
  render(){
    const {classes}= this.props
    const {data} = this.props
    return (
      <React.Fragment>
        <Title>Tổng doanh thu trong ngày(vnd)</Title>
        <Typography component="p" variant="h4">
          {data}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          {moment().format('DD - MM - YYYY')}
        </Typography>
        {/* <div>
          <Link color="primary" href="#" onClick={this.preventDefault}>
            View balance
          </Link>
        </div> */}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Deposits);