import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblCustomers extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Address', field: 'address', type: "String" },
            { title: 'Phone', field: 'phone', type: "String" },
            { title: 'Type', field: 'type', type: "String" },
            { title: 'BranchId', field: 'branchId', type: "String" },
            {title: "Avatar" , field:'url', type:"Something"}
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
            />
        );
    }
}
export default TblCustomers;