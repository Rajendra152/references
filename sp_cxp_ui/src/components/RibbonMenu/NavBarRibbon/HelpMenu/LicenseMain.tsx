import React, { useState, useEffect } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
    Modal,
    getTheme,
    mergeStyleSets,
    FontWeights,
    IDragOptions,
    DefaultButton,
    Toggle,
    ContextualMenu,
    IconButton,
    IIconProps,
    IStackTokens
} from 'office-ui-fabric-react';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
// import { DefaultButton, PrimaryButton, Stack as OfficeStack,  } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import WizardTitleBar from '../../Wizard/TestOptions/LicenseTitleBar'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LicenActivation from './LicenseActivation';
import LicenseInformation from './LicenseInformation';
import LicenceLogInfo from './LicenceLogInfo';
import LicenseContact from './LicenseContact';
import {

    sendLictoMainWindow

} from '../../../RibbonMenu/Wizard/DataTransfer/DataTransfer';

import { checkLicense, fingerprint } from "../../../App/Config";
import { post, get } from "../../../../services/DataService";
import { getOS } from '../../../../utils/globalUtility'
import { closeWindow } from "../../Wizard/DataTransfer/DataTransfer";
import { Callout, Text } from '@fluentui/react';

// import WizardTitleBar from '../../Wizard/TestOptions/WizardTitleBar';
const { ipcRenderer } = require('electron');


const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
};
const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 200 } },
};

const dragOptions: IDragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
    menu: ContextualMenu,
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };

export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}

const options: IChoiceGroupOption[] = [
    { key: 'up', text: 'Up' },
    { key: 'down', text: 'Down' }
];

// Example formatting
const stackTokenss: IStackTokens = { childrenGap: 40 };

