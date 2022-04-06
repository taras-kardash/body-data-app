import { range } from './range';

type ValueCoord = {
  x: number,
  y: number
}

const OFFSET_LEFT = 40;
const OFFSET_RIGHT = 30;
const OFFSET_MESH_RIGHT = 15;
const OFFSET_TOP = 30;
const OFFSET_MESH_TOP = 15;
const OFFSET_BOTTOM = 30;

const TEXT_MIDDLE_OFFSET_LEFT = 20;
const TEXT_MIDDLE_OFFSET_BOTTOM = 10;

const MAX_VALUE_COUNT_X = 10;
const MAX_VALUE_COUNT_Y = 20;

export const drawYAxis =
  (ctx: CanvasRenderingContext2D,
    values: Array<number>,
    mesh?: boolean) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const k = Math.ceil((max-min)/MAX_VALUE_COUNT_Y);
    const internalValues = range(max, min, -k)
    
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const space = (height - (OFFSET_TOP + OFFSET_BOTTOM))
      / (internalValues.length - 1);
    const segments = ctx.getLineDash();
    const lineWidth = ctx.lineWidth;

    if (mesh) {
      ctx.lineWidth = 0.5;
      ctx.setLineDash([5, 5]);
    }

    for (let i = 0; i < internalValues.length; i++) {
      const value = internalValues[i];
      
      ctx.beginPath();
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(value.toString(),
        TEXT_MIDDLE_OFFSET_LEFT, space*(i) + OFFSET_TOP);
      mesh && ctx.moveTo(OFFSET_LEFT, space*(i) + OFFSET_TOP);
      mesh && ctx.lineTo(width - OFFSET_MESH_RIGHT, space*(i) + OFFSET_TOP);
      ctx.stroke()
    }
    
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(segments);
  }

export const drawXAxis =
  (ctx: CanvasRenderingContext2D,
    values: Array<number>,
    mesh?: boolean) => {
    const height = ctx.canvas.height;
    const width = ctx.canvas.width;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const k = Math.ceil(((max-min)/MAX_VALUE_COUNT_X));
    const internalValues = range(min, max, k)
    const space = (width - (OFFSET_LEFT + OFFSET_RIGHT))
      / (internalValues.length - 1);  
    const segments = ctx.getLineDash();
    const lineWidth = ctx.lineWidth;
    
    if (mesh) {
      ctx.lineWidth = 0.5;
      ctx.setLineDash([5, 5]);
    }

    for (let i = 0; i < internalValues.length; i++) {
      const value = internalValues[i];
      
      ctx.beginPath();
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(value.toString(),
        space*(i) + OFFSET_LEFT, height - TEXT_MIDDLE_OFFSET_BOTTOM);
      mesh && ctx.moveTo(space*(i) + OFFSET_LEFT, height - OFFSET_BOTTOM);
      mesh && ctx.lineTo(space*(i) + OFFSET_LEFT, OFFSET_MESH_TOP); 
      ctx.stroke()
    }
    
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(segments);
  }

export const clearCanvas: (arg0:CanvasRenderingContext2D) => void = (ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export const drawPoints
    = (ctx:CanvasRenderingContext2D,
      values:Array<ValueCoord>,
      xValues:Array<number>,
      yValues:Array<number>,
      connect?: boolean,
      approximation?: boolean) => {
      
      const minX = Math.min(...xValues);
      const minY = Math.min(...yValues);
      const numX = Math.max(...xValues) - minX;
      const kX = (ctx.canvas.width - (OFFSET_LEFT + OFFSET_RIGHT))
        / numX;
      const numY = Math.max(...yValues) - minY;
      const kY = (ctx.canvas.height - (OFFSET_TOP + OFFSET_BOTTOM))
        / numY;
      const newVals = values.map(c =>
      {
        return {
          x: (c.x - minX)*kX + OFFSET_LEFT,
          y: ctx.canvas.height - ((c.y - minY)*kY + OFFSET_TOP)
        }
      })
      if (approximation) {
        ctx.moveTo(newVals[0].x, newVals[0].y);
        let lastIndex = 1;
        for (let i = 1; i < newVals.length - 2; i ++)
        {
          const xc = (newVals[i].x + newVals[i + 1].x) / 2;
          const yc = (newVals[i].y + newVals[i + 1].y) / 2;
          ctx.quadraticCurveTo(newVals[i].x, newVals[i].y, xc, yc);
          ctx.stroke();
          lastIndex = i;
        }
        // curve through the last two points
        ctx.quadraticCurveTo(
          newVals[lastIndex].x,
          newVals[lastIndex].y,
          newVals[lastIndex+1].x,
          newVals[lastIndex+1].y);
        ctx.stroke();
      } else {
        newVals.forEach(value => {
          connect && ctx.lineTo(value.x, value.y)
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(value.x, value.y, 2, 0, Math.PI * 2)
          ctx.fill()
          connect && ctx.moveTo(value.x, value.y)
          ctx.stroke();
        });
      }

      ctx.beginPath();
    }
