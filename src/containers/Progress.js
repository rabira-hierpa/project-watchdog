import React, { Component } from "react";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.title = "Progress";
    this.task = 35;
    this.milestone = 15;
    this.progress = 40;
    this.state = {
      chartData: {}
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  getChartData() {
    // Ajax call goes here
    this.setState({
      chartData: {
        labels: [
          "Boston",
          "Worcester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        datasets: [
          {
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ]
          }
        ]
      }
    });
  }
  render() {
    let style = {
      fontFamily: "Archivo Black",
      fontWeight: "100"
    };
    return (
      <div>
        <h1>Progress Page</h1>
      </div>
    );
  }
}

Progress.propTypes = {};

export default Progress;
