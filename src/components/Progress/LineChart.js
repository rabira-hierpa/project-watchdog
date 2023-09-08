import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  return (
    <div className="col-md-12">
      <Line
        data={props.chartData}
        options={{
          // maintainAspectRatio: false,
          title: {
            display: true,
            text: props.title,
            fontSize: 25,
          },
          legend: {
            display: true,
            position: props.position,
            labels: {
              fontColor: "#000",
            },
          },
        }}
        redraw
      />
    </div>
  );
};

export default LineChart;
