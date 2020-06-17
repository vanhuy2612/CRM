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
		dataTotalNoReturn: []
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
	const {dataTotalReturn,dataTotalNoReturn } = this.state
	if(data){
		data.map((element) =>{
			dataTotalReturn.push({
				label: element.name,
				y: element.totalReturn
			})
		})
		data.map((element) =>{
			dataTotalNoReturn.push({
				label: element.name,
				y: element.total - element.totalReturn
			})
		})
	}
	console.log('dataTotalReturn', dataTotalReturn) 
	console.log('dataTotalNoReturn', dataTotalNoReturn)  
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
				name: "Khách hàng đã trả",
				showInLegend: true,
				color: "#D4AF37",
				dataPoints: dataTotalReturn
			},
			{
				type: "stackedColumn100",
				name: "Khách hàng chưa trả",
				showInLegend: true,
				color: "#C0C0C0",
				dataPoints: dataTotalNoReturn
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