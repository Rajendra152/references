import React, { useState } from 'react';
import { Label } from '@fluentui/react';
import { Checkbox } from '@fluentui/react';
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from '@fluentui/react/lib/Dropdown';
import {
  numericDisplayAs,
  columnWidthDropdown,
  decimalPlaces,
  rowHeightDropdown,
  getAllColor,
  fontDropdown,
  gridThicknessDropdown,
  fontSizeDropdown,
  regionalDropdown,
} from '../../../../../utils/graphDailogProperty/differentPropertyList';
import { setPropertyValue } from '../OptionsService';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
  dropdownItems: { maxHeight: 250 },
};

const numericDisplayAsOptions: IDropdownOption[] = numericDisplayAs();
const decimalPlacesOptions: IDropdownOption[] = decimalPlaces();
const columnWidthOptions: IDropdownOption[] = columnWidthDropdown();
const regionalOptions = regionalDropdown;
const rowHeightOptions: IDropdownOption[] = rowHeightDropdown();
const colorOptions: IDropdownOption[] = getAllColor();
const fontOptions: IDropdownOption[] = fontDropdown();
const thicknessOptions: IDropdownOption[] = gridThicknessDropdown();
const fontSizeOptions: IDropdownOption[] = fontSizeDropdown();

export default function Worksheet(props) {
  const { data, setData } = props;
  const [type, setType] = useState(2);
  const [columnList, setColumnList] = useState([
    /* {
      key: 1,
      name: 'General',
      value: 'General',
      index: 1,
      selected: true,
    }, */
    {
      key: 2,
      name: 'Numeric',
      value: 'Numeric',
      index: 2,
      selected: true,
    },
    /* {
      key: 3,
      name: 'Date and Time',
      value: 'Date and Time',
      index: 3,
      selected: false,
    }, */
    {
      key: 4,
      name: 'Appearance',
      value: 'Appearance',
      index: 4,
      selected: false,
    },
    {
      key: 5,
      name: 'Regional Settings',
      value: 'Regional Settings',
      index: 5,
      selected: false,
    },
  ]);

  const selectType = (index: number) => {
    const data = [...columnList];
    data.forEach((obj) => {
      if (obj.index === index) {
        obj.selected = true;
        setType(obj.index);
      } else {
        obj.selected = false;
      }
    });
    setColumnList(data);
  };

  const updateWorksheetData = (value: any, propName: string) => {
    let typeObj = JSON.parse(JSON.stringify(data));
    setPropertyValue(propName, typeObj, value);
    setData({...typeObj});
  }
  const onchangeRegional=()=>{}
  const fields = { text: 'text', value: 'key' };

  return (
    <div className="ms-Grid w-100" dir="ltr">
      <div className="ms-Grid-row">
        <div
          className="ms-Grid-col d-flex w-100 mb-1"
          style={{ flexFlow: 'column' }}
        >
          <Label>Settings For</Label>
          <div className={'ms-lg4 worksheetTable br-1-blk'}>
            {columnList.map((item) => {
              return (
                <div
                  className={
                    'cursur-pointer list ' + (item.selected ? 'active' : '')
                  }
                  onClick={() => selectType(item.index)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="ms-Grid-col d-flex w-100"
          style={{ flexFlow: 'column' }}
        >
          {/* (type==1) && 
              <>
                <div className={'mb-1'}>
                  <Checkbox label="Worksheet Undo" checked={data.general.undo} onChange={(e, param: any)=>updateWorksheetData(param, 'general.undo')} />
                </div>
                <div className={'mb-1'}>
                  <Checkbox checked={data.general.dupTransfromTitleWarning} onChange={(e, param: any)=>updateWorksheetData(param, 'general.dupTransfromTitleWarning')} label="Display Duplicate title warning for transforms" />
                </div>
              </> */}
          {type == 2 && (
            <>
              <div className={'mb-1'}>
                <div className={`d-flex`}>
                  <Label className={'ms-lg3'}>Display as</Label>
                  <Label className={'ms-lg5'}>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={numericDisplayAsOptions}
                      styles={dropdownStyles}
                      selectedKey={data.numeric.displayAs}
                      onChange={(e, param: any) =>
                        updateWorksheetData(param.key, 'numeric.displayAs')
                      }
                    />
                  </Label>
                </div>
                <div className={`d-flex`}>
                  <Label className={'ms-lg3'}>Decimal places</Label>
                  <Label className={'ms-lg5'}>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={decimalPlacesOptions}
                      styles={dropdownStyles}
                      disabled={data.numeric.displayAs === 'General'}
                      selectedKey={data.numeric.decimalPlaces}
                      onChange={(e, param: any) =>
                        updateWorksheetData(param.key, 'numeric.decimalPlaces')
                      }
                    />
                  </Label>
                </div>
                {/* <div className={`d-flex`}>
                        <div className={'mb-1'}>
                          <Checkbox checked={data.numeric.engineeringNotation} onChange={(e, param: any)=>updateWorksheetData(param, 'numeric.engineeringNotation')} label="Engineering notation" />
                        </div>
                    </div> */}
              </div>
            </>
          )}
          {/* (type==3) &&
              <>
                <div className={'mb-1'}>
                    <div className={`d-flex`}>
                      <Label className={'ms-lg2'}>Sample </Label>
                      <Label className={''}>
                      <Dropdown
                          placeholder="Select an option"
                          label=""
                          options={options}
                          styles={dropdownStyles}
                        />
                      </Label>
                    </div>
                    <div className={`d-flex`}>
                      <Label className={'ms-lg2'}>Date</Label>
                      <Label className={''}>
                      <Dropdown
                          placeholder="Select an option"
                          label=""
                          options={options}
                          styles={dropdownStyles}
                        />
                      </Label>
                    </div>
                    <div className={`d-flex`}>
                      <Label className={'ms-lg2'}>Time</Label>
                      <Label className={''}>
                      <Dropdown
                          placeholder="Select an option"
                          label=""
                          options={options}
                          styles={dropdownStyles}
                        />
                      </Label>
                    </div>
                    <div className={`d-flex`}>
                      <Label className={'ms-lg2'}>Day zero</Label>
                      <Label className={''}>
                      <Dropdown
                          placeholder="Select an option"
                          label=""
                          options={options}
                          styles={dropdownStyles}
                        />
                      </Label>
                    </div>
                </div>
              </>*/}
          {type == 4 && (
            <>
              <div className={'mb-1'}>
                <div className={``}>
                  <Label className={'ms-lg4'}>Column Width </Label>
                  <Label className={'d-flex'}>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={columnWidthOptions}
                      styles={dropdownStyles}
                      selectedKey={data.appearance.colWidth}
                      onChange={(e, param: any) =>
                        updateWorksheetData(param.key, 'appearance.colWidth')
                      }
                    />
                    <span className={'ml-2'}> Characters </span>
                  </Label>
                </div>
              </div>
              <div className={'mb-1'}>
                <div className={``}>
                  <Label className={'ms-lg4'}>Row Height </Label>
                  <Label className={'d-flex'}>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={rowHeightOptions}
                      styles={dropdownStyles}
                      selectedKey={data.appearance.rowHeight}
                      onChange={(e, param: any) =>
                        updateWorksheetData(param.key, 'appearance.rowHeight')
                      }
                    />
                    <span className={'ml-2'}> Points </span>
                  </Label>
                </div>
              </div>
              <div className={'mb-1'}>
                <div className={``}>
                  <Label className={'ms-lg4'}>Grid </Label>
                  <Label className={'d-flex'}>
                    <span className={'mr-2 ms-lg2'}> Color </span>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={colorOptions}
                      styles={dropdownStyles}
                      selectedKey={data.appearance.grid.color}
                      onChange={(e, param: any) =>
                        updateWorksheetData(param.key, 'appearance.grid.color')
                      }
                    />
                  </Label>
                  <Label className={'d-flex'}>
                    <span className={'mr-2 ms-lg2'}> Thinkness </span>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={thicknessOptions}
                      styles={dropdownStyles}
                      selectedKey={data.appearance.grid.thickness}
                      onChange={(e, param: any) =>
                        updateWorksheetData(
                          param.key,
                          'appearance.grid.thickness'
                        )
                      }
                    />
                  </Label>
                </div>
              </div>
              {/* <div className={'mb-1'}>
                    <div className={``}>
                      <Label className={'ms-lg4'}>Data feedback</Label>
                      <Label className={'d-flex'}>
                       <span className={'mr-2 ms-lg2'}> X </span>
                       <DropdownCompontent></DropdownCompontent>
                      </Label>
                      <Label className={'d-flex'}>
                       <span className={'mr-2 ms-lg2'}> Y </span>
                       <DropdownCompontent></DropdownCompontent>
                      </Label>
                      <Label className={'d-flex'}>
                       <span className={'mr-2 ms-lg2'}> Z </span>
                       <DropdownCompontent></DropdownCompontent>
                      </Label>
                    </div>
                </div> */}
              <div className={'mb-1'}>
                <div className={``}>
                  <Label className={'ms-lg4'}>Font</Label>
                  <Label className={'d-flex'}>
                    <span className={'mr-2 ms-lg2'}> Style </span>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={fontOptions}
                      styles={dropdownStyles}
                      selectedKey={data.appearance.font.style}
                      onChange={(e, param: any) =>
                        updateWorksheetData(param.key, 'appearance.font.style')
                      }
                    />
                  </Label>
                  <Label className={'d-flex'}>
                    <span className={'mr-2 ms-lg2'}> Size </span>
                    <Dropdown
                      placeholder="Select an option"
                      label=""
                      options={fontSizeOptions}
                      styles={dropdownStyles}
                      selectedKey={data.appearance.font.size}
                      onChange={(e, param: any) =>
                        updateWorksheetData(param.key, 'appearance.font.size')
                      }
                    />
                  </Label>
                </div>
              </div>
            </>
          )}
          {type == 5 && (
            <>
              <div className={'mb-1'}>
                <div className={``}>
                  <Label className={'ms-lg9'}>
                    Select your preferred regional format
                  </Label>
               
                  <DropDownListComponent
                    className="e-icon-anim"
                    id="ddlelement"
                    dataSource={regionalOptions}
                    fields={fields}
                    // popupHeight="200px"
                    // popupWidth="250px"
                    value={data.regionalSettings}
                    placeholder="Select an option"
                    onChange={(param: any) => {
                      updateWorksheetData(param.value, 'regionalSettings');
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
