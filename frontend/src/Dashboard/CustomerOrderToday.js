import React, { Component } from 'react';
import MaterialTable from 'material-table';

class CustomerOrderToday extends Component {
    constructor(props) {
        super(props)
        this.state={}
        this.columns = [
            { title: 'Id', field: 'id', type: "String" },
            { title: 'Khách hàng', field: 'name', type: 'String' },
            { title: 'Số lượng', field: 'quantity', type: 'Interger' },
            { title: 'Giá', field: 'price', type: 'float' },
            { title: 'Ngày đặt hàng', field: 'dateOrder', type: "String" },
        ]
    }
    render() {
        const { columns } = this
        const { data } = this.props
        console.log('data', data)
        return (
            <MaterialTable
                title="Thống kê doanh thu theo khách hàng trong ngày"
                columns={columns}
                data={data}
            />
        );
    }
}
export default CustomerOrderToday;