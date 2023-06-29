import React, { useState, useEffect } from 'react';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  DefaultButton,
  ContextualMenu,
  IconButton,
  IIconProps,
} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BottomSection from '../ModalCompontent/Compontent/BottomSection';
import ModalCompontent from '../ModalCompontent/Modal/ModalCompontent';
import * as auditingAction from '../../../../store/MainWindow/Auditing/actions';

import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 200, right: 0, position: 'inherit' } },
};

const dragOptions: IDragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}



function AuditList(props) {
  const [auditList, setAuditList] = useState([])
  const loadList = () =>{
    let allNbk = Object.values(props.notebooks.allNotebooks.byId)
    if(allNbk.length > 0){
      let data = allNbk[(allNbk.length - 1)];
      if(data.hasOwnProperty('auditLogs')){
        if(data.auditLogs.length > 0){
          setAuditList(data.auditLogs)
        }
      }
    }
  }
  useEffect(() => {
   loadList()
  }, [])

  return (
    <div>
      <ModalCompontent component={<>
        <Stack horizontal className={`flex-container`}>
        <Stack horizontal className={'mb-1 p-0'} style={{height: '150px', overflowX: 'hidden'}} tokens={stackTokens} styles={stackStyles}>
          <table className={`table cur-pointer`}>
            <thead className={'removebr'}>
            <tr>
              <th>Activity</th>
              <th>Date</th>
              <th>User</th></tr>
            </thead>
            <tbody>
              {
                auditList.map(a=>
                  <tr>
                    <td style={{textTransform:'lowercase'}}>{a.actionType}</td>
                    <td>{new Date(a.datetime).toLocaleDateString()}</td>
                    <td>{a.userid}</td>
                  </tr>
                  )
              }
            </tbody>
          </table>
          </Stack>
          <Stack horizontal className={'mb-1 p-0'} tokens={stackTokens} styles={stackStyles}>
            <BottomSection type={'2'} component={<>
              <DefaultButton className={'bg-green text-white'} text="Copy" allowDisabledFocus />
              <DefaultButton className={'black ml-2'} text="Close" onClick={() => props.actions.auditingAction.isAuditList({message: false})} allowDisabledFocus />
            </>} />
          </Stack>
        </Stack>
        </>
      }
        close={() => props.actions.auditingAction.isAuditList({message: false})}
        title={'Audit List'}
        className={'z_index_100'}
        isBlock={true}></ModalCompontent>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auditingState: state.auditingReducer,
    notebooks: state.notebookReducer.notebooks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auditingAction: bindActionCreators(auditingAction, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AuditList);
