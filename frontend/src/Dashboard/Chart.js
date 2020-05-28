import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import _ from 'lodash'


export default function Chart(props) {
  const theme = useTheme();
  const dataChart = props.data
  dataChart.sort((a,b) => {
    return a.time - b.time
  })
  console.log('dataChart',dataChart)
  return (
    <React.Fragment>
      <Title>Thống kê doanh thu trong ngày</Title>
      <ResponsiveContainer>
        <LineChart
          data={dataChart}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales (vnd)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}