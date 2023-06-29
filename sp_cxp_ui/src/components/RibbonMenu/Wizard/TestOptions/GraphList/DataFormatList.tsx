export const XYpair = "XYpair";
export const SingleX = "SingleX";
export const SingleY = "SingleY";
export const XManyY = "XManyY";
export const YManyX = "YManyX";
export const ManyX = "ManyX";
export const ManyY = "ManyY";
export const XCategory = "XCategory";
export const YCategory = "YCategory";
export const XYCategory = "XYCategory";
export const XYpairs = "XYpairs";
export const YXpairs = "YXpairs";
export const XYReplicate = "XYReplicate";
export const YReplicate = "YReplicate";
export const XManyYReplicate = "XManyYReplicate";
export const ManyYReplicate = "ManyYReplicate";
export const CategoryY = "CategoryY";
export const CategoryX = "CategoryX";
export const ThetaR = "ThetaR";
export const ThetaManyR = "ThetaManyR";
export const RManyTheta = "RManyTheta";
export const ManyR = "ManyR";
export const ManyTheta = "ManyTheta";
export const LabelManySeries = "LabelManySeries";
export const ManyLabel = "ManyLabel";
export const ManySeries = "ManySeries";
export const LabelManySeriesError = "LabelManySeriesError";
export const ManySeriesError = "ManySeriesError";
export const YXpair = "YXpair";
export const YXReplicate = "YXReplicate";
export const YManyXReplicate = "YManyXReplicate";
export const CategoryManyY = "CategoryManyY";
export const CategoryManyX = "CategoryManyX";
export const XYZTriplet = "XYZTriplet";
export const ManyZ = "ManyZ";
export const XYManyZ = "XYManyZ";
export const TernaryTriplets = "TernaryTriplets";
export const TernaryXYPairs = "TernaryXYPairs";
export const TernaryYZPairs = "TernaryYZPairs";
export const TernaryXZPairs = "TernaryXZPairs";
export const SingleColumn = "SingleColumn";
export const ManyXReplicate = "ManyXReplicate";
export const XYXY = "XYXY";
export const XYAM = "XYAM";
export const DifferencesData="DifferencesData";
export const RatiosData="RatiosData";
export const XBarpair = "XBarpair";
export const XSetError = "XSetError";
export const ManyXYError = "ManyXYError";


export const Raw = "Raw";
export const Mean = "Mean";
export const MeanError = "MeanError";
export const Indexed = "Indexed";
export const TabulatedData = "TabulatedData";
export const Descriptive = "Descriptive";
export const Frequency = "Frequency";
export const One_Sample_Ranked_Test = "One_Sample_Ranked_Test";
export const Two_way_anova = "Two_way_anova";
export const Three_way_anova = "Three_way_anova";
export const One_Way_ANCOVA = "One_Way_ANCOVA";
export const Two_Way_Repeated_Measures_ANOVA = "Two_Way_Repeated_Measures_ANOVA";
export const z_test = "z_test";
export const Raw_chi_square = "Raw_chi_square";
export const Raw_Relative_Risk = "Raw_Relative_Risk";
export const Raw_t_test = "Raw_t_test";
export const Raw_Sumed_Test = "Raw_Sumed_Test";
export const Raw_One_Way_Anova = "Raw_One_Way_Anova";
export const Indexed_Anova_Rank = "Indexed_Anova_Rank";
export const Raw_Fischer_Exact = "Raw_Fischer_Exact";
export const Tabulated_Fischer_Exact = "Tabulated_Fischer_Exact";
export const Raw_Paired_t_test = "Raw_Paired_t_test";
export const Indexed_Paired_T_Test = "Indexed_Paired_T_Test";
export const Indexed_One_Way_Repeated_Anova = "Indexed_One_Way_Repeated_Anova";
export const Tabulated_Data_Relative_Risk = "Tabulated_Data_Relative_Risk";
export const Tabulated_Data_Chi_Square = "Tabulated_Data_Chi_Square";
export const Linear_Regression = "Linear_Regression";
export const Multiple_Logistic = "Multiple_Logistic";
export const Multiple_Linear = "Multiple_Linear";
export const Polynomial_Regression = "Polynomial_Regression";
export const Forward_Stepwise = "Forward_Stepwise";
export const Forward_Stepwise_Var = "Forward_Stepwise_Var";
export const Backward_Stepwise = "Backward_Stepwise";
export const Backward_Stepwise_Var = "Backward_Stepwise_Var";
export const Best_Subset_Regression = "Best_Subset_Regression";
export const Deming_Regression_XY_Pair = "Deming_Regression_XY_Pair";
export const Deming_Regression_XY_Pair_Errors = "Deming_Regression_XY_Pair_Errors";
export const Normalize_Ternary_Data = "Normalize_Ternary_Data";
export const Histogram = "Histogram";
export const Smoothers2D = "Smoothers2D";
export const Smoothers3D = "Smoothers3D";

