import React from 'react';

// import data from './data/qData.js';
import data1 from './data/data1.js';
import data2 from './data/data2.js';

import XYChart1 from './components/XYChart1';
import XYChart2 from './components/XYChart2';

class App extends React.Component {  
  render() {
    return (
      <div className="charts-container">
        <XYChart1 data={data1} className="chart"/>
        <XYChart2 data={data2} className="chart"/>
      </div>
    );
  }
}

export default App;
