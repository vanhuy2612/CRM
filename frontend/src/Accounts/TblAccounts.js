import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblAccounts extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Tài khoản', field: 'username', type: "String" },
            { title: 'Role', field: 'role', type: "String" },
            { title: 'BranchId', field: 'branchId', type: "String" },
            { title: 'CreatrdAt', field: 'createdAt', type: 'Date' },
            { title: 'UpdatedAt', field: 'createdAt', type: 'Date' },
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