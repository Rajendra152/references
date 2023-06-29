import React, { useState, useEffect } from 'react';
import {
  Modal,
  getTheme,
  mergeStyleSets,
  FontWeights,
  IDragOptions,
  IconButton,
  IIconProps,
} from 'office-ui-fabric-react';

import {
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import Helpbutton from '../../HelpButton';
import { connect } from 'react-redux';

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const tableValues = [
  { key: '1', name: 'S. NO' },
  { key: '2', name: 'User Name' },
  { key: '3', name: 'DB Name' },
  { key: '4', name: 'Connection Name' },
  // { key: '5', name: '5' },
];


var current

function CommonModalComp(
  {
    close,
    component,
    title,
    customClass,
    helpMenu,
    zIndex,
    isDraggable,
    isModeless,
    keepInBounds,
    isBlocking
  }
) {

  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds,
    }),
    [keepInBounds],
  );
  if (helpMenu.HelpValue[0].selectedItem !== "") {
    current = helpMenu.HelpValue[0].selectedItem
    console.log("x", current)

  }
  else if (helpMenu.HelpValue[0].selectedElement !== "") {
    current = helpMenu.HelpValue[0].selectedElement
    console.log("3", current)

  }
  else {
    current = helpMenu.HelpValue[0].RibbonMenu
    console.log("4", current)

  }

  return (
    <div>
      <Modal
        titleAriaId={'titleAriaId'}
        isOpen={true}
        onDismiss={close}
        // isOpen={}
        // onDismiss={}
        isModeless={isModeless}
        isBlocking={isBlocking}
        containerClassName={contentStyles.container + ' childModal modalSection' + (customClass ? ' ' + customClass : '')}
        dragOptions={(title == "Uniform Random Number Generation" ? undefined : (title == "Normal Random Numbers" ? undefined : isDraggable ? dragOptions : undefined))}
        styles={{ root: { zIndex } }}
      >
        <div className={contentStyles.header}>
          <span id={'title2'} style={{ fontSize: 18 }}>{title}</span>

          <div style={iconButtonStyles.root}>
            <div className="ms-Grid " dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 padding">
                  {/* this becomes dynamic when f1 functionality implemented */}
                  <Helpbutton nodeId={current} />
                </div>
                <div className="ms-Grid-col ms-sm6 padding">

                  <IconButton
                    // styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={close}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={contentStyles.body}>
          {component}
        </div>
      </Modal>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    helpMenu: state.helpMenuReducer,

  };
}
export default connect(
  mapStateToProps
)(CommonModalComp);
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width:'500px'
  },
  leftContainer: {
    width: '70%',
    border: '1px solid #efefef',
    padding: '10px',
    height: '250px',
  },
  rightContainer: {
    width: '20%',
    marginLeft: '20px !important',
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '1 1 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
function useBoolean(arg0: boolean): [any, { toggle: any; }] {
  throw new Error('Function not implemented.');
}

