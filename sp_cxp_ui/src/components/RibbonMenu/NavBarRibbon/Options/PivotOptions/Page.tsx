import React from 'react';
import { Label } from '@fluentui/react';
import { Checkbox } from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as optionsAction from '../../../../../store/MainWindow/Options/actions';
import { setPropertyValue } from '../OptionsService';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100},
  dropdownItems:{maxHeight: 200}
  
  
};

const options: IChoiceGroupOption[] = [
  { key: 'dot', text: 'As dots' },
  { key: 'line', text: 'As lines' },
];

const griddensityOptions: IChoiceGroupOption[] = [
  { key: '.125', text: '.125' },
  { key: '.25', text: '.25' },
  { key: '.5', text: '.5' },
  { key: '.75', text: '.75' },
  { key: '1', text: '1' },
];

const zoomoptions: IDropdownOption[] = [
  { key: 'fit', text: 'Fit' },
  { key: '25', text: '25%' },
  { key: '50', text: '50%' },
  { key: '75', text: '75%' },
  { key: '100', text: '100%' },
  { key: '150', text: '150%' },
  { key: '200', text: '200%' },
  { key: '250', text: '250%' },
  { key: '300', text: '300%' },
  { key: '350', text: '350%' },
  { key: '400', text: '400%' },
];

const unitOptions: IDropdownOption[] = [
  { key: 'in', text: 'Inches(")' },
  { key: 'mm', text: 'Millimeters(mm)' },
  { key: 'pt', text: 'Points(pt)' }
];

// const options: IDropdownOption[] = [
//    { key: 'apple', text: 'Apple' },
//   { key: 'banana', text: 'Banana' },
// ];

