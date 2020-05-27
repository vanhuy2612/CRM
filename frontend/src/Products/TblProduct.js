import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblProduct extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Id', field: 'id', type: "String" },
            { title: 'Tên sản phẩm', field: 'productName', type: "String" },
            { title: 'Giá bán ra', field: 'price', type: 'float' },
            { title: 'Giá nhập vào', field: 'inputPrice', type: "float" },
            { title: 'Số lượng', field: 'quantity', type: "String" },
            { title: 'Mô tả', field: 'des', type: "String" },
            { title: 'Hạn SD', field: 'expiryDate', type: "String" },
            { title: 'Ngày nhập', field: 'createdAt', type: "String" },
        ]
    }
    render() {
        const { columns } = this
        const { data } = this.props
        return (
            <MaterialTable
                title="Danh sách đặt hàng"
                columns={columns}
                data={data}
                // actions={Action}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    console.log('Api Edit data')
                                }
                            }, 60);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                console.log('Api delete data')
                            }, 600);
                        }),
                }}
            />
        );
    }
}
export default TblProduct;