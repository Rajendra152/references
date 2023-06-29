import * as allTypeList from './DataFormatList';


export const getTypeList = (param: []) => {
  let returnTypeList = [];
  for (let i = 0; i < allTypeList.typeList.length; i++) {
    const element = allTypeList.typeList[i];
    param.forEach(a => {
      if (element.id == a) {
        returnTypeList.push(element);
      }
    })
  }
  return returnTypeList;
}


export const getAllFormatList = (content, testOpt) => {
  return getList(testOpt)
};

export const getList = (testOpt) => {
  switch (testOpt) {
    case "One Sample t-test":
      return getTypeList(['50', '52', '53']);
      break;
    case "One Way ANOVA":
      return getTypeList(['68', '53', '51', '52']);
      break;
    case "Signed Rank Test":
      return getTypeList(['103','104']);
      break;
    case "Odds Ratio":
      return getTypeList(['86', '87']);
    case "McNemar's Test":
      return getTypeList(['72', '63']);
    case "Relative Risk":
      return getTypeList(['64', '65']);
      break;
    case "t test":
      return getTypeList(['66', '53', '51', '52']);
      break;
    case "Rank Sum Test":
      return getTypeList(['67', '51'])
    case "ANOVA On Ranks":
      return getTypeList(['68', '69']);
    case "Paired T-test":
      return getTypeList(['112', '70']);
    case "One Way Repeated Measures ANOVA": case "Repeated Measures ANOVA On Ranks":
      return getTypeList(['68', '71']);
    case "Chi-square":
      return getTypeList(['72', '63']);
      break;
    case "Fisher Exact Test":
      return getTypeList(['113', '114']);
    case "Deming":
      return getTypeList(['83', '84']);
      break;
      case "LogRank" :
        return getTypeList(['92','93']);
      break;
      case "Gehan-Breslow" :
        return getTypeList(['94','95']);
      break;
    case "Histogram":
      return getTypeList(['105', '106', '107', '108', '109', '110', '111']);
      break;
      case "Repeated Measures ANOVA On Ranks":
        return getTypeList(['115', '71']);
    default:
      // alert("isndiee default");
      return
  }

}

let isDataselectionVar = [
  {key: "OddRatioRaw",obj: {id: "86", value:"OddRatioRaw", title: "OddRatio Raw"}},
  {key: "OddRatioTabulatedData",obj: {id: "87", value:"OddRatioTabulatedData", title: "OddRatio TabulatedData"}},
  {key: "Principal Components",obj: {id: "88", value:"PrincipalComponentsVariable",data_value:'principalLabel', title: "Principal ComponentsVariable"}},
  {key: "Pearson Product Moment",obj: {id: "89", value:"CorrelationPersonProductMoment", title: "CorrelationPersonProductMoment"}},
  {key: "Spearman Rank Order",obj: {id: "90", value:"CorrelationSpearmanRankOrder", title: "CorrelationSpearmanRankOrder"}},
  {key: "Single Group",obj: {id: "91", value:"SingleGroup", title: "Single Group"}},
  {key: "Proportional Hazards",obj: {id: "96", value:"ProportionalHazards",data_value: 'ProportionalHazardsLabel', title: "Proportional Hazards"}},
  {key: "Normality",obj: {id: "93", value:"Normality", title: "Normality"}},
  {key: "principalLabel",obj: {id: "107", value:"principalLabel", title: "Label"}},
  {key: "ProportionalHazardsLabel",obj: {id: "98", value:"ProportionalHazardsLabel", title: "ProportionalHazardsLabel"}},
  {key: "Stratified Model",obj: {id: "97", value:"StratifiedModel",data_value: 'StratifiedModelLabel', title: "Stratified Model"}},
  {key: "StratifiedModelLabel",obj: {id: "99", value:"StratifiedModelLabel", title: "StratifiedModelLabel"}},
  {key: "LogRankIndexed",obj: {id: "103", value: "LogRankIndexed", data_value:"LogRankIndexedLabel", title: "LogRankIndexed"}},
  {key: "LogRankIndexedLabel",obj: {id: "104", value:"LogRankIndexedLabel", title: "LogRankIndexedLabel"}},
  {key: "GehanBreslowIndexed",obj: {id: "105", value: "GehanBreslowIndexed", data_value:"GehanBreslowIndexedLabel", title: "GehanBreslowIndexed"}},
  {key: "GehanBreslowIndexedLabel",obj: {id: "106", value:"GehanBreslowIndexedLabel", title: "GehanBreslowIndexedLabel"}},
  {key: "Chi-square...",obj: {id: "110", value:"Chisquare", title: "Chisquare"}}
]

export const getDataSelection1 = (param) =>{
  let found = false, returnObj = {};
    for (let i = 0; i < isDataselectionVar.length; i++) {
      const element = isDataselectionVar[i];
      if(element.key == param){
        found = true;
        returnObj=element;
          break;
      }
    }
    return (found)? returnObj.obj: undefined;
  }
