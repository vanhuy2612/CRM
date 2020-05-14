import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblOrders extends Component{
    constructor(props){
        super(props)
        this.columns = [
                { title: 'Id', field: 'id' },
                { title: 'Price', field: 'price', type: 'number' },
                { title: 'Quantity', field: 'quantity', type: 'number' },
                { title: 'ItemId', field: 'itemId' },
                { title: 'CustomerId', field: 'customerId' },
                // { title: 'CardId', field: 'cardId' },
            ]
    }
    render(){
        const {columns} = this
        const { data } = this.props
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