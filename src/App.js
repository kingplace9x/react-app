import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import Item from './Item';
import weather from 'weather-js';

import { Line } from 'react-chartjs-2';

class App extends Component {
  state = {
    max: 0,
    min: 0,
    now: new Date(),
    btn: "Start",
    interval: 0,
    array: [
      {
        id: 1,
        num: Math.round(Math.random() * 9)
      },
      {
        id: 2,
        num: Math.round(Math.random() * 9)
      },
      {
        id: 3,
        num: Math.round(Math.random() * 9)
      },
      {
        id: 4,
        num: Math.round(Math.random() * 9)
      }
    ],
  };


  constructor() {
    super();
    setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);

  }

  onDelete = (id) => {
    let newArr = this.state.array.filter(i => i.id !== id);
    this.setState({ array: newArr });
  }

  newRow = () => {
    let newArr = this.state.array;
    if (newArr.length > 50) {
      newArr= newArr.filter((_,index)=>index!=0);
    }
    let newItem = {
      id: newArr.length !== 0 ? Math.max(...newArr.map(i => i.id)) + 1 : 0,
      num: newArr[newArr.length-1].num + Math.round(Math.random()*4-2)
    }
    newArr.push(newItem)

    this.setState({ 
      array: newArr,
      max: this.state.max > newItem.num ? this.state.max : newItem.num,
      min: this.state.min < newItem.num ? this.state.min : newItem.num
    });
  }

  start = () => {
    this.setState({
      interval: setInterval(() => {
        this.newRow();
      }, 50),
      btn: "Stop"
    })
  }
  stop = () => {
    clearInterval(this.state.interval);
    this.setState({
      btn: "Start"
    })
  }
  render() {
    return (
      <div className="main">
        <div className="container">
          <button className="btn btn-info" style={{ margin: "5px" }} onClick={this.state.btn === "Start" ? this.start : this.stop}>{this.state.btn}</button>
          <h1>{this.state.now?.toLocaleString()}</h1>
          <h2>Max = {this.state.max}; Min = {this.state.min} </h2>
          <div>
            <Line options={{
              animation: false,
              scales: {
                yAxes: [{
                  animation:false,
                  display: true,
                  ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    beginAtZero: true,   // minimum value will be 0.
                    suggestedMax: 10
                  }
                }]
              }
            }} data={{
              labels: this.state.array.map(item => item.id),
              datasets: [{
                data: this.state.array.map(item => item.num),
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
              }]
            }} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
