import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo(props) {
    console.log('xxxxx', props.data || []) 
    const dataCus = props.data
    const [state, setState] = React.useState({
        columns: [
            { title: 'Id', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'Address', field: 'address' },
            { title: 'Phone', field: 'phone' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            { title: 'Birth Place', ield: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, },
        ],
        data: [
            { id: "dagdbbvaq874361ajvh8", name: 'Mehmet', address: 'Baran', phone: "541354863", birthYear: 1987, birthCity: 63 },
            { id: "dagdbbq7crt398r61ajvh8", name: 'Zerya Betül', address: 'Baran', phone: "541354863", birthYear: 2017, birthCity: 34 },
            { id: "dagdbr87613ru1ajvh8", name: 'pogba', address: 'Baran', phone: "541354863", birthYear: 1993, birthCity: 63 },
            { id: "dagdbbvaq2784cf8y4ajvh8", name: 'hanmashi', address: 'Baran', phone: "541354863", birthYear: 1997, birthCity: 34 },
        ],
    });

    return (
        <MaterialTable
            title="Danh sách các khách hàng "
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
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
                                setState((prevState) => {
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
                            setState((prevState) => {
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