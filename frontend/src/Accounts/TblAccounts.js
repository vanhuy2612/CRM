import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblAccounts extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Avatar', field: 'urlImage', type: "String" , render: rowData => <img src={rowData.urlImage} style={{width: 50, borderRadius: '50%'}}/>},
            { title: 'Name', field: 'name', type: "String" },
            { title: 'Tài khoản', field: 'username', type: "String" },
            { title: 'Chức vụ', field: 'role', type: "String" },
            { title: 'Chi nhánh', field: 'branchId', type: "String" },
            { title: 'Vị trí', field: 'position', type: "String" },
            { title: 'Phone', field: 'phone', type: "Interger" },
            { title: 'Email', field: 'email', type: "String" },
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
                title="Danh sách các Tài khoản "
                columns={columns}
                data={data}
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
                            setTimeout(() => {
                                resolve();
                                console.log('Chưa có api delete ')
                            }, 600);
                        }),
                }}
            />
        );
    }
}
export default TblAccounts;