import React from 'react';
import { Dropdown, Label, IDropdownOption } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as optionsAction from '../../../../../store/MainWindow/Options/actions';
import { setPropertyValue } from '../OptionsService';
import { logLevels } from "../../../../../utils/graphDailogProperty/differentPropertyList";

const logLevelOptions: IDropdownOption[] = logLevels();

function GeneralOptions(props: {data: any, setData: Function}) {
  const { data, setData } = props;

  const updateGeneralData = (value: any, propName: string) => {
    let typeObj = JSON.parse(JSON.stringify(props.data));
    setPropertyValue(propName, typeObj, value);
    setData({...typeObj});
  }

  return (
    <div className="ms-Grid w-100" dir="ltr">
      <div className="ms-Grid-row">
      <div className="ms-Grid-col d-flex w-100" style={{flexFlow: 'column'}}>
          <div className={'ms-lg12'}>
            <div className={'d-flex mb-1 mt-1'}>
                <Label className={'ms-lg5'}>Logging Level</Label>
                <Dropdown
                    placeholder="Select an option"
                    selectedKey={data.loggingLevel}
                    options={logLevelOptions}
                    className={'ms-lg5'}
                    onChange={(e, param: any)=>updateGeneralData(param.key, 'loggingLevel')}
                />
            </div>
            <div className={'d-flex mb-1'}>
                <Label className={'ms-lg5'}>Backup Count</Label>
                <TextField type="number" label="" onChange={(e: any, param)=>updateGeneralData(e.target.value, 'backupCount')} value={data.backupCount} className={'ms-lg5'} />
            </div>
            <div className={'d-flex mb-1'}>
                <Label className={'ms-lg5'}>Log File Rotation</Label>
                <TextField type="number" label="" onChange={(e: any, param)=>updateGeneralData(e.target.value, 'logFileRotation')} value={data.logFileRotation} className={'ms-lg5'} />
                <span className="logFileRotation">MB</span>
            </div>
            <div className={'d-flex mb-1'}>
                <Label className={'ms-lg5'}>Author</Label>
                <TextField label="" onChange={(e: any, param)=>updateGeneralData(e.target.value, 'author')} value={data.author} className={'ms-lg5'} />
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(GeneralOptions);
