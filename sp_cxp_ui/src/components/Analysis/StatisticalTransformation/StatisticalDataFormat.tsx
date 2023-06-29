import * as STList from './StatisticalDataFormatList';

export interface STDataRow{
    id: number
    title: string
    value: string
    key: string
    next?: string
    nextId?: number
    active: boolean
}

export const stack: STDataRow[] = [
  { id: 1, title: 'Output', value: '', key: '', next: 'Input', nextId: 2, active: true }
]

export const indexoneway: STDataRow[] = [
    { id: 1, title: 'Output', value: '', key: '', next: 'Factor', nextId: 2, active: true }
]

export const indextwoway: STDataRow[] = [
    { id: 1, title: 'Output', value: '', key: '', next: 'Group', nextId: 2, active: true }
]

export const unindexoneway: STDataRow[] = [
    { id: 1, title: 'Factor', value: '', key: '', next: 'Data', nextId: 2, active: true }
]

export const unindextwoway: STDataRow[] = [
    { id: 1, title: 'Factor A', value: '', key: '', next: 'Factor B', nextId: 2, active: true }
]

export const simpletransformsadd: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Input', nextId: 2, active: true }
]

export const simpletransformssubtract: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Input', nextId: 2, active: true }
]

export const simpletransformsdivide: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Input', nextId: 2, active: true }
]

export const simpletransformssquare: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const simpletransformsabsolute: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const simpletransformsln: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const simpletransformslog10: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const simpletransformsreciprocal: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const simpletransformsexponential: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const simpletransformssquareroot: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const simpletransformsarcsinsquareroot: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const center: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const standardize: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const rank: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const interactions: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Input', nextId: 2, active: true }
]

export const dummyvariablereferenceCoding: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const dummyvariableeffectsCoding: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const laggedvariables: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const filter: STDataRow[] = [
    { id: 1, title: 'Key', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const randomNumbersuniform: STDataRow[] = [
    { id: 1, title: 'Output', value: '', key: '', next: '', nextId: 2, active: true }
]

export const randomNumbersnormal: STDataRow[] = [
    { id: 1, title: 'Output', value: '', key: '', next: '', nextId: 2, active: true }
]

export const missingValues: STDataRow[] = [
    { id: 1, title: 'Input', value: '', key: '', next: 'Output', nextId: 2, active: true }
]

export const getNewRow = (currObj: any, currStep: string) => {
    let multiStepArray = [
        STList.OneWayUnindex,
        STList.STAdd,
        STList.STSubstract,
        STList.STDivide,
        STList.STSquare,
        STList.STAbsoluteValue,
        STList.STLn,
        STList.STLog10,
        STList.STReciprocal,
        STList.STExponential,
        STList.STSquareRoot,
        STList.STArcsinSquareRoot,
        STList.Center,
        STList.Standardize,
        STList.Rank,
        STList.Interactions,
        STList.ReferenceCoding,
        STList.EffectsCoding,
        STList.LaggedVariables,
        STList.RNUniform,
        STList.RNNormal,
    ];
    if(currStep == STList.Stack || currStep == STList.OneWayIndex || currStep == STList.TwoWayIndex) {
        if (currObj.next !== undefined) {
            let Obj: STDataRow = { 
                id: currObj.nextId,
                title: currObj.next,
                value: '',
                key: '',
                next: currObj.next,
                nextId: (currObj.nextId + 1),
                active: true 
            };
            return Obj;
        }
    } else if(multiStepArray.includes(currStep)) {
        if (currObj.next !== undefined && currObj.title !== 'Output') {
            let Obj: STDataRow = { 
                id: currObj.nextId,
                title: currObj.next,
                value: '',
                key: '',
                next: 'Output',
                nextId: (currObj.nextId + 1),
                active: true 
            };
            return Obj;
        }
    } else if(currStep == STList.TwoWayUnindex) {
        if (currObj.next !== undefined && currObj.title !== 'Output') {
            let Obj: STDataRow = { 
                id: currObj.nextId,
                title: currObj.next,
                value: '',
                key: '',
                next: (currObj.next === 'Factor B' ? 'Data' : 'Output'),
                nextId: (currObj.nextId + 1),
                active: true 
            };
            return Obj;
        }
    } else if(currStep == STList.Filter || currStep == STList.MissingValues) {
        if (currObj.next !== undefined) {
            let Obj: STDataRow = {
                id: currObj.nextId,
                title: currObj.next,
                value: '',
                key: '',
                next: (currObj.next === 'Output' ? 'Input' : 'Output'),
                nextId: (currObj.nextId + 1),
                active: true
            };
            return Obj;
        }
    }
    return false;
}
