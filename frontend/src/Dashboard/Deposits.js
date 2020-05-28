import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import moment from 'moment'
import NumberFormat from 'react-number-format'


const styles = theme => ({
  depositContext: {
    flex: 1,
  },
});
class Deposits extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  preventDefault = event => {
    event.preventDefault();
  }
  render() {
    // const NumberFormat = require('react-number-format');
    const { classes } = this.props
    const { data } = this.props
    return (
      <React.Fragment>
        <Title>Tổng doanh thu trong ngày(vnd)</Title>
        <Typography component="p" variant="h4">
          <NumberFormat value={data} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>}/>
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          {moment().format('DD - MM - YYYY')}
        </Typography>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Deposits);