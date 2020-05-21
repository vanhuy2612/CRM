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
            { title: 'BranchId', field: 'branchId', type: "String" },
            { title: 'CreatrdAt', field: 'createdAt', type: 'Date' },
            { title: 'UpdatedAt', field: 'createdAt', type: 'Date' },
            { title: 'Avatar', field: 'urlImage', type: "String" },
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