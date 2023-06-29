import * as React from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from '@fluentui/react/lib/Dropdown';
import { getTheme, mergeStyleSets, FontWeights, Label } from '@fluentui/react';
import { useState } from 'react';
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};

const options1: IDropdownOption[] = [ 
  { key: 'First', text: 'First Empty', itemType: DropdownMenuItemType.Header },

];

export const Output = {
      predicted:false,
      residual:false,
      checkplot:0,
      checkcreate:0
}
const checkPredicted = () => {
  let checkBox = document.getElementById("1");
  console.log("yes")
  Output.predicted = checkBox.checked; 
  console.log("2", Output.predicted)


}
const checkResidual = () => {
  let checkBox = document.getElementById("2");
  Output.residual = checkBox.checked; 

}

const checkPlot = () => {
  let checkBox = document.getElementById("3");
    Output.checkplot = checkBox.checked
}
const checkCreate = () => {
  let checkBox = document.getElementById("4");
    Output.checkcreate = checkBox.checked
}

const stackTokens: IStackTokens = { childrenGap: 20 };

export const OutputOptions: React.FunctionComponent = () => {
  const [value, setValue] = useState(false);
  return (
    <div>
      <Stack tokens={stackTokens}>
        <Dropdown
          placeholder="Select an option"
          label="Columns"
          options={options1}
          styles={dropdownStyles}
        />
      </Stack>
      <Label>Results</Label>
      <div className="graphWizardLeftCard">
      <input type="checkbox" id="1" onClick={()=>checkPredicted()} value="number" />
      <label style={{fontSize:"14px"}} >Predicted: First Empty</label><br></br>
      <input type="checkbox" id="2" onClick={()=>checkResidual()} value="number" />
      <label style={{fontSize:"14px"}}>Residuals: First Empty</label>
      <br></br>
      </div>
      <br></br>
      <input type="checkbox" id="3" onClick={()=>checkPlot()} value="number" />
      <label style={{fontSize:"14px"}}>Plot Results</label><br></br>
      <input type="checkbox" id="4" onClick={()=>checkCreate()} value="number" />
      <label style={{fontSize:"14px"}}>Create Report</label>
    </div>
  );
};

