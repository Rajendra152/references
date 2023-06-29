import React from 'react';

const FillPattern = (props: any) => {
  const fillColor = props?.data[0]?.marker?.color || '#f2f2f2ff';
  console.log("fillColor==>", fillColor)
  console.log("fillColor==>props", props)
  return (
    <>
      <svg id="svgPatterns">
        <pattern id="small-circle-pattern" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill={fillColor} ></rect>
          <circle mask="url(#fade)" cx="2" cy="2" r="1" fill="black" />
        </pattern>

        <pattern id='big-circle-pattern' patternUnits='userSpaceOnUse' width='4' height='4' patternTransform='scale(1) rotate(0)'>
          <rect x="0" y="0" width="100%" height="100%" fill={fillColor} ></rect>
          <circle cx="2" cy="2" r="1" stroke="black" stroke-width="1" fill="black" />
        </pattern>

        <svg height="20" width="40">
          <pattern id="hline-pattern" x="0" y="0" width="100%" height="1" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="100%" fill={fillColor} ></rect>
            <line x1="0" y1="0" x2="100%" y2="0" stroke="#000000" stroke-width="1" />
          </pattern>
        </svg>

        <svg height="20" width="40">
          <pattern id="vline-pattern" x="0" y="0" width="1" height="100%" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="100%" fill={fillColor} ></rect>
            <line x1="0" y1="0" x2="0%" y2="100%" stroke="#000000" stroke-width="1" />
          </pattern>
        </svg>

        <pattern id='brick-patten' patternUnits='userSpaceOnUse' width='15' height='15' patternTransform='scale(1) rotate(0)'>
          <rect x='0' y='0' width='100%' height='100%' fill={fillColor} />
          <path d='M0 22.5h30v15H0zm15-15h30v15H15m-30-15h30v15h-30zm15-15h30v15H0z' stroke-width='0.5' stroke='hsla(258.5,59.4%,59.4%,1)' fill='none' />
        </pattern >
        
      </svg>
    </>
  );
};

export default FillPattern;
