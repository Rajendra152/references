import React, { useState } from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { Text } from '@fluentui/react/lib/Text';
import { TextField } from '@fluentui/react/lib/TextField';

import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    ContextualMenu,
    Toggle,
    Modal,
    IDragOptions,
    IIconProps,
    Stack,
    IStackProps,
    IStackTokens
} from '@fluentui/react';
import { DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';

import { SpinButton, ISpinButtonStyles, Position } from '@fluentui/react';
import { Checkbox } from '@fluentui/react';
import { Shimmer } from '@fluentui/react';

import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Properties } from '../../../Constant/ConstantImage';
import { useEffect } from 'react';
import Helpbutton from '../../../../HelpButton';
const options1: IChoiceGroupOption[] = [
    { key: 'Fixed', text: 'Fixed' },
    { key: 'nearest', text: 'Nearest neighbors' }
];
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75, height: 22 } };
const stackTokens: IStackTokens = { childrenGap: 40 };
const stackTokens1: IStackTokens = { childrenGap: 12 };
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 70 },
};
const options: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits' },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
];

const XminInt = 1;
const XmaxInt = 100;
const YminInt = 1;
const YmaxInt = 100;
export const Options: React.FunctionComponent = (props) => {
    console.log("pop", props)
    // const [isModalOpenOptions, { setTrue: showModalop, setFalse: hideModalop }] = useBoolean(true);
    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);
    const [open, setModal] = useState(props.isOpenOp);
    const [Xmin, setXmin] = useState(8)
    const [Xmax, setXmax] = useState(24)
    const [Ymin, setYmin] = useState(8)
    const [Ymax, setYmax] = useState(24)
    const [plotRawData, setplotRawData] = useState(false)
    const [Xint, setXint] = useState(15)
    const [Yint, setYint] = useState(15)
    const [bandWidth, setbandWidth] = useState('Fixed')
    useEffect(() => {
        setModal(props.isOpenOp)
        console.log("tr", props.isOpenOp)
    }, [props])

    // Normally the drag options would be in a constant, but here the toggle can modify keepInBounds
    const dragOptions = React.useMemo(
        (): IDragOptions => ({
            moveMenuItemText: 'Move',
            closeMenuItemText: 'Close',
            menu: ContextualMenu,
            keepInBounds,
        }),
        [keepInBounds],
    );
    const changeCheckbox = (ev, item) => {
        setbandWidth(item.key)
        props.OptionMethods('bandwidth', item.key)
    }
    const XintChange = (ev, value) => {
        console.log("value",)
    }
    const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        let numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            numericValue = Math.min(numericValue, max);
            numericValue = Math.max(numericValue, min);
            return String(numericValue) + suffix;
        }
    };
    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.min(value + 1, XmaxInt);
            num = Math.round(num * 10) / 10
            setXint(num)
            props.OptionMethods('xint', num)
            return num
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.max(value - 1, XminInt);
            num = Math.round(num * 10) / 10
            setXint(num)
            props.OptionMethods('xint', num)
            return num
        }
    };
    const onIncrementY = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.min(value + 1, YmaxInt);
            num = Math.round(num * 10) / 10
            setYint(num)
            props.OptionMethods('yint', num)
            return num
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrementY = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.max(value - 1, YminInt);
            num = Math.round(num * 10) / 10
            setYint(num)
            props.OptionMethods('yint', num)
            return num
        }
    };

    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)
    const titleId = useId('title');
    const onPLotChange = () => {
        let plot = !plotRawData
        setplotRawData(plot)
        props.OptionMethods('plot', plot)

    }
    const XminChange = (ev) => {
        let Xmin = ev.target.value
        setXmin(Xmin)
        props.OptionMethods('xmin', Xmin)

    }
    const XmaxChange = (ev) => {
        let xmax = ev.target.value
        setXmax(xmax)
        props.OptionMethods('xmax', xmax)

    }
    const YminChange = (ev) => {
        let Ymin = ev.target.value
        setYmin(Ymin)
        console.log("ychange", Ymin)
        props.OptionMethods('ymin', Ymin)

    }
    const YmaxChange = (ev) => {
        let Ymax = ev.target.value
        setYmax(Ymax)
        props.OptionMethods('ymax', Ymax)

    }
    return (
        <div >


            {/* <DefaultButton onClick={showModalop} text="Open Modal" /> */}
            <Modal
                titleAriaId={titleId}
                isOpen={open}
                className="smoother-modal"
                // onDismiss={hideModalop}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={isDraggable ? dragOptions : undefined}
            >
                <div className={contentStyles.body}>
                    <div className="ms-Grid  options" dir="ltr">
                        <div className="ms-Grid-row">
                            <p className="text" style={{ fontWeight: 700 }}  >
                                Smoothed Curve Options
                                <span style={{ float: 'right' }}>  <IconButton
                                    styles={iconButtonStyles}
                                    iconProps={cancelIcon}
                                    ariaLabel="Close popup modal"
                                    onClick={() => props.openOption(false)}
                                /></span>
                            </p>
                        </div>
                        <div className="ms-Grid-row" style={{ backgroundColor: '#bbbaba4a', padding: '12px' }}>
                            <div className="ms-Grid-col ms-sm12 ">
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6 " >
                                        <div className="ms-Grid-row">
                                            <div className="ms-Grid-col ms-sm7 padding">
                                                <p className="text" style={{ margin: '1px 0px' }}>
                                                    X values
                                                </p>
                                                <TextField label="Minimum" value={Xmin} onChange={XminChange} />
                                                <TextField label="Maximum" value={Xmax} onChange={XmaxChange} />
                                                <SpinButton
                                                    label="Intervas"
                                                    labelPosition={Position.top}
                                                    defaultValue={Xint}
                                                    value={Xint}
                                                    min={XminInt}
                                                    max={XmaxInt}
                                                    onValidate={onValidate}
                                                    onIncrement={onIncrement}
                                                    onDecrement={onDecrement} step={1}
                                                    incrementButtonAriaLabel="Increase value by 1"
                                                    decrementButtonAriaLabel="Decrease value by 1"
                                                    styles={styles}
                                                />
                                            </div>
                                        </div>
                                        <div className="ms-Grid-row">
                                            <div className="ms-Grid-col ms-sm12 padding">
                                                <ChoiceGroup defaultSelectedKey={bandWidth} options={options1}
                                                    onChange={changeCheckbox}
                                                    label=" Bandwidth method" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ">
                                        <div className="ms-Grid-row">
                                            <div className="ms-Grid-col ms-sm7 padding">
                                                <p className="text" style={{ margin: '1px 0px' }}>
                                                    Y values
                                                </p>
                                                <TextField label="Minimum" value={Ymin} onChange={(ev) => YminChange(ev)} />
                                                <TextField label="Maximum" value={Ymax} onChange={YmaxChange} />
                                                <SpinButton
                                                    label="Intervals"
                                                    labelPosition={Position.top}
                                                    defaultValue={Yint}
                                                    value={Yint}
                                                    min={YminInt}
                                                    max={YmaxInt}
                                                    onValidate={onValidate}
                                                    onIncrement={onIncrementY}
                                                    onDecrement={onDecrementY}
                                                    incrementButtonAriaLabel="Increase value by 1"
                                                    decrementButtonAriaLabel="Decrease value by 1"
                                                    styles={styles}
                                                />
                                            </div>
                                            <div className="ms-Grid-col ms-sm12 " style={{ padding: '24px 0px' }}>
                                                <Checkbox label="Plot raw data" onChange={onPLotChange} checked={plotRawData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ">
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm6 ">
                                        <DefaultButton text="Help"  ></DefaultButton>
                                    </div>
                                    <div className="ms-Grid-col ms-sm6 ">
                                        <Stack horizontal tokens={stackTokens}>
                                            <DefaultButton text="Ok"  onClick={() => props.openOption(false)} ></DefaultButton>
                                            <DefaultButton text="Cancel"  onClick={() => props.openOption(false)} ></DefaultButton>
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default Options
const cancelIcon: IIconProps = { iconName: 'Cancel' };

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
            color: theme.palette.neutralPrimary,
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
        width: '470px',
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

