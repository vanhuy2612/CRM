import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblOrders extends Component{
    constructor(props){
        super(props)
        this.state={
            columns: [
                { title: 'Id', field: 'id' },
                { title: 'Price', field: 'price', type: 'number' },
                { title: 'Quantity', field: 'quantity', type: 'number' },
                { title: 'ItemId', field: 'itemId' },
                { title: 'CustomerId', field: 'customerId ' },
                { title: 'CardId', field: 'cardId' },
            ],
            data: [
                { id: "dagdbbvaq874361ajvh8", price: '100000', quantity: '10', itemId: "jdagsdg1287fh", customerId: 'dagdbbvaq874361a', cardId: 'sfsdf' },
                { id: "dagdbbq7crt398r61ajvh8", price: '100000', quantity: '8', itemId: "hadf761esahd", customerId: 'dagdbbvaq874361a', cardId: 'sfsd' },
                { id: "dagdbr87613ru1ajvh8", price: '100000', quantity: '7', itemId: "qadtx712e6hd", customerId: 'dagdbbvaq874361a', cardId: 'sdfsd' },
                { id: "dagdbbvaq2784cf8y4ajvh8", price: '100000', quantity: '6', itemId: "xd1edxad8", customerId: 'dagdbbvaq874361a', cardId: 'sfsd' },
            ],
        }
    }
    render(){
        const {columns, data} = this.state
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