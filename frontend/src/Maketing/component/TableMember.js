import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Badge, Container, Grid } from '@material-ui/core';
import { Form, Input, Button, } from 'antd';
import { RollbackOutlined, HighlightOutlined, SendOutlined } from '@ant-design/icons'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { Select } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash'

const { Option } = Select;
const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        backgroundColor: '#D6E2F3',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    ButtonMail: {
        textAlign: 'center',
        padding: 40,
    }
});

class TblAccounts extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Avatar', field: 'urlImage', type: "String", render: rowData => <img src={rowData.urlImage} style={{ width: 50, borderRadius: '50%' }} /> },
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Tài khoản', field: 'username', type: "String" },
            { title: 'Chức vụ', field: 'role', type: "String" },
            { title: 'Chi nhánh', field: 'branchId', type: "String" },
            { title: 'Vị trí', field: 'position', type: "String" },
            { title: 'Role', field: 'roleId', type: "String" },
            { title: 'Phone', field: 'phone', type: "Interger" },
            { title: 'Email', field: 'email', type: "String" },
            { title: 'Ngày tạo', field: 'createdAt', type: 'Date' },
            { title: 'Thay đổi gần nhất', field: 'createdAt', type: 'Date' },
        ]
        this.onAddMemberToMarketing = this.onAddMemberToMarketing.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            open: true,
            display: true,
            // -----------------------
            optionsMember: [
                { id: 1, name: 'Apples' },
                { id: 2, name: 'Nails' },
                { id: 3, name: 'Bananas' },
                { id: 4, name: 'Helicopters' }
            ],
            selectedMember: []
            // --------------------------
        }
    }
    async getAllMember() {
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token;
        let URLGetAllMember = process.env.REACT_APP_BASE_URL + '/api/Member';
        let listCus = await axios.get(URLGetAllMember)
        let data = _.get(listCus, 'data', []);
        this.setState({
            optionsMember: data
        })
    }
    // Hàm lắng nghe sự kiện onclick
    onAddMemberToMarketing() {
        let marketingId = this.props.data[0]["id"]
        console.log(marketingId)
        this.addMemberToMarketing(this.state.selectedMember, marketingId)
    }
    // hàm thực thi thêm khách hàng vào marketing
    async addMemberToMarketing(listMember, marketingId) {
        let token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token;
        let URLGetAllMember = process.env.REACT_APP_BASE_URL + '/api/marketing/addmember';
        let dataInsert = {
            marketingId: marketingId,
            membersId: listMember
        }
        let listCus = await axios.post(URLGetAllMember, dataInsert)
        let data = _.get(listCus, 'data', []);
        console.log(data)
        window.location.reload()
    }
    componentDidMount() {
        this.getAllMember()
    }
    handleChange(value) {
        console.log(value);
        this.setState({
            selectedMember: value
        })
    }

    render() {
        const { columns } = this
        const { data, classes } = this.props
        let members
        data.map((element, index) => {
            members = element.members
        })
        return (
            <>
                <Grid item xs={12}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="choose Member"
                        // defaultValue={""}
                        onChange={this.handleChange}
                        optionLabelProp="label"
                    >
                        {
                            this.state.optionsMember.map((value, index) => {
                                return (
                                    <Option value={value.id} label={value.name}>
                                        <Grid container spacing={0} className="demo-option-label-item">
                                            <Grid item xs={3}>
                                                <span role="img" aria-label={value.name}>
                                                    id: {value.id}
                                                </span>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <img src={value.urlImage} style={{ height: 50, width: 50 }} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                Name: {value.name}
                                            </Grid>
                                            <Grid item xs={3}>
                                                Positon: {value.position}
                                            </Grid>
                                        </Grid>
                                    </Option>
                                )
                            })
                        }
                    </Select>
                    <Button type="primary" icon={<SendOutlined />} size={'large'} style={{borderRadius: 20}} onClick={this.onAddMemberToMarketing}>
                        Store
                    </Button>
                </Grid>
                <MaterialTable
                    title="Danh sách nhân viên có trong chiến dịch marketing: "
                    columns={columns}
                    data={members}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        console.log('Chưa có api update')
                                    }
                                }, 600);
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                setTimeout( async () => {
                                    resolve();
                                    let token = localStorage.getItem('token')
                                    axios.defaults.headers.common['Authorization'] = token;

                                    let payload = {
                                        marketingId: this.props.data[0]["id"],
                                        memberId: oldData.id
                                    }
                                    console.log(payload)
                                    let URLDeleteWorkon = process.env.REACT_APP_BASE_URL + '/api/marketing/removemember';
                                    let dataMaketing = await (axios.delete(URLDeleteWorkon, {data:payload}))
                                    let data = _.get(dataMaketing, "data", [])
                                    if (data.errors != undefined) console.log(data)
                                    else window.location.reload()
                                }, 600);
                            }),
                    }}
                />
            </>

        );
    }
}
export default TblAccounts;