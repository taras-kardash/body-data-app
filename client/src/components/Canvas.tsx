import * as React from 'react';
import { clearCanvas, drawPoints, drawXAxis, drawYAxis } from '../utils/canvasApi';

import './canvas.scss'

type AxisValueList = {
  x: Array<number>,
  y: Array<number>
}

type ValueCoord = {
  x: number,
  y: number
}

interface CanvasProps {
  width?: number;
  height?: number;
  axisValues?: AxisValueList;
  values?: Array<ValueCoord>;
  xAxisLabel?: string;
  yAxisLabel?: string;
}
 
const Canvas: React.FC<CanvasProps> =
  ({width = 640, height = 480,
    axisValues = { x: [], y:[] }, values = [],
    xAxisLabel, yAxisLabel
  }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
      if (canvasRef && canvasRef.current) {

        const ctx = canvasRef.current.getContext('2d');
        ctx && clearCanvas(ctx);
        ctx && drawYAxis(ctx, axisValues.y, true);
        ctx && drawXAxis(ctx, axisValues.x, true);
        ctx && drawPoints(ctx, values, axisValues.x, axisValues.y,
          true)
      }
    }, [values, axisValues.x, axisValues.y]);

    return (
      <div
        className='canvas-container'
        style={{width, height}}>
        <div className='y-axis'>
          { yAxisLabel &&
            <label className='y-axis-label'>
              <b>{yAxisLabel}</b>
            </label>
          }
        </div>
        <canvas
          ref={canvasRef}
          className='grid'
          width={width - 50}
          height={height}
        />
        <div className='x-axis'>
          { xAxisLabel &&
            <label className='x-axis-label'>
              <b>{xAxisLabel}</b>
            </label>
          }
        </div>
      </div>
    );
  }
 
export default Canvas;
