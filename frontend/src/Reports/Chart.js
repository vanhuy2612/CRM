import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Dashboard/Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('1', 0),
  createData('2', 300),
  createData('3', 600),
  createData('4', 800),
  createData('5', 1500),
  createData('6', 2000),
  createData('7', 2400),
  createData('8', 2400),
  createData('9', 2400),
  createData('10', 1500),
  createData('11', 1200),
  createData('12', 1900),
  createData('13', 700),
  createData('14', 900),
  createData('15', 300),
  createData('16', 1500),
  createData('17', 3000),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Month</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
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
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}