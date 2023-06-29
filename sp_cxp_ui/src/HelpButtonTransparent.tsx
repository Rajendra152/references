import * as React from 'react';
import { DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';


const { ipcRenderer } = require('electron');

const Helpbutton = (props) => {
    const openHelpDialog = (nodeId) => {
        console.log('help');
        let Data = {
            message: 'Help',
            someData: "Let's go",
            path: `helpMenu/${nodeId}`
        };
        ipcRenderer.send('request-mainprocess-action', Data);
    }
    return (<div className="help-button" onClick={() => openHelpDialog(props.nodeId)}>
        {/* <DefaultButton 
            className="pointer"
            style={{padding:"0px",border:"none",float:'right'}}
            onClick={() => openHelpDialog(props.nodeId)}
        >
            ?
        </DefaultButton> */}
    </div>
    )
}
export default Helpbutton