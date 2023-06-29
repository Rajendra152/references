import React from 'react';

const FillGradient = () => {
  return (
    <>
      <svg id="svgPatterns1" width="100%">
          <linearGradient id="lin-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "rgb(255,255,0)", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "rgb(255,0,0)", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="lin-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: "rgb(255,0,0)", stopOpacity: 1 }} />
            <stop offset="100%" style={{stopColor: "rgb(255,255,0)", stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="lin-grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: "#8360c3", stopOpacity: 1 }} />
            <stop offset="100%" style={{stopColor: "#2ebf91", stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="lin-grad4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: "#00b4db", stopOpacity: 1 }} />
            <stop offset="100%" style={{stopColor: "#0083b0", stopOpacity: 1}} />
          </linearGradient>
          <radialGradient id="rad-grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style={{stopColor:"rgb(255,255,255)",
      stopOpacity:0}} />
      <stop offset="100%" style={{stopColor:"rgb(0,0,255)",stopOpacity:1}} />
    </radialGradient>
      </svg>
    </>
  );
};

export default FillGradient;
