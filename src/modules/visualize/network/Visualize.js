import React from 'react';
// import styled from 'styled-components';

import PageBase from '../../../common/components/PageBase';

// import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
import { ForceGraph2D } from 'react-force-graph';

// const Canvas = styled.canvas`
//   flex: 1;
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;
//   // text-align: center;
//   // justify-content: center;
// `;

// gen a number persistent color from around the palette
const getColor = n => '#' + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, '0');


const genRandomTree = (N = 300) => {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
    .filter(id => id)
    .map(id => ({
      source: id,
      target: Math.round(Math.random() * (id-1))
    }))
  };
}

const Visualize = props =>
  <PageBase className={props.className}>
    <ForceGraph2D
        graphData={genRandomTree(20)}
        nodeLabel="id"
        nodeCanvasObject={({ id, x, y }, ctx) => {
          ctx.fillStyle = getColor(id);
          [
            () => { ctx.fillRect(x - 6, y - 4, 12, 8); }, // rectangle
            () => { ctx.beginPath(); ctx.moveTo(x, y - 5); ctx.lineTo(x - 5, y + 5); ctx.lineTo(x + 5, y + 5); ctx.fill(); }, // triangle
            () => { ctx.beginPath(); ctx.arc(x, y, 5, 0, 2 * Math.PI, false); ctx.fill(); }, // circle
            () => { ctx.font = '10px Sans-Serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Text', x, y); } // text
          ][id%4]();
        }}
      />
  </PageBase>;

export default Visualize;
