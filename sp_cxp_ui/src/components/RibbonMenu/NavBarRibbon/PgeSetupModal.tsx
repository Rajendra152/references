import React, { useState, useEffect } from 'react';
import { DefaultButton, IButtonStyles } from '@fluentui/react/lib/Button';
import {

    Stack, IStackTokens

} from '@fluentui/react';
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Position } from '@fluentui/react';

import {
    Modal,
    getTheme,
    mergeStyleSets,
    FontWeights,
    IDragOptions,
    ContextualMenu,
    IconButton,
    IIconProps,
    ChoiceGroup, IChoiceGroupOption
} from 'office-ui-fabric-react';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { connect } from 'react-redux';
import { useBoolean } from "@uifabric/react-hooks";
import * as actionCreators from '../../../store/Helpmenu/actions';

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 70, height: 24 } };
const suffix = 'px';
const min = 400;
const max = 960000;
const options: IDropdownOption[] = [
    // { key: 'A3', text: 'A3' },
    { key: 'Letter', text: 'Letter' },
    { key: 'Tabloid', text: 'Tabloid' },
    { key: 'Legal', text: 'Legal' },
    { key: 'Statement', text: 'Statement' },
    { key: 'Excecutive', text: 'Excecutive' },
    { key: 'A3', text: 'A3' },
    { key: 'A4', text: 'A4' },
    { key: 'A5', text: 'A5' },
    { key: 'B4', text: 'B4' },
    { key: 'B5', text: 'B5' },
    { key: 'Customize', text: 'Customize' },

]

/** Remove the suffix or any other text after the numbers, or return undefined if not a number */
const getNumericPart = (value: string): number | undefined => {
    const valueRegex = /^(\d+(\.\d+)?).*/;
    if (valueRegex.test(value)) {
        const numericValue = Number(value.replace(valueRegex, '$1'));
        return isNaN(numericValue) ? undefined : numericValue;
    }
    return undefined;
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 200 },
}
const tabKeys: string[] = ['CAssumeCheck', 'CResults', 'COtherTest'];
const setIdKey = 'oneWayAnova';
const optionsori: IChoiceGroupOption[] = [
    { key: 'portrait', text: 'Portrait' },
    { key: 'landscape', text: 'Landscape' }
]
const stackTokens: IStackTokens = { childrenGap: 20 };

