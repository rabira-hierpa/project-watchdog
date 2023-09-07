import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => (
  <div className="col-md-6">
    <Pie
      data={props.chartData}
      options={{
        // maintainAspectRatio: false,
        responsive: true,
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

export default PieChart;
