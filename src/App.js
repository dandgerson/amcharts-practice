import React from 'react';

import data from './data/Data.json';

import XYChart1 from './components/XYChart1';

class App extends React.Component {  
  render() {
    return (
      <div className="charts-container">
        <XYChart1 data={data} />
      </div>
    );
  }
}

export default App;
