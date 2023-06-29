import { DefaultButton, IContextualMenuProps, IIconProps } from 'office-ui-fabric-react';
import React from 'react';

function ToolBox() {
  const GraphOutput: IIconProps = { iconName: 'FileRequest' };
  function _alertClicked() {
    alert('Clicked');
  }
  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: 'emailMessage',
        text: 'Email message',
        iconProps: { iconName: 'Mail' },
      },
      {
        key: 'calendarEvent',
        text: 'Calendar event',
        iconProps: { iconName: 'Calendar' },
      },
    ],
  };
  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 div-tabcontainer">
          <div className="ms-Grid-col ms-sm1 ms-md1 ms-lg1 div-boxbutton graph-op">
            <div className={`box-button`}>
              <DefaultButton
                text="Incert into Office"
                className="split-button"
                iconProps={GraphOutput}
                split
                splitButtonAriaLabel="See 2 options"
                aria-roledescription="split button"
                menuProps={menuProps}
                onClick={_alertClicked}
              />
            </div>
            <div className="button-name">
              <h5>Graph Output</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolBox;