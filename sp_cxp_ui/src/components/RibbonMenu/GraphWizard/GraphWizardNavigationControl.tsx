/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Stack, IStackTokens, IStackProps , IStackStyles} from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };
const stackStyles: Partial<IStackStyles> = { root: { width: 450 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 100 } },
};

export default function GraphWizardNavigationControl(props) {
  const gotoNext = () =>{
    return 'next';
  }
  const gotoBack = () =>{
    return 'back';
  }
  return (
<div className="ms-Grid GraphWizard-footer" dir="ltr">
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
      <DefaultButton className={'black'} text="Back" onClick={props.gotoBack} allowDisabledFocus/>
      </Stack>
      <Stack {...columnProps}>
      <DefaultButton className={'black'} text="Next" onClick={props.gotoNext} allowDisabledFocus/>
      </Stack>
      <Stack {...columnProps}>
      <DefaultButton className={'black'} text="Finish" onClick={alertClicked} allowDisabledFocus/>
      </Stack>
      <Stack {...columnProps}>
      <DefaultButton className={'black'} text="Cancel" onClick={alertClicked} allowDisabledFocus/>
      </Stack>
    </Stack>
    </div>
    // <div className="ms-Grid GraphWizard-footer" dir="ltr">
    //   <div className="ms-Grid-row">
    //     <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg4">
    //       <button onClick={alertClicked} className="back-btn btn">Back</button>

    //       <button onClick={alertClicked} className="next-btn btn">Next</button>
    //     </div>
    //     <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg8">
    //       <button onClick={alertClicked} className="finish-btn btn">Finish</button>
    //       <button onClick={alertClicked} className="Help-btn btn">Help</button>
    //     </div>
    //   </div>
    // </div>
  );
}

function alertClicked(): void {
  // alert('Clicked');
}

