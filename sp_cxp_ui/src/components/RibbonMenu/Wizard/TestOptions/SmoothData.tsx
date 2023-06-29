import React, { useState, useEffect } from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { Text } from '@fluentui/react/lib/Text';
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
import { SpinButton, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { Checkbox } from '@fluentui/react';
import { Shimmer } from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import Options from './Options';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    isCurrentGraph,
    isCreateNewGraph,
} from '../../../../store/Analysis/Smoother/actions';
import Helpbutton from '../../../../HelpButton';

const iconClass = mergeStyles({
    fontSize: 20,
    height: 20,
    width: 20,
    margin: '0 25px',
});
const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };
const stackTokens: IStackTokens = { childrenGap: 40 };
const stackTokens1: IStackTokens = { childrenGap: 12 };
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 200 },
};

const options2d: IDropdownOption[] = [
    { key: 'negative', text: 'Negative Exponential' },
    { key: 'loess', text: 'Loess' },
    { key: 'average', text: 'Running Average' },
    { key: 'median', text: 'Running Median' },
    { key: 'bisquare', text: 'Bisquare' },
    { key: 'square', text: 'Inverse Square' },
];
const options3d: IDropdownOption[] = [
    { key: 'negative', text: 'Negative Exponential' },
    { key: 'loess', text: 'Loess' },
    { key: 'average', text: 'Running Average' },
    { key: 'median', text: 'Running Median' },
    { key: 'bisquare', text: 'Bisquare' },
    { key: 'square', text: 'Inverse Square' },
    { key: 'distance', text: 'Inverse Distance' },
];
export const SmoothData = (props) => {
    console.log("Sprops", props)



    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(true);
    const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
    const [keepInBounds, { toggle: toggleKeepInBounds }] = useBoolean(false);
    const [smoother, setSmooth] = useState('negative')
    const [smoothValue, setSmootherValue] = useState('Negative Exponential')
    const [sample, setsample] = useState(0.1)
    const [degree, setdegree] = useState(1)
    const [reject, setReject] = useState(false)
    const [isopenOp, openOption] = useState(false)
    const [outlierDisabled, disable] = useState(false)
    const [description, setDescription] = useState('  Local smoothing technique using polynomial regression and weights computed from the Gaussian density function')

    // options
    const [Xmin, setXmin] = useState(8)
    const [Xmax, setXmax] = useState(24)
    const [Ymin, setYmin] = useState(8)
    const [Ymax, setYmax] = useState(24)
    const [plotRawData, setplotRawData] = useState(false)
    const [Xint, setXint] = useState(15)
    const [Yint, setYint] = useState(15)
    const [bandWidth, setbandWidth] = useState('Fixed')


    const min = 0;
    const max = 1;
    const minD = 1;
    const maxD = 10;
    // By default the field grows to fit available width. Constrain the width instead.
    const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };
    useEffect(()=>{
       props.OpenHelpWindow('intro_smoothing_data','','')
    },[])
    useEffect(() => {
        if (smoother == 'negative') {
            disable(false)

            setDescription('Local smoothing technique using polynomial regression and weights computed from the Gaussian density function')
        }
        else if (smoother == 'loess') {
            setDescription('Local smoothing technique with tricube weighting and polynomial regression')
            disable(false)

        }
        else if (smoother == 'average') {
            setDescription('Local smoothing technique that averages the values at neighboring points')
            disable(true)
            setReject(false)
        }
        else if (smoother == 'median') {
            setDescription('Local smoothing technique that computes the median of the values at neighboring points')
            disable(true)
            setReject(false)
        }
        else if (smoother == 'bisquare') {
            setDescription('Local smoothing technique with bisquare weighting and polynomial regression')
            disable(false)

        }
        else if (smoother == 'square') {
            setDescription('The weighted average of the values at neighboring points is computed using the Cauchy density function')
            disable(true)
            setReject(false)
        }
        else if (smoother == 'distance') {
            setDescription('The weighted average of the values at neighboring points is computed using inverse distance')
            disable(true)
            setReject(false)
        }
    }, [smoother])

    // calling api
    async function smootherOk() {

        console.log('smoothData contains', props.isNewGraph);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data_format: 8,
                worksheet: 'test3456',
                data_columns: [
                    {
                        data_option: 'Source X',
                        column: props.smootherData.dataformatInfo[0].value,
                        start_row: 1,
                        end_row: 100
                    },
                    {
                        data_option: 'Source Y',
                        column: props.smootherData.dataformatInfo[1].value,
                        start_row: 1,
                        end_row: 100
                    },
                    props.smootherData.testOptionsName == 'Smoothers2D' ? '' : {
                        data_option: 'Source Z',
                        column: props.smootherData.dataformatInfo[2].value,
                        start_row: 1,
                        end_row: 100
                    }
                ],
                output_columns: [props.smootherData.Output.predicted == true ? {
                    data_option: 'predicted',
                    column: 'first_empty',
                    start_row: 1,
                    end_row: 100
                } : {},
                props.smootherData.Output.residual == true ? {
                    data_option: 'residuals',
                    column: 'first_empty',
                    start_row: 1,
                    end_row: 100
                } : {}
                ],
                plot_results: props.smootherData.Output.checkplot,
                create_Report: props.smootherData.Output.checkcreate,
                // depends weather selected or not 
                graph_columns: [{
                    data_option: 'x_column',
                    column: 'first_empty',
                    start: 1,
                    end: 100
                },
                {
                    data_option: 'y_column',
                    column: 'first_empty',
                    start: 1,
                    end: 100
                },
                props.smootherData.testOptionsName == 'Smoothers2D' ? '' :
                    {
                        data_option: 'z_column',
                        column: 'first_empty',
                        start: 1,
                        end: 100
                    }],
                current_graph: props.smootherData.graphData.currentGraph,
                new_graph: props.smootherData.graphData.newGraph,
                smoother: {
                    smoother_val: smoothValue,
                    sampling_proportion: sample,
                    polynomial_degree: degree,
                    reject_outliers: reject
                },
                opt_smooth_x_min: parseInt(Xmin),
                opt_smooth_x_max: parseInt(Xmax),
                opt_x_interval: Xint,
                opt_smooth_y_min: parseInt(Ymin),
                opt_smooth_y_max: parseInt(Ymax),
                opt_y_interval: Yint,
                opt_bandwidth: bandWidth,
                opt_plot_raw_data: plotRawData
            }),
        };
        // depends weather selected or not


        let sendData = await fetch('http://127.0.0.1:8000/graphs/execute_smoothers_2d', requestOptions);
        let sendRes = await sendData.json();
        console.log('Response from backend', sendRes);
        // }
    }
    // end of api call


    const OptionMethods = (type, value) => {
        if (type == 'xmin') {
            setXmin(value)
        }
        else if (type == 'ymin') {
            setYmin(value)
        }
        else if (type == 'xmax') {
            setXmax(value)
        }
        else if (type == 'ymax') {
            setYmax(value)
        }
        else if (type == 'yint') {
            setYint(value)
        }
        else if (type == 'xint') {
            setXint(value)
        }
        else if (type == 'plot') {
            setplotRawData(value)
        }
        else if (type == 'bandwidth') {
            setbandWidth(value)

        }
    }

    /** Remove the suffix or any other text after the numbers, or return undefined if not a number */
    const getNumericPart = (value: string): number | undefined => {
        const valueRegex = /^(\d+(\.\d+)?).*/;
        if (valueRegex.test(value)) {
            const numericValue = Number(value.replace(valueRegex, '$1'));
            return isNaN(numericValue) ? undefined : numericValue;
        }
        return undefined;
    };

    /** Increment the value (or return nothing to keep the previous value if invalid) */
    const onIncrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.min(value + 0.1, max);
            num = Math.round(num * 10) / 10
            setsample(num)
            console.log("sam", num)
            return num
        }
    };

    /** Decrement the value (or return nothing to keep the previous value if invalid) */
    const onDecrement = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.max(value - 0.1, min);
            num = Math.round(num * 10) / 10
            setsample(num)
            console.log("sam", num)
            return num
        }
    };
    // Increment the Degree
    const onIncrementD = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.min(value + 1, maxD);
            num = Math.round(num * 100) / 100
            setdegree(num)
            console.log("sam", num)
            return num
        }
    };

    //  Decrement the Degree
    const onDecrementD = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        // const numericValue = getNumericPart(value);
        if (value !== undefined) {
            let num = Math.max(value - 1, minD);
            num = Math.round(num * 100) / 100
            setdegree(num)
            console.log("sam", num)
            return num
        }
    };

    /**
     * Clamp the value within the valid range (or return nothing to keep the previous value
     * if there's not valid numeric input)
     */
    const onValidate = (value: string, event?: React.SyntheticEvent<HTMLElement>): string | void => {
        let numericValue = getNumericPart(value);
        if (numericValue !== undefined) {
            numericValue = Math.min(numericValue, max);
            numericValue = Math.max(numericValue, min);
            return String(numericValue) + suffix;
        }
    };

    /** This will be called after each change */
    const onChange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
        console.log('Value changed to ' + value);
    };








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

    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)
    const titleId = useId('title');


    const samplingOnchange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
        alert(value)
        setsample(value)
        alert(sample)
    }
    const degreeOnchange = (event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
        setdegree(value)
        alert(sample)
    }

    const smoothChange = (ev, item) => {
        setSmooth(item.key);
        setSmootherValue(item.value)
    }

    function HandleOPtions(value) {
        openOption(value)
    }

    const RejectOutlier = () => {
        setReject(!reject)
        console.log("rrr", reject)

    }
    return (
        <div className="smoother">


            {/* <DefaultButton onClick={showModal} text="Open Modal" /> */}
            <Modal
                titleAriaId={titleId}
                isOpen={props.isOpen}
                className="smoother-modal"
                onDismiss={hideModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={isDraggable ? dragOptions : undefined}
            >
                <div className={contentStyles.body}>
                    <div className="ms-Grid " dir="ltr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm9 padding">
                                <p className="text" style={{ fontWeight: 700 }}  >
                                    {props.smootherData.testOptionsName}
                                </p>
                            </div>
                            <div className="ms-Grid-col ms-sm3 padding">
                                <Helpbutton  nodeId="intro_smoothing_data" />
                            </div>
                        </div>
                        <div className="ms-Grid-row" style={{ backgroundColor: '#bbbaba4a', padding: '12px' }}>
                            <div className="ms-Grid-col ms-sm12 padding">
                                <p className="text">
                                    Smoothers
                                </p></div>
                            <div className="ms-Grid-col ms-sm12 padding ">
                                <div className="ms-Grid-row">
                                    <div className="ms-Grid-col ms-sm2 ">
                                        <p className="text">
                                            Smoother
                                        </p>
                                    </div>
                                    <div className="ms-Grid-col ms-sm7 ">
                                        <Dropdown
                                            selectedKey={smoother}
                                            options={props.smootherData.testOptionsName == 'Smoothers2D' ? options2d : options3d}
                                            styles={dropdownStyles}
                                            onChange={smoothChange}

                                        />
                                    </div>
                                    <div className="ms-Grid-col ms-sm3 ">
                                        <DefaultButton text="Preview" allowDisabledFocus />
                                    </div>
                                </div>
                            </div>
                            <div className="ms-Grid-col ms-sm12 padding">
                                <div className="ms-Grid-row">

                                    <div className="ms-Grid-col ms-sm9 ">
                                        <SpinButton
                                            label="Sampling propertion"
                                            defaultValue={sample}
                                            value={sample}
                                            min={min}
                                            max={max}
                                            onValidate={onValidate}
                                            onIncrement={onIncrement}
                                            onDecrement={onDecrement}
                                            // onChange={onChange}
                                            incrementButtonAriaLabel="Increase value by 0.1"
                                            decrementButtonAriaLabel="Decrease value by 0.1"
                                            styles={styles}
                                        />

                                    </div>
                                    <div className="ms-Grid-col ms-sm3 smoother-modal ">
                                        <Stack horizontal tokens={stackTokens1}>
                                            <DefaultButton disabled>
                                                <i data-icon-name="ChromeBack" role="presentation" aria-hidden="true" className="ms-Icon root-32 css-78 ms-Button-icon icon-83" >?</i>
                                            </DefaultButton>

                                            <DefaultButton disabled>
                                                <i data-icon-name="ChromeBackMirrored" role="presentation" aria-hidden="true" className="ms-Icon root-32 css-78 ms-Button-icon icon-83">?</i>
                                            </DefaultButton>
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                            <div className="ms-Grid-col ms-sm12 padding ">
                                <div className="ms-Grid-row">

                                    <div className="ms-Grid-col ms-sm9 ">
                                        <SpinButton
                                            label="Polynomial degree"
                                            value={degree}
                                            defaultValue={degree}
                                            onIncrement={onIncrementD}
                                            onDecrement={onDecrementD}
                                            min={minD}
                                            max={maxD}
                                            // onChange={degreeOnchange}
                                            incrementButtonAriaLabel="Increase value by 1"
                                            decrementButtonAriaLabel="Decrease value by 1"
                                            styles={styles}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="ms-Grid-col ms-sm12 padding">
                                <Checkbox label="Reject outliers" onChange={RejectOutlier} checked={reject} disabled={outlierDisabled} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 padding">     <p className="text">
                                Description
                            </p></div>
                            <div className="ms-Grid-col ms-sm12 padding ">     <p className="text">
                                {description}

                            </p></div>
                            <div className="ms-Grid-col ms-sm12 padding">
                                <Shimmer />
                            </div>
                            <div className="ms-Grid-col ms-sm12 padding">
                                <Stack horizontal tokens={stackTokens}>
                                    <DefaultButton text="Help"  ></DefaultButton>
                                    <DefaultButton text="Options" onClick={() => HandleOPtions(true)}></DefaultButton>
                                    <DefaultButton text="Ok" onClick={smootherOk}></DefaultButton>
                                    <DefaultButton text="Cancel" onClick={() => { props.closeSmoother() }} ></DefaultButton>
                                </Stack>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
            <Options isOpenOp={isopenOp} OptionMethods={OptionMethods} openOption={HandleOPtions} />
        </div >
    );
};





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

