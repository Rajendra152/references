import React , {useState, useEffect} from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  Modal,
  IDragOptions,
  IIconProps,
  Stack,
  IStackProps,
} from '@fluentui/react';

import {DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { saveNotebook } from "../../../services/NotebookManagerServicesNew";

export const WindowListModal = (props) => {

  const [pivotItemId ,setPivotItemId] = useState(props.selectedPivotItem);
  const [activeElement, setActiveElement] = useState();

  //const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);
  // Normally the drag options would be in a constant, but here the toggle can modify keepInBounds

  useEffect(()=>{
    setPivotItemId(props.selectedPivotItem)
    const actvEle = props.activeItems.filter(item => item.id == props.selectedPivotItem)
    setActiveElement(actvEle[0])

  },[props.selectedPivotItem])

  const dragOptions = React.useMemo(
    (): IDragOptions => ({
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu,
      keepInBounds: true,
    }),
    [],
  );


  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('windowListTitle');
  let isButtonDisable = props.activeItems.length == 0

  const onChangeActiveListItem = (ev, item) => {
    console.log(ev)
    console.log(props.selectedPivotItem)
    setPivotItemId(item.id);
    setActiveElement(item)
  }

  const setPivotOnActivate = () => {
    props.setSelectedPivotItem(pivotItemId)
    props.hideWindowList();
  }

  const onSaveButtonClick = () =>{
    const currNotebook = props.saveProps.notebooks.allNotebooks.byId[activeElement.parentNotebookId];
    saveNotebook([currNotebook], props.saveProps, true)
  }

  return (
      <Modal
        titleAriaId={titleId}
        isOpen={props.isWindowListOpen}
        onDismiss={props.hideWindowList}
        isBlocking={false}
        containerClassName= "windowList-Modal"
        dragOptions={dragOptions}
      >
        <div className = "windowList-Header">
          <label id={titleId}>Windows</label>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={props.hideWindowList}
          />
        </div>
        <div className = "windowList-Body">
          <div className = "window-allActiveItem">
            {/* list Item here */}
            <label>Select Window</label>
            <div className = "window-listContainer">
              <ul>
                {
                  props.activeItems && props.activeItems.map(item => (
                    <li id = {item.id}
                      className = { pivotItemId == item.id ? "pivotList" :""}
                      onClick = {(ev)=>onChangeActiveListItem(ev, item)}
                      onDoubleClick = {setPivotOnActivate}>
                      {item.name}
                    </li>
                  ))
                }
              </ul>
            </div>

          </div>
          <div className = "window-allButton">
            {/* all Button */}
            <DefaultButton
                  className="windowList-button"
                  text= "Activate"
                  disabled = {isButtonDisable}
                  onClick = {setPivotOnActivate}
            />
            <DefaultButton
                  className="windowList-button"
                  text= "OK"
                  disabled = {false}
                  onClick = {props.hideWindowList}
            />
            <DefaultButton
                  className="windowList-button"
                  text= "Save"
                  disabled = {isButtonDisable}
                  onClick = {onSaveButtonClick}
            />
            <DefaultButton
                  className="windowList-button"
                  text= "Close Window(s)"
                  disabled = {isButtonDisable}
                  onClick = {()=>props.removeActiveItem(pivotItemId)}
            />

          </div>
        </div>
      </Modal>
  );
};

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
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
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});


const iconButtonStyles: Partial<IButtonStyles> = {
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
