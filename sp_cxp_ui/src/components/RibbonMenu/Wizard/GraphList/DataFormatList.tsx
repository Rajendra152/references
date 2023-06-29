import * as ConstantImage from '../../../Constant/ConstantImage'
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
//WorksheetColumns
export const XYError1 = "XYError1"; // XYpair
export const YXPairError1 = "YXPairError1" // YXpair
export const XError1 = "XError1"; // SingleX
export const YError1 = "YError1"; // SingleY
export const XYPairsError1 = "XYPairsError1"; // XYPairs
export const ManyYError1 = "ManyYError1"; // ManyY
export const XManyYError1 = "XManyYError1"; // XManyY
export const YXPairsError1 = "YXPairsError1"; // YXPairs
export const ManyXError1 = "ManyXError1"; // ManyX
export const YManyXError1 = "YManyXError1"; // XManyY

//Asymmetric
export const XYError2 = "XYError2"; //XYpair
export const YXPairError2 = "YXPairError2" // YXpair
export const XError2 = "XError2"; // SingleX
export const YError2 = "YError2"; // SingleY
export const XYPairsError2 = "XYPairsError2"; // XYPairs
export const ManyYError2 = "ManyYError2"; // ManyY
export const XManyYError2 = "XManyYError2"; // XManyY
export const YXPairsError2 = "YXPairsError2"; // YXPairs
export const ManyXError2 = "ManyXError2"; // ManyX
export const YManyXError2 = "YManyXError2"; // XManyY

export const XYZMany = "XYZMany"; // XManyY
export const BarErrorSingleY = "BarErrorSingleY";
export const XYpairBubble = "XYpairBubble"; // XYBubblesize
export const YErrorScatter = "YErrorScatter"; // YErrorScatter
export const SingleXBubble = "SingleXBubble";// XBubblesize
export const SingleYBubble = "SingleYBubble"; //YBubblesize