//srikanth new code added
export const OddRatioRaw = 'OddRatioRaw';
export const OddRatioTabulatedData = "OddRatioTabulatedData";
export const PrincipalComponentsVariable = "PrincipalComponentsVariable";
export const CorrelationPersonProductMoment = "CorrelationPersonProductMoment";
export const CorrelationSpearmanRankOrder = "CorrelationSpearmanRankOrder";

export const ProportionalHazards = 'ProportionalHazards';
export const ProportionalHazardsLabel = 'ProportionalHazardsLabel';
export const StratifiedModel = 'StratifiedModel';
export const StratifiedModelLabel = 'StratifiedModelLabel';

export const SingleGroup = 'SingleGroup';

export const Normality = 'Normality';

export const LogRankRaw = 'LogRankRaw';
export const LogRankIndexed = 'LogRankIndexed';
export const GehanBreslowRaw = 'GehanBreslowRaw';
export const GehanBreslowIndexed = 'GehanBreslowIndexed';
export const LogRankIndexedLabel = 'LogRankIndexedLabel';
export const GehanBreslowIndexedLabel = 'GehanBreslowIndexedLabel';
export const Raw_Signed_Rank_test = "Raw_Signed_Rank_test";
export const Indexed_Signed_Rank_test = "Indexed_Signed_Rank_test";
export const Raw_Repeated_Measures_Anova_Ranks = "Raw_Repeated_Measures_Anova_Ranks";


export const Chisquare = 'Chisquare';


