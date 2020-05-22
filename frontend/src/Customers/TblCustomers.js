import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblCustomers extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Address', field: 'address', type: "String" },
            { title: 'Nghề nghiệp', field: 'job', type: "String" },
            { title: 'Phone', field: 'phone', type: "String" },
            { title: 'Email', field: 'email', type: 'String' },
            { title: 'Type', field: 'type', type: "String" },
            { title: 'Chi nhánh', field: 'branchId', type: "String" },
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
                title="Danh sách các khách hàng "
                columns={columns}
                data={data}
                // editable={{
                //     onRowAdd: (newData) =>
                //         new Promise((resolve) => {
                //             setTimeout(() => {
                //                 resolve();
                //                 this.setState((prevState) => {
                //                     const data = [...prevState.data];
                //                     data.push(newData);
                //                     return { ...prevState, data };
                //                 });
                //             }, 600);
                //         }),
                //     onRowUpdate: (newData, oldData) =>
                //         new Promise((resolve) => {
                //             setTimeout(() => {
                //                 resolve();
                //                 if (oldData) {
                //                     this.setState((prevState) => {
                //                         const data = [...prevState.data];
                //                         data[data.indexOf(oldData)] = newData;
                //                         return { ...prevState, data };
                //                     });
                //                 }
                //             }, 600);
                //         }),
                //     onRowDelete: (oldData) =>
                //         new Promise((resolve) => {
                //             setTimeout(() => {
                //                 resolve();
                //                 this.setState((prevState) => {
                //                     const data = [...prevState.data];
                //                     data.splice(data.indexOf(oldData), 1);
                //                     return { ...prevState, data };
                //                 });
                //             }, 600);
                //         }),
                // }}
            />
        );
    }
}
export default TblCustomers;