export const typeList =
[
  {
    id: "1", 
    value:"XYpair", 
    title: "XYpair",
    name:"XY Pair", 
    previewImage: ConstantImage.XYPair,
    previewImageText: "One X column, one Y column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "2", 
    value:"SingleX", 
    title: "SingleX", 
    name:"Single X", 
    previewImageText: "One X column, Y data are assumed.",
    previewImage: ConstantImage.SingleX,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "3", 
    value:"SingleY", 
    title: "SingleY", 
    name:"Single Y", 
    previewImageText: "One Y column, X data are assumed.",
    previewImage: ConstantImage.SingleY,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "4", 
    value:"XManyY", 
    title: "XManyY", name:"X Many Y", 
    previewImageText: "One X column and at least one Y column.",
    previewImage: ConstantImage.XManyY,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "5", 
    value:"YManyX", 
    title: "YManyX", 
    name:"Y Many X", 
    previewImageText: "One Y column and at least one X column.",
    previewImage: ConstantImage.YManyX,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "6", 
    value:"ManyX", 
    title: "ManyX", 
    name:"Many X", 
    previewImageText: "At least one X column. Y data are assumed.",
    previewImage: ConstantImage.ManyX,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "7", 
    value:"ManyY", 
    title: "ManyY",
    name:"Many Y", 
    previewImageText: "At least one Y column, X data are assumed.",
    previewImage: ConstantImage.ManyY,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "8", 
    value:"XCategory", 
    title: "XCategory",
    name:"X, Category", 
    previewImageText: "An X column and a column of categories, indexes or levels used to group the data in the corresponding rows.",
     previewImage: ConstantImage.Category, // -  No image
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "9", 
    value:"YCategory",  
    title: "YCategory",
    name:"Y, Category", 
    previewImageText: "An Y column and a column of categories, indexes or levels used to group the data in the corresponding rows.",
    previewImage: ConstantImage.Category,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "10", 
    value:"XYCategory", 
    title: "XYCategory",
    name:"XY Category", 
    previewImageText: "An XY column pair and a category grouping value column",
    previewImage: ConstantImage.CategoryXY,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "11", 
    value:"XYpairs", 
    title: "XYpairs",
    name:"XY Pairs", 
    previewImage: ConstantImage.XYPairs,
    previewImageText: "X and Y columns, at least one pair.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "12", 
    value:"YXpairs", 
    title: "YXpairs",
    name:"YX Pairs",
    previewImage: ConstantImage.YXPairs, 
    previewImageText: "X and Y columns, at least one pair.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "13", 
    value:"XYReplicate", //-noimage
    title: "XYReplicate",
    name:"X, Y Replicate",
    // previewImage: ConstantImage.RepX, 
    previewImageText: "One X column and one Y replicate set.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "14", 
    value:"YReplicate", 
    title: "YReplicate",
    name:"Y Replicate", 
    previewImage: ConstantImage.RepY,
    previewImageText: "One Y replicate set.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "15", 
    value:"XManyYReplicate", 
    title: "XManyYReplicate",
    name:"X, Many Y Replicates", 
    previewImage: ConstantImage.XManyYReps,
    previewImageText: "One X column and many Y replicate sets.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "16", 
    value:"ManyYReplicate", 
    title: "ManyYReplicate",
    name:"Many Y Replicates", 
    previewImage: ConstantImage.RepY,
    previewImageText: "Many Y replicate sets.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "17", 
    value:"CategoryY", //-no image
    title: "CategoryY",
    name:"Category, Y", 
    previewImage: ConstantImage.Category,
    previewImageText: "One column of the categories, cases, or levels, and a Y data column containing the data points in corresponding rows.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "18", 
    value:"CategoryX", 
    title: "CategoryX",
    name:"Category, X",
    previewImage: ConstantImage.Category, 
    previewImageText: "One column of the categories, cases, or levels, and a X data column containing the data points in corresponding rows.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "19", 
    value:"ThetaR", 
    title: "ThetaR",
    name:"Theta R", 
    previewImage: ConstantImage.ThetaR,
    previewImageText: "Theta and R columns, atleast one pair.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "20", 
    value:"ThetaManyR", 
    title: "ThetaManyR",
    name:"Theta Many R", 
    previewImage: ConstantImage.ThetaManyR,
    previewImageText: "One Theta and at least one R column.",
    previewImageTitle:"How is your data organised?"},
  {
    id: "21", 
    value:"RManyTheta", 
    title: "RManyTheta",
    name:"R Many Theta", 
    previewImage: ConstantImage.ThetaManyR,
    previewImageText: "One R column and at least one Theta.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "22", 
    value:"ManyR", 
    title: "ManyR",
    name:"Many R", 
    previewImageText: "At least one R column.",
    previewImage: ConstantImage.ManyR,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "23", 
    value:"ManyTheta", 
    title: "ManyTheta",
    name:"Many Theta", 
    previewImageText: "At least one Theta.",
    previewImage: ConstantImage.ManyTheta,
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "24", 
    value:"LabelManySeries", 
    title: "LabelManySeries",
    name:"Label Many Series", 
    previewImage: ConstantImage.LabelManySeries,
    previewImageText: "One label and at least one Series column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "25", 
    value:"ManyLabel", 
    title: "ManyLabel",
    name:"Many Label",
    previewImage: ConstantImage.LabelManySeries, 
    previewImageText: "At least one label.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "26", 
    value:"ManySeries", 
    title: "ManySeries",
    previewImage: ConstantImage.ManySeries,
    name:"Many Series", 
    previewImageText: "At least one Series column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "27", 
    value:"LabelManySeriesError", 
    title: "LabelManySeriesError",
    previewImage: ConstantImage.LabelManySeriesError,
    name:"Label Many Series Error", 
    previewImageText: "One label and at least one Series column and Error.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "28", 
    value:"ManySeriesError", 
    title: "ManySeriesError",
    previewImage: ConstantImage.ManySeriesError,
    name:"Many Series Error", 
    previewImageText: "At least one Series column and Error.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "29", 
    value:"YXpair", 
    title: "YXpair",
    previewImage: ConstantImage.XYPair ,
    name:"YX Pair", 
    previewImageText: "One X column, one Y column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "30", 
    value:"YXReplicate", //no-image
    title: "YXReplicate",
   // previewImage: ConstantImage.,
    name:"YX Replicate", 
    previewImageText: "One Y column and one X replicate set.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "31", 
    value:"YManyXReplicate", //no-image
    title: "YManyXReplicate",
    //previewImage: ConstantImage.LabelManySeries,
    previewImage: ConstantImage.XManyYReps,
    name:"Y, Many X Replicates", 
    previewImageText: "One Y column and many X replicate sets.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "32", 
    value:"CategoryManyY", 
    title: "CategoryManyY",
    previewImage: ConstantImage.CategoryManyX,
    name:"Category Many Y", 
    previewImageText: "One column of the categories, cases, or levels, and at least one Y data column containing the data points in corresponding rows.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "33", 
    value:"CategoryManyX", 
    title: "CategoryManyX",
    previewImage: ConstantImage.CategoryManyX,
    name:"Category Many X", 
    previewImageText: "One column of the categories, cases, or levels, and at least one X data column containing the data points in corresponding rows.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "34", 
    value:"XYZTriplet", 
    title: "XYZTriplet",
    previewImage: ConstantImage.XYZTriplet,
    name:"XYZ Triplet", 
    previewImageText: "X, Y and Z columns, at least one triplet.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "35", 
    value:"ManyZ", 
    title: "ManyZ",
    previewImage: ConstantImage.ManyZ,
    name:"Many Z", 
    previewImageText: "At least two Z columns required for mesh and counter. XY data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "36", 
    value:"XYManyZ", 
    title: "XYManyZ",
    previewImage: ConstantImage.XYManyZ,
    name:"XY Many Z", 
    previewImageText: "One X column, one Y column, many Z columns; at least two Z columns for mesh and counter plots.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "37", 
    value:"TernaryTriplets", 
    title: "TernaryTriplets",
    previewImage: ConstantImage.TernaryTriplets,
    name:"Ternary Triplets", 
    previewImageText: "X, Y and Z columns, at least one triplet you can skip the last Z column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "38", 
    value:"TernaryXYPairs", 
    title: "TernaryXYPairs",
    previewImage: ConstantImage.TernaryTriplets,
    name:"Ternary XY Pairs",
    previewImageText: "X and Y data columns for ternary graphs. Z columns computed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "39", 
    value:"TernaryYZPairs", 
    title: "TernaryYZPairs",
    previewImage: ConstantImage.TernaryYZPairs,
    name:"Ternary YZ Pairs",
    previewImageText: "Y and Z data columns for ternary graphs. X columns computed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "40", 
    value:"TernaryXZPairs", 
    title: "TernaryXZPairs",
    previewImage: ConstantImage.TernaryYZPairs,
    name:"Ternary XZ Pairs", 
    previewImageText: "X and Z data columns for ternary graphs. Y columns computed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "41", 
    value:"SingleColumn", 
    title: "SingleColumn",
    previewImage: ConstantImage.SingleColumn,
    name:"Single Column", 
    previewImageText: "Single data column. corresponding data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "42", 
    value:"ManyXReplicate", 
    title: "ManyXReplicate",
    previewImage: ConstantImage.ManyXReps,
    name:"Many X Replicates", 
    previewImageText: "Many X replicate sets.",
    previewImageTitle:"How is your data organised?"},
  {
    id: "43", 
    value:"XYXY", //no-image
    title: "XYXY",
    //previewImage: ConstantImage.LabelManySeries,
    name:"XYXY", 
    previewImageText: "Plot data using angles and distance from center",
  previewImageTitle:"How is your data organised?"
  },
  {
    id: "44", 
    value:"XYAM", //-no-image
    title: "XYAM",
    //previewImage: ConstantImage.LabelManySeries,
    name:"XYAM", 
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "45", 
    value:"DifferencesData", 
    title: "Differences Data", //no-image
    //previewImage: ConstantImage.LabelManySeries,
    name:"Differences Data", 
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "46", 
    value:"RatiosData", 
    title: "Ratios Data", //no-image
    //previewImage: ConstantImage.LabelManySeries,
    name:"Ratios Data", 
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "47", 
    value:"XBarpair", 
    title: "XBarpair", //no-image
    //previewImage: ConstantImage.LabelManySeries,
    name:"X Bar Pair", 
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "48", 
    value:"XSetError",
    title: "XSetError", //no-image
    //previewImage: ConstantImage.LabelManySeries,
    name:"X Set Error", 
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "49", 
    value:"ManyXYError", //no-image
    title: "ManyXYError",
    //previewImage: ConstantImage.LabelManySeries,
    name:"Many XY Error", 
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "50", 
    value:"XYError1", 
    title: "XYPair",
    previewImage: ConstantImage.XYPair,
    name:"XY Pair", 
    previewImageText: "One X column, one Y column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "51", 
    value:"XError1",  
    title: "Single X",
    previewImage: ConstantImage.SingleX,
    name:"Single X", 
    previewImageText: "One X column, Y data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "52", 
    value:"YError1", 
    title: "Single Y",
    previewImage: ConstantImage.SingleY,
    name:"Single Y", 
    previewImageText: "One Y column, X data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "53", 
    value:"XYPairsError1", 
    title: "XYPairs",
    previewImage: ConstantImage.XYPairs,
    name:"XY Pairs", 
    previewImageText: "X and Y columns, at least one pair.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "54", 
    value:"XManyYError1", 
    title: "XManyY",
    previewImage: ConstantImage.XManyY,
    name:"X Many Y", 
    previewImageText: "One X column, atleast one Y column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "55", 
    value:"YManyXError1", 
    title: "YManyX",
    previewImage: ConstantImage.YManyX,
    name:"Y Many X", 
    previewImageText: "One Y column, atleast one X column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "56", 
    value:"ManyYError1", 
    title: "ManyY",
    previewImage: ConstantImage.ManyY,
    name:"Many Y", 
    previewImageText: "Atleast one Y column, X data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "57", 
    value:"ManyXError1", 
    title: "ManyX",
    previewImage: ConstantImage.ManyX,
    name:"Many X", 
    previewImageText: "Atleast one X column. Y data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "58", 
    value:"YXPairsError1", 
    title: "YXPairs",
    previewImage: ConstantImage.XYPairs,
    name:"YX Pairs", 
    previewImageText: "Y and X columns, at least one pair.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "59", 
    value:"XYError2", 
    title: "XYPair",
    previewImage: ConstantImage.XYPair,
    name:"XY Pair", 
    previewImageText: "One X column, one Y column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "60",
    value:"XError2", 
    title: "Single X",
    previewImage: ConstantImage.SingleX,
    name:"Single X", 
    previewImageText: "One X column, Y data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "61", 
    value:"YError2", 
    title: "Single Y",
    previewImage: ConstantImage.SingleY,
    name:"Single Y", 
    previewImageText: "One Y column, X data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "62", 
    value:"XYPairsError2", 
    title: "XYPairs",
    previewImage: ConstantImage.XYPairs,
    name:"XY Pairs", 
    previewImageText: "X and Y columns, at least one pair.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "63", 
    value:"XManyYError2", 
    title: "XManyY",
    previewImage: ConstantImage.XManyY,
    name:"X Many Y", 
    previewImageText: "One X column, atleast one Y column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "64", 
    value:"YManyXError2", 
    title: "YManyX",
    previewImage: ConstantImage.YManyX,
    name:"Y Many X", 
    previewImageText: "One Y column and at least one X column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "65", 
    value:"ManyYError2", 
    title: "ManyY",
    previewImage: ConstantImage.ManyY,
    name:"Many Y", 
    previewImageText: "Atleast one Y column, X data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "66", 
    value:"ManyXError2", 
    title: "ManyX",
    previewImage: ConstantImage.ManyX,
    name:"Many X", 
    previewImageText: "Atleast one X column, Y data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "67", 
    value:"YXPairsError2", 
    title: "YXPairs",
    previewImage: ConstantImage.XYPairs,
    name:"YX Pairs", 
    previewImageText: "X and Y columns, at least one pair.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "68", 
    value:"YXPairError1", 
    title: "YXPair",
    previewImage: ConstantImage.YXPairs,
    name:"YX Pair", 
    previewImageText: "One Y column, one X column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "69", 
    value:"YXPairError2", 
    title: "YXPair",
    previewImage: ConstantImage.YXPair,
    name:"YX Pair", 
    previewImageText: "One Y column, one X column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "70", 
    value:"XYZMany", 
    title: "XYZMany",
    //previewImage: ConstantImage.LabelManySeries,
    name:"XYZ Many", 
    previewImage: ConstantImage.XYZTriplet,
    previewImageText: "Plot data using angles and distance from center",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "71", 
    value:"BarErrorSingleY", 
    title: "Single Y",
    previewImage: ConstantImage.SingleY,
    name:"Single Y", 
    previewImageText: "One Y column, one error data.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "72", 
    value:"XYpairBubble", 
    title: "XYPair",
    previewImage: ConstantImage.XYPair,
    name:"XY Pair", 
    previewImageText: "One Y column, one X column and Bubble column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "73", 
    value:"YErrorScatter", 
    title: "Single Y",
    name:"Single Y", 
    previewImageText: "One Y column, X data are assumed.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "74", 
    value:"SingleYBubble", 
    title: "SingleY",
    previewImage: ConstantImage.SingleY,
    name:"Single Y", 
    previewImageText: "One Y column and Bubble size column.",
    previewImageTitle:"How is your data organised?"
  },
  {
    id: "75", 
    value:"SingleXBubble", 
    title: "SingleX",
    previewImage: ConstantImage.SingleX,
    name:"Single X", 
    previewImageText: "One X column and Bubble size column.",
    previewImageTitle:"How is your data organised?"
  },
];
