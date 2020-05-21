import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblAccounts extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Tài khoản', field: 'username', type: "String" },
            { title: 'Chức vụ', field: 'role', type: "String" },
            { title: 'Chi nhánh', field: 'branchId', type: "String" },
            { title: 'Vị trí', field: 'position', type: "String" },
            { title: 'Phone', field: 'phone', type: "Interger" },
            { title: 'Email', field: 'email', type: "String" },
            { title: 'Ngày tạo', field: 'createdAt', type: 'Date' },
            { title: 'Thay đổi gần nhất', field: 'createdAt', type: 'Date' },
            { title: 'Avatar', field: 'urlImage', type: "String" },
        ]
    }
    

    render() {
        const { columns } = this
        const { data } = this.props
        console.log('data', data)
        return (
            <MaterialTable
                title="Danh sách các Tài khoản "
                columns={columns}
                data={data}
            />
        );
    }
}
export default TblAccounts;