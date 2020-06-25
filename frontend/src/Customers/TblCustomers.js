import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import _ from 'lodash'

class TblCustomers extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Avatar', field: 'urlImage', type: "String", render: rowData => <img src={rowData.urlImage} style={{width: 50, borderRadius: '50%'}}/> },
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Address', field: 'address', type: "String" },
            { title: 'Nghề nghiệp', field: 'job', type: "String" },
            { title: 'Phone', field: 'phone', type: "String" },
            { title: 'Email', field: 'email', type: 'String' },
            { title: 'Type', field: 'type', type: "String" },
            { title: 'Chi nhánh', field: 'branchId', type: "String" },
            { title: 'Ngày tạo', field: 'createdAt', type: 'Date' },
            { title: 'Thay đổi gần nhất', field: 'createdAt', type: 'Date' },
        ]
    }

    render() {
        const { columns } = this
        const { data } = this.props
        console.log('data', data)
        return (
            <MaterialTable
                title="Danh sách các khách hàng "
                columns={columns}
                data={data}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(async () => {
                                resolve();
                                if (oldData) {
                                    let token = localStorage.getItem('token')
                                    axios.defaults.headers.common['Authorization'] = token;

                                   
                                    let URLUpdateCustomer = process.env.REACT_APP_BASE_URL + '/api/customer/' + oldData.id;
                                    let response = await (axios.put(URLUpdateCustomer, newData))
                                    let dataUpdated = _.get(response, "data", [])
                                    if (dataUpdated.errors != undefined) console.log(dataUpdated)
                                    else window.location.reload()
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout( async () => {
                                resolve();
                                    let token = localStorage.getItem('token')
                                    axios.defaults.headers.common['Authorization'] = token;

                                   
                                    let URLDeleteCustomer = process.env.REACT_APP_BASE_URL + '/api/customer/' + oldData.id;
                                    let dataMaketing = await (axios.delete(URLDeleteCustomer))
                                    let data = _.get(dataMaketing, "data", [])
                                    if (data.errors != undefined) console.log(data)
                                    else window.location.reload()
                            }, 600);
                        }),
                }}
            />
        );
    }
}
export default TblCustomers;