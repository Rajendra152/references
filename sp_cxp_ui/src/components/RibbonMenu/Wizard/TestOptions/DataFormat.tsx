import * as Status from '../TestOptions/GraphList/DataFormatList';

export const XYpair = [{ title: 'X', value: '', next: 'Y', active: true }];

export const SingleX = [
  { title: 'X', value: '', next: undefined, active: true },
];

export const SingleY = [
  { title: 'Y', value: '', next: undefined, active: true },
];

export const XManyY = [
  { title: 'X', value: '', next: 'Y1', active: true, yidx: 1 },
];

export const YManyX = [
  { title: 'Y', value: '', next: 'X1', active: true, xidx: 1 },
];

export const ManyX = [
  { title: 'X', value: '', next: 'X1', active: true, xidx: 1 },
];

export const ManyY = [
  { title: 'Y', value: '', next: 'Y1', active: true, yidx: 1 },
];

export const XCategory = [
  { title: 'X', value: '', next: 'Categories', active: true },
];

export const YCategory = [
  { title: 'Y', value: '', next: 'Categories', active: true },
];

export const XYCategory = [{ title: 'X', value: '', next: 'Y', active: true }];

export const XYpairs = [
  { title: 'X1', value: '', next: 'Y1', active: true, xidx: 1, yidx: 1 },
];

export const XYReplicate = [
  { title: 'X', value: '', next: 'StartSet', active: true },
];

export const YReplicate = [
  { title: 'StartSet', value: '', next: 'EndSet', active: true },
];

export const XManyYReplicate = [
  { title: 'X', value: '', next: 'StartSet', active: true, sidx: 1, eidx: 1 },
];

export const ManyYReplicate = [
  {
    title: 'StartSet',
    value: '',
    next: 'StartSet1',
    active: true,
    sidx: 1,
    eidx: 1,
  },
];

export const CategoryY = [
  { title: 'Categories', value: '', next: 'Y', active: true, yidx: 1 },
];

export const CategoryX = [
  { title: 'Categories', value: '', next: 'X', active: true, xidx: 1 },
];

export const YXpairs = [
  { title: 'Y1', value: '', next: 'X1', active: true, xidx: 1, yidx: 1 },
];

export const ThetaR = [
  { title: 'ThetaR1', value: '', next: 'R1', active: true, TRidx: 1, Ridx: 1 },
];

export const ThetaManyR = [
  { title: 'Theta', value: '', next: 'R1', active: true, Ridx: 1 },
];

export const RManyTheta = [
  { title: 'R', value: '', next: 'Theta1', active: true, TRidx: 1 },
];

export const ManyR = [
  { title: 'R', value: '', next: 'R1', active: true, Ridx: 1 },
];

export const ManyTheta = [
  { title: 'Theta', value: '', next: 'Theta1', active: true, TRidx: 1 },
];

export const LabelManySeries = [
  { title: 'Label', value: '', next: 'Series1', active: true, SRidx: 1 },
];

export const ManyLabel = [
  { title: 'Label', value: '', next: 'Label1', active: true, Lblidx: 1 },
];

export const ManySeries = [
  { title: 'Series', value: '', next: 'Series1', active: true, SRidx: 1 },
];

export const LabelManySeriesError = [
  { title: 'Label', value: '', next: 'Series1', active: true, SRidx: 1 },
];

export const ManySeriesError = [
  { title: 'Series', value: '', next: 'Error1', active: true, Erridx: 1 },
];

export const YXpair = [{ title: 'Y', value: '', next: 'X', active: true }];

export const YXReplicate = [
  { title: 'Y', value: '', next: 'StartSet', active: true },
];

export const YManyXReplicate = [
  { title: 'Y', value: '', next: 'StartSet', active: true, sidx: 1, eidx: 1 },
];

export const CategoryManyY = [
  { title: 'Category', value: '', next: 'Y1', active: true, yidx: 1 },
];

export const CategoryManyX = [
  { title: 'Category', value: '', next: 'X1', active: true, xidx: 1 },
];

export const XYZTriplet = [{ title: 'X', value: '', next: 'Y', active: true }];

export const ManyZ = [
  { title: 'First Z', value: '', next: 'Last Z', active: true },
];

export const XYManyZ = [{ title: 'X', value: '', next: 'Y', active: true }];

export const TernaryTriplets = [
  {
    title: 'X1',
    value: '',
    next: 'Y1',
    active: true,
    Xidx: 1,
    Yidx: 1,
    Zidx: 1,
  },
];

export const TernaryXYPairs = [
  { title: 'X1', value: '', next: 'Y1', active: true, Xidx: 1, Yidx: 1 },
];
export const TernaryYZPairs = [
  { title: 'Y1', value: '', next: 'Z1', active: true, Yidx: 1, Zidx: 1 },
];
export const TernaryXZPairs = [
  { title: 'X1', value: '', next: 'Z1', active: true, Xidx: 1, Zidx: 1 },
];

export const SingleColumn = [
  { title: 'Pie', value: '', next: undefined, active: true },
];

export const XYXY = [
  { title: 'X1', value: '', next: 'Y1', active: true, xidx: 1, yidx: 1 },
];
// XYAM Pending

export const DifferencesData = [
  { title: 'Studies Names', value: '', next: 'Studies Values', active: true },
];

export const RatiosData = [
  { title: 'Studies Names', value: '', next: 'Studies Values', active: true },
];

export const XBarpair = [{ title: 'X', value: '', next: 'Bar', active: true }];

export const XSetError = [
  { title: 'X', value: '', next: 'Set', active: true, sidx: 1, eidx: 1 },
];

export const ManyXYError = [
  {
    title: 'X1',
    value: '',
    next: 'Y1',
    active: true,
    Xidx: 1,
    Yidx: 1,
    Eidx: 1,
  },
];

//Kaushik added new code here
export const Descriptive = [
  { title: 'Data', value: '', next: 'Data', active: true, didx: 1 },
];
export const Frequency = [
  { title: 'Data', value: '', next: 'Data', active: true, didx: 1 },
];

export const Raw = [
  { title: 'Data', value: '', next: undefined, active: true },
];

