import React from 'react';

import XYChart1 from './components/XYChart1';

import data from './data/Data';

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
