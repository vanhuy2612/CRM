import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
const styles = theme => ({
    grid: {
        textAlign: 'left',
        fontSize: '20px'
    },
    subject: {
        fontSize: '30px',
        textAlign: 'left'
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
                                Nội dung:   {element.content}
                            </Grid>
                            <Grid item xs={8} className={classes.startDate}>
                                Ngày bắt đầu:   {element.startDate}
                            </Grid>
                            <Grid item xs={8} className={classes.endDate}>
                                Ngày kết thúc:  {element.endDate}
                            </Grid>
                            <Grid item xs={8} className={classes.status}>
                                Trạng thái: {element.status}
                            </Grid>
                            <Grid item xs={8} className={classes.createdAt}>
                                Ngày tạo:   {element.createdAt}
                            </Grid>
                            <Grid item xs={8} className={classes.updatedAt}>
                                Ngày chỉnh sửa gần nhất:    {element.updatedAt}
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
