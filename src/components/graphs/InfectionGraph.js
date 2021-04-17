import React, { PureComponent } from "react";
import Styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

import Colours from "../static/colours";

const BorderDiv = Styled.div`
  border-style: solid;
  border-width: 3px;
  border-radius: 2px;
  text-align: centre;
  padding: 10px;
  background-color: ${Colours.background};
  border-color: ${Colours.border2};
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <BorderDiv className="custom-tooltip">
        <h6 className="label">{`Day : ${label}`}</h6>
        <h6 className="desc">{`Infected : ${payload[0].value}`}</h6>
      </BorderDiv>
    );
  }

  return null;
};

export default class InfectionGraph extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="90%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day">
            <Label value="Day" position="insideBottom" offset={-5} />
          </XAxis>
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Infected
            </Label>
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="infected" stroke={Colours.medium} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
