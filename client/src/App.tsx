import React from 'react';
import Canvas from './components/Canvas';
import { range } from './utils/range';

const App = () => {
  const data = [
    {x: 2020, y:92},
    {x: 2021, y:89},
    {x: 2022, y:84}
  ]
  const maxVal = Math.ceil(Math.max(...data.map(c => c.y)));
  const minVal = Math.floor(Math.min(...data.map(c => c.y)));
  const vals = range(maxVal + 2, minVal - 2, -1);
  const maxLab = Math.ceil(Math.max(...data.map(c => c.x)));
  const minLab = Math.floor(Math.min(...data.map(c => c.x)));
  const labs = range(minLab, maxLab, 1);
  return (
    <div className="app">
      <Canvas
        axisValues={{x:[...labs], y:[...vals]}}
        values={data}
        xAxisLabel="years"
        yAxisLabel="weight"
      />
    </div>
  );
}

export default App;
