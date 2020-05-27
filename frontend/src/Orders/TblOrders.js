import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblOrders extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Id', field: 'id', type: "String" },
            { title: 'Id Khách hàng', field: 'customerId', type: 'String' },
            { title: 'Id của sản phẩm', field: 'items.productId', type: "String" },
            { title: 'Số lượng', field: 'items.orderdetails.quantity', type: 'Interger' },
            { title: 'Giá', field: 'items.orderdetails.price', type: 'float' },
            { title: 'Ngày đặt hàng', field: 'createdAt', type: "String" },
        ]
    }
    render() {
        const { columns } = this
        const { data } = this.props
        console.log('data', data)
        return (
            <MaterialTable
                title="Danh sách đặt hàng"
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}
            />
        );
    }
}
export default TblOrders;