import React, { useEffect, useState } from 'react';
import { Image } from 'office-ui-fabric-react';
import { Label } from '@fluentui/react/lib/Label';
import * as ConstantFunc from '../../../Constant/ConstantImage';
import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/Helpmenu/actions';

export interface PreviewProps {
  title: string;
  src: string;
  content: string;
}

const WizardPreview = (previewProps: PreviewProps) => {
  console.log(previewProps, 'after class declarrati');
  const styles = { height: '180px' };
  const src = `../../../../assets/icons/${previewProps.src}.svg`;
  const staticSrc = '../../../../assets/icons/WizardImage.PNG';
  const [step, setStep] = useState('');

  useEffect(() => {
    setStep(previewProps.content.stepType);
    console.log(previewProps.dataSelection, 'useeffect');

  });
  useEffect(() => {
    console.log(previewProps, 'props of wizard preview');

    if (previewProps.title == 'Descriptive Statistics') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'descriptive_statistics_for_worksheets',
        ''
      );
    } else if (previewProps.title == 'One Way ANCOVA') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_one_way_analysis_of_covariance_data',
        ''
      );
    } else if (previewProps.title == 'ANOVA On Ranks') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_anova_on_ranks_data',
        ''
      );
    } else if (previewProps.title == 'Chi-square') {
      previewProps.OpenHelpWindow('wbasics', 'arranging_chi_square_data', '');
    } else if (previewProps.title == 'Chi-square...') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'determining_the_minimum_sample_size_for_a_chi_square_test',
        ''
      );
    } else if (previewProps.title == 'Principal Components') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_data_for_principal_components_analysis',
        ''
      );
    } else if (previewProps.title == 'Gehan-Breslow') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_gehan_breslow_survival_analysis_data',
        ''
      );
    } else if (previewProps.title == "McNemar's Test") {
      previewProps.OpenHelpWindow('wbasics', 'arranging_mcnemar_test_data', '');
    } else if (previewProps.title == 'One Way Repeated Measures ANOVA') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_one_way_repeated_measures_anova_data',
        ''
      );
    } else if (previewProps.title == 'Signed Rank Test') {
      previewProps.OpenHelpWindow('wbasics', 'arranging_signed_rank_data', '');
    } else if (previewProps.title == 'Paired T-test') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_paired_t_test_data',
        ''
      );
    } else if (previewProps.title == 'Rank Sum Test') {
      previewProps.OpenHelpWindow('wbasics', 'arranging_rank_sum_data', '');
    } else if (previewProps.title == 'Relative Risk') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_relative_risk_test_data',
        ''
      );
    } else if (previewProps.title == 'One-Sample Signed Rank Test') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_one_sample_signed_rank_test_data',
        ''
      );
    } else if (previewProps.title == 'LogRank') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_logrank_survival_analysis_data',
        ''
      );
    } else if (previewProps.title == 't test') {
      previewProps.OpenHelpWindow('wbasics', 'arranging_t_test_data', '');
    } else if (previewProps.title == 'Two Way Repeated Measures ANOVA') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'arranging_two_way_repeated_measures_anova_data',
        ''
      );
    } else if (previewProps.title == 'Proportional Hazards') {
      previewProps.OpenHelpWindow('wbasics', 'cox_regression', '');
    } else if (previewProps.title == 'Stratified Model') {
      previewProps.OpenHelpWindow('wbasics', 'cox_regression', '');
    } else if (previewProps.title == 'Gehan-Breslow') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'gehan_breslow_survival_analysis',
        ''
      );
    } else if (previewProps.title == 'Fisher Exact Test') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_fisher_exact_test',
        ''
      );
    } else if (previewProps.title == 'Multiple Linear') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_multiple_linear_regression',
        ''
      );
    } else if (previewProps.title == 'Multiple Logistic') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_multiple_logistic_regression',
        ''
      );
    } else if (previewProps.title == 'One Way ANOVA') {
      previewProps.OpenHelpWindow('wbasics', 'performing_a_one_way_anova', '');
    } else if (previewProps.title == 'Polynomial') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_polynomial_regression',
        ''
      );
    } else if (previewProps.title == 'Repeated Measures ANOVA On Ranks') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_repeated_measures_anova_on_ranks',
        ''
      );
    } else if (previewProps.title == 'Signed Rank Test') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_signed_rank_test',
        ''
      );
    } else if (previewProps.title == 'Linear') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_simple_linear_regression',
        ''
      );
    } else if (previewProps.title == 'Single Group') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_single_group_survival_analysis',
        ''
      );
    } else if (previewProps.title == 'Forward') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_stepwise_linear_regression',
        ''
      );
    } else if (previewProps.title == 'Backward') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_stepwise_linear_regression',
        ''
      );
    } else if (previewProps.title == 'LogRank') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_logrank_analysis',
        ''
      );
    } else if (previewProps.title == 'Three Way ANOVA') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_a_three_way_anova',
        ''
      );
    } else if (previewProps.title == 'Two Way ANOVA') {
      previewProps.OpenHelpWindow('wbasics', 'performing_a_two_way_anova', '');
    } else if (previewProps.title == 'z-test') {
      previewProps.OpenHelpWindow('wbasics', 'performing_a_z_test', '');
    } else if (previewProps.title == "McNemar's Test") {
      previewProps.OpenHelpWindow('wbasics', 'performing_mcnemar_s_test', '');
    } else if (previewProps.title == 'Odds Ratio') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_the_odds_ratio_test',
        ''
      );
    } else if (previewProps.title == 'Relative Risk') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'performing_the_relative_risk_test',
        ''
      );
    } else if (previewProps.title == 'Pearson Product Moment') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'pearson_product_moment_correlation',
        ''
      );
    } else if (previewProps.title == 'Spearman Rank Order') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'spearman_rank_order_correlation',
        ''
      );
    } else if (previewProps.title == 'One Way Frequency Tables') {
      previewProps.OpenHelpWindow(
        'wbasics',
        'running_the_frequency_table_test',
        ''
      );
    } else if (previewProps.title == 'One Sample t-test') {
      previewProps.OpenHelpWindow('wbasics', ' One_Sample_T_Test_Running', '');
    } else if (
      previewProps.title === 'Smoothers2D' ||
      previewProps.title === 'Smoothers3D'
    ) {
      previewProps.OpenHelpWindow('wbasics', 'smoother___select_data', '');
    } else if (
      previewProps.title === 'Smoothers2D' ||
      (previewProps.title === 'Smoothers3D' &&
        previewProps.content.stepType === 'GRAPHDATA')
    ) {
      previewProps.OpenHelpWindow(
        'wbasics',
        'smoother___select_columns_for_results',
        ''
      );
    } else if (previewProps.title == 'Normality') {
      previewProps.OpenHelpWindow('wbasics', ' testing_normality', '');
    }
  }, [previewProps.title, previewProps.content.stepType]);

  return (
    <>
      <div className="graphWizardCard ms-Grid">
        {/* <Label>{previewProps && previewProps.title + ' - Select Data'}</Label> */}
        {/* <div> */}
        <div className="wizardCard-preview1 ms-Grid-row">
          <div className=" preview1-image ms-Grid-col ms-sm6 ms-md4 ms-lg2">
            {previewProps.title == 'One-Sample Signed Rank Test' && (
              <span>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title == 'Linear' && (
              <span>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'Multiple Logistic' && (
              <span>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'Multiple Linear' && (
              <span>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'Polynomial' && (
              <span>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'Best Subset' && (
              <span>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'Normalize Ternary Data' && (
              <span>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.NormalizeTernaryDataWizardPreview2}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'Forward' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Forward' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select forced variables.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.ForwardStepWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Backward' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Backward' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select forced variables.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.ForwardStepWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.ClickedItem === 'XY Pair' &&
              previewProps.title === 'Deming' && (
                <span>
                  <Label>
                    Select the format for entering the data and errors
                  </Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.DemingPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.ClickedItem === 'XY Pair-Errors' &&
              previewProps.title === 'Deming' && (
                <span>
                  <Label>
                    Select the format for entering the data and errors
                  </Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.DemingPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Fisher Exact Test' &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Fisher Exact Test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'Fisher Exact Test' &&
              previewProps.ClickedItem === 'Tabulated Data' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'One Way Repeated Measures ANOVA' &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'One Way Repeated Measures ANOVA' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'One Way Repeated Measures ANOVA' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'Paired T-test' &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Paired T-test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'Paired T-test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'One Sample t-test' &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'One Sample t-test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </>
              )}

            {previewProps.title === 'One Sample t-test' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Deviation_Ttest}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'One Sample t-test' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Error_Ttest}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'BINOPTIONS' && (
                <span>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.HistogramPreview}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'SELECTGRAPHSTYLE' &&
              previewProps.ClickedItem === 'Vertical Bar' && (
                <span>
                  <Label>Select the style of graph you want to create</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Hist_Grph_Vert_Bar}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'SELECTGRAPHSTYLE' &&
              previewProps.ClickedItem === 'Horizontal Bar' && (
                <span>
                  <Label>Select the style of graph you want to create</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Hist_Grph_Hor_Bar}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'SELECTGRAPHSTYLE' &&
              previewProps.ClickedItem === 'Vertical Needle' && (
                <span>
                  <Label>Select the style of graph you want to create</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Hist_Grph_Vert_Needle}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'SELECTGRAPHSTYLE' &&
              previewProps.ClickedItem === 'Vertical Step' && (
                <span>
                  <Label>Select the style of graph you want to create</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Hist_Grph_Vert_Step}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'SELECTGRAPHSTYLE' &&
              previewProps.ClickedItem === 'Horizontal Needle' && (
                <span>
                  <Label>Select the style of graph you want to create</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Hist_Grph_Hor_Needle}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'SELECTGRAPHSTYLE' &&
              previewProps.ClickedItem === 'Horizontal Step' && (
                <span>
                  <Label>Select the style of graph you want to create</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Hist_Grph_Hor_Step}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'SELECTGRAPHSTYLE' &&
              previewProps.ClickedItem === 'None' && (
                <span>
                  <Label>Select the style of graph you want to create</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Hist_Grph_None}
                    width="200px"
                    height="200px"
                  />
                </span>
              )}

            {(previewProps.title === 'Smoothers2D' ||
              previewProps.title === 'Smoothers3D') && (
                <span>
                  {previewProps.content.stepType === 'OUTPUTOPTIONS' && (
                    <Label>Select the columns for your results</Label>
                  )}
                  {previewProps.content.stepType === 'GRAPHDATA' && (
                    <Label>Select the columns for your graphs </Label>
                  )}
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem !== 'Raw' &&
              previewProps.ClickedItem !== 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Raw_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Raw_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Indexed_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}

            {previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LinearWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </>
              )}
            {previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Group') ? (
              <>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </>
            ) : previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Data' ? (
              <>
                <Label>Select data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Two_anova}
                  width="224px"
                  height="128px"
                />
              </>
            ) : (
              ''
            )}

            {previewProps.title === 't test' &&
              previewProps.ClickedItem !== 'Raw' &&
              previewProps.ClickedItem !== 'Indexed' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Deviation' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Raw_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Raw_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Indexed_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Deviation_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Error_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}

            {previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem !== 'Raw' &&
              previewProps.ClickedItem !== 'Indexed' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Deviation' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Raw_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Raw_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Indexed_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Deviation_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <span>
                <Label>Select the format of your data</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Error_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}

            {previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == null ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == 'Factory A' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == 'Factory B' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == 'Data' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Two_anova}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}
            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Raw' && (
                <span>
                  <Label>Select data by clicking worksheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Two_anova}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {/* one way anova Indexed */}
            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              (previewProps.dataSelection == 'Group' ||
                previewProps.dataSelection == null) ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.dataSelection == 'Data' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Two_anova}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}

            {/* one anova Standard dev. */}
            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              (previewProps.dataSelection == 'Mean' ||
                previewProps.dataSelection == null) ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Mean}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.dataSelection == 'Size' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Size}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.dataSelection == 'Standard Dev.' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Dev}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}
            {/* one anova Error. */}

            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              (previewProps.dataSelection == 'Mean' ||
                previewProps.dataSelection == null) ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Mean}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.dataSelection == 'Size' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Size}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.dataSelection == 'Standard Error' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.StandardError}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}
            {/* //Three way anova */}
            {previewProps.title === 'Three Way ANOVA' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Factor A' ||
                previewProps.dataSelection == 'Factor B' ||
                previewProps.dataSelection == 'Factor C') ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'Three Way ANOVA' &&
              previewProps.dataSelection == 'Data' ? (
              <span>
                <Label>Select data by clicking worksheet columns</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Two_anova}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}

            {/* For anova on ranks */}
            {previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem === 'Raw' ||
                previewProps.ClickedItem === 'XY Pair') ? (
              <span>
                <Label>Select the format of your data.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Raw_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem === 'Indexed' ? (
              <span>
                <Label>Select the format of your data.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Indexed_Ttest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}
            {previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Raw' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Two_anova}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Factor') ? (
              <span>
                <Label>Select the data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.dataSelection == 'Data' ? (
              <span>
                <Label>Select the data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.Two_anova}
                  width="224px"
                  height="128px"
                />
              </span>
            ) : (
              ''
            )}
            {/* one way ANCOVA */}

            {previewProps.title === 'One Way ANCOVA' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.one_way_anocova}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Descriptive Statistics' && (
              <span>
                <Label>Select the data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'One Way Frequency Tables' && (
              <span>
                <Label>Select the data by clicking worksheet columns.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.OddsRatioSelectDataRaw}
                  width="224px"
                  height="128px"
                />
              </span>
            )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem === 'Raw' ||
                previewProps.ClickedItem === 'XY Pair') && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem === 'Indexed' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Indexed_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Two_anova}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'z-test' &&
              (previewProps.dataSelection === 'Size' ||
                previewProps.dataSelection === null) && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Size}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'z-test' &&
              previewProps.dataSelection === 'Proportion' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.prop}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem == 'XY Pair' ||
                previewProps.ClickedItem == 'Raw') && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioSelectDataRaw}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioSelectDataTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem == 'XY Pair' ||
                previewProps.ClickedItem == 'Raw') && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioSelectDataRaw}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioSelectDataTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem == 'XY Pair' ||
                previewProps.ClickedItem == 'OddRatio Raw') && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Raw_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'OddRatio TabulatedData' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'OddRatio Raw' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioSelectDataRaw}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'OddRatio TabulatedData' && (
                <span>
                  <Label>Select the data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioSelectDataTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'XY Pair' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.ForwardStepWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Raw' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.ForwardStepWizardPreview}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatioSelectDataTabulatedData}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {/* srikanth code */}

            {previewProps.title === 'Pearson Product Moment' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select Data By Clicking worketSheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.PersonProductMoment}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Spearman Rank Order' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns </Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SpearmanRankOrder}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Normality' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Normality}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Principal Components' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select Data by clicking worketSheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.PrincipalComponents}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Principal Components' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select a column of observation labels </Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.PrincipalComponents}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Single Group' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking workSheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Proportional Hazards' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking workSheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Proportional Hazards' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select the categorical covariates</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Stratified Model' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking workSheet columns</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Stratified Model' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select the categorical covariates</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'LogRank' &&
              previewProps.stepId != 93 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your data</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LogRaw}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'LogRank' &&
              previewProps.stepId != 93 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'LogRank' &&
              previewProps.stepId == 93 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your data</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LogIndexed}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'LogRank' &&
              previewProps.stepId == 93 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'LogRank' &&
              previewProps.stepId == 93 &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select groups for analysis</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LogGrouped}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId != 95 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your data</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LogRaw}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <span>
                  <Label>Select the format of your datak</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LogIndexed}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId != 95 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select groups for analysis</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LogGrouped}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'XY Pair' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatiokRaw}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Raw' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.OddsRatiokRaw}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Indexed' && (
                <span>
                  <Label>Select the format of your data.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Indexed_Ttest}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}

            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'XY Pair' && (
                <span>
                  <Label>Select data by clicking the worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Two_anova}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' && (
                <span>
                  <Label>Select data by clicking the worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Two_anova}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Indexed' && (
                <span>
                  <Label>Select data by clicking the worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.Two_anova}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {/* {previewProps.dataSelection}
             {previewProps.title === "Two Way Repeated Measures ANOVA" && previewProps.content.stepType === "DATASELECTION" && 
              <span>
                <Label>Select the subject column.</Label>
                <Image alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            } */}
            {/* {previewProps.title === "Two Way Repeated Measures ANOVA" && previewProps.content.stepType === "DATASELECTION"  && 
              <span>
                <Label>Select the first factor column.</Label>
                <Image alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </span>
            } */}

            {previewProps.title === 'Two Way Repeated Measures ANOVA' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Subject') ? (
              <>
                <Label>Select the subject column.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </>
            ) : previewProps.title === 'Two Way Repeated Measures ANOVA' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Factor A' ? (
              <>
                <Label>Select the first factor column.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </>
            ) : previewProps.title === 'Two Way Repeated Measures ANOVA' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Factor B' ? (
              <>
                <Label>Select the second factor column.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.RankedSumTest}
                  width="224px"
                  height="128px"
                />
              </>
            ) : previewProps.title === 'Two Way Repeated Measures ANOVA' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Data' ? (
              <>
                <Label>Select the raw data column then click Finish.</Label>
                <Image
                  alt="ribbon-icon"
                  className="ribbon-icon-svg"
                  src={ConstantFunc.LinearWizardPreview}
                  width="224px"
                  height="128px"
                />
              </>
            ) : (
              ''
            )}

            {/* {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>Select data by clicking worksheet columns.</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.SingleGroup}
                    width="224px"
                    height="128px"
                  />
                </span>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <span>
                  <Label>Select groups for analysis</Label>
                  <Image
                    alt="ribbon-icon"
                    className="ribbon-icon-svg"
                    src={ConstantFunc.LogGrouped}
                    width="224px"
                    height="128px"
                  />
                </span>
              )} */}
          </div>
          <div className=" preview1-label ms-Grid-col ms-sm6 ms-md8 ms-lg10">
            {previewProps.title === 'One-Sample Signed Rank Test' &&
              previewProps.content.stepType !== 'MEDIAN' && (
                <Label>Select the raw data column.</Label>
              )}
            {previewProps.content.stepType !== 'DATASELECTIONSTEPWISE' &&
              previewProps.content.stepType !== 'SCALETYPE' && (
                <Label>{previewProps && previewProps.wizardImageData}</Label>
              )}
            {previewProps.title === 'One-Sample Signed Rank Test' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <Label>Pick the variables(s) to always use in the model.</Label>
              )}
            {previewProps.ClickedItem === 'XY Pair' &&
              previewProps.title === 'Deming' &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <Label>
                  Observations are selected from two columns.Enter here a
                  standard deviation for all x-data and a standard deviation for
                  all y-data.
                </Label>
              )}
            {previewProps.ClickedItem === 'XY Pair-Errors' &&
              previewProps.title === 'Deming' &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <Label>
                  Observations are selected from two columns.Standard deviations
                  for each observation are selected from the worksheet.
                </Label>
              )}
            {previewProps.title === 'Deming' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>Select the column for the X data</Label>
              )}
            {previewProps.title === 'Normalize Ternary Data' &&
              previewProps.content.stepType === 'SCALETYPE' && (
                <Label>
                  Select the scale for which you would like to normalize the
                  data.
                </Label>
              )}
            {previewProps.title === 'Histogram' &&
              previewProps.content.stepType === 'BINOPTIONS' && (
                <Label>
                  Enter the number of bins to use. Select the normalization for
                  bin counts and which bin edge to include with each bin.
                </Label>
              )}
            {previewProps.title === 'Histogram' && 
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection === "" || previewProps.dataSelection === 'Source')
              && (
                <Label>
                  Select the column to analyze by clicking the column
                  in the worksheet.
                </Label>
              )             
            }
            {previewProps.title === 'Histogram' && 
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection === 'Output'
              && (
                <Label>
                  Select the column for the bin centers by clicking the column in the worksheet.
                </Label>
              )}
            {(previewProps.title === 'Smoothers2D' ||
              previewProps.title === 'Smoothers3D') &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  Select the input data for smoothing by clicking the columns in
                  the worksheet
                </Label>
              )}
            {(previewProps.title === 'Smoothers2D' ||
              previewProps.title === 'Smoothers3D') &&
              previewProps.content.stepType === 'GRAPHDATA' && (
                <Label>
                  Clicking on a worksheet columns selects that column
                </Label>
              )}
            {previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem !== 'Raw' &&
              previewProps.ClickedItem !== 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The raw data format uses separate worksheet columns for the data
                in each group.
              </Label>
            ) : previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The raw data format uses separate worksheet columns for the data
                in each group.
              </Label>
            ) : previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The indexed data format places groups or treatments in a factor
                column and the datapoints in a second column.
              </Label>
            ) : (
              ''
            )}
            {previewProps.title === 't test' &&
              previewProps.ClickedItem !== 'Raw' &&
              previewProps.ClickedItem !== 'Indexed' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Deviation' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The raw data format uses separate worksheet columns for the data
                in each group.
              </Label>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The raw data format uses separate worksheet columns for the data
                in each group.
              </Label>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The indexed data format places groups or treatments in a factor
                column and the datapoints in a second column.
              </Label>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The MSD format places the mean,sample,size and std.dev. in
                separate worksheet columns.
              </Label>
            ) : previewProps.title === 't test' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The MSE format places the mean,sample,size and std.dev. in
                separate worksheet columns.
              </Label>
            ) : (
              ''
            )}

            {previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem !== 'Raw' &&
              previewProps.ClickedItem !== 'Indexed' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Deviation' &&
              previewProps.ClickedItem !== 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The raw data format uses separate worksheet columns for the data
                in each group.
              </Label>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Raw' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The raw data format uses separate worksheet columns for the data
                in each group.
              </Label>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The indexed data format places groups or treatments in a factor
                column and the datapoints in a second column.
              </Label>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The MSD format places the mean,sample,size and std.dev. in
                separate worksheet columns.
              </Label>
            ) : previewProps.title === 'One Way ANOVA' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.content.stepType !== 'DATASELECTION' ? (
              <Label>
                The MSE format places the mean,sample,size and std.dev. in
                separate worksheet columns.
              </Label>
            ) : (
              ''
            )}
            {previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == null ? (
              <Label>Select the first factor column</Label>
            ) : previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == 'Factory A' ? (
              <Label>Select the first factor column</Label>
            ) : previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == 'Factory B' ? (
              <Label>Select the second factor column</Label>
            ) : previewProps.title === 'Two Way ANOVA' &&
              previewProps.dataSelection == 'Data' ? (
              <Label>Select the raw data then click finish.</Label>
            ) : (
              ''
            )}
            {/* one way anova raw */}
            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Raw' && (
                <Label>
                  Select a raw data column for each group then click finish
                </Label>
              )}

            {/* one way anova Indexed */}
            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              (previewProps.dataSelection == 'Group' ||
                previewProps.dataSelection == null) ? (
              <Label>Select the factor column</Label>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.dataSelection == 'Data' ? (
              <Label>Select the raw data column then click Finish.</Label>
            ) : (
              ''
            )}

            {/* one way anova standard dev */}

            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              (previewProps.dataSelection == 'Mean' ||
                previewProps.dataSelection == null) ? (
              <Label>
                Select the column containing the means for each group.
              </Label>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.dataSelection == 'Size' ? (
              <Label>
                Select the column containing the sample sizes for each group.
              </Label>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Deviation' &&
              previewProps.dataSelection == 'Standard Dev.' ? (
              <Label>
                Select the column containing the standard deviations for each
                group.
              </Label>
            ) : (
              ''
            )}

            {/* one way anova standard error */}
            {(previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              (previewProps.dataSelection == 'Mean' ||
                previewProps.dataSelection == null) ? (
              <Label>
                Select the column containing the means for each group.
              </Label>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.dataSelection == 'Size' ? (
              <Label>
                Select the column containing the sample sizes for each group.
              </Label>
            ) : (previewProps.title === 'One Way ANOVA' ||
              previewProps.title === 't test') &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Mean,Size,Standard Error' &&
              previewProps.dataSelection == 'Standard Error' ? (
              <Label>
                Select the column containing the standard errors for each group.
              </Label>
            ) : (
              ''
            )}

            {/* //Three way anova */}

            {previewProps.title === 'Three Way ANOVA' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Factor A') ? (
              <Label>Select the first factor column</Label>
            ) : previewProps.title === 'Three Way ANOVA' &&
              previewProps.dataSelection == 'Factor B' ? (
              <Label>Select the second factor column</Label>
            ) : previewProps.title === 'Three Way ANOVA' &&
              previewProps.dataSelection == 'Factor C' ? (
              <Label>Select the third factor column</Label>
            ) : previewProps.title === 'Three Way ANOVA' &&
              previewProps.dataSelection == 'Data' ? (
              <Label>Select the raw data then click Finish.</Label>
            ) : (
              ''
            )}
            {/* Anova on ranks */}
            {previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem === 'Raw' ||
                previewProps.ClickedItem === 'XY Pair') ? (
              <Label>
                The raw data format uses separate worksheet columns for the data
                in each group.
              </Label>
            ) : previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem === 'Indexed' ? (
              <Label>
                The indexed data format places groups or treatments in a factor
                column and the datapoints in a second column.
              </Label>
            ) : (
              ''
            )}
            {previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Raw' && (
                <Label>
                  Select a raw data column for each group then click Finish.
                </Label>
              )}
            {previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Factor') ? (
              <Label>Select the factor column.</Label>
            ) : previewProps.title === 'ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.dataSelection == 'Data' ? (
              <Label>Select the raw data column then click Finish.</Label>
            ) : (
              ''
            )}
            {previewProps.title === 'One Way ANCOVA' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Factor') ? (
              <Label>
                Select the factor column containing the treatment groups.
              </Label>
            ) : previewProps.title === 'One Way ANCOVA' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Dependent' ? (
              <Label>Select the dependent variable column.</Label>
            ) : previewProps.title === 'One Way ANCOVA' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection == 'Covariate' ||
                previewProps.dataSelection == 'Covariate1') ? (
              <Label>
                Select a column for each covariate variable then click Finish.
              </Label>
            ) : (
              ''
            )}
            {previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection == null ||
                previewProps.dataSelection == 'Group') ? (
              <>
                <Label>Select the factor column.</Label>
              </>
            ) : previewProps.title === 'Rank Sum Test' &&
              previewProps.ClickedItem === 'Indexed' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Data' ? (
              <>
                <Label>Select the raw data column then click Finish.</Label>
              </>
            ) : (
              ''
            )}

            {previewProps.title === 'Pearson Product Moment' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label></Label>
              )}
            {previewProps.title === 'Spearman Rank Order' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label></Label>
              )}
            {previewProps.title === 'Normality' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label></Label>
              )}
            {previewProps.title === 'Principal Components' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  Select at least two data columns, one for each variable
                </Label>
              )}
            {previewProps.title === 'Principal Components' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <Label>
                  Optionally select a single column of observation labels to use
                  in reports and graphs
                </Label>
              )}
            {previewProps.title === 'Single Group' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  Select columns containing data for time and status.
                </Label>
              )}
            {previewProps.title === 'Proportional Hazards' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  Select columns for time, status, and covariates (risk factor)
                </Label>
              )}
            {previewProps.title === 'Proportional Hazards' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <Label>
                  Select those covarites from the drop-down list that are
                  categorical. The remaining covariates are continuous.
                </Label>
              )}
            {previewProps.title === 'Stratified Model' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  Select columns for time, status, and covariates (risk factor).
                  Each stratum has its own baseline survival curve.
                </Label>
              )}
            {previewProps.title === 'Stratified Model' &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <Label>
                  Select those covarites from the drop-down list that are
                  categorical. The remaining covariates are continuous.
                </Label>
              )}

            {previewProps.title === 'LogRank' &&
              previewProps.stepId != 93 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <Label>
                  The raw data format uses separate worksheet columns for the
                  data in each grioup.
                </Label>
              )}
            {previewProps.title === 'LogRank' &&
              previewProps.stepId != 93 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  select columns containing data for time, and status
                </Label>
              )}

            {previewProps.title === 'LogRank' &&
              previewProps.stepId == 93 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <Label>
                  The indexed data format places multi-group survival data in
                  three columns
                </Label>
              )}
            {previewProps.title === 'LogRank' &&
              previewProps.stepId == 93 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>select columns for group, time, and status</Label>
              )}

            {previewProps.title === 'LogRank' &&
              previewProps.stepId == 93 &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <Label>
                  Use the drop-down list to pick at least two groups to be
                  analyzed and compared
                </Label>
              )}

            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId != 95 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <Label>
                  The raw data format uses separate worksheet columns for the data in each group.
                </Label>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId != 95 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  select columns containing data for time and status.
                </Label>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATAFORMAT' && (
                <Label>
                  The indexed data format places multi-group survival data in
                  three columns.
                </Label>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>select columns for group, time, and status</Label>
              )}
            {previewProps.title === 'Gehan-Breslow' &&
              previewProps.stepId == 95 &&
              previewProps.content.stepType === 'DATASELECTIONSTEPWISE' && (
                <Label>
                  Use the drop-down list to pick at least two groups to be
                  analyzed and compared
                </Label>
              )}
            {previewProps.title === 'Descriptive Statistics' && (
              <Label>
                Select the column(s) for which you want basic statistics
              </Label>
            )}
            {previewProps.title === 'One Way Frequency Tables' && (
              <Label>Select the column(s) to examine data frequency.</Label>
            )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem === 'Raw' ||
                previewProps.ClickedItem === 'XY Pair') && (
                <Label>
                  The raw data format uses separate worksheet columns for the
                  data in each group.
                </Label>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem === 'Indexed' && (
                <Label>
                  The indexed data format places groups or treatments in a
                  factor column and the datapoints in a second column
                </Label>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection == 'Data' ||
                previewProps.dataSelection == null) &&
              previewProps.ClickedItem === 'Raw' && (
                <Label>Select the first raw data column.</Label>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Data1' &&
              previewProps.ClickedItem === 'Raw' && (
                <Label>
                  Select the second raw data column then click Finish.
                </Label>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              (previewProps.dataSelection == 'Subject' ||
                previewProps.dataSelection == null) &&
              previewProps.ClickedItem === 'Indexed' && (
                <Label>Select the subject column.</Label>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Treatment' &&
              previewProps.ClickedItem === 'Indexed' && (
                <Label>Select the factor or treatment column.</Label>
              )}
            {previewProps.title === 'Signed Rank Test' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.dataSelection == 'Data' &&
              previewProps.ClickedItem === 'Indexed' && (
                <Label>Select the raw data column then click Finish.</Label>
              )}
            {previewProps.title === 'z-test' &&
              (previewProps.dataSelection === 'Size' ||
                previewProps.dataSelection === null) && (
                <Label>Select the column containing the two sample size.</Label>
              )}
            {previewProps.title === 'z-test' &&
              previewProps.dataSelection === 'Proportion' && (
                <Label>
                  Select the column containing the corresponding proportions
                  then click Finish.
                </Label>
              )}

            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem == 'XY Pair' ||
                previewProps.ClickedItem == 'Raw') && (
                <Label>
                  The raw data format uses separate worksheet columns for the
                  data in each group.
                </Label>
              )}

            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <Label>
                  Tabulated Data is arranged in a contingency table showing the
                  number of observations for each cell.
                </Label>
              )}

            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' &&
              (previewProps.dataSelection === null ||
                previewProps.dataSelection === 'Category 1') && (
                <Label>
                  Select the column containing the category or group
                  identifiers.
                </Label>
              )}
            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' &&
              previewProps.dataSelection === 'Category 2' && (
                <Label>
                  Select the corresponding category column then click Finish.
                </Label>
              )}

            {previewProps.title === "McNemar's Test" &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <Label>
                  Select the column(s) containing observations for each group or
                  category.
                </Label>
              )}

            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem == 'XY Pair' ||
                previewProps.ClickedItem == 'Raw') && (
                <Label>
                  The raw data format uses separate worksheet columns for the
                  data in each group.
                </Label>
              )}

            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <Label>
                  Tabulated Data is arranged in a contingency table showing the
                  number of observations for each cell.
                </Label>
              )}

            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' &&
              (previewProps.dataSelection === null ||
                previewProps.dataSelection === 'Event') && (
                <Label>
                  Select the column containing the category or event
                  identifiers.
                </Label>
              )}
            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' &&
              previewProps.dataSelection === 'Group' && (
                <Label>
                  Select the corresponding category column then click Finish.
                </Label>
              )}

            {previewProps.title === 'Relative Risk' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Tabulated Data' &&
              (previewProps.dataSelection === 'Event' ||
                previewProps.dataSelection === null ||
                previewProps.dataSelection === 'No Event') && (
                <Label>
                  Select the column(s) containing observations for each group or
                  category.
                </Label>
              )}
            {previewProps.title === 'Chi-square...' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <Label>
                  Select the columns containing observations for each group or
                  category.
                </Label>
              )}

            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              (previewProps.ClickedItem == 'XY Pair' ||
                previewProps.ClickedItem == 'OddRatio Raw') && (
                <Label>
                  The raw data format uses separate worksheet columns for the
                  data in each group.
                </Label>
              )}

            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'OddRatio TabulatedData' && (
                <Label>
                  Tabulated Data is arranged in a contingency table showing the
                  number of observations for each cell.
                </Label>
              )}

            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'OddRatio Raw' &&
              (previewProps.dataSelection === null ||
                previewProps.dataSelection === 'Event') && (
                <Label>
                  Select the column containing the category or event
                  identifiers.
                </Label>
              )}
            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'OddRatio Raw' &&
              previewProps.dataSelection === 'Group' && (
                <Label>
                  Select the corresponding category column then click Finish.
                </Label>
              )}

            {previewProps.title === 'Odds Ratio' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'OddRatio TabulatedData' &&
              (previewProps.dataSelection === 'Event' ||
                previewProps.dataSelection === null ||
                previewProps.dataSelection === 'No Event') && (
                <Label>
                  Select the column(s) containing observations for each group or
                  category.
                </Label>
              )}
            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'XY Pair' && (
                <Label>
                  The raw data format uses separate worksheet columns for the
                  data in each group
                </Label>
              )}
            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Raw' && (
                <Label>
                  The raw data format uses separate worksheet columns for the
                  data in each group
                </Label>
              )}
            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Tabulated Data' && (
                <Label>
                  Tabulated data is arranged in a contingency table showing the
                  number of observations for each cell.
                </Label>
              )}
            {previewProps.title === 'Chi-square' &&
              previewProps.content.stepType === 'DATASELECTION' && (
                <span>
                  <Label>
                    Select the corresponding category column then click Finish.
                  </Label>
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'XY Pair' && (
                <span>
                  <Label>
                    The raw data format uses separate worksheet columns for the
                    data in each group.
                  </Label>
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Raw' && (
                <span>
                  <Label>
                    The raw data format uses separate worksheet columns for the
                    data in each group.
                  </Label>
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATAFORMAT' &&
              previewProps.ClickedItem == 'Indexed' && (
                <span>
                  <Label>
                    The indexed data format places groups or treatments in a
                    factor column and the datapoints in a second column.
                  </Label>
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'XY Pair' && (
                <span>
                  <Label>
                    Select a raw data column for each group then click Finish.
                  </Label>
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Raw' && (
                <span>
                  <Label>
                    Select a raw data column for each group then click Finish.
                  </Label>
                </span>
              )}
            {previewProps.title === 'Repeated Measures ANOVA On Ranks' &&
              previewProps.content.stepType === 'DATASELECTION' &&
              previewProps.ClickedItem == 'Indexed' && (
                <span>
                  <Label>
                    Select a raw data column for each group then click Finish.
                  </Label>
                </span>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  console.log(state, 'state in wizard preview');
  return {
    dataSelection: state.instanceReducer.dataSelection,
  };
}
const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    OpenHelpWindow: (
      RibbonMenu: string,
      selectedElement: string,
      selectedItem: string
    ) =>
      dispatch(
        actionCreators.setHelpWindowOpen(
          RibbonMenu,
          selectedElement,
          selectedItem
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WizardPreview);
