import React from 'react';

import Chart from './components/XYChart7';
import data from './components/XYChart7/data'
class App extends React.Component {
  render() {
    return (
      <div className="charts-container">
        <Chart data={data} className="chart"/>
      </div>
    );
  }
}

export default App;
