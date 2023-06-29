import { accessPowerOptions } from '../TestOptions/SamplePowerPlaceholders';
import { chiSquareDataGroupingPower} from '../../../../utils/spreadsheet/spreadsheetUtility'

export function api_call_power_tests(title,labelOneValue,labelTwoValue,labelThreeValue,labelFourValue,labelFiveValue,yatesCorrection,chisquaredata,workSheetKey,rowIndex) {
    if(title==="t-test"){
        let requestBody = accessPowerOptions(title);
        console.log(requestBody);
        requestBody.body.means=Number(labelOneValue)
        requestBody.body.standard_deviation=Number(labelTwoValue)
        requestBody.body.group1=Number(labelThreeValue)
        requestBody.body.group2=Number(labelFourValue)
        requestBody.body.alpha=Number(labelFiveValue)
        console.log(requestBody.body);
       // alert("inside if")
       return [requestBody.url,requestBody.body]
        
       }
       if(title==="Paired t-test"){
        let requestBody = accessPowerOptions(title);
        requestBody.body.change_to_detect=Number(labelOneValue)
        requestBody.body.std_change=Number(labelTwoValue)
        requestBody.body.dsize=Number(labelThreeValue)
        requestBody.body.alpha=Number(labelFiveValue)
        console.log(requestBody.body);
        //alert("inside if")
       return [requestBody.url,requestBody.body]
        
       }
       if(title==="Proportions"){
        let requestBody = accessPowerOptions(title);
        requestBody.body.expected_group1=Number(labelOneValue)
        requestBody.body.expected_group2=Number(labelTwoValue)
        requestBody.body.group1_size=Number(labelThreeValue)
        requestBody.body.group2_size=Number(labelFourValue)
        requestBody.body.alpha=Number(labelFiveValue)
        requestBody.body.yates_correction=yatesCorrection
        console.log(requestBody.body);
        //alert("inside if")
       return [requestBody.url,requestBody.body]
        
       }
       if(title==="Anova"){
        let requestBody = accessPowerOptions(title);
        requestBody.body.diff_means=Number(labelOneValue)
        requestBody.body.deviation_of_residuals=Number(labelTwoValue)
        requestBody.body.no_of_groups=Number(labelThreeValue)
        requestBody.body.group_size=Number(labelFourValue)
        requestBody.body.alpha=Number(labelFiveValue);
        console.log(requestBody.body);
        //alert("inside if")
       return [requestBody.url,requestBody.body]
        
       }
       if(title==="Correlation"){
        let requestBody = accessPowerOptions(title);
        requestBody.body.corr_coff=Number(labelOneValue)
        requestBody.body.dsample=Number(labelTwoValue)
        requestBody.body.alpha=Number(labelFiveValue)
        console.log(requestBody.body);
        //alert("inside if")
       return [requestBody.url,requestBody.body]
        
       }
       if(title==="Chi-square"){
          // alert("inside chi-square")
        let requestBody = accessPowerOptions(title);
        let group_data_columns = chiSquareDataGroupingPower(chisquaredata,JSON.parse(JSON.stringify(requestBody)),labelThreeValue,labelFiveValue,workSheetKey,rowIndex);
        return [requestBody.url,group_data_columns]
        
       }
}
  
