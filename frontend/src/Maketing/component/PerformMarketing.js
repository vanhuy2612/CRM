import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import moment from 'moment'
const styles = theme => ({
    grid: {
        textAlign: 'left',
        fontSize: '20px',
        fontFamily: 'auto'
    },
    subject: {
        fontSize: '30px',
        textAlign: 'center',
        fontFamily: 'auto'
    }
})
class PerformMarketing extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { data, classes } = this.props
        console.log('data', data)
        return (
            <div>
                {data.map((element, index) => (
                    <Grid container spacing={0} key={index} className={classes.grid}>
                        <Grid item xs={8}>
                            <Grid item xs={12} className={classes.subject}>
                                Chủ đề:     {element.subject}
                            </Grid>
                            <Grid item xs={8} className={classes.name}>
                                Tên:    {element.name}
                            </Grid>
                            <Grid item xs={8} className={classes.type}>
                                Thể loại:   {element.type}
                            </Grid>
                            <Grid item xs={8} className={classes.content}>
                                Nội dung:   {element.contents}
                            </Grid>
                            <Grid item xs={8} className={classes.startDate}>
                                Ngày bắt đầu:   {moment(element.startDate).format('DD-MM-YYYY - hh:ss:mm')}
                            </Grid>
                            <Grid item xs={8} className={classes.endDate}>
                                Ngày kết thúc:  {moment(element.endDate).format('DD-MM-YYYY - hh:ss:mm')}
                            </Grid>
                            <Grid item xs={8} className={classes.status}>
                                Trạng thái: {element.status}
                            </Grid>
                            <Grid item xs={8} className={classes.createdAt}>
                                Ngày tạo:   {moment(element.createdAt).format('DD-MM-YYYY - hh:ss:mm')}
                            </Grid>
                            <Grid item xs={8} className={classes.updatedAt}>
                                Ngày chỉnh sửa gần nhất:    {moment(element.updatedAt).format('DD-MM-YYYY - hh:ss:mm')}
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <img src={element.urlImage} style={{ height: 350, width: 350 }} />
                        </Grid>
                    </Grid>
                ))}
            </div>
        )
    }
}
export default withStyles(styles)(PerformMarketing);
