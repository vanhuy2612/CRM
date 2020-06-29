import React, { Component } from 'react';
import MaterialTable from 'material-table';

class TblMailContacts extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            { title: 'Người gửi', field: 'from', type: 'String' },
            { title: 'Người nhận', field: 'to', type: "String" },
            { title: 'Chủ đề Mail', field: 'subject', type: "String" },
            { title: 'Ngày gửi', field: 'date', type: "String" },
        ]
    }
    render() {
        const actions = [
            {
                icon: 'ViewColumn',
                tooltip: 'View Email',
                onClick: (event, rowData) => {
                    const {user, urlAvatar} = this.props
                    console.log('subject', rowData.subject)
                    let subject = rowData.subject
                    console.log('subject', subject)
                    this.props.link.history.push({
                        pathname: `/ViewMail/${subject}`,
                        search: '?query=abc',
                        state: { data: rowData, user: user, urlAvatar: urlAvatar },
                    })
                }
            }
        ]
        const { columns } = this
        const { data } = this.props
        console.log('data', data)
        return (
            <MaterialTable
                title="Danh sách Email của khách hàng"
                columns={columns}
                data={data}
                actions={actions}
                editable={{
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
export default TblMailContacts;