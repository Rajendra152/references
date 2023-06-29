import {
  ActionButton,
  IContextualMenuProps,
  IIconProps,
  Image,
  TextField,
} from 'office-ui-fabric-react';

import React, { useState, useEffect } from 'react';
import * as ConstantImage from '../../Constant/ConstantImage';
import { TooltipHost, ITooltipHostStyles, DirectionalHint } from '@fluentui/react/lib/Tooltip';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  Modal,
  IDragOptions,

  Stack,
  IStackProps,
} from '@fluentui/react';
import { IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import * as ConstantFunc from '../../Constant/ConstantFunction';
//import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { useTranslation } from 'react-i18next';
import * as TooltipID from './ToolTipIDs';
import { getlicenseutility } from "../../App/Config";
import { get } from "../../../services/DataService";
const { ipcRenderer } = require('electron');
const path = require('path');
const styles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
};
const calloutProps = { gapSpace: 0 };
function HelpMenu(props: { smartToggle: boolean }) {
  const [isModalOpenAboutSigmaPlot, { setTrue: showModalAboutSigmaPlot, setFalse: hideModalAboutSigmaPlot }] = useBoolean(false);
  const { t } = useTranslation();
  const [build , setBuild] = useState('')
  const [version ,setversion] = useState('')


  const ApiCallUtility = async()=> {
    console.log("output rocks", sendRes1)

    let sendRes1 = await get(getlicenseutility);
    console.log("output rocks", sendRes1)
    setversion(sendRes1.data.result.utility_version)
    setBuild(sendRes1.data.result.build_version)
  }
  useEffect(() => {
    console.log("enter hekolp")
    ApiCallUtility()
  }, [])
  console.log(props);

  // const [teachingContentBubbleVisible, { toggle: toggleContentBubbleVisible }] = useBoolean(false);
  // const [bubbleObj, setBubbleObj] = useState({})

  // const exampleSecondaryContentProps: IButtonProps = React.useMemo(
  //   () => ({
  //     children: 'OK',
  //     onClick: toggleContentBubbleVisible,
  //   }),
  //   [toggleContentBubbleVisible],
  // );

  // const openContentBubble = (param) =>{
  //   toggleContentBubbleVisible();
  //   setBubbleObj(param)
  // }
  const openHelpWindow = () => {
    console.log('1');

    let Data = {
      message: 'Help',
      someData: "Let's go",
      path: 'helpMenu/index'
    };
    ipcRenderer.send('request-mainprocess-action', Data);
  }
  const openlicense = () => {
    console.log('2');

    let Data = {
      message: 'license',
      someData: "LicenseActive",
      path: 'license',
      width: 650,
      height: 600
    };
    ipcRenderer.send('request-mainprocess-action', Data);
  }

  return (
    <div className="ms-Grid" dir="ltr">
      {/* {teachingContentBubbleVisible && (
        <TeachingBubble
          target={'#'+ bubbleObj.id}
          // primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryContentProps}
          onDismiss={toggleContentBubbleVisible}
          headline={bubbleObj.title}
        >
         {bubbleObj.message}
        </TeachingBubble>
      )} */}
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ribbon-container">
          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-button'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="contentHelpID"
                // onClick={()=>openContentBubble({
                //   id:'contentHelpID',
                //   title: 'Help',
                //   message: 'One of the most appealing features is the ability to perform an advanced search. Local HTML help appears in a separate window'
                // })}
                onClick={() => openHelpWindow()}
              >
                <TooltipHost
                  content={t("Opens Help window")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Contents}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Content
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="searchID"
              >
                <TooltipHost
                  content={t("Search SigmaPlot Help.")} closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <TextField id="searchHelpID"  className="help-search" label="Search" iconProps={{ iconName: 'ChevronDown' }} />
                </TooltipHost>
              </div>

            </div>
            <label className="ribbon-boxbtn-lbl">Help</label>
          </div>

     

          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-button'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="UsersGuideGuideID"
                onClick={() => require('electron').shell.openPath(path.resolve(__dirname, '../assets/pdf/User\'sGuide.pdf'))}

              // onClick={()=>openContentBubble({
              //   id:'UsersGuideGuideID',
              //   title: 'Users Guide',
              //   message: 'Users Guide Guides...'
              // })}
              >
                <TooltipHost
                  content={t("Opens User Guide PDF")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.UserGuide}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Users Guide
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="StatisticsGuideID"
                style={{ paddingLeft: "6px" }}
                onClick={() => require('electron').shell.openPath(path.resolve(__dirname, '../assets/pdf/Statistics.pdf'))}
              // onClick={()=>openContentBubble({
              //   id:'StatisticsGuideID',
              //   title: 'Statistics',
              //   message: 'Statistics Guide...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Statistics PDF")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.StatGuide}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Statistics
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="transformsAndRegressionGuideID"
                onClick={() => require('electron').shell.openPath(path.resolve(__dirname, '../assets/pdf/TransformsAndRegressions.pdf'))}
              // onClick={()=>openContentBubble({
              //   id:'transformsAndRegressionGuideID',
              //   title: 'Transforms & Regressions',
              //   message: 'Transforms & Regressions Guide...'
              // })}
              >
                <TooltipHost
                  content={t("Opens  Transforms & Regressions PDF")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.TransformGuide}
                  />
                  <div className=" width-tras" >
                    <ActionButton className="box-btn " allowDisabledFocus>
                      Transforms & Regressions
                    </ActionButton>
                  </div>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Guides</label>
          </div>

       

          {/* <div className="ribbon-btn-box">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-button'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="graphsSampleID"
              // onClick={()=>openContentBubble({
              //   id:'graphsSampleID',
              //   title: 'Graphs',
              //   message: 'Graphs Samples...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Graphs samples")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.GraphSamples}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Graphs
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="statisticsSampleID"
              // onClick={()=>openContentBubble({
              //   id:'statisticsSampleID',
              //   title: 'Statistics',
              //   message: 'Statistics Samples...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Statistics samples")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.StatSamples}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Statistics
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="transformsSampleID"
              // onClick={()=>openContentBubble({
              //   id:'transformsSampleID',
              //   title: 'Transforms',
              //   message: 'Transforms Samples...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Transforms samples")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.TransformSamples}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Transforms
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="nonlinearRegressionsSampleID"
              // onClick={()=>openContentBubble({
              //   id:'nonlinearRegressionsSampleID',
              //   title: 'Nonlinear Regressions',
              //   message: 'Nonlinear Regressions Samples...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Nonlinear Regressions samples")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.RegressionSamples}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Nonlinear Regressions
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Samples</label>
          </div> */}

     

          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-button'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="sigmaPlotHomePageWebID"
                onClick={() => require('electron').shell.openExternal('https://systatsoftware.com/sigmaplot/sigmaplot-product-features/')}

              // onClick={()=>openContentBubble({
              //   id:'sigmaPlotHomePageWebID',
              //   title: 'SigmaPlot Home Page',
              //   message: 'SigmaPlat Home Page on the web...'
              // })}
              >
                <TooltipHost
                  content={t("Opens SigmaPlot Home Page")}

                  closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.SigmaPlotHome}
                  />
                  <div className=" width-tras" >
                    <ActionButton className="box-btn" allowDisabledFocus>
                      SigmaPlot Home Page
                    </ActionButton>
                  </div>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="techSupportWebID"
                onClick={() => require('electron').shell.openExternal('https://systatsoftware.com/support/')}

              // onClick={()=>openContentBubble({
              //   id:'techSupportWebID',
              //   title: 'Tech Support',
              //   message: 'Tech Support on the web...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Tech Support")} closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Support}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Tech Support
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="updatesWebID"
              // onClick={() => require('electron').shell.openExternal('https://www.systatsoftware.com/contact/feedback/')}

              // onClick={()=>openContentBubble({
              //   id:'updatesWebID',
              //   title: 'Updates',
              //   message: 'Updates on Web...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Updates")} closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Update}
                  />
                  <ActionButton disabled className="box-btn" allowDisabledFocus>
                    Updates
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">SigmaPlot on the Web</label>
          </div>

          

          <div className="ribbon-btn-box mrspace">
            <div
              className={
                !props.smartToggle
                  ? 'ribbon-grid-button'
                  : 'ribbon-grid-button sim-ribbon-grid-button'
              }
            >
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="licenseStatusLicensingID"
                onClick={openlicense}
              // onClick={()=>openContentBubble({
              //   id:'licenseStatusLicensingID',
              //   title: 'License Status',
              //   message: 'License Status Licensing...'
              // })}
              >
                <TooltipHost
                  content={t("Opens License Status")} closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.LicenseSigma}
                  />
                  <ActionButton className="box-btn"
                    allowDisabledFocus>
                    License Status
                  </ActionButton>
                </TooltipHost>
              </div>

              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="registerSigmaPlotLicensingID"
              // onClick={()=>openContentBubble({
              //   id:'registerSigmaPlotLicensingID',
              //   title: 'Register SigmaPlot',
              //   message: 'register SigmaPlot Licensing...'
              // })}
              >
                <TooltipHost
                  content={t("Opens Register SigmaPlot")} closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.Register}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    Register SigmaPlot
                  </ActionButton>
                </TooltipHost>
              </div>
              <div
                className={
                  !props.smartToggle
                    ? 'ribbon-gbutton'
                    : 'ribbon-gbutton sim-ribbon-gbutton'
                }
                id="aboutSigmaPlotLicensingID"
                onClick={showModalAboutSigmaPlot}
              >
                <TooltipHost
                  content={t("Opens About SigmaPlot")} closeDelay={0}
                  // id={TooltipID.tooltipIdContent}
                  calloutProps={calloutProps}
                  styles={styles}
                  directionalHint={DirectionalHint.bottomCenter}
                >
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantImage.AboutSigma}
                  />
                  <ActionButton className="box-btn" allowDisabledFocus>
                    About SigmaPlot
                  </ActionButton>
                </TooltipHost>
              </div>
            </div>
            <label className="ribbon-boxbtn-lbl">Licensing</label>
          </div>

          {/* <div className="v-hr"></div> */}
        </div>
      </div>
      <Modal
        //  titleAriaId={titleId}
        isOpen={isModalOpenAboutSigmaPlot}
        onDismiss={hideModalAboutSigmaPlot}
        isBlocking={false}
        containerClassName={contentStyles.container}

      >
        <div className={contentStyles.header}>
          <span className={contentStyles.title}>About SigmaPlot</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModalAboutSigmaPlot}
          />
        </div>
        <div className={contentStyles.body}>
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                <img src={ConstantImage.AboutSigmaPlot} alt="Logo-here-to-insert" />
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9">
                <div>SigmaPlot for Windows version {version}</div>
                <div style={{ marginBottom: '10px' }}>Build {build}</div>
                <div>Copyright&copy; 2022 Inpixon,Inc.</div>
                <div style={{ marginBottom: '30px' }}  >
                  {/* Portions of this product were creating using &copy; LEADTOOLS, <br />  */}
                  {/* &copy; DUNDAS SOFTWARE LTD., &copy; wpcubed GmbH, Germany, <br /> */}
                  {/* &copy; TE Sub Systems, Inc. and WinWrap &reg; Basic, Copyright <br /> */}
                  {/* 1993-2015 Polar Engineering, Inc., <br /> */}
                  {/* hhtp://www.winwrap.com/, All Rights Reserved. */}
                </div>
                <div>This product is licensed to:</div>
                <div style={{ border: '1px solid #c5b8b8', padding: '10px', marginBottom: '20px' }}>
                  <div style={{ marginBottom: '10px' }}>admin</div>
                  <div>Registration number: &nbsp; &nbsp; 77540014</div>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', height: '1px', border: '1px solid #c5b8b8' }}></div>

            <div style={{ padding: '20px 10px' }} className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg9">
                Warning: This software is protected by federal and  international copyright laws. Copying and distributing are stictly prohibited. See License Agreement.
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3" style={{ display: 'flex', justifyContent: 'center' }}>
                <DefaultButton style={{ width: '100%' }} text="OK" onClick={hideModalAboutSigmaPlot} />
              </div>
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
}

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    width: '445px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  title: {
    fontSize: '16px'
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      //  borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '0 10px',
    },
  ],
  body: {
    backgroundColor: '#f3f3f3',
    flex: '4 4 auto',
    padding: '10px 0',
    overflowY: 'hidden',
    fontSize: '12px',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const stackProps: Partial<IStackProps> = {
  horizontal: true,
  tokens: { childrenGap: 40 },
  styles: { root: { marginBottom: 20 } },
};
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
export default HelpMenu;