const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
    let numericValue = getNumericPart(value);
    if (numericValue !== undefined) {
        numericValue = Math.min(numericValue, max);
        numericValue = Math.max(numericValue, min);
        return String(numericValue) + suffix;
    }
};
const pageSetup: React.FunctionComponent = (props) => {
    const [selectedPage, setPageType] = useState('')
    const [selectedview, setPageTypeview] = useState('portrait')
    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);

    const dragOptions = React.useMemo(
        (): IDragOptions => ({
          moveMenuItemText: 'Move',
          closeMenuItemText: 'Close',
          menu: ContextualMenu,
          keepInBounds,
        }),
         [keepInBounds],
      );
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()


    useEffect(() => {
        console.log("props,", props)

    }, [props])
    const close = () => {
        props.OpenPageSetup(false)
    }
    const _onChange = (ev, item) => {
        console.log(item.key)
        setPageTypeview(item.key)
        if (selectedPage == "A3") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(1122.528)
                setHeight(1587.36)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1587.36)
                setHeight(1122.528)
            }
        }
        else if (selectedPage == "A4") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(793.728)
                setHeight(1122.528)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1122.528)
                setHeight(793.728)

            }
        }
        else if (selectedPage == "A5") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(559.392)
                setHeight(793.728)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(793.728)
                setHeight(559.392)

            }
        }
        else if (selectedPage == "Letter") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(816)
                setHeight(1056)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1056)
                setHeight(816)

            }
        }
        else if (selectedPage == "Tabloid") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(1056)
                setHeight(1632)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1632)
                setHeight(1056)

            }
        }
        else if (selectedPage == "Legal") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(816)
                setHeight(1344)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1344)
                setHeight(816)

            }
        }
        else if (selectedPage == "Statement") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(528)
                setHeight(816)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(816)
                setHeight(528)

            }
        }
        else if (selectedPage == "Excecutive") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(695.808)
                setHeight(1008)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1008)
                setHeight(695.808)

            }
        }
        else if (selectedPage == "A3") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(1122.528)
                setHeight(1587.36)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1587.36)
                setHeight(1122.528)

            }
        }
        else if (selectedPage == "B4") {
            if (item.key == "portrait") {
                console.log("entered here")
                setWidth(971.328)
                setHeight(1375.776)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(1375.776)
                setHeight(971.328)

            }
        }
        else if (selectedPage == "B5") {
            if (item.key == "portrait") {
                setWidth(687.84)
                setHeight(971.328)
                // props.OpenPageSetup(false)
            }
            else if (item.key == "landscape") {
                setWidth(971.328)
                setHeight(687.84)

            }
        }
    }
    const selectedPagetype = (ev, item) => {
        console.log(item.key)
        setPageType(item.key)
        if (item.key == "A3") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(1122.528)
                setHeight(1587.36)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1587.36)
                setHeight(1122.528)
            }
        }
        else if (item.key == "Customize") {
            setWidth(400)
            setHeight(400)
        }
        else if (item.key == "A4") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(793.728)
                setHeight(1122.528)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1122.528)
                setHeight(793.728)

            }
        }
        else if (item.key == "A5") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(559.392)
                setHeight(793.728)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(793.728)
                setHeight(559.392)

            }
        }
        else if (item.key == "Letter") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(816)
                setHeight(1056)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1056)
                setHeight(816)

            }
        }
        else if (item.key == "Tabloid") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(1056)
                setHeight(1632)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1632)
                setHeight(1056)

            }
        }
        else if (item.key == "Legal") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(816)
                setHeight(1344)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1344)
                setHeight(816)

            }
        }
        else if (item.key == "Statement") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(528)
                setHeight(816)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(816)
                setHeight(528)

            }
        }
        else if (item.key == "Excecutive") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(695.808)
                setHeight(1008)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1008)
                setHeight(695.808)

            }
        }
        else if (item.key == "A3") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(1122.528)
                setHeight(1587.36)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1587.36)
                setHeight(1122.528)

            }
        }
        else if (item.key == "B4") {
            if (selectedview == "portrait") {
                console.log("entered here")
                setWidth(971.328)
                setHeight(1375.776)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(1375.776)
                setHeight(971.328)

            }
        }
        else if (item.key == "B5") {
            if (selectedview == "portrait") {
                setWidth(687.84)
                setHeight(971.328)
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                setWidth(971.328)
                setHeight(687.84)

            }
        }
    }
    const changeWidth =  (event) => {
        console.log("onchange value",event.target.value)
        const numericValue = getNumericPart(event.target.value);
        if (numericValue !== undefined) {
            let finalValue = numericValue 
            setWidth(finalValue)
        }
    };
    const changeHeight =  (event) => {
        const numericValue = getNumericPart(event.target.value);
        if (numericValue !== undefined) {
            let finalValue = numericValue 
            setWidth(finalValue)
        }
    };
    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrementwidth = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue = numericValue + 5
            setWidth(finalValue)
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrementwidth = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue = numericValue - 5
            setWidth(finalValue)
        }
    }


    const onIncrementheight = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue = numericValue + 5
            setHeight(finalValue)
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrementheight = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        const numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            let finalValue = numericValue - 5
            setHeight(finalValue)
        }
    }

    const applytype = () => {
        console.log("entered",width, height)
        if (selectedPage == "A3") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("1122.528px", "1587.36px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1587.36px", "1122.528px")
            }
        }
        else if (selectedPage == "Customize") {
            props.setPageSize(width, height)

        }
        else if (selectedPage == "A4") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("793.728px", "1122.528px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1122.528px", "793.728px")

            }
        }
        else if (selectedPage == "A5") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("559.392px", "793.728px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("793.728px", "559.392px")

            }
        }
        else if (selectedPage == "Letter") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("816px", "1056px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1056px", "816px")

            }
        }
        else if (selectedPage == "Tabloid") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("1056px", "1632px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1632px", "1056px")

            }
        }
        else if (selectedPage == "Legal") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("816px", "1344px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1344px", "816px")

            }
        }
        else if (selectedPage == "Statement") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("528px", "816px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("816px", "528px")

            }
        }
        else if (selectedPage == "Excecutive") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("695.808px", "1008px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1008px", "695.808px")

            }
        }
        else if (selectedPage == "A3") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("1122.528px", "1587.36px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1587.36px", "1122.528px")

            }
        }
        else if (selectedPage == "B4") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("971.328px", "1375.776px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("1375.776px", "971.328px")

            }
        }
        else if (selectedPage == "B5") {
            if (selectedview == "portrait") {
                console.log("entered here")
                props.setPageSize("687.84px", "971.328px")
                // props.OpenPageSetup(false)
            }
            else if (selectedview == "landscape") {
                props.setPageSize("971.328px", "687.84px")

            }
        }
    }
    return (
        <div className="page-setup ">
            <Modal
                titleAriaId={'title1'}
                className="page-setup"
                isOpen={props.pageSetup}
                onDismiss={close}
                isBlocking={true}
                containerClassName={contentStyles.container}
                dragOptions={isDraggable ? dragOptions : undefined}
            ><div className="msid " dir="ltr">
                    <div className='ms-Grid-row' >
                        <div className={contentStyles.header}>
                            <div className="ms-Grid-col ms-sm9">
                                <span id={'title1'} style={{ fontSize: "17px" }}>
                                    Page Setup
                                </span>
                            </div>
                            <div style={iconButtonStyles.root}>
                                <div className="ms-Grid-col ms-sm3 ">
                                    {/* <Helpbutton nodeId={current} /> */}
                                </div>
                                <IconButton
                                    iconProps={cancelIcon}
                                    ariaLabel="Close popup modal"
                                    onClick={close}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='ms-Grid-row' style={{ paddingLeft: '31px' }}>
                        <Dropdown
                            label="Paper Size"
                            selectedKey={selectedPage}
                            options={options}
                            styles={dropdownStyles}
                            onChange={selectedPagetype}
                        />
                    </div>
                    <div className={'ms-Grid-row'} style={{ marginBottom: '5px' }}>
                        <div className="ms-Grid-col ms-sm4 spin" style={{ padding: "0px 0px 0px 32px" }}>
                            <SpinButton
                                value={width + suffix}
                                min={min}
                                max={max}
                                label='Width'
                                labelPosition={Position.top}
                                onValidate={onValidate}
                                onChange={(value)=>changeWidth(value)}
                                onIncrement={(value, ev) => onIncrementwidth(value, ev)}
                                onDecrement={(value, ev) => onDecrementwidth(value, ev)}
                                incrementButtonAriaLabel="Increase value by 2"
                                decrementButtonAriaLabel="Decrease value by 2"
                                styles={styles}
                            />                </div>
                        <div className="ms-Grid-col ms-sm4 spin" style={{ padding: "0px 0px 0px 32px" }}>
                            <SpinButton
                                value={height + suffix}
                                label='Height'
                                labelPosition={Position.top}
                                min={min}
                                max={max}
                                onValidate={onValidate}
                                onChange={(value) => changeHeight(value)}
                                onIncrement={(value, ev) => onIncrementheight(value, ev)}
                                onDecrement={(value, ev) => onDecrementheight(value, ev)}
                                incrementButtonAriaLabel="Increase value by 2"
                                decrementButtonAriaLabel="Decrease value by 2"
                                styles={styles}
                            />
                        </div>

                    </div>
                    <div className="ms-Grid-row" style={{ paddingLeft: '31px' }}>
                        <fieldset style={{ width: "170px" }}>
                            <legend>
                                <div style={{ fontSize: "14px" }}>Orientation</div>
                            </legend>
                            <div style={{ fontSize: "12px" }} className="ms-Grid" dir="ltr">
                                <div className="ms-Grid-row">
                                    <ChoiceGroup defaultSelectedKey="portrait" options={optionsori} onChange={_onChange} required={true} />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="ms-Grid-row" style={{ padding: '6px 20px 10px 0px' }}>
                        <Stack tokens={stackTokens} horizontal style={{ float: 'right' }}>
                            <DefaultButton text="Cancel" onClick={() => props.OpenPageSetup(false)} allowDisabledFocus />
                            <DefaultButton text="Apply" onClick={() => applytype()} allowDisabledFocus />
                        </Stack>
                    </div>
                </div>
            </Modal>
        </div>


    );
};
function mapStateToProps(state: any) {
    return {
        pageSetup: state.helpMenuReducer.pageSetup,
        pagesetwidth: state.helpMenuReducer.width,
        pagesetheight: state.helpMenuReducer.height
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setPageSize: (width, height) => dispatch(actionCreators.setpageSize(width, height)),
        OpenPageSetup: (message) => dispatch(actionCreators.setpageSetup(message))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(pageSetup)

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
    columns: {
        display: 'flex',
        marginTop: '10px',
        marginBottom: '10px'
    },
    column: {
        flex: '0 0 50%',
        marginBottom: '15px'
    },
    columnBtn: {
        gridColumnEnd: '4',
        marginBottom: '20px'
    },
    fieldSet: {
        border: '1px solid rgb(211, 211, 218, 0.7)',
        minHeight: '100px'
    },
    assumptionSection: {
        width: '50%',
        margin: '5px 10px 20px 10px'
    },
    pocSection: {
        width: '70%',
        margin: '5px 10px 20px 10px'
    }
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