export const Mean = [{ title: 'Mean', value: '', next: 'Size', active: true }];
export const MeanError = [
  { title: 'Mean', value: '', next: 'Size', active: true },
];
export const One_Sample_Ranked_Test = [
  { title: 'Data', value: '', next: undefined, active: true, didx: 1 },
];

export const Indexed = [
  { title: 'Group', value: '', next: 'Data', active: true },
];

export const Two_way_anova = [
  { title: 'Factor A', value: '', next: 'Factor B', active: true },
];

export const Three_way_anova = [
  { title: 'Factor A', value: '', next: 'Factor B', active: true },
];

export const One_Way_ANCOVA = [
  { title: 'Factor', value: '', next: 'Dependent', active: true },
];

export const Two_Way_Repeated_Measures_ANOVA = [
  { title: 'Subject', value: '', next: 'Factor A', active: true },
];


export const Raw_chi_square = [
  { title: 'Category 1', value: '', next: 'Category 2', active: true },
];
export const Raw_Relative_Risk = [
  { title: 'Event', value: '', next: 'Group', active: true },
];
export const Raw_t_test = [
  { title: 'Data', value: '', next: 'Data1', active: true },
];
export const Raw_Sumed_Test = [
  { title: 'Data', value: '', next: 'Data1', active: true },
];
export const Raw_One_Way_Anova = [
  { title: 'Data', value: '', next: 'Data1', active: true, didx: 1 },
];

export const Indexed_Anova_Rank = [
  { title: 'Factor', value: '', next: 'Data', active: true },
];

export const Raw_Paired_t_test = [
  { title: 'Data', value: '', next: 'Data1', active: true },
]

export const Raw_Fisher_Exact = [
  { title: 'Category 1', value: '', next: 'Category 2', active: true },
]

export const Tabulated_Fisher_Exact = [
  { title: 'Observations 1', value: '', next: 'Observations 2', active: true },
]


export const Indexed_Paired_T_Test = [
  { title: 'Subject', value: '', next: 'Treatment', active: true },
];
export const Indexed_One_Way_Repeated_Anova = [
  { title: 'Subject', value: '', next: 'Level', active: true },
];
export const z_test = [
  { title: 'Size', value: '', next: 'Proportion', active: true },
];

export const Tabulated_Data_Chi_Square = [
  {
    title: 'Observations',
    value: '',
    next: 'Observations',
    active: true,
    didx: 1,
  },
];

export const Tabulated_Data_Relative_Risk = [
  { title: 'Event', value: '', next: 'No Event', active: true, didx: 1 },
];
export const Linear_Regression = [
  {
    title: 'Dependent (y) :',
    value: '',
    next: 'Independent (x) :',
    active: true,
    didx: 1,
  },
];
export const Multiple_Logistic = [
  {
    title: 'Dependent (y) :',
    value: '',
    next: 'Independent (x) :',
    active: true,
    didx: 1,
  },
];
export const Multiple_Linear = [
  {
    title: 'Dependent (y) :',
    value: '',
    next: 'Independent (x) :',
    active: true,
    didx: 1,
  },
];
export const Polynomial_Regression = [
  {
    title: 'Dependent (y) :',
    value: '',
    next: 'Independent (x) :',
    active: true,
    didx: 1,
  },
];
export const Forward_Stepwise = [
  {
    title: 'Dependent (y) :',
    value: '',
    next: 'Independent (x) :',
    active: true,
    didx: 1,
  },
];
export const Forward_Stepwise_Var = [
  { title: 'Var:', value: '', next: 'Var:', active: true, didx: 1 },
];
export const Backward_Stepwise = [
  {
    title: 'Dependent (y) :',
    value: '',
    next: 'Independent (x) :',
    active: true,
    didx: 1,
  },
];
export const Backward_Stepwise_Var = [
  { title: 'Var:', value: '', next: 'Var:', active: true, didx: 1 },
];
export const Best_Subset_Regression = [
  {
    title: 'Dependent (y) :',
    value: '',
    next: 'Independent (x) :',
    active: true,
    didx: 1,
  },
];
export const Deming_Regression_XY_Pair = [
  { title: 'X :', value: '', next: 'Y :', active: true },
];
export const Deming_Regression_XY_Pair_Errors = [
  { title: 'X :', value: '', next: 'Y :', active: true },
];
export const Normalize_Ternary_Data = [
  { title: 'Source X', value: '', next: 'Source Y', active: true },
];
export const Histogram = [
  { title: 'Source', value: '', next: 'Output', active: true, didx: 1 },
];

export const Smoothers2D = [
  { title: 'SourceX:', value: '', next: 'SourceY:', active: true, didx: 1 },
];
export const Smoothers3D = [
  { title: 'SourceX:', value: '', next: 'SourceY:', active: true, didx: 1 },
];
export const Raw_Signed_Rank_test = [
  { title: 'Data', value: '', next: 'Data1', active: true, didx: 1 },
];
export const Indexed_Signed_Rank_test = [
  { title: 'Subject', value: '', next: 'Treatment', active: true, didx: 1 },
];

export const Raw_Repeated_Measures_Anova_Ranks = [
  { title: 'Data', value: '', next: 'Data', active: true, didx: 1 },
];
//srikanth newely added code
export const OddRatioRaw = [
  { title: 'Event', value: '', next: 'Group', active: true },
];

export const OddRatioTabulatedData = [
  { title: 'Event', value: '', next: 'No Event', active: true },
];

export const CorrelationPersonProductMoment = [
  { title: 'Variable', value: '', next: 'Variable', active: true, didx: 1 },
];

export const CorrelationSpearmanRankOrder = [
  { title: 'Variable', value: '', next: 'Variable', active: true, didx: 1 },
];

export const PrincipalComponentsVariable = [
  {
    title: 'Variable',
    value: '',
    data_value: 'principalLabel',
    next: 'Label',
    active: true,
    didx: 1,
  },
];

export const principalLabel = [
  { title: 'Label', value: '', next: undefined, active: true, didx: 1 },
];

export const SingleGroup = [
  { title: 'Time', value: '', next: 'Status', active: true },
];

export const ProportionalHazards = [
  {
    title: 'Time',
    value: '',
    data_value: 'ProportionalHazardsLabel',
    next: 'Status',
    active: true,
  },
];

