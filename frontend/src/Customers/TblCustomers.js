import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Phone', field: 'phone' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      { title: 'Birth Place',ield: 'birthCity',lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },},
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran',phone: "541354863", birthYear: 1987, birthCity: 63 },
      {name: 'Zerya Betül',surname: 'Baran', phone: "541354863", birthYear: 2017 ,birthCity: 34},
      { name: 'pogba', surname: 'Baran', phone: "541354863", birthYear: 1993, birthCity: 63 },
      { name: 'hanmashi', surname: 'Baran', phone: "541354863", birthYear: 1997, birthCity: 34 },
    ],
  });

  return (
    <MaterialTable
      title="Editable Example"
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