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
import * as titlesAction from "../../../store/Worksheet/Titles/actions";

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
const helpIcon: IIconProps = { iconName: 'Help' };
export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}


const Titles: React.FunctionComponent = (props) => {
    const [isModalOpen, setModal] = useState(false);
    const { disabled, checked } = props;
    const [lastHeader, setLastHeader] = useState('Column');
    const [title, setTitle] = useState(props.cellTitle || '');
    const [promoteVal, setPromote] = useState(3);
    const [prev, setPrev] = useState(1);
    const [next, setNext] = useState(1);
    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        setTitle(props.cellTitle || '');
    }, [next, props.cellTitle]);


    const showModal = () => {
        // props.updateSelection({ prev: 1, next: 1, action: lastHeader });
        setModal(true);
    }

    const hideModal = () => {
        setNext(1);
        setPrev(1);
        props.clearSelection();
        setModal(false);
    }

    const _onChangeFindInput = (e: React.FormEvent<HTMLElement>) => {
        console.log(`The option has been changed to ${e.target.value}.`);
        e.preventDefault();
        setTitle(e.target.value);
    }

    const _onChangePrmote = (e: React.FormEvent<HTMLElement>) => {
        console.log(`The option has been changed to ${e.target.value}.`);
        setPromote(e.target.value);
    }

    const _previous = (e: React.FormEvent<HTMLElement>) => {
        console.log(`The option has been changed to ${e.target.value}.`);
        setNext(next - 1);
        setPrev(prev - 1);
        // props.updateSelection({ prev: prev - 1, next: next - 1, action: lastHeader });
    }

    const _next = (e: React.FormEvent<HTMLElement>) => {
        console.log(`The option has been changed to ${e.target.value}.`);
        setNext(next + 1);
        setPrev(prev + 1);
        // props.updateSelection({ prev: prev + 1, next: next + 1, action: lastHeader });
    }

    const updateTitle = (value) => {
        const data = {
            title: title,
            action: lastHeader,
            index: prev
        }

    const ele = value === 'columnHeader' ? 'th' : 'td'
       let elements = document.querySelectorAll(ele)
       elements.forEach( (item) => {
           if(item.className === 'e-header-cell e-highlight'){ 
               console.log(title, "title", "hellooo", item)
               item.innerText = title
            }
        })
        props.actions.titlesAction.isOpenTitles({message: false})
    }

    const getSelectedItem = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
        setLastHeader("h");
        setNext(1);
        setPrev(1);
        // props.updateSelection({ prev: 1, next: 1, action: item.props.headerText });
    }

    const promoteTitle = () => {
        const data = {
            action: lastHeader,
            index: prev,
            promoteVal: promoteVal,
            isPromote: true,
            isChecked: isChecked,
        }
        props.updateTitle(data);
    }

    const onChange = React.useCallback((ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
        setIsChecked(!!checked);
    }, []);


    return (
        <div>

            {/* <DefaultButton secondaryText="Find" className={`text-block`} onClick={showModal} text="Titles" /> */}
            {/* <Modal
                titleAriaId={'title1'}
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isModeless={true}
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            > */}
            <Modal
                titleAriaId={'title1'}
                // isOpen={isModalOpen}
                isOpen={props.isOpen}
                onDismiss={()=>props.actions.titlesAction.isOpenTitles({message: false})}
                // onDismiss={()=>props.actions.titlesAction.isOpenTitles({message: false})}
                isModeless={true}
                containerClassName={contentStyles.container}
                dragOptions={dragOptions}
            >
                <div className={contentStyles.header}>
                    <span id={'title1'}>Column and Row Titles</span>
                    <IconButton
                        // styles={iconButtonStyles}
                        iconProps={helpIcon}
                        ariaLabel="Help popup modal"
                        // onClick={hideModal}
                    />
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={()=>props.actions.titlesAction.isOpenTitles({message: false})}
                    />
                </div>

                <div className={contentStyles.body}>
                    <Pivot aria-label="Large Link Size Pivot Example" linkSize={PivotLinkSize.large} onLinkClick={getSelectedItem} className="TitlesContainer">
                        <PivotItem headerText="Column"><br />
                            <Stack>
                                <Label>column {next}</Label>
                            </Stack><br />
                            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                                <Stack {...columnProps} className='title-ip'>
                                    <TextField
                                        label="Title"
                                        value={title}
                                        placeholder=""
                                        onChange={(e) => _onChangeFindInput(e)}
                                        step={1}
                                        style={{ color: '#333' }}
                                    />
                                </Stack>
                                <Stack {...columnProps} className='prev-btn'>
                                    <DefaultButton
                                        text="Prev"
                                        className={`text-block`}
                                        allowDisabledFocus
                                        disabled={prev === 1}
                                        checked={checked}
                                        onClick={(e) => _previous(e)}
                                    />
                                </Stack>
                                <Stack {...columnProps} className='next-btn'>
                                    <DefaultButton
                                        text="Next"
                                        className={`text-block`}
                                        allowDisabledFocus
                                        disabled={true}
                                        checked={checked}
                                        onClick={(e) => _next(e)}
                                    />
                                </Stack>
                            </Stack><br />
                            <div className='promote-container'>
                                <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                                    <Stack className='pr-text-one'><Label>Promote row</Label></Stack>

                                    <Stack {...columnProps} className="promote-val">
                                        <TextField
                                            value={promoteVal}
                                            placeholder=""
                                            onChange={(e) => _onChangePrmote(e)}
                                            step={1}
                                            style={{ color: '#333' }}
                                        />
                                    </Stack>
                                    <Stack><Label>to titles</Label></Stack>
                                    <Stack {...columnProps} className='promote-btn'>
                                        <DefaultButton
                                            text="Promote"
                                            className={`text-block`}
                                            allowDisabledFocus
                                            disabled={disabled}
                                            checked={checked}
                                            onClick={() => promoteTitle()}
                                        />
                                    </Stack>
                                </Stack><br />
                                <Stack>
                                    <Checkbox label="Delete promoted row" checked={isChecked} onChange={onChange} />
                                </Stack></div><br /> <br />
                            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                                <Stack {...columnProps}>
                                    <DefaultButton
                                        text="Ok"
                                        className={`text-block`}
                                        allowDisabledFocus
                                        disabled={disabled}
                                        checked={checked}
                                        onClick={() => updateTitle('columnHeader')}
                                    />
                                </Stack>
                                <Stack {...columnProps}>
                                    <DefaultButton
                                        text="Cancel"
                                        className={`text-block`}
                                        onClick={()=>props.actions.titlesAction.isOpenTitles({message: false})}
                                        allowDisabledFocus
                                        disabled={disabled}
                                        checked={checked}
                                    />
                                </Stack>
                            </Stack><br />
                        </PivotItem>
                        <PivotItem headerText="Row"><br />
                            <Stack>
                                <Label>row {next}</Label>
                            </Stack><br />
                            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                                <Stack {...columnProps} className="title-ip">
                                    <TextField
                                        label="Title"
                                        placeholder=""
                                        value={title}
                                        onChange={(e) => _onChangeFindInput(e)}
                                        step={1}
                                        style={{ color: '#333' }}
                                    />
                                </Stack>
                                <Stack {...columnProps} className='prev-btn'>
                                    <DefaultButton
                                        text="Prev"
                                        className={`text-block`}
                                        allowDisabledFocus
                                        disabled={prev === 1}
                                        checked={checked}
                                        onClick={(e) => _previous(e)}
                                    />
                                </Stack>
                                <Stack {...columnProps} className='next-btn'>
                                    <DefaultButton
                                        text="Next"
                                        className={`text-block`}
                                        allowDisabledFocus
                                        disabled={disabled}
                                        checked={checked}
                                        onClick={(e) => _next(e)}
                                    />
                                </Stack>
                            </Stack><br />
                            <div className='promote-container'>
                            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                                <Stack className='pr-text-one'><Label>Promote column</Label></Stack>

                                <Stack {...columnProps} className="promote-val">
                                    <TextField
                                        value={promoteVal}
                                        placeholder=""
                                        onChange={(e) => _onChangePrmote(e)}
                                        step={1}
                                        style={{ color: '#333' }}
                                    />
                                </Stack>
                                <Stack><Label>to titles</Label></Stack>
                                <Stack {...columnProps} className='promote-btn'>
                                    <DefaultButton
                                        text="Promote"
                                        className={`text-block`}
                                        allowDisabledFocus
                                        disabled={disabled}
                                        checked={checked}
                                        onClick={() => promoteTitle()}
                                    />
                                </Stack>
                            </Stack><br />
                            <Stack>
                                <Checkbox label="Delete promoted column" checked={isChecked} onChange={onChange} />
                            </Stack></div><br /><br />
                            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                                <Stack {...columnProps}>
                                    <DefaultButton
                                        text="Ok"
                                        className={`text-block`}
                                        allowDisabledFocus
                                        disabled={disabled}
                                        checked={checked}
                                        onClick={() => updateTitle('rowHeader')}
                                    />
                                </Stack>
                                <Stack {...columnProps}>
                                    <DefaultButton
                                        text="Cancel"
                                        className={`text-block`}
                                        onClick={()=>props.actions.titlesAction.isOpenTitles({message: false})}
                                        allowDisabledFocus
                                        disabled={disabled}
                                        checked={checked}
                                    />
                                </Stack>
                            </Stack><br />
                        </PivotItem>
                    </Pivot>

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
      titlesState: state.titlesReducer
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        titlesAction: bindActionCreators(titlesAction, dispatch)
      }
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Titles)
