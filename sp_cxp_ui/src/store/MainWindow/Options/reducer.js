import * as types from './actionTypes'
import { readINIFile } from '../../../utils/globalUtility';
const os = require('os');
const authorName = os.homedir().split('\\').pop();
const userOptions = readINIFile();

const initialState = {
    isOptions: false,
    optionsInfo: {},
    isExit: false,
    showReportProperties: false,
    showToolbar: false,
    optionsCollection: {
        General: {
            author: authorName,
            loggingLevel: 'CRITICAL',
            backupCount: '10',
            logFileRotation: '50',
            testName:"Descriptive Statistics",
        },
        Worksheet: {
            general: {
                undo: false,
                dupTransfromTitleWarning: false
            },
            numeric: {
                displayAs: "E Notation When Needed",
                decimalPlaces: '4',
                engineeringNotation: false
            },
            appearance: {
                colWidth: '64',
                rowHeight: '24',
                grid: {
                    color: 'gray',
                    thickness: 'thin'
                },
                font: {
                    style: 'Arial',
                    size: '8'
                }
            },
            regionalSettings: 'INR'
        },
        Editor: {
            measurementUnit: '',
            showRuler: false,
            showPropertiesPane: false,
            enableToolbar: false,
            enableSpellCheck: false,
            enableTrackChanges: false,
            enableComment: false,
            significant_digits: 0,
            scientific_notations: 0,
            explain_test_results: 0,
            significant_p_value: 0,
            max_char_length: 30,
        },
        Graph: {
            sizeAndPosition: {
                height: "2.5",
                width: "5.0",
                top: "0.500",
                left: "0.750"
            },
            font: "Arial",
            Symbols: {
                single: {
                    symbol: "circle",
                    fillcolor: "#000000ff"
                },
                multiple: {
                    symbol: "circle",
                    fillcolor: "#000000ff"
                },
                size: "0.05"
            },
            lines: {
                single: {
                    linetype: "solid",
                    color: "#000000ff"
                },
                multiple: {
                    linetype: "solid",
                    color: "#000000ff"
                },
                thickness: "0.010"
            },
            fills: {
                singleSeries: "#b3b3b3ff",
                multipleGroups: "#b3b3b3ff",
                barThickness: "0.5"
            }
        },
        GraphPage: {
            defaultUnit: 'in',
            defaultZoom: '50',
            Rulers: false,
            Grids: {
                showgrids: true,
                ShowHorizontalLines: false,
                ShowVerticleLines: false,
            }
        },
        ...(userOptions && userOptions.Options)
    }
}

const optionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ISOPTIONS:
            state.isOptions = action.message.message;
            return {...state }
            break;
        case types.OPTIONSUPDATE:
            state.optionsInfo = action.message.message;
            return {...state }
            break;
        case types.ISEXIT:
            state.isExit = action.message.message;
            return {...state }
            break;
        case types.OPTIONSUPDATECOLLECTION:
            state.optionsCollection = action.message.message;
            return {...state }
            break;
            case types.SHOWPROPERTIESPANE:
                state.showReportProperties = action.message.message;
                return {...state }

            case types.ENABLETOOLBAR:
                state.showToolbar = action.message.message;
                return {...state }
        default:
            return state
    }
}

export default optionsReducer