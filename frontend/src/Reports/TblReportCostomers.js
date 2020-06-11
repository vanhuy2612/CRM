import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblCustomers extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Address', field: 'address', type: "String" },
            { title: 'Phone', field: 'phone', type: "String" },
            { title: 'Email', field: 'email', type: 'String' },
            { title: 'Type', field: 'type', type: "String" },
            { title: 'Chi nhánh', field: 'branchId', type: "String" },
            { title: 'Ngày tạo', field: 'createdAt', type: 'Date' },
            { title: 'Thay đổi gần nhất', field: 'createdAt', type: 'Date' },
            { title: 'Avatar', field: 'urlImage', type: "String", render: rowData => <img src={rowData.urlImage} style={{width: 50, borderRadius: '50%'}}/> },
        ]
    }

    render() {
        const { columns } = this
        const { data } = this.props
        console.log('data', data)
        return (
            <MaterialTable
                title="Danh sách các khách hàng tiềm năng"
                columns={columns}
                data={data}
            />
        );
    }
}
export default TblCustomers;