export const ProportionalHazardsLabel = [
  { title: 'Covariate', value: '', next: 'Covariate1', active: true, cidx: 1 },
];

export const StratifiedModel = [
  {
    title: 'Strata',
    value: '',
    data_value: 'StratifiedModelLabel',
    next: 'Time',
    active: true,
  },
];

export const StratifiedModelLabel = [
  { title: 'Covariate', value: '', next: 'Covariate1', active: true, cidx: 1 },
];

export const Normality = [
  { title: 'Data', value: '', next: 'Data', active: true, didx: 1 },
];

export const LogRankRaw
  = [
    { title: 'Time 1', value: '', next: 'Status', active: true, xidx: 1, yidx: 1 },
  ];
export const LogRankIndexed = [
  {
    title: 'Group',
    value: '',
    data_value: 'LogRankIndexedLabel',
    next: 'Time',
    active: true,
  },
];

export const LogRankIndexedLabel = [
  { title: 'Group1', value: '', next: 'Group', active: true, cidx: 2 },
];

export const GehanBreslowRaw = [
  { title: 'Time 1', value: '', next: 'Status', active: true, xidx: 1, yidx: 1 },
];
export const GehanBreslowIndexed = [
  {
    title: 'Group',
    value: '',
    data_value: 'GehanBreslowIndexedLabel',
    next: 'Time',
    active: true,
  },
];

export const GehanBreslowIndexedLabel = [
  { title: 'Group1', value: '', next: 'Group', active: true, cidx: 2 },
];
export const Chisquare = [

  { title: 'Observations', value: '', next: 'Observations', active: true, didx: 1 }

]
export const Raw_Fischer_Exact = [
  { title: 'Category-1:', value: '', next: 'Category-2:', active: true, didx: 1 },
];

// export const Tabulated_Fischer_Exact = [
//   { title: 'Observation-1:', value: '', next: 'Observation-2:', active: true, didx: 1 },
// ];


// export const Raw_Fischer_Exact = [

//   { title: 'Category-1:', value: '', next: 'Category-2:', active: true, didx: 1 },

// ];



export const Tabulated_Fischer_Exact = [

  { title: 'Observation-1:', value: '', next: 'Observation-2:', active: true, didx: 1 },

];

const nextTarget = (tableList, title, next) => {
  let Obj = {};
  Obj = { title: title, value: '', next: next, active: true };
  tableList.push(Obj);
  return tableList;
};

const manyX = (tableList, currObj, title, idx) => {
  let Obj = {
    title: title + currObj[idx],
    value: '',
    next: title + currObj[idx] + 1,
    active: true,
    [idx]: currObj[idx] + 1,
  };
  tableList.push(Obj);
  return tableList;
};

const manyExtraX = (tableList, currObj, title, idx, data_value) => {
  let Obj = {
    title: title + currObj[idx],
    value: '',
    data_value: data_value,
    next: title + currObj[idx] + 1,
    active: true,
    [idx]: currObj[idx] + 1,
  };
  tableList.push(Obj);
  return tableList;
};

const XManyYFun = (tableList, currObj, singleTitle, RepeatTitle, idx) => {
  let Obj = {};
  if (currObj.title !== singleTitle) {
    if (currObj[idx]) {
      Obj = {
        title: RepeatTitle + currObj[idx],
        value: '',
        next: RepeatTitle + currObj[idx] + 1,
        active: true,
        [idx]: currObj[idx] + 1,
      };
    }
  }
  if (currObj.title == singleTitle) {
    Obj = {
      title: RepeatTitle + '1',
      value: '',
      next: RepeatTitle + '2',
      active: true,
      [idx]: 2,
    };
  }
  tableList.push(Obj);
  return tableList;
};
const XManyYRmIdx = (tableList, currObj, singleTitle, RepeatTitle, idx) => {
  let Obj = {};
  Obj = {
    title: RepeatTitle,
    value: '',
    next: RepeatTitle + currObj[idx] + 1,
    active: true,
    [idx]: currObj[idx] + 1,
  };
  // if (currObj.title !== singleTitle) {
  //   if (currObj[idx]) {
  //     Obj = { title: RepeatTitle, value: '', next: RepeatTitle + currObj[idx] + 1, active: true, [idx]: currObj[idx] + 1 };
  //   }
  // }
  // if (currObj.title == singleTitle) {

  // }
  tableList.push(Obj);
  return tableList;
};