const LicenseMain: React.FunctionComponent = (props) => {
    const [displayLiense, setDisplayLicense] = useState('');
    const [productInfo, setproductInfo] = useState([{ prodName: "", version: "", licType: "", expire: "", licManager: "" }]);
    const [textfordisplay, settextfordisplay] = useState('');
    const [logInfo, setlogInfo] = useState('');
    const [footprint, setfootprint] = useState('');
    const [validLIc, setValidLIC] = useState(true)
    const [selectedKey, setSelectedKey] = useState("Activation");
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const buttonId = useId('callout-button');
    const labelId = useId('callout-label');
    // ipcRenderer.on('closed', () => {
    //     ipcRenderer.send('window_close_all');
    // })
    const setlogInfohere = (logInfo: any) => {
        setlogInfo(logInfo)
        console.log("enter log")
    }
    const ApiCall = async () => {
        let checkOs = getOS()
        let sendRes = await get(checkLicense);
        console.log("what here<<<>>>>>>>>>>>>>>>yes", sendRes)
        if (sendRes !== undefined) {
            if (sendRes.data.result !== undefined) {
                if (sendRes.data.result.validity == true) {
                    setValidLIC(true)
                }
                else {
                    setValidLIC(false)
                }
                let sendRes1 = await get(fingerprint);
                window.onbeforeunload = (e) => {
                    if (sendRes.data.result.validity == false) {
                        ipcRenderer.send('window_close_all');
                    }
                }
                if (sendRes.data.result.validity == false) {
                    settextfordisplay('invalidLic')
                    alert("Active license not available. Please apply a new license")
                }
                else if (sendRes.data.result.validity == true) {
                    settextfordisplay('validLic')
                    setproductInfo([{ prodName: sendRes.data.result.license_info.ProductName, version: sendRes.data.result.license_info.Version, licType: sendRes.data.result.license_info.LicenseType, expire: sendRes.data.result.license_info.ExpiredInDays, licManager: sendRes.data.result.license_info.LicenseManager }])
                }
                setfootprint(sendRes1.data.result.machine_fp)
                setlogInfo(sendRes.data.result.log_info)
            }
        }
        else{
            setValidLIC(false)
        }
    }
    useEffect(() => {
        setSelectedKey('Activation')
    }, [])
    useEffect(() => {
        ipcRenderer.on('SendLicenseInfo', function (event, arg) {
            console.log("SendLicenseInfo", arg.someData)
        });
        ApiCall()
        setDisplayLicense('applylicense')
        console.log("here", validLIc)


        // if (arg.trialLicense == true) {
        //     settextfordisplay('trialLic')
        //     setproductInfo([{ prodName: arg.sProductName1, version: arg.sVersion1, licType: arg.sLicType1, expire: arg.sExpiryDays1, licManager: arg.sLicManager1 }])

        // }

    }, []);

    const onButtonClick = (value) => {
        setSelectedKey(value);
    }
    const handleCloseClick = () => {
        closeWindow();
    };
    const HelpText = (ev) => {
        ev.preventDefault()
        alert("Sigmaplot Licence Utility Version : 1.0\nBuild: 1.0.64\n\nCopyright© Systat software,Inc")
    }
    const handleLinkClick = (item?: PivotItem) => {
        if (item) {
          setSelectedKey(item.props.itemKey!);
        }
      };
    // window.addEventListener('beforeunload',()=> {alert("closing")})
    return (
        <div>

            {/* <Modal
                titleAriaId={titleId}
                // isOpen={isModalOpen}
                isOpen={props.isOpenLicense}
                // onDismiss={()=>props.actions.findAction.isOpenFind({message: false})}
                isModeless={true}
                containerClassName={contentStyles.container}
            // dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>Find</span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={() => onClose()}
                    />
                </div> */}

            <div >
                <WizardTitleBar stepType="" title="Sigmaplot 15 License Utility" />
                <div style={{ marginLeft: "568px" }}>
                    <DefaultButton id={buttonId} style={{ border: "none" }} text="Help" onClick={toggleIsCalloutVisible} />
                </div>
                {isCalloutVisible && (
                    <Callout
                        coverTarget
                        ariaLabelledBy={labelId}
                        className={styles.callout}
                        onDismiss={toggleIsCalloutVisible}
                        target={`#${buttonId}`}
                        isBeakVisible={false}
                        setInitialFocus
                    >

                        <DefaultButton style={{ border: "none" }} onClick={(ev) => HelpText(ev)} text="About" />
                    </Callout>
                )}
                <Pivot aria-label="Basic Pivot Example"
                 style={{ height: "495px" }}
                  selectedKey={selectedKey}
                  onLinkClick={handleLinkClick}
                  >
                    <PivotItem
                        headerText="License Activation"
                        headerButtonProps={{
                            'data-order': 1,
                            'data-title': 'My Files Title',
                        }}
                        itemKey="Activation"
                    >
                        <LicenActivation setSelectedKey={setSelectedKey} ApiCall={ApiCall} productInfo={productInfo} setlogInfo={setlogInfohere} textfordisplay={textfordisplay} />
                    </PivotItem>
                    <PivotItem headerText="License Information" itemKey="Information">
                        <LicenseInformation footprint={footprint} />
                    </PivotItem>
                    <PivotItem headerText="Log Info" itemKey="Log">
                        <LicenceLogInfo logInfo={logInfo} />
                    </PivotItem>
                    <PivotItem headerText="Contacts" itemKey="Contacts">
                        <LicenseContact setlogInfo={setlogInfohere} />
                    </PivotItem>
                </Pivot>
                <div className="ms-Grid-col " style={{ float: "right" }}>
                    <button style={{ marginTop: "9px", height: "22px" }} onClick={() => handleCloseClick()} >Close</button>
                </div>
            </div>


            {/* </Modal> */}
        </div>
    );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch'
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

// export default connect(
//   (state) => ({
//     isOpenFind: state.findReducer.isOpenFind
//   }),
//   (dispatch) => ({
//     findAction: bindActionCreators(
//       Object.assign({}, findAction),
//       dispatch
//     ),
//   })
// )(Find)
const styles = mergeStyleSets({
    callout: {
        width: 100,
        padding: '2px',
        background: theme.semanticColors.bodyBackground,
    },
    title: {
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
    },
    actions: {
        marginTop: 20,
    },
});

function mapStateToProps(state) {
    return {
        isOpenFind: state.findReducer.isOpenFind,
        referenceObjectState: state.instanceReducer.instance
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            //   findAction: bindActionCreators(findAction, dispatch)
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LicenseMain)
