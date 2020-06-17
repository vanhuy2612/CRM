import React, { Component } from 'react';
import 'antd/dist/antd.css';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class image extends Component {
  constructor(props) {
    super(props)
    this.state = {
		fileList: [],
		dataTotalReturn: [],
		dataTotal: []
    }
  }
  toggleDataSeries = (e) => {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
  render() {
	const {data} = this.props
	const {dataTotalReturn,dataTotal } = this.state
	console.log('data', data)
	if(data){
		data.map((element) =>{
			dataTotalReturn.push({
				label: element.name,
				y: element.totalReturn
			})
		})
		data.map((element) =>{
			dataTotal.push({
				label: element.name,
				y: element.total
			})
		})
	}
	console.log('dataTotalReturn', dataTotalReturn) 
	console.log('dataTotal', dataTotal)  
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...this.state.fileList],
      onChange: this.handleChange,
    }
    const options = {
			animationEnabled: true,
			title:{
				text: "Tiểu lệ tiền khách hàng trả/tổng tiền phải trả "
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
					fontSize: 16,
					itemclick: this.toggleDataSeries
			},
			toolTip: {
				shared: true
			},
			data: [
			{
				type: "stackedColumn100",
				name: "totalReturn",
				showInLegend: true,
				color: "#D4AF37",
				dataPoints: dataTotalReturn
			},
			{
				type: "stackedColumn100",
				name: "total",
				showInLegend: true,
				color: "#C0C0C0",
				dataPoints: dataTotal
			},
			]
		}
    const { pass, repass } = this.state
    return (
      <div>
        <CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
      </div>
    )
  }
}
export default image