import React from 'react';

import XYChart from './components/XYChart3';
import data from './components/XYChart3/data'
class App extends React.Component {
  render() {
    return (
      <div className="charts-container">
        <XYChart data={data} className="chart"/>
      </div>
    );
  }
}

export default App;
