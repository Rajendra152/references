import React, { useState, useEffect } from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from '@fluentui/react/lib/Dropdown';
import { getTheme, mergeStyleSets, FontWeights, Label } from '@fluentui/react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  isCurrentGraph,
  isCreateNewGraph,
} from '../../../../store/Analysis/Smoother/actions';
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};

const options: IDropdownOption[] = [
  { key: 'First', text: 'First Empty' },

];

export const graphDataVal = {
  newGraph:false,
  currentGraph:false
};


const stackTokens: IStackTokens = { childrenGap: 20 };

export const GraphData: React.FunctionComponent = (props) => {

  const checkNewGraph = () => {
    let checkBox = document.getElementById("4");
    console.log("checks", checkBox.checked)
    graphDataVal.newGraph = checkBox.checked; 
    // props.actions.setNewGraph(checkBox.checked)

  }
  const checkCurrentGraph = () => {
    let checkBox = document.getElementById("3");
    graphDataVal.currentGraph = checkBox.checke
  }




  return (
    <div>
      <Stack tokens={stackTokens}>
        <Dropdown
          placeholder="Columns"
          label="Columns"
          options={options}
        />
      </Stack>

      <Label>Curve Data Column</Label>
      <div className="graphWizardLeftCard">
        <Label>x column: First Empty</Label>
        <Label>y column: First Empty</Label>
      </div>
      <br></br>
      <input type="checkbox" id="3" value="number" onClick={() => checkCurrentGraph()} disabled={true} />

      <label style={{ fontSize: "14px" }}>Plot to current graph</label><br></br>
      <input type="checkbox" id="4" value="number" onClick={() => checkNewGraph()} />
      <label style={{ fontSize: "14px" }}>Create New Graph</label>
    </div>
  );
};