export const findTarget = (tableList, currObj, currStep) => {
  if (currStep == Status.XYpair) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'Y', value: '', next: undefined, active: true };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XBarpair) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'Bar', value: '', next: undefined, active: true };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.SingleX) {
    if (currObj.next !== undefined) {
    }
  }

  if (currStep == Status.SingleY) {
    if (currObj.next !== undefined) {
    }
  }

  if (currStep == Status.XManyY) {
    if (currObj.next !== undefined) {
      return XManyYFun(tableList, currObj, 'X', 'Y', 'yidx');
    }
  }

  if (currStep == Status.YManyX) {
    if (currObj.next !== undefined) {
      return XManyYFun(tableList, currObj, 'Y', 'X', 'xidx');
    }
  }

  if (currStep == Status.ManyX) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'X', 'xidx');
    }
  }

  if (currStep == Status.ManyY) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Y', 'yidx');
    }
  }

  if (currStep == Status.XCategory) {
    if (currObj.next !== undefined) {
      let Obj = {
        title: 'Categories',
        value: '',
        next: undefined,
        active: true,
      };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YCategory) {
    if (currObj.next !== undefined) {
      let Obj = {
        title: 'Categories',
        value: '',
        next: undefined,
        active: true,
      };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XYCategory) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title == 'Y') {
        Obj = { title: 'Categories', value: '', next: undefined, active: true };
      }
      if (currObj.title == 'X') {
        Obj = { title: 'Y', value: '', next: 'Categories', active: true };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XYpairs) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = {
          title: 'Y' + currObj.yidx,
          value: '',
          next: 'X' + currObj.xidx,
          active: true,
          xidx: currObj.xidx + 1,
          yidx: currObj.yidx,
        };
      } else {
        Obj = {
          title: 'X' + currObj.xidx,
          value: '',
          next: 'Y' + currObj.yidx,
          active: true,
          xidx: currObj.xidx,
          yidx: currObj.yidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XYReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'StartSet', value: '', next: 'EndSet', active: true };
      }
      if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet', value: '', next: undefined, active: true };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet', value: '', next: undefined, active: true };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XManyYReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = {
          title: 'StartSet' + currObj.sidx,
          value: '',
          next: 'EndSet' + currObj.eidx,
          active: true,
          sidx: currObj.sidx,
          eidx: currObj.eidx,
        };
      } else if (currObj.title.includes('StartSet')) {
        Obj = {
          title: 'EndSet' + currObj.eidx,
          value: '',
          next: 'StartSet' + currObj.sidx,
          active: true,
          sidx: currObj.sidx + 1,
          eidx: currObj.eidx,
        };
      } else if (currObj.title.includes('EndSet')) {
        Obj = {
          title: 'StartSet' + currObj.sidx,
          value: '',
          next: 'EndSet' + currObj.eidx,
          active: true,
          sidx: currObj.sidx,
          eidx: currObj.eidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.ManyYReplicate || currStep == Status.ManyXReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('StartSet')) {
        Obj = {
          title: 'EndSet' + currObj.eidx,
          value: '',
          next: 'StartSet' + currObj.sidx,
          active: true,
          sidx: currObj.sidx + 1,
          eidx: currObj.eidx,
        };
      } else if (currObj.title.includes('EndSet')) {
        Obj = {
          title: 'StartSet' + currObj.sidx,
          value: '',
          next: 'EndSet' + currObj.eidx,
          active: true,
          sidx: currObj.sidx,
          eidx: currObj.eidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.CategoryY) {
    if (currObj.next !== undefined) {
      let Obj = {
        title: 'Y' + currObj.yidx,
        value: '',
        next: 'Y',
        active: true,
        yidx: currObj.yidx + 1,
      };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.CategoryX) {
    if (currObj.next !== undefined) {
      let Obj = {
        title: 'X' + currObj.xidx,
        value: '',
        next: 'X',
        active: true,
        xidx: currObj.xidx + 1,
      };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YXpairs) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = {
          title: 'Y' + currObj.yidx,
          value: '',
          next: 'X' + currObj.xidx,
          active: true,
          xidx: currObj.xidx + 1,
          yidx: currObj.yidx,
        };
      } else {
        Obj = {
          title: 'X' + currObj.xidx,
          value: '',
          next: 'Y' + currObj.yidx,
          active: true,
          xidx: currObj.xidx,
          yidx: currObj.yidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.ThetaR) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Theta')) {
        Obj = {
          title: 'R' + currObj.Ridx,
          value: '',
          next: 'ThetaR' + currObj.TRidx,
          active: true,
          TRidx: currObj.TRidx + 1,
          Ridx: currObj.Ridx,
        };
      } else {
        Obj = {
          title: 'ThetaR' + currObj.TRidx,
          value: '',
          next: 'R' + currObj.Ridx,
          active: true,
          TRidx: currObj.TRidx,
          Ridx: currObj.Ridx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.ThetaManyR) {
    if (currObj.next !== undefined) {
      return XManyYFun(tableList, currObj, 'Theta', 'R', 'Ridx');
    }
  }

  if (currStep == Status.RManyTheta) {
    if (currObj.next !== undefined) {
      return XManyYFun(tableList, currObj, 'R', 'Theta', 'TRidx');
    }
  }

  if (currStep == Status.ManyR) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'R', 'Ridx');
    }
  }

  if (currStep == Status.ManyTheta) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Theta', 'TRidx');
    }
  }

  if (currStep == Status.LabelManySeries) {
    if (currObj.next !== undefined) {
      return XManyYFun(tableList, currObj, 'Label', 'Series', 'SRidx');
    }
  }

  if (currStep == Status.ManyLabel) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Label', 'Lblidx');
    }
  }

  if (currStep == Status.ManySeries) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Series', 'SRidx');
    }
  }

  if (
    currStep == Status.LabelManySeriesError ||
    currStep == Status.ManySeriesError
  ) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Error') || currObj.title.includes('Label')) {
        Obj = {
          title: 'Series' + (currObj.SRidx ? currObj.SRidx : 1),
          value: '',
          next: 'Error' + currObj.Erridx,
          active: true,
          Erridx: currObj.Erridx + 1,
          SRidx: currObj.SRidx ? currObj.SRidx : 1,
        };
      } else if (currObj.title.includes('Series')) {
        Obj = {
          title: 'Error' + (currObj.Erridx ? currObj.Erridx : 1),
          value: '',
          next: 'Series' + currObj.SRidx,
          active: true,
          Erridx: currObj.Erridx ? currObj.Erridx : 1,
          SRidx: currObj.SRidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
      // return manyX( tableList, currObj, Status.ManySeries, 'Series', 'SRidx');
    }
  }

  if (currStep == Status.YXpair) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'X', value: '', next: undefined, active: true };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YXReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = { title: 'StartSet', value: '', next: 'EndSet', active: true };
      }
      if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet', value: '', next: undefined, active: true };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YManyXReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = {
          title: 'StartSet' + currObj.sidx,
          value: '',
          next: 'EndSet' + currObj.eidx,
          active: true,
          sidx: currObj.sidx,
          eidx: currObj.eidx,
        };
      } else if (currObj.title.includes('StartSet')) {
        Obj = {
          title: 'EndSet' + currObj.eidx,
          value: '',
          next: 'StartSet' + currObj.sidx,
          active: true,
          sidx: currObj.sidx + 1,
          eidx: currObj.eidx,
        };
      } else if (currObj.title.includes('EndSet')) {
        Obj = {
          title: 'StartSet' + currObj.sidx,
          value: '',
          next: 'EndSet' + currObj.eidx,
          active: true,
          sidx: currObj.sidx,
          eidx: currObj.eidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.CategoryManyY) {
    if (currObj.next !== undefined)
      return XManyYFun(tableList, currObj, 'Category', 'Y', 'yidx');
  }

  if (currStep == Status.CategoryManyX) {
    if (currObj.next !== undefined)
      return XManyYFun(tableList, currObj, 'Category', 'X', 'xidx');
  }

  if (currStep == Status.XYZTriplet) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Y') return nextTarget(tableList, 'Y', 'Z');

      if (currObj.next == 'Z') return nextTarget(tableList, 'Z', undefined);
    }
  }

  if (currStep == Status.ManyZ) {
    if (currObj.next !== undefined)
      return nextTarget(tableList, 'Last Z', undefined);
  }

  if (currStep == Status.XYManyZ) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Y') return nextTarget(tableList, 'Y', 'First Z');

      if (currObj.next == 'First Z')
        return nextTarget(tableList, 'First Z', 'Last Z');

      if (currObj.next == 'Last Z')
        return nextTarget(tableList, 'Last Z', undefined);
    }
  }

  if (currStep == Status.TernaryTriplets) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('X')) {
        let Obj = {
          title: 'Y' + currObj.Yidx,
          value: '',
          next: 'Z' + currObj.Zidx,
          active: true,
          Xidx: currObj.Xidx + 1,
          Yidx: currObj.Yidx,
          Zidx: currObj.Zidx,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Y')) {
        let Obj = {
          title: 'Z' + currObj.Zidx,
          value: '',
          next: 'X' + currObj.Xidx,
          active: true,
          Xidx: currObj.Xidx,
          Yidx: currObj.Yidx + 1,
          Zidx: currObj.Zidx,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Z')) {
        let Obj = {
          title: 'X' + currObj.Xidx,
          value: '',
          next: 'Y' + currObj.Yidx,
          active: true,
          Xidx: currObj.Xidx,
          Yidx: currObj.Yidx,
          Zidx: currObj.Zidx + 1,
        };
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.TernaryXYPairs) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('X')) {
        let Obj = {
          title: 'Y' + currObj.Yidx,
          value: '',
          next: 'X' + currObj.Xidx,
          active: true,
          Xidx: currObj.Xidx + 1,
          Yidx: currObj.Yidx,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Y')) {
        let Obj = {
          title: 'X' + currObj.Xidx,
          value: '',
          next: 'Y' + currObj.Yidx,
          active: true,
          Xidx: currObj.Xidx,
          Yidx: currObj.Yidx + 1,
        };
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.TernaryYZPairs) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('Y')) {
        let Obj = {
          title: 'Z' + currObj.Zidx,
          value: '',
          next: 'Y' + currObj.Yidx,
          active: true,
          Zidx: currObj.Zidx,
          Yidx: currObj.Yidx + 1,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Z')) {
        let Obj = {
          title: 'Y' + currObj.Yidx,
          value: '',
          next: 'Z' + currObj.Zidx,
          active: true,
          Zidx: currObj.Zidx + 1,
          Yidx: currObj.Yidx,
        };
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.TernaryXZPairs) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('X')) {
        let Obj = {
          title: 'Z' + currObj.Zidx,
          value: '',
          next: 'X' + currObj.Xidx,
          active: true,
          Zidx: currObj.Zidx,
          Xidx: currObj.Xidx + 1,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Z')) {
        let Obj = {
          title: 'X' + currObj.Xidx,
          value: '',
          next: 'Z' + currObj.Zidx,
          active: true,
          Zidx: currObj.Zidx + 1,
          Xidx: currObj.Xidx,
        };
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.XYXY) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X') && currObj.xidx < 3) {
        Obj = {
          title: 'Y' + currObj.yidx,
          value: '',
          next: 'X' + currObj.xidx,
          active: true,
          xidx: currObj.xidx + 1,
          yidx: currObj.yidx,
        };
        tableList.push(Obj);
        return tableList;
      } else if (currObj.title.includes('Y') && currObj.yidx < 2) {
        Obj = {
          title: 'X' + currObj.xidx,
          value: '',
          next: 'Y' + currObj.yidx,
          active: true,
          xidx: currObj.xidx,
          yidx: currObj.yidx + 1,
        };
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.DifferencesData || currStep == Status.RatiosData) {
    if (currObj.next !== undefined) {
      let Obj = {},
        title = currObj.title.toLowerCase();
      if (title == 'studies names') {
        Obj = {
          title: 'Studies Values',
          value: '',
          next: 'Studies LCLs',
          active: true,
        };
      }
      if (title == 'studies values') {
        Obj = {
          title: 'Studies LCLs',
          value: '',
          next: 'Studies UCLs',
          active: true,
        };
      }
      if (title == 'studies lcls') {
        Obj = {
          title: 'Studies UCLs',
          value: '',
          next: 'Studies Weights',
          active: true,
        };
      }
      if (title == 'studies ucls') {
        Obj = {
          title: 'Studies Weights',
          value: '',
          next: 'Overall Value',
          active: true,
        };
      }
      if (title == 'studies weights') {
        Obj = {
          title: 'Overall Value',
          value: '',
          next: 'Overall LCL',
          active: true,
        };
      }
      if (title == 'overall value') {
        Obj = {
          title: 'Overall LCL',
          value: '',
          next: 'Overall UCL',
          active: true,
        };
      }
      if (title == 'overall lcl') {
        Obj = {
          title: 'Overall UCL',
          value: '',
          next: undefined,
          active: true,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XSetError) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = {
          title: 'Set' + currObj.sidx,
          value: '',
          next: 'End' + currObj.eidx,
          active: true,
          sidx: currObj.sidx,
          eidx: currObj.eidx,
        };
      } else if (currObj.title.includes('Set')) {
        Obj = {
          title: 'End' + currObj.eidx,
          value: '',
          next: 'Set' + currObj.sidx,
          active: true,
          sidx: currObj.sidx + 1,
          eidx: currObj.eidx,
        };
      } else if (currObj.title.includes('End')) {
        Obj = {
          title: 'Set' + currObj.sidx,
          value: '',
          next: 'End' + currObj.eidx,
          active: true,
          sidx: currObj.sidx,
          eidx: currObj.eidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.ManyXYError) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('X')) {
        Obj = {
          title: 'Y' + currObj.Yidx,
          value: '',
          next: 'Y Error' + currObj.Eidx,
          active: true,
          Yidx: currObj.Yidx,
          Eidx: currObj.Eidx,
          Xidx: currObj.Xidx + 1,
        };
      } else if (currObj.title.includes('Error')) {
        Obj = {
          title: 'X' + currObj.Xidx,
          value: '',
          next: 'Y' + currObj.Yidx,
          active: true,
          Xidx: currObj.Xidx,
          Yidx: currObj.Yidx,
          Eidx: currObj.Eidx + 1,
        };
      } else if (currObj.title.includes('Y')) {
        Obj = {
          title: 'Y Error' + currObj.Eidx,
          value: '',
          next: 'X' + currObj.Xidx,
          active: true,
          Xidx: currObj.Xidx,
          Eidx: currObj.Eidx,
          Yidx: currObj.Yidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //For descriptive
  if (currStep == Status.Descriptive) {
    if (currObj.next !== undefined) {
      // if (currObj.next == 'Data') return nextTarget(tableList, 'Data', 'Data 1');

      // if (currObj.next == 'Data 1') return nextTarget(tableList, 'Data 1', undefined);
      return manyX(tableList, currObj, 'Data', 'didx');
    }
  }
  if (currStep == Status.Raw_Repeated_Measures_Anova_Ranks) {
    if (currObj.next !== undefined) {
      // if (currObj.next == 'Data') return nextTarget(tableList, 'Data', 'Data 1');

      // if (currObj.next == 'Data 1') return nextTarget(tableList, 'Data 1', undefined);
      return manyX(tableList, currObj, 'Data', 'didx');
    }
  }
  //For Frequency
  if (currStep == Status.Frequency) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Data', 'didx');
    }
  }
  //Mean
  if (currStep == Status.Mean) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Mean') return nextTarget(tableList, 'Mean', 'Size');

      if (currObj.next == 'Size')
        return nextTarget(tableList, 'Size', 'Standard Dev.');

      if (currObj.next == 'Standard Dev.')
        return nextTarget(tableList, 'Standard Dev.', undefined);
    }
  }
  //MeanError
  if (currStep == Status.MeanError) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Mean') return nextTarget(tableList, 'Mean', 'Size');

      if (currObj.next == 'Size')
        return nextTarget(tableList, 'Size', 'Standard Error');

      if (currObj.next == 'Standard Error')
        return nextTarget(tableList, 'Standard Error', undefined);
    }
  }
  //For one-sample size ranked test
  if (currStep == Status.One_Sample_Ranked_Test) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Data', 'didx');
    }
  }

  //Indexd
  if (currStep == Status.Indexed) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Group')
        return nextTarget(tableList, 'Group', 'Data');

      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }

  //For Two way ANOVA
  if (currStep == Status.Two_way_anova) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Factor A')
        return nextTarget(tableList, 'Factor A', 'Factor B');

      if (currObj.next == 'Factor B')
        return nextTarget(tableList, 'Factor B', 'Data');

      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }
  //For Three way ANOVA
  if (currStep == Status.Three_way_anova) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Factor A')
        return nextTarget(tableList, 'Factor A', 'Factor B');

      if (currObj.next == 'Factor B')
        return nextTarget(tableList, 'Factor B', 'Factor C');

      if (currObj.next == 'Factor C')
        return nextTarget(tableList, 'Factor C', 'Data');

      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }

  //For One Way ANCOVA
  if (currStep == Status.One_Way_ANCOVA) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Factor')
        return nextTarget(tableList, 'Factor', 'Dependent');

      if (currObj.next == 'Dependent')
        return nextTarget(tableList, 'Dependent', 'Covariate');

      if (currObj.next == 'Covariate')
        return nextTarget(tableList, 'Covariate', 'Covariate1');

      if (currObj.next == 'Covariate1')
        return nextTarget(tableList, 'Covariate1', undefined);
    }
  }

  //For Two way Repeated Measure
  if (currStep == Status.Two_Way_Repeated_Measures_ANOVA) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Subject')
        return nextTarget(tableList, 'Subject', 'Factor A');

      if (currObj.next == 'Factor A')
        return nextTarget(tableList, 'Factor A', 'Factor B');

      if (currObj.next == 'Factor B')
        return nextTarget(tableList, 'Factor B', 'Data');

      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }
  //For Z-test
  if (currStep == Status.z_test) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Size')
        return nextTarget(tableList, 'Size', 'Proportion');

      if (currObj.next == 'Proportion')
        return nextTarget(tableList, 'Proportion', undefined);
    }
  }

  //For raw-chi square
  if (currStep == Status.Raw_chi_square) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Category 1')
        return nextTarget(tableList, 'Category 1', 'Category 2');

      if (currObj.next == 'Category 2')
        return nextTarget(tableList, 'Category 2', undefined);
    }
  }

  //For relative raw
  if (currStep == Status.Raw_Relative_Risk) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Event')
        return nextTarget(tableList, 'Event', 'Group');

      if (currObj.next == 'Group')
        return nextTarget(tableList, 'Group', undefined);
    }
  }
  //For t test raw
  if (currStep == Status.Raw_t_test) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Data') return nextTarget(tableList, 'Data', 'Data1');

      if (currObj.next == 'Data1')
        return nextTarget(tableList, 'Data1', undefined);
    }
  }
  //For raw sumed test
  if (currStep == Status.Raw_Sumed_Test) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Data') return nextTarget(tableList, 'Data', 'Data1');

      if (currObj.next == 'Data1')
        return nextTarget(tableList, 'Data1', undefined);
    }
  }
  //for raw one way anova
  if (currStep == Status.Raw_One_Way_Anova) {

    if (currObj.next !== undefined) {
      if (currObj.next == 'Data') return nextTarget(tableList, 'Data', 'Data1');

      if (currObj.next == 'Data1')
        return nextTarget(tableList, 'Data1', 'Data2');

      if (currObj.next == 'Data2')
        return nextTarget(tableList, 'Data2', 'Data3');

      if (currObj.next == 'Data3')
        return nextTarget(tableList, 'Data3', undefined);
    }
  }

  //Index anova on rank
  if (currStep == Status.Indexed_Anova_Rank) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Factor')
        return nextTarget(tableList, 'Factor', 'Data');

      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }
  //Raw on Paired t test
  if (currStep == Status.Raw_Paired_t_test) {

    console.log(Status)
    if (currObj.next !== undefined) {
      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', 'Data1');

      if (currObj.next == 'Data1')
        return nextTarget(tableList, 'Data1', undefined);

    }
  }
  //Index on paired test
  if (currStep == Status.Indexed_Paired_T_Test) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Subject')
        return nextTarget(tableList, 'Subject', 'Treatment');

      if (currObj.next == 'Treatment')
        return nextTarget(tableList, 'Treatment', 'Data');

      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }
  //Index on one way repeated anova
  if (currStep == Status.Indexed_One_Way_Repeated_Anova) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Subject')
        return nextTarget(tableList, 'Subject', 'Level');

      if (currObj.next == 'Level')
        return nextTarget(tableList, 'Level', 'Data');

      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }
  //Tabulated on chi-square
  if (currStep == Status.Tabulated_Data_Chi_Square) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Observations', 'didx');
    }
  }
  //Index on tabulated data relative risk
  if (currStep == Status.Tabulated_Data_Relative_Risk) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Event')
        return nextTarget(tableList, 'Event', 'No Event');

      if (currObj.next == 'No Event')
        return nextTarget(tableList, 'No Event', undefined);
    }
  }
  //Data selection for linear regression
  if (currStep == Status.Linear_Regression) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Dependent (y) :')
        return nextTarget(tableList, 'Dependent (y) :', 'Independent (x) :');

      if (currObj.next == 'Independent (x) :')
        return nextTarget(tableList, 'Independent (x) :', undefined);
    }
  }
  //Data selection for Multiple Logistic Regression
  if (currStep == Status.Multiple_Logistic) {
    if (currObj.next !== undefined)
      return XManyYFun(
        tableList,
        currObj,
        'Dependent (y) :',
        'Independent (x) :',
        'yidx'
      );
  }

  //Data selection for Multiple Linear Regression
  if (currStep == Status.Multiple_Linear) {
    if (currObj.next !== undefined)
      return XManyYFun(
        tableList,
        currObj,
        'Dependent (y) :',
        'Independent (x) :',
        'yidx'
      );
  }
  //Data selection for Polynomail Regression
  if (currStep == Status.Polynomial_Regression) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Dependent (y) :')
        return nextTarget(tableList, 'Dependent (y) :', 'Independent (x) :');

      if (currObj.next == 'Independent (x) :')
        return nextTarget(tableList, 'Independent (x) :', undefined);
    }
  }
  //Data selection for Forward Stepwise Regression
  if (currStep == Status.Forward_Stepwise) {
    if (currObj.next !== undefined)
      return XManyYFun(
        tableList,
        currObj,
        'Dependent (y) :',
        'Independent (x) :',
        'yidx'
      );
  }
  //Data selection for Forward Stepwise Var Data selectionRegression
  if (currStep == Status.Forward_Stepwise_Var) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Var:', 'didx');
    }
  }

  //Data selection for Backward Stepwise Regression
  if (currStep == Status.Backward_Stepwise) {
    if (currObj.next !== undefined)
      return XManyYFun(
        tableList,
        currObj,
        'Dependent (y) :',
        'Independent (x) :',
        'yidx'
      );
  }
  //Data selection for Backward Stepwise Var Data selectionRegression
  if (currStep == Status.Backward_Stepwise_Var) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Var:', 'didx');
    }
  }
  //Data selection for Best Subset Regression
  if (currStep == Status.Best_Subset_Regression) {
    if (currObj.next !== undefined)
      return XManyYFun(
        tableList,
        currObj,
        'Dependent (y) :',
        'Independent (x) :',
        'yidx'
      );
  }
  //Data selection for Deming regression XY pair
  if (currStep == Status.Deming_Regression_XY_Pair) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'X :') return nextTarget(tableList, 'X :', 'Y :');

      if (currObj.next == 'Y :') return nextTarget(tableList, 'Y :', undefined);
    }
  }
  //Data selection for Deming regression XY pair error

  if (currStep == Status.Deming_Regression_XY_Pair_Errors) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'X :') return nextTarget(tableList, 'X :', 'Y :');

      if (currObj.next == 'Y :')
        return nextTarget(tableList, 'Y :', 'X Error :');

      if (currObj.next == 'X Error :')
        return nextTarget(tableList, 'X Error :', 'Y Error :');

      if (currObj.next == 'Y Error :')
        return nextTarget(tableList, 'Y Error :', undefined);
    }
  }
  //Data selection for Normalize Ternary Data
  if (currStep == Status.Normalize_Ternary_Data) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Source X')
        return nextTarget(tableList, 'Source X', 'Source Y');

      if (currObj.next == 'Source Y')
        return nextTarget(tableList, 'Source Y', 'Source Z');

      if (currObj.next == 'Source Z')
        return nextTarget(tableList, 'Source Z', 'Destinaton X');

      if (currObj.next == 'Destinaton X')
        return nextTarget(tableList, 'Destinaton X', 'Destinaton Y');

      if (currObj.next == 'Destinaton Y')
        return nextTarget(tableList, 'Destinaton Y', 'Destinaton Z');

      if (currObj.next == 'Destinaton Z')
        return nextTarget(tableList, 'Destinaton Z', undefined);
    }
  }
  //Data selection for Fischer Raw 
  if (currStep == Status.Raw_Fischer_Exact) {

    console.log('current step', currStep, Status)
    if (currObj.next !== undefined) {
      if (currObj.next == 'Category-1:')
        return nextTarget(tableList, 'Category-1:', 'Category-2:');

      if (currObj.next == 'Category-2:')
        return nextTarget(tableList, 'Category-2:', undefined);
    }
  }

  if (currStep == Status.Tabulated_Fischer_Exact) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Observation-1:')
        return nextTarget(tableList, 'Observation-1:', 'Observation-2:');

      if (currObj.next == 'Observation-2:')
        return nextTarget(tableList, 'Observation-2:', undefined);
    }
  }


  //Data selection for Histogram
  if (currStep == Status.Histogram) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Source')
        return nextTarget(tableList, 'Source', 'Output');

      if (currObj.next == 'Output')
        return nextTarget(tableList, 'Output', undefined);
    }
  }

  //Data selection for Smoothers2D
  if (currStep == Status.Smoothers2D) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'SourceX:')
        return nextTarget(tableList, 'SourceX:', 'SourceY:');

      if (currObj.next == 'SourceY:')
        return nextTarget(tableList, 'SourceY:', undefined);
    }
  }

  //Data selection for Smoothers3D
  if (currStep == Status.Smoothers3D) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'SourceX:')
        return nextTarget(tableList, 'SourceX:', 'SourceY:');

      if (currObj.next == 'SourceY:')
        return nextTarget(tableList, 'SourceY:', 'SourceZ:');

      if (currObj.next == 'SourceZ:')
        return nextTarget(tableList, 'SourceZ:', undefined);
    }
  }

  //Data selection for signed rank test
  if (currStep == Status.Raw_Signed_Rank_test) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Data') return nextTarget(tableList, 'Data', 'Data1');

      if (currObj.next == 'Data1')
        return nextTarget(tableList, 'Data1', undefined);
    }
  }
  if (currStep == Status.Indexed_Signed_Rank_test) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Subject')
        return nextTarget(tableList, 'Subject', 'Treatment');
      if (currObj.next == 'Treatment')
        return nextTarget(tableList, 'Treatment', 'Data');
      if (currObj.next == 'Data')
        return nextTarget(tableList, 'Data', undefined);
    }
  }

  //srikanth newly added code

  if (currStep == Status.OddRatioRaw) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Event')
        return nextTarget(tableList, 'Event', 'Group');

      if (currObj.next == 'Group')
        return nextTarget(tableList, 'Group', undefined);
    }
  }
  if (currStep == Status.OddRatioTabulatedData) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Event')
        return nextTarget(tableList, 'Event', 'No Event');

      if (currObj.next == 'No Event')
        return nextTarget(tableList, 'No Event', undefined);
    }
  }

  if (
    currStep == Status.CorrelationPersonProductMoment ||
    currStep == Status.CorrelationSpearmanRankOrder
  ) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Variable', 'didx');
    }
  }

  if (currStep == Status.CorrelationSpearmanRankOrder) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Variable', 'didx');
    }
  }

  if (currStep == Status.Normality) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Data', 'didx');
    }
  }

  if (currStep == Status.PrincipalComponentsVariable) {
    if (currObj.next !== undefined) {
      return manyExtraX(
        tableList,
        currObj,
        'Variable',
        'didx',
        'principalLabel'
      );
    }
  }
  if (currStep == Status.SingleGroup) {
    if (currObj.next == 'Time') return nextTarget(tableList, 'Time', 'Status');

    if (currObj.next == 'Status')
      return nextTarget(tableList, 'Status', undefined);
  }

  if (currStep == Status.ProportionalHazards) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Time') {
        let Obj = {};
        Obj = {
          title: 'Time',
          value: '',
          data_value: 'ProportionalHazardsLabel',
          next: 'Status',
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }

      if (currObj.next == 'Status') {
        let Obj = {};
        Obj = {
          title: 'Status',
          value: '',
          data_value: 'ProportionalHazardsLabel',
          cidx: 1,
          next: 'Covariate1',
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.next.includes('Covariate'))
        return manyExtraX(
          tableList,
          currObj,
          'Covariate',
          'cidx',
          'ProportionalHazardsLabel'
        );
    }
  }

  if (currStep == Status.ProportionalHazardsLabel) {
    if (currObj.next !== undefined) {
      if (currObj.next.includes('Covariate'))
        return manyExtraX(
          tableList,
          currObj,
          'Covariate',
          'cidx',
          'ProportionalHazardsLabel'
        );
    }
  }

  if (currStep == Status.StratifiedModel) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Strata') {
        let Obj = {};
        Obj = {
          title: 'Strata',
          value: '',
          data_value: 'StratifiedModelLabel',
          next: 'Time',
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }

      if (currObj.next == 'Time') {
        let Obj = {};
        Obj = {
          title: 'Time',
          value: '',
          data_value: 'StratifiedModelLabel',
          cidx: 1,
          next: 'Status',
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }

      if (currObj.next == 'Status') {
        let Obj = {};
        Obj = {
          title: 'Status',
          value: '',
          data_value: 'StratifiedModelLabel',
          cidx: 1,
          next: 'Covariate1',
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.next.includes('Covariate'))
        return manyExtraX(
          tableList,
          currObj,
          'Covariate',
          'cidx',
          'ProportionalHazardsLabel'
        );
    }
  }
  if (currStep == Status.StratifiedModelLabel) {
    //alert(currStep)
    if (currObj.next !== undefined) {
      if (currObj.next.includes('Covariate'))
        return manyExtraX(
          tableList,
          currObj,
          'Covariate',
          'cidx',
          'StratifiedModelLabel'
        );
    }
  }

  if (
    currStep == Status.LogRankIndexed ||
    currStep == Status.GehanBreslowIndexed
  ) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Group') {
        let Obj = {};
        Obj = {
          title: 'Group',
          value: '',
          data_value: 'LogRankIndexedLabel',
          next: 'Time',
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.next == 'Time') {
        let Obj = {};
        Obj = {
          title: 'Time',
          value: '',
          data_value: 'LogRankIndexedLabel',
          next: 'Status',
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.next == 'Status') {
        let Obj = {};
        Obj = {
          title: 'Status',
          value: '',
          data_value: 'LogRankIndexedLabel',
          next: undefined,
          active: true,
        };
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (
    currStep == Status.LogRankIndexedLabel ||
    currStep == Status.GehanBreslowIndexedLabel
  ) {
    if (currObj.next !== undefined) {
      if (currObj.next.includes('Group'))
        return manyExtraX(
          tableList,
          currObj,
          'Group',
          'cidx',
          'LogRankIndexedLabel'
        );
    }
  }
  if (currStep == Status.GehanBreslowRaw || currStep == Status.LogRankRaw) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Time')) {
        Obj = {
          title: 'Status ' + currObj.yidx,
          value: '',
          next: 'Time ' + currObj.xidx,
          active: true,
          xidx: currObj.xidx + 1,
          yidx: currObj.yidx,
        };
      } else {
        Obj = {
          title: 'Time ' + currObj.xidx,
          value: '',
          next: 'Status ' + currObj.yidx,
          active: true,
          xidx: currObj.xidx,
          yidx: currObj.yidx + 1,
        };
      }
      tableList.push(Obj);
      return tableList;
    }
  }
  if (currStep == Status.Chisquare) {

    if (currObj.next !== undefined) {

      return manyX(tableList, currObj, 'Observations', 'didx');

    }

  }
};
