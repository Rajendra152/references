import {getSampleTests,getPowerTests} from '../../../App/Config'

var sampleOptions = [
  {
    name: 't-test',
    url:getSampleTests,
    body:{
            "test_id":5,
            "means":0.000,
            "standard_deviation":0.000,
            "dpower":0.000,
            "alpha":0.000
    }
  },
  {
    name: 'Paired t-test',
    url:getSampleTests,
    body:{
      "test_id":12,
      "change_to_detect":0.000,
      "std_change":0.000,
      "dpower":0.000,
      "alpha":0.050
      }      
  },
  {
    name: 'Proportions',
    url:getSampleTests,
    body:{
        "test_id":0,
        "yates_correction":false,
        "alpha":0.050,
        "dpower":0.000,
        "group1":0.000 ,
        "group2":0.000
    }
  },
  {
    name: 'Anova',
    url:getSampleTests,
    body:{
        "test_id":1,
        "diff_means":0.000,
        "deviation_of_residuals":0.000,
        "no_of_groups":0,
        "dpower":0.000,
        "alpha":0.050
        }
  },
  {
    name: 'Chi-square',
    url:getSampleTests,
    body:{
        "test_id":18,
        "worksheet":"test3456",
        "data_columns":[
            {
                "data_option": "Observations",
                "column":0,
                "start_row":0,
                "end_row":0
            },{
                "data_option": "Observations",
                "column":1,
                "start_row":0,
                "end_row":0
            }
            ],
        "dpower":0.000,
        "alpha":0.050,
        "yates_correction":false
        }
  },
  {
    name: 'Correlation',
    url:getSampleTests,
    body:{
        "test_id":2,
        "corr_coff":0.000,
        "dpower":0.000,
        "alpha":0.050
        }
  },
  
];

var powerOptions = [
    {
      name: 't-test',
      url:getPowerTests,
      body:{
        "test_id":5,
        "means":0.000,
        "standard_deviation":0.000,
        "group1":0.000,
        "group2":0.000,
        "alpha":0.000
        }
    },
    {
      name: 'Paired t-test',
      url:getPowerTests,
      body:{
        "test_id":12,
        "change_to_detect":0.000,
        "std_change":0.000,
        "dsize":0.000,
        "alpha":0.050
        }
    },
    {
      name: 'Proportions',
      url:getPowerTests,
      body:{
        "test_id":0,
        "expected_group1":0.000,
        "expected_group2":0.000,
        "group1_size":0,
        "group2_size":0,
        "alpha":0.050,
        "yates_correction":false
        }
    },
    {
      name: 'Anova',
      url:getPowerTests,
      body:{
        "test_id":1,
        "diff_means":0.000,
        "deviation_of_residuals":0.000,
        "no_of_groups":0,
        "group_size":0,
        "alpha":0.050
        }
    },
    {
      name: 'Chi-square',
      url:getPowerTests,
      body:{
        "test_id":18,
        "worksheet":"",
        "data_columns":[
            {
                "data_option": "Observations",
                "column":0,
                "start_row":0,
                "end_row":0
            }
            ],
        "dsample":167,
        "alpha":0.050,
        "yates_correction":false
        }
    },
    {
      name: 'Correlation',
      url:getPowerTests,
      body:{
        "test_id":2,
        "corr_coff":0.000,
        "dsample":0,
        "alpha":0.050
        }
    },
    
  ];

export function accessSampleOptions(options) {
  let data;
  if (options) {
    for (let i = 0; i < sampleOptions.length; i++) {
      const element = sampleOptions[i];
      if (element.name.toLowerCase() == options.toLowerCase()) {
        data = element;
        break;
      }
    }
    return data;
  }
  return '';
}

export function accessPowerOptions(options) {
    let data;
    if (options) {
      for (let i = 0; i < powerOptions.length; i++) {
        const element = powerOptions[i];
        if (element.name.toLowerCase() == options.toLowerCase()) {
          data = element;
          break;
        }
      }
      return data;
    }
    return '';
  }

