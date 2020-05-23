import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  gridTable: {
    height: "calc(100vh - 100px)"
  },
})
class TblActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        { title: 'Người gửi', field: 'name', type: "String" },
        { title: 'Chủ đề', field: 'title', type: "String" },
      ],
      data: [
        { name: "tien duong", title: "ádghasbnkdasnkldsa" },
        { name: "van duong", title: "ajckhagsvcyughv ácgy" },
      ]
    }
  }


  render() {
    const { data, columns } = this.state
    const { classes } = this.props
    console.log('data', data)
    return (
      <MaterialTable
        title="Danh sách các email của khách hàng "
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
export default withStyles(styles)(TblActivity);