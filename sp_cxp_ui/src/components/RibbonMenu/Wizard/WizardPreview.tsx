import React, { useEffect } from 'react';
import { Image } from 'office-ui-fabric-react';

import { Label } from '@fluentui/react/lib/Label';
import * as ConstantImage from '../../Constant/ConstantImage';
//import  staticSrc from  '../../../../assets/icons/WizardImage.PNG';
export interface PreviewProps {
  title: string;
  src: string;
  content: string; 
}

export const WizardPreview = (previewProps: PreviewProps) => {
  console.log('*********previewProps**********', previewProps)
  // const styles = { height: '180px' };
   const src = previewProps.src;
  // const staticSrc = '../../../../assets/icons/WizardImage.PNG'


  return (
    <div className="graphWizardCard ms-Grid">
      <Label>{previewProps && previewProps.title}</Label>
        {/* <div> */}
        <div className="wizardCard-preview1 ms-Grid-row">
          <div className=" preview1-image ms-Grid-col ms-sm6 ms-md4 ms-lg2" style={{marginTop:'40px'}}>
            <Image alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={src}
                
                  />
            {/* <img src={ConstantFunc.StaticPreview} alt="Hii"/> */}
          </div>
          <div className=" preview1-label ms-Grid-col ms-sm6 ms-md8 ms-lg10" style={{marginTop:'50px'}}>
            <Label>{previewProps && previewProps.content}</Label>
          </div>

        </div>
      {/* </div> */}
    </div>
  );
};
