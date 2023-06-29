import { StringifyOptions } from 'querystring';
import {
  DATAFORMAT, DATASELECTION, MEDIAN, DATASELECTIONSTEPWISE, SCALETYPE, BINOPTIONS, SELECTGRAPHSTYLE,
  OUTPUTOPTIONS, GRAPHDATA, STATUSLABEL
} from './GraphFlowTypes'




export const getStep = (step: string, value: StringifyOptions, content) => {
  switch (step) {
    case DATAFORMAT:
      if (content.testOptions === "t test" || content.testOptions === "Rank Sum Test" || content.testOptions === "One Way ANOVA" || content.testOptions === "ANOVA On Ranks" || content.testOptions === "Paired T-test" || content.testOptions === "Signed Rank Test" || content.testOptions === "One Way Repeated Measures ANOVA" || content.testOptions === "Repeated Measures ANOVA On Ranks" || content.testOptions === "Chi-square" || content.testOptions === "Fisher Exact Test" || content.testOptions === "McNemar's Test" || content.testOptions === "Relative Risk" || content.testOptions === "Odds Ratio" || content.testOptions === "Principal Components" || content.testOptions === "LogRank" || content.testOptions === "Gehan-Breslow" || content.testOptions === "Deming") {
        return {
          'next-step': DATASELECTION,
        }
      }
      if (content.testOptions === "One Sample t-test") {
        return {
          'next-step': DATASELECTION,
        }
      }
      break

    case DATASELECTION:
      if(content.testOptions === "Single Group") {
        return {
          'next-step': STATUSLABEL,
        }
      }
      if(content.testOptions=== 'Stratified Model' || content.testOptions=== "Proportional Hazards") {
        return {
          // 'prev-step': DATASELECTION,
          'next-step': DATASELECTIONSTEPWISE,
        }
      }
      if(content.testOptions=== "Principal Components") {
        return {
          // 'prev-step': DATASELECTION,
          'next-step': DATASELECTIONSTEPWISE,
        }
      }
      if(content.testOptions === "Single Group") {
        return {
          'next-step': STATUSLABEL,
        }
      }
      if (content.testOptions === "One Sample t-test") {
        return {
          'prev-step': DATAFORMAT,
          'next-step': MEDIAN,
        }
      }
      if(content.testOptions=== "Normality") {
        return {
          'prev-step': '',
          'next-step': '',
        }
      }
      if (content.testOptions === "One-Sample Signed Rank Test") {
        return {
          'next-step': MEDIAN,
        }
      }
      if (content.testOptions === "Normalize Ternary Data") {
        return {
          'next-step': SCALETYPE,
        }
      }
      if (content.testOptions === "t test" || content.testOptions === "Rank Sum Test" || content.testOptions === "One Way ANOVA" || content.testOptions === "ANOVA On Ranks" || content.testOptions === "Paired T-test" || content.testOptions === "Signed Rank Test" || content.testOptions === "One Way Repeated Measures ANOVA" || content.testOptions === "Repeated Measures ANOVA On Ranks" || content.testOptions === "Chi-square" || content.testOptions === "Fisher Exact Test" || content.testOptions === "McNemar's Test" || content.testOptions === "Relative Risk" || content.testOptions === "Odds Ratio" || content.testOptions === "Principal Components" || content.testOptions === "Deming") {
        return {
          'prev-step': DATAFORMAT,
        }
      }
      if (content.testOptions === "Forward" || content.testOptions === "Backward") {
        return {
          'next-step': DATASELECTIONSTEPWISE,
        }
      }
      if (
        content.testOptions === 'Smoothers2D' ||
        content.testOptions === 'Smoothers3D'
      ) {
        return {
          'next-step': OUTPUTOPTIONS,
        };
      }
      if (content.testOptions === 'Histogram') {
        return {
          'next-step': BINOPTIONS,
        };
      }
      if( content.testOptions === "LogRank" && content["DATAFORMAT"] === "93") {
        return {
          'prev-step': DATAFORMAT,
          'next-step': DATASELECTIONSTEPWISE,
        }
      }
      if( content.testOptions === "LogRank" && content["DATAFORMAT"] != "93") {
        return {
          'prev-step': DATAFORMAT,
          'next-step': STATUSLABEL,
        }
      }
      if( content.testOptions === "Gehan-Breslow" && content["DATAFORMAT"] === "95") {
        return {
          'prev-step': DATAFORMAT,
          'next-step': DATASELECTIONSTEPWISE,
        }
      }
      if( content.testOptions === "Gehan-Breslow" && content["DATAFORMAT"] != "95") {
        return {
          'prev-step': DATAFORMAT,
          'next-step': STATUSLABEL,
        }
      }
      break;
      case STATUSLABEL:
        if(content.testOptions === "Single Group") {
          return {
            'prev-step': DATASELECTION,
          }
        }
        if(content.testOptions=== 'Stratified Model' || content.testOptions=== "Proportional Hazards") {
          return {
            'prev-step': DATASELECTIONSTEPWISE,
             
          }
        }
        if(content.testOptions === "Gehan-Breslow" && content["DATAFORMAT"] === "95") {
          return {
            'prev-step': DATASELECTIONSTEPWISE,
            
          }
        }
        if(content.testOptions === "Gehan-Breslow" && content["DATAFORMAT"] != "95") {
          return {
            'prev-step': DATASELECTION,
            
          }
        }
        if(content.testOptions === "LogRank" && content["DATAFORMAT"] === "93") {
          return {
            'prev-step': DATASELECTIONSTEPWISE,
            
          }
        }
        if(content.testOptions === "LogRank" && content["DATAFORMAT"] != "93") {
          return {
            'prev-step': DATASELECTION,
            
          }
        }
      break;
    case MEDIAN:
      return {
        'prev-step': DATASELECTION,
      }
    case DATASELECTIONSTEPWISE:
      if(content.testOptions=== 'Stratified Model' || content.testOptions=== "Proportional Hazards") {
        return {
          'prev-step': DATASELECTION,
           'next-step': STATUSLABEL,
        }
      }
      if(content.testOptions === "LogRank" && content["DATAFORMAT"] === "93") {
        return {
          'prev-step': DATASELECTION,
          'next-step': STATUSLABEL,
        }
      }
      if(content.testOptions === "Gehan-Breslow" && content["DATAFORMAT"] === "95" ) {
        return {
          'prev-step': DATASELECTION,
          'next-step': STATUSLABEL,
        }
      }
      return {
        'prev-step': DATASELECTION,
      }
    case SCALETYPE:
      return {
        'prev-step': DATASELECTION,
      }
      break
    case BINOPTIONS: {
      if (content.testOptions === 'Histogram') {
        return {
          'prev-step': DATASELECTION,
          'next-step': SELECTGRAPHSTYLE,
        };
      }
      break;
    }
    case SELECTGRAPHSTYLE: {
      if (content.testOptions === 'Histogram') {
        return {
          'prev-step': BINOPTIONS,
        };
      }
      break;
    }
    case OUTPUTOPTIONS: {
      if (
        content.testOptions === 'Smoothers2D' ||
        content.testOptions === 'Smoothers3D'
      ) {
        return {
          'prev-step': DATASELECTION,
          'next-step': GRAPHDATA,
        };
      }
      break;
    }
    case GRAPHDATA: {
      if (
        content.testOptions === 'Smoothers2D' ||
        content.testOptions === 'Smoothers3D'
      ) {
        return {
          'prev-step': OUTPUTOPTIONS,
        };
      }
      break;
    }

  }


}

