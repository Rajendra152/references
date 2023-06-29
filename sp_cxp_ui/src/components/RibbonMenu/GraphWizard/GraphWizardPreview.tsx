import React from 'react'
import { Image } from 'office-ui-fabric-react';


export default function GraphWizardPreview(props) {
   const previewItem = props.resultItem;
  // alert(previewItem);
  const styles = { height: "180px"};

 return(
    <div className="graphWizardCard ms-Grid" style={styles}>
       <h6>{previewItem && previewItem.previewImageTitle}</h6>
       <div>
       <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
             <Image alt="ribbon-icon" className="ribbon-icon-svg" src={previewItem && previewItem.previewImage} />
          </div>
          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
             <span>{previewItem && previewItem.previewImageText}</span>
          </div>
       </div>
       </div>
    </div>
 )
}

// export default GraphWizardPreview

