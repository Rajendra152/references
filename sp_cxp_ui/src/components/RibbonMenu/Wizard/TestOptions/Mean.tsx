import React ,{useState} from 'react';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
} from '@fluentui/react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
// import * as componentInstance from '../../store/Worksheet/SpreadSheet/actions';
import * as componentInstance from '../../../../store/Worksheet/SpreadSheet/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Mean: React.FunctionComponent = (props) => {

  const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: '100%' } };
  const [meanValue, setmeanValue] = useState("");

const getInputValue = (e) => {
  //props.onHandleClick(item);
  // setcurrentItem(item);
  // sendtoMainWindow(item);
  setmeanValue(e.target.value);
  props.content.meanValue=e.target.value
  
}
  return (
    <div>
      <div className={contentStyles.body}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
              <TextField label="Enter the population mean" type="number" onChange={getInputValue} styles={textFieldStyles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



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
      // color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 0 24px',
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
    // color: theme.palette.neutralDark,
  },
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      setValue: bindActionCreators(componentInstance, dispatch),
    },
  };
}


export default connect(null, mapDispatchToProps, null, {
  forwardRef: true,
})(Mean);
