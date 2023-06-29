import * as React from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from '@fluentui/react/lib/Dropdown';
import { getTheme, mergeStyleSets, FontWeights, Label, ResponsiveMode } from '@fluentui/react';
import { useState, useEffect } from 'react';
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
};

const options1: IDropdownOption[] = [
  { key: 'NONE', text: 'NONE' },
  { key: '1', text: '1' },
  { key: '100', text: '100' },
];

const options2: IDropdownOption[] = [
  { key: 'Left', text: 'Left' },
  { key: 'Right', text: 'Right' },
];

const stackTokens: IStackTokens = { childrenGap: 20 };

export const BinOptions: React.FunctionComponent = (props) => {

  const [normalize, setNormalize] = useState('NONE');
  const [bins, setBins] = useState(5);
  const [binEdges, setBinEdges] = useState('Left');
  const [automaticBinning, setAutomaticBinning] = useState(false);



  const onChangeNormalize = (option: IDropdownOption, index?: number) => {

    console.log('onChangeNormalize options', index);
    setNormalize(index.text);
    props.content.normalization = index.text;
  }

  const onChangeBinEdges = (option: IDropdownOption, index?: number) => {

    console.log('onChangeNormalize options', index);
    setBinEdges(index.text);
    props.content.binEdge = binEdges;
  }

  const onChangeBins = (e) => {
    if (e.target.value <= 0) {
      alert('Enter number greater than zero')
      e.target.value = ''
    }
    setBins(e.target.value);
    console.log('bins contains', bins)
    props.content.binNumber = e.target.value;
  }

  useEffect(() => {
    console.log('Bin Options', props.content)
    console.log('normalize', normalize);
    console.log('binEdges', binEdges)
    props.content.normalization = normalize;
    console.log('props normalize', props.content.normalization)
    props.content.binEdge = binEdges;
    props.content.binNumber = bins;
  }, [])



  return (
    <div>
      <Stack tokens={stackTokens}>
        <Dropdown
          responsiveMode={ResponsiveMode.large}
          defaultSelectedKey={normalize}
          label="Normalization"
          options={options1}
          onChange={onChangeNormalize}
          styles={dropdownStyles}
          responsiveMode={ResponsiveMode.large}
        />
      </Stack>
      <Label>Number of bins</Label>
      <input type="number" id="1" min="1" value={bins} onChange={onChangeBins} disabled={automaticBinning} />
      <br></br>
      <br></br>
      {/* <input type="checkbox" id="2"  value="number" onClick={() => setValue(!value)} />
      <Label>Automatic binning</Label> */}
      <div className="item">
        <input type="checkbox" id="2" value="number" onClick={() => {

          setAutomaticBinning(!automaticBinning)
          props.content.automaticBinning = automaticBinning
        }} />
        <label style={{ fontSize: "14px" }}>Automatic binning</label>
      </div>

      <Stack tokens={stackTokens}>
        <Dropdown
          responsiveMode={ResponsiveMode.large}
          defaultSelectedKey={binEdges}
          label="Select bin edge to include"
          onChange={onChangeBinEdges}
          options={options2}
          styles={dropdownStyles}
        />
      </Stack>
    </div>
  );
};