export const typeList =
  [
    { id: "50", value: "Raw", title: "Raw" },
    { id: "51", value: "Indexed", title: "Indexed" },
    { id: "52", value: "Mean", title: "Mean,Size,Standard Deviation" },
    { id: "53", value: "MeanError", title: "Mean,Size,Standard Error" },
    { id: "54", value: "TabulatedData", title: "Tabulated Data" },
    { id: "55", value: "Descriptive", title: "Descriptive Data" },
    { id: "56", value: "Frequency", title: "One way frequency table" },
    { id: "57", value: "Two_way_anova", title: "Two Way ANOVA" },
    { id: "58", value: "One_Sample_Ranked_Test", title: "One Sample Ranked Test" },
    { id: "59", value: "Three_way_anova", title: "Three way anova" },
    { id: "60", value: "One_Way_ANCOVA", title: "One Way ANCOVA" },
    { id: "61", value: "Two_Way_Repeated_Measures_ANOVA", title: "Two Way Repeated Measures ANOVA" },
    { id: "62", value: "z_test", title: "z-test" },
    { id: "63", value: "Raw_chi_square", title: "Raw" },
    { id: "64", value: "Raw_Relative_Risk", title: "Raw" },
    { id: "65", value: "Tabulated_Data_Relative_Risk", title: "Tabulated Data" },
    { id: "66", value: "Raw_t_test", title: "Raw" },
    { id: "67", value: "Raw_Sumed_Test", title: "Raw" },
    { id: "68", value: "Raw_One_Way_Anova", title: "Raw" },
    { id: "69", value: "Indexed_Anova_Rank", title: "Indexed" },
    { id: "70", value: "Indexed_Paired_T_Test", title: "Indexed" },
    { id: "71", value: "Indexed_One_Way_Repeated_Anova", title: "Indexed" },
    { id: "72", value: "Tabulated_Data_Chi_Square", title: "Tabulated Data" },
    { id: "73", value: "Linear_Regression", title: "Linear Regression" },
    { id: "74", value: "Multiple_Logistic", title: "Multiple Logistic Regression" },
    { id: "75", value: "Multiple_Linear", title: "Multiple Linear Regression" },
    { id: "76", value: "Polynomial_Regression", title: "Polynomial Regression" },
    { id: "77", value: "Forward_Stepwise", title: "Forward Stepwise Regression" },
    { id: "78", value: "Forward_Stepwise_Var", title: "Forward Stepwise Regression Var" },
    { id: "79", value: "Backward_Stepwise", title: "Backward Stepwise Regression" },
    { id: "80", value: "Backward_Stepwise_Var", title: "Backward Stepwise Regression Var" },
    { id: "81", value: "Best_Subset_Regression", title: "Best Subset Regression" },
    { id: "83", value: "Deming_Regression_XY_Pair", title: "XY Pair" },
    { id: "84", value: "Deming_Regression_XY_Pair_Errors", title: "XY Pair-Errors" },
    { id: "85", value: "Normalize_Ternary_Data", title: "Normalize Ternary Data" },
    { id: "100", value: "Histogram", title: "Histogram" },
    { id: "101", value: "Smoothers2D", title: "Smoothers2D" },
    { id: "102", value: "Smoothers3D", title: "Smoothers3D" },
    { id: "103", value: "Raw_Signed_Rank_test", title: "Raw" },
    { id: "104", value: "Indexed_Signed_Rank_test", title: "Indexed" },
    { id: "112", value: "Raw_Paired_t_test", title: "Raw" },
    { id: "113", value: "Raw_Fischer_Exact", title: "Raw" },
    { id: "114", value: "Tabulated_Fischer_Exact", title: "Tabulated Data" },
    

     //srikanth new code added
     {id: "86", value:"OddRatioRaw", title: "OddRatio Raw"},
     {id: "87", value:"OddRatioTabulatedData", title: "OddRatio TabulatedData"},
   
     {id: "88", value:"PrincipalComponentsVariable", data_value: 'principalLabel', title: "Principal ComponentsVariable"},
     {id: "89", value:"CorrelationPersonProductMoment", title: "CorrelationPersonProductMoment"},
     {id: "91", value:"SingleGroup", title: "Single Group"},
     {id: "92", value:"LogRankRaw", title:"LogRank Raw"},
     {id: "93", value:"LogRankIndexed", title:"LogRank Indexed"},
   
     {id: "94", value:"GehanBreslowRaw", title:"GehanBreslow Raw"},
     {id: "95", value:"GehanBreslowIndexed", title:"GehanBreslow Indexed"},
     {id: "96", value:"ProportionalHazards", data_value: 'ProportionalHazardsLabel', title: "Proportional Hazards"},
     {id: "97", value:"StratifiedModel", data_value: 'StratifiedModelLabel', title: "Stratified Model"},
     {id: "98", value:"Normality", title:"Normality"},

     { id: "105", value: "Histogram_Vertical_Bar", title: "Vertical Bar" },
     { id: "106", value: "Histogram_Horizontal_Needle", title: "Vertical Needle" },
     { id: "107", value: "Histogram_Horizontal_Step", title: "Vertical Step" },
     { id: "108", value: "Histogram_Horizontal_Bar", title: "Horizontal Bar" },
     { id: "109", value: "Histogram_Horizontal_Needle", title: "Horizontal Needle" },
     { id: "110", value: "Histogram_Horizontal_Step", title: "Horizontal Step" },
     { id: "111", value: "Histogram_None", title: "None" },
     { id: "115", value: "Raw_Repeated_Measures_Anova_Ranks", title: "Repeated_Measure_Anova_Raw" },
  ];
