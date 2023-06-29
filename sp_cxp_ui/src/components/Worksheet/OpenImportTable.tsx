import React, { useState, useEffect } from 'react';
import {
    Modal,
    getTheme,
    mergeStyleSets,
    FontWeights,
    IDragOptions,
    DefaultButton,
    ContextualMenu,
    IconButton,
    IIconProps,
} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importDBAction from "../../store/Worksheet/ImportDB/actions";
import * as DBService from '../../services/ImportODBCServices';
import TableQuery from './TableQuery';
import SQLQuery from './SQLQuery';

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

const tableValues = [
    { key: '1', name: 'S. NO' },
    { key: '2', name: 'User Name' },
    { key: '3', name: 'DB Name' },
    { key: '4', name: 'Connection Name' },
    // { key: '5', name: '5' },
];


const OpenImportTable: React.FunctionComponent = (props) => {
    const [isModalOpen, setModal] = useState(false);
    const { disabled, checked } = props;
    // const [showList, setShowList] = useState(true);
    // const [connectObj, setConnectObj] = useState({});
    // const [schemaList, setSchemaList] = useState([]);
    // const [selectedRow, setSelectedRow] = useState();
    // const [selectedDNS, setSelectedDNS] = useState("");
    // const [tableList, setTableList] = useState({});

    const showModal = () => {
        setModal(true);
    }

    const hideModal = () => {
        setModal(false);
    }
    return (
        <div>
           <Pivot aria-label="Large Link Size Pivot Example" linkSize={PivotLinkSize.large}  className="TitlesContainer">
                <PivotItem headerText="Table"><br />
                    {/* <Stack horizontal tokens={stackTokens} styles={stackStyles}> */}
                    <TableQuery tableList={props.importDBState.tableList} />
                    {/* </Stack> */}
                </PivotItem>
                <PivotItem headerText="SQL Query"><br />
                    {/* <Stack horizontal tokens={stackTokens} styles={stackStyles}> */}
                      <SQLQuery tableList={props.importDBState.tableList}></SQLQuery>
                    {/* </Stack> <br /> */}
                </PivotItem>
            </Pivot>
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
function mapStateToProps(state) {
  return {
    importDBState: state.importDBReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importDBAction: bindActionCreators(importDBAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OpenImportTable)
