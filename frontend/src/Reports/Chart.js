import React, { Component } from 'react';
import 'antd/dist/antd.css';
import CanvasJSReact from '../Deals/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class image extends Component {
  constructor(props) {
    super(props)
    this.state = {
		fileList: [],
		dataTotalReturn: [],
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
  console.log('data', data)
	const {dataTotalReturn } = this.state
	if(data){
		data.map((element) =>{
			dataTotalReturn.push({
				label: `tháng${element.month}`,
				y: element.total
			})
		})
	}
	console.log('dataTotalReturn', dataTotalReturn)   
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [...this.state.fileList],
      onChange: this.handleChange,
    }
    const options = {
      animationEnabled: true,
			theme: "dark2",
			title: {
				text: "Thống kê doanh thu 12 tháng vừa qua"
			},
			axisY: {
			title: "doanh thu (vnd)",
				scaleBreaks: {
					autoCalculate: true,
			  type: "wavy",
			  lineColor: "white"
				}
			},
			data: [{
				type: "column",
				indexLabel: "{y}",		
				indexLabelFontColor: "white",
				dataPoints: dataTotalReturn
			}]
			// animationEnabled: true,
			// title:{
			// 	text: "Thống kê doanh thu trong 12 tháng vừa qua"
			// },
			// legend: {
			// 	verticalAlign: "center",
			// 	horizontalAlign: "right",
			// 	reversed: true,
			// 	cursor: "pointer",
			// 		fontSize: 16,
			// 		itemclick: this.toggleDataSeries
			// },
			// toolTip: {
			// 	shared: true
			// },
			// data: [
			// {
      //   type: "column",
      //   indexlable: "{y}",
      //   name: "doanh thu",
      //   indexLabelFontColor: "white",
			// 	// showInLegend: true,
			// 	// color: "#D4AF37",
			// 	dataPoints: dataTotalReturn
			// }
			// ]
		}
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