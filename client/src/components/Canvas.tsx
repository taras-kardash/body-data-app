import * as React from 'react';

import './canvas.scss'

interface CanvasProps {
    width?: number;
    height?: number;
}
 
const Canvas: React.FC<CanvasProps> =
    ({width = 400, height = 500}) => {
    return (
        <div>
            <canvas className='canvas' width={width} height={height} />
        </div>
    );
}
 
export default Canvas;