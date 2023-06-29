import {
  FontWeights,
  getTheme,
  IconButton,
  IIconProps,
  mergeStyleSets,
  Modal,
} from "office-ui-fabric-react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdvisorBody from "./AdvisorBody";
import * as advisorAction from "../../../../store/Analysis/Advisor/actions";
import React from "react";
import Helpbutton from "../../../../HelpButton";
const cancelIcon: IIconProps = { iconName: "Cancel" };

const Advisor: React.FunctionComponent = (props) => {

  return (
    <div>
      <Modal
        isOpen={props.isOpenAdvisor}
        onDismiss={() => {
          props.advisorAction.isOpenAdvisor({
            message: false,
          });
          props.advisorAction.setScreenState("s_0");
        }}
        isModeless={false}
        isBlocking={true}
        className={"bigwindow"}
      >
        <div className="msid " dir="ltr">
          <div className='ms-Grid-row' >
            <div className={contentStyles.header}>
              <div className="ms-Grid-col ms-sm9">
                <span style={{ fontSize: 18 }}>Statistical Advisor</span>
              </div>
              <div style={iconButtonStyles.root}>
                <div className="ms-Grid-col ms-sm3 ">
                  <Helpbutton nodeId="select_what_you_need_to_do" />
                </div>
                <IconButton
                  iconProps={cancelIcon}
                  ariaLabel="Close popup modal"
                  onClick={() => {
                    props.advisorAction.isOpenAdvisor({
                      message: false,
                    });
                    props.advisorAction.setScreenState("s_0");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={contentStyles.body}>
          <AdvisorBody />
        </div>
      </Modal>
    </div>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
  },
  leftContainer: {
    width: "70%",
    border: "1px solid #efefef",
    padding: "10px",
    height: "250px",
  },
  rightContainer: {
    width: "20%",
    marginLeft: "20px !important",
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "1 1 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

function mapStateToProps(state) {
  return {
    isOpenAdvisor: state.advisorReducer.isOpenAdvisor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    advisorAction: bindActionCreators(advisorAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Advisor);
