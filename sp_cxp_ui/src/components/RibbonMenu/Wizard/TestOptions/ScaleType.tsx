import React ,{useState,useEffect} from 'react';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
} from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const options: IDropdownOption[] = [
  { key: '1', text: 'Unitary Scale(0.0 - 1.0)' },
  { key: '2', text: 'Percentage Scale(0 - 100)' },
];
const ScaleType: React.FunctionComponent = (props) => {
  const [scaleTypeValue, setscaleTypeValue] = useState("Percentage Scale(0 - 100)");
  useEffect(() => {
    props.content.stepWiseValue="Percentage Scale(0 - 100)"
  },[])
  const getInputValue = (param) => {
    setscaleTypeValue(param.text);
    props.content.stepWiseValue=param.text
    
  }
  return (
    <div>
      <div className="graphWizardLeftCard">
        <div className={contentStyles.body}>

          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12  ms-lg12 ms-md12">
                <Dropdown onChange= { (e, selectedOption) => {
                                getInputValue(selectedOption)
                                 }}
                  defaultSelectedKey="2"               
                  placeholder="Select scale type"
                  label="Scale Type" 
                  options={options}
                />
              </div>
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
    // color: theme.palette.neutralDark,
  },
};


export default ScaleType
