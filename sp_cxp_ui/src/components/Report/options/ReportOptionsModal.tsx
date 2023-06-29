import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportOptionsAction from "../../../store/Worksheet/report/actions";
import { getDataSetByKey,createNewClient } from '../../../services/RedisServices';
import * as actionCreators from '../../../store/Helpmenu';

const ReportOptionsModal: React.FunctionComponent = (props: any) => {
    const getOptionsData = async () => {
        const client = createNewClient();
        var os = require('os');
        console.log(os.userInfo().username)
        let optionsData = await getDataSetByKey(os.userInfo().username, client);
        console.log(optionsData);
    }

    const updateRedis = (options: any) => {
        console.log(options);
    }
    const help = (a:string,b:string,c:string)=>{
        props.OpenHelpWindow(a,b,c)
      }
   

    const getOptionsComponent = () => {
        const optionsArray: any = {
            descriptivestatistics: 'DescriptiveStatistics',
            onewayfrequencytables: 'OneWayFrequencyTables',
            onesamplettest: 'OneSamplet-test',
            onesamplesignedrankedtest: 'OneSampleSignedRankedTest',
            ttest: 'ttest',
            rankedSumTest: 'RankedSumTest',
            oneWayAnova: 'OneWayANOVA',
            twoWayAnova: 'TwoWayANOVA',
            ThreeWayAnova: 'ThreeWayANOVA',
            AnovaOnRanks: 'ANOVAOnRanks', 
            oneWayAnCova: 'OneWayAncova',
            pairedttest: 'PairedTTest',
            signedRankTest: 'SignedRankTest',
            OneWayRepeatedMeasuresAnova: 'OneWayRMAnova',
            OtwoWayRepeatedMeasuresAnova: 'TwoWayRMAnova',
            RepeatedMeasuresAnovaOnRanks: 'RMANOVAOnRanks',
            ztest: 'ZTest',
            chisquare: 'ChiSquare',
            mcnemarstest: 'McNemarsTest',
            relativeRisk: 'RelativeRisk',
            oddsRatio: 'OddsRatio',
            linear: 'LinearRegression',
            multipleLinear: 'MultipleLinearRegression',
            multipleLogistic: 'MultipleLogistic',
            polynomial: 'PolynomialRegression',
            forward: 'ForwardStepwiseRegression',
            backword: 'BackwardStepwiseRegression',
            bestsubsets: 'BestSubsetRegression',
            regressionWizard: 'NonLinearRegression',
            deming: 'DemingRegression',
            prinicipalComponents: 'PrinicipalComponents',
            pearsonProductMoment: 'PearsonCorrelation',
            spearmanRankOrder: 'SpearmanCorrelation',
            normality: 'Normality',
            singlegroup: 'SurvivalSingleGroup',
            logRank: 'SurvivalLogRank',
            gehanbreslow: 'SurvivalGehanBreslow',
            proportionalhazards: 'CoxPHModel',
            stratifiedModel: 'CoxStratifiedModel',
        }
        const { selectedOptionType } = props;
        const {testsKey, testsValue} = selectedOptionType ? selectedOptionType : {testsKey: '', testsValue: ''}
        if(!optionsArray[testsKey]) {
            return;
        }
        const Component = require('./' + optionsArray[testsKey]).default;
        return (
            <Component
                isOpen={props.isOpen}
                close={() => { props.actions.reportOptionsAction.isOpenReportOptions({ message: false }) }}
                updateRedis={(options: any) => updateRedis(options)}
                OpenHelpWindow={help}
                helpMenu={props.helpMenu}
                modalData={{testsValue}}>
            </Component>
        )
    }

    useEffect(() => {
        return ()=> {
            help('wbasics','','')
        }
    }, []);

    return (
        <>
            {getOptionsComponent()}
        </>
    );
};

function mapStateToProps(state: any) {
    return {
        isOpenReportOptions: state.reportOptionsReducer.isOpenReportOptions,
        helpMenu: state.helpMenuReducer,
        selectedOptionType: state.reportOptionsReducer.selectedOptionType
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        OpenHelpWindow: (RibbonMenu: string, selectedElement: string, selectedItem: string) => dispatch(actionCreators.setHelpWindowOpen(RibbonMenu, selectedElement, selectedItem)),

        actions: {
            reportOptionsAction: bindActionCreators(reportOptionsAction, dispatch)
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReportOptionsModal)
