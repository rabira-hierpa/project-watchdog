import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class BarChart extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }
  componentWillUpdate(nextProps, nextState) {
    // this.props = nextProps;
  }

  render() {
    return (
      <div className="col-md-6">
        <Doughnut
          data={this.props.chartData}
          options={{
            // maintainAspectRatio: false,
            responsive: true,
            title: {
              display: true,
              text: this.props.title,
              fontSize: 25,
            },
            legend: {
              display: true,
              position: this.props.position,
              labels: {
                fontColor: "#000",
              },
            },
          }}
          redraw
        />
      </div>
    );
  }
}

export default BarChart;
