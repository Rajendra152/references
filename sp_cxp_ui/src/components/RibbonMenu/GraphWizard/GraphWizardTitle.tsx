/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';

export default function GraphWizardTitle(props: { title: string }) {
  const title = `Graph Wizard > ${props.title}`;
  return (
    <div className="graphWizard-titlebar ms-Grid" style={{padding: '8px'}}>
      <div className="graphWizard-titletext">{title}</div>
      <div className="graphWizard-titlecontrols">
        {/* <button className="graphWizard-btn close">
          <svg viewBox="0 0 10 10">
            <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
          </svg>
        </button> */}
      </div>
    </div>
  );
}
