import React, { Component  } from 'react';
import MaterialTable from 'material-table';

class TblProduct extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Id', field: 'id', type: "String" },
            { title: 'Id sản phẩm', field: 'productId', type: 'String' },
            { title: 'Giá', field: 'price', type: 'float' },
            { title: 'Mô tả', field: 'des', type: "String" },
        ]
    }
    render() {
        const { columns } = this
        // const { data } = this.props
        const data = [
            { id: '213124', productId: 'MB1', price: '250000',des: 'asaddsadsadad' },
            { id: '12345', productId: 'MB1', price: '5860000',des: '12dscvda' },
            { id: '342544321', productId: 'MB1',price: '20000', des: '2dvfqwdaqdqw' }

        ]
        const Action = [
            {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => {
                    // Do save operation
                } 
            }, {
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => {
                    // Do save operation
                }
            },
        ]
        console.log('data', data)
        return (
            <MaterialTable
                title="Danh sách đặt hàng"
                columns={columns}
                data={data}
                actions={Action}
            //     editable={{
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
export default TblProduct;