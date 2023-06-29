import * as React from 'react';
import { DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';


const { ipcRenderer } = require('electron');

const Helpbutton = (props) => {
    const openHelpDialog = (nodeId) => {
        let Data = {
            message: 'Help',
            someData: "Let's go",
            path: `helpMenu/${nodeId}`
        };
        ipcRenderer.send('request-mainprocess-action', Data);
    }
    return (<div className="help-b utton">
        <DefaultButton
            className="pointer"
            style={{ float: 'right' }}
            onClick={() => openHelpDialog(props.nodeId)}
        >
            Help
        </DefaultButton>
    </div>
    )
}
export default Helpbutton