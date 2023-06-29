import React, { useState } from 'react';
import { Label } from '@fluentui/react';
import { Checkbox, TextField, ITextFieldStyles } from '@fluentui/react';
import { IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from '@fluentui/react/lib/ChoiceGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as optionsAction from '../../../../../store/MainWindow/Options/actions';
import { setPropertyValue } from '../OptionsService';
import { Stack } from '@fluentui/react/lib/Stack';
import { number } from 'mathjs';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};
const narrowTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 100 },
};
const stackTokens = { childrenGap: 15 };

const options: IChoiceGroupOption[] = [
  { key: 'in', text: 'Inches' },
  { key: 'cm', text: 'Centimeters' },
];

// const options: IDropdownOption[] = [
//    { key: 'apple', text: 'Apple' },
//   { key: 'banana', text: 'Banana' },
// ];

// {
//   Editor: { showPropertiesPane: true,
// enableToolbar: false, enableSpellCheck: false,
//enableTrackChanges: false, enableComment: true }
// }

function OptionsReport(props: { data: any; setData: Function }) {
  const { data, setData } = props;

  const updateReportData = (value: any, propName: string) => {
    let typeObj = JSON.parse(JSON.stringify(data));
    setPropertyValue(propName, typeObj, value);
    setData({ ...typeObj });
  };
  
  const getErrorMessage = (value: string): string => {
    if(value === '') {
      return `Input value must be Number`;
    }
    else if(value < 30 || value > 255){
      return `Enter an Integer between 30 and 255`;
    }
  };

  return (
    <div className="ms-Grid w-100" dir="ltr">
      <div className="ms-Grid-row">
        {/* <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12">
          <div className={'ms-lg4'}>
            <Label>Measurement units</Label>
            <div className={'worksheetTable br-1-blk'}>
              <ChoiceGroup selectedKey={data.measurementUnit} options={options} onChange={(e, param: any)=>updateReportData(param.key, 'measurementUnit')} />
            </div>
          </div>
          <div className={'ms-lg8 m-auto'}>
            <div className={'mb-1'} style={{ paddingLeft: '2%' }}>
              <Checkbox checked={data.showRuler} onChange={(e, param)=>updateReportData(param, 'showRuler')} label="Show Ruler" />
              </div>
          </div>
        </div> */}
        <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12">
          <div className={'ms-lg12'}>
            <Label className={'ms-lg4'}>Test Results</Label>
            <div className={'d-flex mb-1'}>
              <Checkbox
                checked={data.showPropertiesPane}
                onChange={(e, param) =>
                  updateReportData(param, 'showPropertiesPane')
                }
                label="Show PropertiesPane"
              />
            </div>
            <div className={'d-flex mb-1'}>
              <Checkbox
                checked={data.enableToolbar}
                onChange={(e, param) =>
                  updateReportData(param, 'enableToolbar')
                }
                label="Show Toolbar"
              />
            </div>
            <div className={'d-flex mb-1'}>
              <TextField
                label="Number of Significant Digits"
                value={data.significant_digits}
                onChange={(e, param) =>
                {
              
                 
                    updateReportData(e.target.value, 'significant_digits')
                  
                }
                }
                styles={narrowTextFieldStyles}
              />
            </div>
            <div className={'d-flex mb-1'}>
              <Checkbox
                checked={data.scientific_notations}
                onChange={(e, param) =>
                {
                 
                    updateReportData(Number(param), 'scientific_notations')
                 
                }
                }
                label="Always use scientific notation"
              />
            </div>
            <div className={'d-flex mb-1'}>
              <Checkbox
                checked={data. explain_test_results}
                onChange={(e, param) => {
                 
                    updateReportData(Number(param), 'explain_test_results')
                  
                  
                  
                }}
                label="Explain Test Results"
              />
            </div>
            <div className={'d-flex mb-1'}>
              <TextField
                label="P Value for Significance in Main Hypothesis Testing and Post-Hoc Tests"
                value={data.significant_p_value}
                onChange={(e, param) =>
                {
                 
                    updateReportData(e.target.value, 'significant_p_value')
                  
                }
                }
                styles={narrowTextFieldStyles}
              />
            </div>
            <div className={'d-flex mb-1'}>
              <TextField
                label="Maximum Character Length of Labels in Statistics Tables"
                value={data.max_char_length}
                onChange={(e, param) =>
                  {
                   if(!isNaN(e.target.value)){ 
                      updateReportData(e.target.value, 'max_char_length')
                   }
                  }
                  }
                  onGetErrorMessage={getErrorMessage}
                styles={narrowTextFieldStyles}
              />
            </div>
            {/* <div className={'d-flex mb-1'}>
              <Checkbox checked={data.enableSpellCheck} onChange={(e, param)=>updateReportData(param, 'enableSpellCheck')}   label="SpellCheck" />
            </div> */}
            {/* <div className={'d-flex mb-1'}>
              <Checkbox checked={data.enableTrackChanges} onChange={(e, param)=>updateReportData(param, 'enableTrackChanges')}  label="Track Changes" />
            </div> */}
            {/* <div className={'d-flex mb-1'}>
              <Checkbox checked={data.enableComment} onChange={(e, param)=>updateReportData(param, 'enableComment')}  label="Comment" />
            </div> */}
            {/* <div className={'d-flex mb-1'}>
              <div className={'ms-lg7'}> Number of Significant Digits </div>
              <TextField defaultValue="5" className={'ml-1 ms-lg2'} />
            </div>
            <div className={'d-flex mb-1'}>
              <Checkbox label="Always Use Scientific Notation" />
            </div>
            <div className={'d-flex mb-1'}>
              <Checkbox label="Explain Test Results" />
            </div>
            <div className={'d-flex mb-1'}>
              <div className={'ms-lg7'}> P Value for Significance in
                Main Hypothesis Testing and Post-Hoc Tests</div>
              <TextField defaultValue="0.050" className={'ml-1 ms-lg2'} />
            </div>
            <div className={'d-flex mb-1'}>
              <div className={'ms-lg7'}> Maximum Character Length
                of labels in Statistics Tables</div>
              <TextField defaultValue="30" className={'ml-1 ms-lg2'} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    optionsState: state.optionsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      optionsAction: bindActionCreators(optionsAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OptionsReport);