function Page(props) {
  // const [type, setType] = useState(1);
  // const [columnList, setColumnList] = useState([
  //   {
  //     key: 1,
  //     name: 'Inches(")',
  //     value: 'Inches',
  //     index: 1,
  //     selected: true,
  //   },
  //   {
  //     key: 2,
  //     name: 'Millimeters(mm)',
  //     value: 'Millimeters',
  //     index: 2,
  //     selected: false,
  //   },
  //   {
  //     key: 3,
  //     name: 'Points(pt)',
  //     value: 'Points',
  //     index: 3,
  //     selected: false,
  //   }
  // ]);

  const { data, setData } = props;

  if(!data.defaultUnit) {
    data.defaultUnit = 'in';
  }

  const updatePageData = (value: any, propName: string) => {
    let typeObj = JSON.parse(JSON.stringify(props.data));
    setPropertyValue(propName, typeObj, value);
    setData({...typeObj});
  }

  return (
    <div className="ms-Grid w-100" dir="ltr">
      <div className="ms-Grid-row">
      <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12">
          <div className={'ms-lg12'}>
            <div className={'d-flex mb-1 mt-1'}>
                <Label className={'ms-lg7'}>Units</Label>
                <Dropdown
                  placeholder="Select an option"
                  options={unitOptions}
                  className={'w-100'}
                  selectedKey={data.defaultUnit}
                  onChange={(e, param: any)=>updatePageData(param.key, 'defaultUnit')}
                />
              </div>
            <div className={'d-flex mb-1 mt-1'}>
              <Label className={'ms-lg7'}>Default zoom level</Label>
              <Dropdown
                placeholder="Select an option"
                options={zoomoptions}
                className={'w-100'}
                selectedKey={data.defaultZoom}
                onChange={(e, param: any)=>updatePageData(param.key, 'defaultZoom')}
                styles={dropdownStyles}
              />
            </div>
            {/* <Label className={'ms-lg4'}>Test Results </Label> */}
            <div className={'d-flex mb-1'}>
              <Checkbox checked={data.Rulers} onChange={(e, param: any)=>updatePageData(param, 'Rulers')} label="Show Rulers" />
            </div>
            <div className={'d-flex mb-1'}>
              <Checkbox checked={data.Grids.showgrids} onChange={(e, param: any)=>updatePageData(param, 'Grids.showgrids')} label="Show Grids" />
            </div>
            {/* <div className={'d-flex mb-1'}>
              <Checkbox checked={type.Grids.showLines} onChange={(e, param)=>changeCheckbox(e,param, 'Grids.showLines')} label="Show Lines" />
            </div> */}
            <div className={'d-flex mb-1'}>
              <Checkbox checked={data.Grids.ShowHorizontalLines} onChange={(e, param: any)=>updatePageData(param, 'Grids.ShowHorizontalLines')} label="Show Horizontal Lines" />
            </div>
            <div className={'d-flex mb-1'}>
              <Checkbox checked={data.Grids.ShowVerticleLines} onChange={(e, param: any)=>updatePageData(param, 'Grids.ShowVerticleLines')} label="Show Vertical Lines" />
            </div>
          </div>

        </div>
        {/* <div className="ms-Grid-col d-flex ms-lg-12 ms-lg12">
          <div className={'ms-lg4'}>
            <Label>Units</Label>
            <div className={'worksheetTable br-1-blk'}>
              {columnList.map((item) => {
                return (
                  <div
                    className={'cursur-pointer list ' + ((item.selected) ? 'active' : '')}
                    onClick={() => selectType(item.index)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
            <Label>Default zoom level</Label>
            <Dropdown
              placeholder="Select an option"
              options={zoomoptions}
              className={'w-100'}
            />
          </div>
          <div className={'ms-lg8 m-auto'}>
            <div className={'mb-5px ml-1'}><Checkbox label="Stretch maintains aspect ratio" /></div>
            <div className={'mb-5px ml-1'}><Checkbox label="Graph objects resize with graph" /></div>
            <div className={'mb-5px ml-1'}><Checkbox label="Resolution independent patterns" /></div>
            <div className={'mb-5px ml-1'}><Checkbox label="Show Ruler" /></div>
            <div className={'mb-5px ml-1'}><Checkbox label="Show data values" /></div>
            <div className={'mb-5px ml-1'}><Checkbox label="Page undo" /></div>
            <div className={'mb-5px ml-1'}><Checkbox label="Show mini toolbars on selection" /></div>
          </div>
        </div>
        <div className="ms-Grid-col ms-lg-12 ms-lg12">
          <div className={'ms-lg12 d-flex w-100'}>
            <Label className={''}>Grids </Label>
          </div>
          <div className={'ms-lg12 d-flex w-100'}>
            <div className={'ms-lg4'}>
              <div className={'mb-5px'}><Checkbox label="Show grid" /></div>
              <ChoiceGroup defaultSelectedKey="dot" options={options} onChange={_onChange} />
              <div className={'mb-5px'}><Checkbox label="Shap-to" /></div>
            </div>
            <div className={'ms-lg4'}>
              <Dropdown
                placeholder="Select an option"
                label="Grid density"
                options={griddensityOptions}
                className={'w-100'}
              />
              <Dropdown
                placeholder="Select an option"
                label="Color"
                options={griddensityOptions}
                className={'w-100'}
              />
            </div>
          </div>
          <div className={'ms-lg12 w-100'}>
            <Label className={''}>3D </Label>
            <div className={'ms-lg12 d-flex w-100'}>
              <div className={'ms-lg6'}>
                <div className={'mb-5px'}><Checkbox label="Transparent bitmaps" /></div>
              </div>
              <div className={'ms-lg6'}>
                <div className={'d-flex'}>
                  <span className={'ml-2'}>Export Resolution</span>
                  <select className={'ml-2'}>
                    <option>72</option>
                    <option>96</option>
                    <option>120</option>
                    <option>150</option>
                    <option>300</option>
                  </select>
                </div>
              </div>
            </div>
            <Label className={''}>Anti Aliased </Label>
            <div className={'ms-lg12 d-flex w-100'}>
              <div className={'mb-5px'}><Checkbox label="Enable Anti Aliasing for page objects" /></div>
            </div>
            <Label className={''}>Printing </Label>
            <div className={'ms-lg12 d-flex w-100'}>
              <div className={'mb-5px'}><Checkbox label="Print graph page as a bitmap" /></div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
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
export default connect(mapStateToProps, mapDispatchToProps)(Page);
