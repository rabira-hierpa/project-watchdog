import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const HorizontalChart = (props) => {
  return (
    <div className="col-md-6">
      <HorizontalBar
        data={this.props.chartData}
        options={{
          //   maintainAspectRatio: false,
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
};

export default HorizontalChart;
