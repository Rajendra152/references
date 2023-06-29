import React, { useState, useEffect } from 'react';
import {
    Modal,
    getTheme,
    mergeStyleSets,
    FontWeights,
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
import TableQuery from './TableQuery'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importDBAction from "../../store/Worksheet/ImportDB/actions";
import * as DBService from '../../services/ImportODBCServices';
import ODBCConnection from './ODBCConnection';
import ODBCConnPath from './ODBCConnPath';
import BottomSection from './Compontent/BottomSection';
import * as ErrorMessage from './Compontent/ErrorCompontent';
import { createSubscribeChannel, subscribeToChannel, unSubscribeChannel, publishToChannel } from "../../components/Constant/ConstantFunction";

var os = require('os');

const stackTokens = { childrenGap: 50 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 200, right: 0, position: 'inherit' } },
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const helpIcon: IIconProps = { iconName: 'Help' };

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


const ImportDB: React.FunctionComponent = (props) => {
    const [isModalOpen, setModal] = useState(false);
    const { disabled, checked } = props;
    const [showList, setShowList] = useState(true);
    const [connectObj, setConnectObj] = useState({});
    const [schemaList, setSchemaList] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [isSelectedDNS, setIsSelectedDNS] = useState(false);
    const [tableList, setTableList] = useState({});

    const showModal = () => {
        setModal(true);
    }

    const hideModal = () => {
        setModal(false);
    }

    const AddODBCConnection = (e) =>{
      console.log('addODBCConn');
      setShowList(!showList);
    }

    const addODBCConn = () =>{
      let conn = {connection_string: connectObj, db_type: "odbc"};
      let data = DBService.addNewSchema(conn);
      data.then(success=>{
        let data = success.data;
        if(data.status==="success"){
          alert(data.result.success);
          setShowList(!showList);
        }else{
          ErrorMessage.ErrorMessage(data);
        }
      }).then(function(error){
        // console.error(error);
        ErrorMessage.ErrorMessage(error);
      })
    }

    const connectionObj = (e) =>{
      let data = {...connectObj};
      data[e.target.name] = e.target.value;
      setConnectObj(data);
    }

    const schemaListFun = () =>{
      let service = DBService.schemaList();
      service.then(success=>{
        let data = success.data;
        if(data.status==="success"){
          console.log(data.result);
          setSchemaList(data.result.dsn)
        }else{
          ErrorMessage.ErrorMessage(data);
        }
      }).then(function(error){
        // console.error(error);
        ErrorMessage.ErrorMessage(error);
        // setSchemaList([]);
      })
    };

    // query_data_1620480485

    // schemaListFun();
    useEffect(() => {
      schemaListFun();
      publishToChannel();
    createSubscribeChannel("progress");
    },[])

    const selectDNS = (param, index) =>{
      setSelectedRow(index);
      // disConnectDB();
      let query = {
        "dsn": param,
        "db_type": "odbc"
      }
      if(isSelectedDNS===true){
        let disConn = DBService.disConnection();
        disConn.then((success)=>{
          console.log(success);
        }).then(error=>{
          console.error(error);
        }).finally(()=>{
          const data = DBService.addNewSchema(query);
          data.then(success=>{
              let datas = success.data;
              if(datas.status==="success"){
                console.log("new connection done");
              }else{
                ErrorMessage.ErrorMessage(data);
              }
            }).then(function(error){
              // console.error(error);
              ErrorMessage.ErrorMessage(error);
            });
        })
      }else{
        const data = DBService.addNewSchema(query);
            data.then(success=>{
                let datas = success.data;
                if(datas.status==="success"){
                  console.log("new connection done");
                }else{
                  ErrorMessage.ErrorMessage(data);
                }
              }).then(function(error){
                // console.error(error);
                ErrorMessage.ErrorMessage(error);
              });
      }
      setIsSelectedDNS(true);
    };


    const executeDNSQuery = () =>{
      if(isSelectedDNS){
      let query = {
        "type": "default"
      };
      let service = DBService.executeODBCDNSQuery(query);
      service.then(success=>{
        let data = success.data;
        if(data.status==="success"){
          console.log(data.result);
          // setTableList(data.result);
          props.actions.importDBAction.addTableList({message:data.result});
          // props.actions.importDBAction.isOpenTableQuery({message:true});
          props.actions.importDBAction.isOpenImportTable({message:true});
          // showModal(true);
          props.actions.importDBAction.isOpenImportDB({message: false})
        }else{
          ErrorMessage.ErrorMessage(data);
        }
      }).then(function(error){
        // console.error(error);
        ErrorMessage.ErrorMessage(error);
      })
     }else{
       alert("Please Select DSN")
     }
    }

    const cancelODBCConn = () =>{
      setShowList(!showList);
    }

    const disConnectDB = () =>{
      if(isSelectedDNS===true){
        let disConn = DBService.disConnection();
        disConn.then((success)=>{
          console.log(success);
        }).then(error=>{
          console.error(error);
        })
      }
    }

    const closeDNS = () =>{
      disConnectDB();
      props.actions.importDBAction.isOpenImportDB({message: false})
      // alert('called')
    }

    return (
        <div>

            {/* <DefaultButton secondaryText="Find" className={`text-block`} onClick={showModal} text="Import DB" /> */}
            <Modal
              titleAriaId={'title1'}
              // isOpen={isModalOpen}
              // onDismiss={hideModal}
              isOpen={props.isOpen}
              onDismiss={()=>closeDNS()}
              isModeless={false}
              isBlocking={true}
              className={'bigwindow'}
              containerClassName={contentStyles.container + ' modalSection'}
            >
                <div className={contentStyles.header}>
                    <span id={'title1'}>
                      ODBC Data Source</span>
                      <div style={iconButtonStyles.root}>
                      <IconButton
                        // styles={iconButtonStyles}
                        iconProps={helpIcon}
                        ariaLabel="Help popup modal"
                        // onClick={hideModal}
                    />
                    <IconButton
                        // styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        // onClick={hideModal}
                        onClick={()=>{
                            props.actions.importDBAction.isOpenImportDB({message: false});
                          }}
                    />
                    </div>
                </div>

                <div className={contentStyles.body}>
                    {showList===true&&<Pivot aria-label="Large Link Size Pivot Example" linkSize={PivotLinkSize.large}  className="TitlesContainer">
                        <PivotItem headerText="DSN"><br />
                            <Stack horizontal className={`flex-container br-1 p-1`}>
                                <Label>Data Sources Name</Label>
                                <Stack className={`w-75 table-h`}>
                                    <table className={`table br-0`}>
                                        <tbody>
                                        {schemaList && schemaList.map(function (item, i) {
                                          return (
                                          <React.Fragment>
                                            <tr className={selectedRow == i ? "tableSelected" : "" } onClick={()=>selectDNS(item, i)} key={iconButtonStyles}>
                                              <td>{item}</td>
                                            </tr>
                                          </React.Fragment>
                                          )
                                        })
                                        }
                                        </tbody>
                                    </table>
                                </Stack>
                            </Stack> <br />
                            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                              <BottomSection type={2} component={<>
                                  <Stack {...columnProps}>
                                  <DefaultButton
                                      text="Ok"
                                      className={`bg-green`}
                                      allowDisabledFocus
                                      disabled={disabled}
                                      checked={checked}
                                      onClick={executeDNSQuery}
                                  />
                                  </Stack>
                                  <Stack {...columnProps} className={`offset1`}>
                                    <DefaultButton
                                        text="Cancel"
                                        className={`text-block`}
                                        // onClick={hideModal}
                                        onClick={()=>closeDNS()}
                                        allowDisabledFocus
                                        disabled={disabled}
                                        checked={checked}
                                    />
                                  </Stack>
                                  </>
                              }></BottomSection>
                            </Stack>
                        </PivotItem>
                        <PivotItem headerText="DSN-Less"><br />
                            <Stack horizontal>
                              <ODBCConnection />
                            </Stack> <br />
                        </PivotItem>
                        {(os.type() === 'Darwin'||os.type() === 'Linux')&&<PivotItem headerText="DSN File"><br />
                        {/* {<PivotItem headerText="DSN File"><br /> */}
                            <Stack horizontal>
                              <ODBCConnPath />
                            </Stack> <br />
                        </PivotItem>}
                    </Pivot>}
                    {showList===false&&<PivotItem headerText="Select ODBC Data Source"><br />
                      <Label>Connections:</Label>
                      <Stack horizontal>
                          <Stack className={`w-100`}>
                            <TextField name={`driver_name`} value={connectObj.driver_name} label="Driver" onChange={(e)=>connectionObj(e)}/>
                            <TextField name={`url`} value={connectObj.url} label="Url" onChange={(e)=>connectionObj(e)}/>
                            <TextField name={`user`} value={connectObj.user} label="Username" onChange={(e)=>connectionObj(e)}/>
                            <TextField name={`password`} value={connectObj.password} label="Password" onChange={(e)=>connectionObj(e)}/>
                            <TextField name={`driver_file_path`} value={connectObj.driver_file_path} label="Jar file Path" onChange={(e)=>connectionObj(e)}/>
                          </Stack>
                      </Stack> <br />
                      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                          <Stack {...columnProps}>
                              <DefaultButton
                                  text="Ok"
                                  className={`text-block`}
                                  allowDisabledFocus
                                  disabled={disabled}
                                  checked={checked}
                                  onClick={addODBCConn}
                              />
                          </Stack>
                          <Stack {...columnProps}>
                              <DefaultButton
                                  text="Cancel"
                                  className={`text-block`}
                                  // onClick={hideModal}
                                  // onClick={setShowList(!showList)}
                                  onClick={cancelODBCConn}
                                  allowDisabledFocus
                                  disabled={disabled}
                                  checked={checked}
                              />
                          </Stack>
                      </Stack>
                  </PivotItem>
                    }
                </div>
            </Modal>
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
    isOpenImportDB: state.importDBReducer.isOpenImportDB
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      importDBAction: bindActionCreators(importDBAction, dispatch)
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImportDB)
