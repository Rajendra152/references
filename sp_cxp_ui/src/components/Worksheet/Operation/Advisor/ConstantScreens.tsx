export const screens: any = {
  s_0: {
    title: "What do you need to do?",
    back: null,
    children: ["o_1", "o_2", "o_3", "o_4", "o_5", "o_6", "o_7"],
  },

  s_0_1: {
    title: "How are the data measured?",
    back: "s_0",
    children: ["o_1_1", "o_1_2", "o_1_3"],
  },
  s_0_2: {
    title: "How are the data measured?",
    back: "s_0",
    children: ["o_2_1", "o_2_2", "o_2_3", "o_2_4"],
  },
  s_0_3: {
    title: "How are the data measured?",
    back: "s_0",
    children: ["o_3_1", "o_3_2", "o_3_3"],
  },
  s_0_4: {
    title: "How are the data measured?",
    back: "s_0",
    children: ["o_4_1", "o_4_2"],
  },
  s_0_5: {
    title: "How are the data measured?",
    back: "s_0",
    children: ["o_5_1", "o_5_2"],
  },
  s_0_6: {
    title: "Is your study retrospective or prospective?",
    back: "s_0",
    children: ["o_6_1", "o_6_2"],
  },
  s_0_7: {
    title: "Suggested Test",
    back: "s_0",
    children: ["o_7_1"],
    test: {type:"test", name:"Principal Components"}
  },

  s_0_1_1: {
    title: "Suggested Test",
    back: "s_0_1",
    children: ["o_1_1_1"],
    test: {type:"test", name:"Descriptive Statistics"}
  },
  s_0_1_2: {
    title: "Suggested Test",
    back: "s_0_1",
    children: ["o_1_2_1"],
    test: {type:"test", name:"One Way Frequency Tables"}
  },
  s_0_1_3: {
    title:
      "Does your data include potential risk factors that may affect survival time?",
    back: "s_0_1",
    children: ["o_1_3_1", "o_1_3_2"],
  },

  s_0_2_1: {
    title: "Did you apply more than one treatment per subject?",
    back: "s_0_2",
    children: ["o_2_1_1", "o_2_1_2"],
  },
  s_0_2_2: {
    title: "Did you apply more than one treatment per subject?",
    back: "s_0_2",
    children: ["o_2_2_1", "o_2_2_2"],
  },
  s_0_2_3: {
    title: "Did you apply more than one treatment per subject?",
    back: "s_0_2",
    children: ["o_2_3_1", "o_2_3_2"],
  },
  s_0_2_4: {
    title:
      "Does your data include potential risk factors that may affect survival time?",
    back: "s_0_2",
    children: ["o_2_4_1", "o_2_4_2"],
  },

  s_0_3_1: {
    title: "What kind of prediction do you want to make?",
    back: "s_0_3",
    children: ["o_3_1_1", "o_3_1_2", "o_3_1_3", "o_3_1_4", "o_3_1_5"],
  },
  s_0_3_2: {
    title: "Suggested Test",
    back: "s_0_3",
    children: ["o_3_2_1"],
    test: {type:"test", name:"Spearman Rank Order"}
  },
  s_0_3_3: {
    title: "Suggested Test",
    back: "s_0_3",
    children: ["o_3_3_1"],
    test: {type:"test", name:"Multiple Logistic"}
  },

  s_0_4_1: {
    title: "How many groups or treatments are there?",
    back: "s_0_4",
    children: ["o_4_1_1", "o_4_1_2", "o_4_1_3"],
  },
  s_0_4_2: {
    title: "What kind of data do you have?",
    back: "s_0_4",
    children: ["o_4_2_1", "o_4_2_2"],
  },

  s_0_5_1: {
    title: "How many groups or treatments are there?",
    back: "s_0_5",
    children: ["o_5_1_1", "o_5_1_2", "o_5_1_3"],
  },
  s_0_5_2: {
    title: "What kind of data do you have?",
    back: "s_0_5",
    children: ["o_5_2_1", "o_5_2_2"],
  },

  s_0_6_1: {
    title: "Suggested Test",
    back: "s_0_6",
    children: ["o_6_1_1"],
    test: {type:"test", name:"Odds Ratio"}
  },
  s_0_6_2: {
    title: "Suggested Test",
    back: "s_0_6",
    children: ["o_6_2_1"],
    test: {type:"test", name:"Relative Risk"}
  },

  s_0_1_3_1: {
    title: "Suggested Test",
    back: "s_0_1_3",
    children: ["o_1_3_1_1"],
    test: {type:"test", name:"Single Group"}
  },
  s_0_1_3_2: {
    title: "Suggested Test",
    back: "s_0_1_3",
    children: ["o_1_3_1_2"],
    test: {type:"test", name:"Proportional Hazards"}
  },

  s_0_2_1_1: {
    title: "How many groups or treatments are there?",
    back: "s_0_2_1",
    children: [
      "o_2_1_1_1",
      "o_2_1_1_2",
      "o_2_1_1_3",
      "o_2_1_1_4",
      "o_2_1_1_5",
      "o_2_1_1_6",
    ],
  },
  s_0_2_1_2: {
    title: "How many groups or treatments are there?",
    back: "s_0_2_1",
    children: ["o_2_1_2_1", "o_2_1_2_2", "o_2_1_2_3"],
  },

  s_0_2_2_1: {
    title: "How many groups or treatments are there?",
    back: "s_0_2_2",
    children: ["o_2_2_1_1", "o_2_2_1_2"],
  },
  s_0_2_2_2: {
    title: "How many groups or treatments are there?",
    back: "s_0_2_2",
    children: ["o_2_2_2_1", "o_2_2_2_2"],
  },

  s_0_2_3_1: {
    title: "What kind of data do you have?",
    back: "s_0_2_3",
    children: ["o_2_3_1_1", "o_2_3_1_2"],
  },
  s_0_2_3_2: {
    title: "Suggested Test",
    back: "s_0_2_3",
    children: ["o_2_3_2_1"],
    test: {type:"test", name:"McNemar's test"}
  },

  s_0_2_4_1: {
    title: "Are later survival times less accurate?",
    back: "s_0_2_4",
    children: ["o_2_4_1_1", "o_2_4_1_2"],
  },
  s_0_2_4_2: {
    title: "Suggested Test",
    back: "s_0_2_4",
    children: ["o_2_4_2_1"],
    test: {type:"test", name:"Stratified Model"}
  },

  s_0_3_1_1: {
    title: "Suggested Test",
    back: "s_0_3_1",
    children: ["o_3_1_1_1"],
    test: {type:"test", name:"Linear"}
  },
  s_0_3_1_2: {
    title: "Suggested Test",
    back: "s_0_3_1",
    children: ["o_3_1_2_1"],
    test: {type:"test", name:"Deming"}
  },
  s_0_3_1_3: {
    title: "What kind of curve do you want to use?",
    back: "s_0_3_1",
    children: ["o_3_1_3_1"]//, "o_3_1_3_2"],
  },
  s_0_3_1_4: {
    title: "How do you want to specify the independent variables?",
    back: "s_0_3_1",
    children: ["o_3_1_4_1", "o_3_1_4_2"],
  },
  s_0_3_1_5: {
    title: "Suggested Test",
    back: "s_0_3_1",
    children: ["o_3_1_5_1"],
    test: {type:"test", name:"Pearson Product Moment"}
  },

  s_0_4_1_1: {
    title: "Do you want to apply more than one treatment per subject?",
    back: "s_0_4_1",
    children: ["o_4_1_1_1", "o_4_1_1_2"],
  },
  s_0_4_1_2: {
    title: "Suggested Test",
    back: "s_0_4_1",
    children: ["o_4_1_2_1"],
    test: {type:"sample size", name:"Anova"}
  },
  s_0_4_1_3: {
    title: "Suggested Test",
    back: "s_0_4_1",
    children: ["o_4_1_3_1"],
    test: {type:"sample size", name:"Correlation"}
  },

  s_0_4_2_1: {
    title: "Suggested Test",
    back: "s_0_4_2",
    children: ["o_4_2_1_1"],
    test: {type:"sample size", name:"Chi-square"}
  },
  s_0_4_2_2: {
    title: "Suggested Test",
    back: "s_0_4_2",
    children: ["o_4_2_2_1"],
    test: {type:"sample size", name:"Proportions"}
  },

  s_0_5_1_1: {
    title: "Do you want to apply more than one treatment per subject?",
    back: "s_0_5_1",
    children: ["o_5_1_1_1", "o_5_1_1_2"],
  },
  s_0_5_1_2: {
    title: "Suggested Test",
    back: "s_0_5_1",
    children: ["o_5_1_2_1"],
    test: {type:"power", name:"Anova"}

  },
  s_0_5_1_3: {
    title: "Suggested Test",
    back: "s_0_5_1",
    children: ["o_5_1_3_1"],
    test: {type:"power", name:"Correlation"}
  },

  s_0_5_2_1: {
    title: "Suggested Test",
    back: "s_0_5_2",
    children: ["o_5_2_1_1"],
    test: {type:"power", name:"Chi-square"}
  },
  s_0_5_2_2: {
    title: "Suggested Test",
    back: "s_0_5_2",
    children: ["o_5_2_2_1"],
    test: {type:"power", name:"Proportions"}
  },

  s_0_2_1_1_1: {
    title: "Suggested Test",
    back: "s_0_2_1_1",
    children: ["o_2_1_1_1_1"],
    test: {type:"test", name:"One Sample t-test"}

  },
  s_0_2_1_1_2: {
    title: "Suggested Test",
    back: "s_0_2_1_1",
    children: ["o_2_1_1_2_1"],
    test: {type:"test", name:"t test"}
  },
  s_0_2_1_1_3: {
    title: "Suggested Test",
    back: "s_0_2_1_1",
    children: ["o_2_1_1_3_1"],
    test: {type:"test", name:"One Way ANOVA"}
  },
  s_0_2_1_1_4: {
    title: "Suggested Test",
    back: "s_0_2_1_1",
    children: ["o_2_1_1_4_1"],
    test: {type:"test", name:"Two Way ANOVA"}
  },
  s_0_2_1_1_5: {
    title: "Suggested Test",
    back: "s_0_2_1_1",
    children: ["o_2_1_1_5_1"],
    test: {type:"test", name:"Three Way ANOVA"}
  },
  s_0_2_1_1_6: {
    title: "Suggested Test",
    back: "s_0_2_1_1",
    children: ["o_2_1_1_6_1"],
    test: {type:"test", name:"One Way ANCOVA"}
  },

  s_0_2_1_2_1: {
    title: "Suggested Test",
    back: "s_0_2_1_2",
    children: ["o_2_1_2_1_1"],
    test: {type:"test", name:"Paired t-test"}
  },
  s_0_2_1_2_2: {
    title: "Suggested Test",
    back: "s_0_2_1_2",
    children: ["o_2_1_2_2_1"],
    test: {type:"test", name:"One Way Repeated Measures ANOVA"}
  },
  s_0_2_1_2_3: {
    title: "Suggested Test",
    back: "s_0_2_1_2",
    children: ["o_2_1_2_3_1"],
    test: {type:"test", name:"Two Way Repeated Measures ANOVA"}
  },

  s_0_2_2_1_1: {
    title: "Suggested Test",
    back: "s_0_2_2_1",
    children: ["o_2_2_1_1_1"],
    test: {type:"test", name:"Rank Sum Test"}
  },
  s_0_2_2_1_2: {
    title: "Suggested Test",
    back: "s_0_2_2_1",
    children: ["o_2_2_1_2_1"],
    test: {type:"test", name:"ANOVA On Ranks"}
  },

  s_0_2_2_2_1: {
    title: "Suggested Test",
    back: "s_0_2_2_2",
    children: ["o_2_2_2_1_1"],
    test: {type:"test", name:"Signed Rank Test"}
  },
  s_0_2_2_2_2: {
    title: "Suggested Test",
    back: "s_0_2_2_2",
    children: ["o_2_2_2_2_1"],
    test: {type:"test", name:"Repeated Measures ANOVA On Ranks"}
  },

  s_0_2_3_1_1: {
    title: "Suggested Test",
    back: "s_0_2_3_1",
    children: ["o_2_3_1_1_1"],
    test: {type:"test", name:"Chi-square"}
  },
  s_0_2_3_1_2: {
    title: "Suggested Test",
    back: "s_0_2_3_1",
    children: ["o_2_3_1_2_1"],
    test: {type:"test", name:"Z-test"}
  },

  s_0_2_4_1_1: {
    title: "Suggested Test",
    back: "s_0_2_4_1",
    children: ["o_2_4_1_1_1"],
    test: {type:"test", name:"LogRank"}
  },
  s_0_2_4_1_2: {
    title: "Suggested Test",
    back: "s_0_2_4_1",
    children: ["o_2_4_1_2_1"],
    test: {type:"test", name:"Gehan-Breslow"}
  },

  s_0_3_1_3_1: {
    title: "Suggested Test",
    back: "s_0_3_1_3",
    children: ["o_3_1_3_1_1"],
    test: {type:"test", name:"Polynomial"}

  },
  // s_0_3_1_3_2: {
  //   title: "Suggested Test",
  //   back: "s_0_3_1_3",
  //   children: ["o_3_1_3_2_1"],
  //   test: {type:"test", name:"Nonlinear Regression"}  //NOT AVAILABLE
  // },

  s_0_3_1_4_1: {
    title: "Suggested Test",
    back: "s_0_3_1_4",
    children: ["o_3_1_4_1_1"],
    test: {type:"test", name:"Multiple Linear"}
  },

  s_0_3_1_4_2: {
    title: "How do you select the independent variables?",
    back: "s_0_3_1_4",
    children: ["o_3_1_4_2_1", "o_3_1_4_2_2", "o_3_1_4_2_3"],
  },

  s_0_4_1_1_1: {
    title: "Suggested Test",
    back: "s_0_4_1_1",
    children: ["o_4_1_1_1_1"],
    test: {type:"sample size", name:"t-test"}
  },
  s_0_4_1_1_2: {
    title: "Suggested Test",
    back: "s_0_4_1_1",
    children: ["o_4_1_1_2_1"],
    test: {type:"sample size", name:"Paired t-test"}
  },

  s_0_5_1_1_1: {
    title: "Suggested Test",
    back: "s_0_5_1_1",
    children: ["o_5_1_1_1_1"],
    test: {type:"power", name:"t-test"}
  },
  s_0_5_1_1_2: {
    title: "Suggested Test",
    back: "s_0_5_1_1",
    children: ["o_5_1_1_2_1"],
    test: {type:"power", name:"Paired t-test"}
  },

  s_0_3_1_4_2_1: {
    title: "Suggested Test",
    back: "s_0_3_1_4_2",
    children: ["o_3_1_4_2_1_1"],
    test: {type:"test", name:"Forward"}
  },
  s_0_3_1_4_2_2: {
    title: "Suggested Test",
    back: "s_0_3_1_4_2",
    children: ["o_3_1_4_2_2_1"],
    test: {type:"test", name:"Backward"}
  },
  s_0_3_1_4_2_3: {
    title: "Suggested Test",
    back: "s_0_3_1_4_2",
    children: ["o_3_1_4_2_3_1"],
    test: {type:"test", name:"Best Subsets"}
  },
};
