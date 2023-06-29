import * as Status from './GraphList/DataFormatList';

export const XYpair = [
  { title: 'X', value: '', next: 'Y', data_key: 'x', active: true }
]

export const SingleX = [
  { title: 'X', value: '', next: undefined, data_key: 'x', active: true }
]

export const SingleY = [
  { title: 'Y', value: '', next: undefined, data_key: 'y', active: true }
]

export const XManyY = [
  { title: 'X', value: '', next: 'Y1', data_key: 'x', active: true, yidx: 1 }
]

export const YManyX = [
  { title: 'Y', value: '', next: 'X1', data_key: 'y', active: true, xidx: 1 }
]

export const ManyX = [
  { title: 'X', value: '', next: 'X1', data_key: 'x', active: true, xidx: 1 }
]

export const ManyY = [
  { title: 'Y', value: '', next: 'Y1', data_key: 'y', active: true, yidx: 1 }
]

export const XCategory = [
  { title: 'X', value: '', next: 'Categories', data_key: 'x', active: true }
]

export const YCategory = [
  { title: 'Y', value: '', next: 'Categories', data_key: 'y', active: true }
]

export const XYCategory = [
  { title: 'X', value: '', next: 'Y', data_key: 'x', active: true }
]

export const XYpairs = [
  { title: 'X1', value: '', next: 'Y1', data_key: 'x', active: true, xidx: 1, yidx: 1 }
]

export const XYReplicate = [
  { title: 'X', value: '', next: 'StartSet', data_key: 'x', active: true }
]

export const YReplicate = [
  { title: 'StartSet', value: '', next: 'EndSet', data_key: 'startset', active: true }
]

export const XManyYReplicate = [
  { title: 'X', value: '', next: 'StartSet', data_key: 'x', active: true, sidx: 1, eidx: 1 }
]

export const ManyYReplicate = [
  { title: 'StartSet', value: '', next: 'EndSet', data_key: 'startset', active: true, sidx: 1, eidx: 1 }
]

export const ManyXReplicate = [
  { title: 'StartSet', value: '', next: 'EndSet', data_key: 'startset', active: true, sidx: 1, eidx: 1 }
]

export const CategoryY = [
  { title: 'Categories', value: '', next: 'Y', data_key: 'category', active: true, yidx: 1 }
]


export const CategoryX = [
  { title: 'Categories', value: '', next: 'X', data_key: 'category', active: true, xidx: 1 }
]

export const YXpairs = [
  { title: 'Y1', value: '', next: 'X1', data_key: 'y', active: true, xidx: 1, yidx: 1 }
]

export const ThetaR = [
  { title: 'ThetaR1', value: '', next: 'R1', data_key: 'theta', active: true, TRidx: 1, Ridx: 1 }
]

export const ThetaManyR = [
  { title: 'Theta', value: '', next: 'R1', data_key: 'theta', active: true, Ridx: 1 }
]

export const RManyTheta = [
  { title: 'R', value: '', next: 'Theta1', data_key: 'r', active: true, TRidx: 1 }
]

export const ManyR = [
  { title: 'R', value: '', next: 'R1', data_key: 'r', active: true, Ridx: 1 }
]

export const ManyTheta = [
  { title: 'Theta', value: '', next: 'Theta1', data_key: 'theta', active: true, TRidx: 1 }
]

export const LabelManySeries = [
  { title: 'Label', value: '', next: 'Series1', active: true, SRidx: 1, data_key: 'r' }
]

export const ManyLabel = [
  { title: 'Label', value: '', next: 'Label1', active: true, Lblidx: 1 }
]

export const ManySeries = [
  { title: 'Series', value: '', next: 'Series1', active: true, SRidx: 1, data_key: 'r' }
]

export const LabelManySeriesError = [
  { title: 'Label', value: '', next: 'Series1', active: true, SRidx: 1, data_key: 'r' }
]

export const ManySeriesError = [
  { title: 'Series', value: '', next: 'Error1', active: true, Erridx: 1, data_key: 'r' }
]

export const YXpair = [
  { title: 'Y', value: '', next: 'X', data_key: 'y', active: true }
]

export const YXReplicate = [
  { title: 'Y', value: '', data_key: 'Y', next: 'StartSet', active: true }
]

export const YManyXReplicate = [
  { title: 'Y', value: '', next: 'StartSet', data_key: 'y', active: true, sidx: 1, eidx: 1 }
]

export const CategoryManyY = [
  { title: 'Category', value: '', next: 'Y1', data_key: 'category', active: true, yidx: 1 }
]

export const CategoryManyX = [
  { title: 'Category', value: '', next: 'X1', data_key: 'category', active: true, xidx: 1 }
]

export const XYZTriplet = [
  { title: 'X', value: '', next: 'Y', data_key: 'x', active: true }
]

export const ManyZ = [
  { title: 'First Z', value: '', next: 'Last Z', data_key: 'z', active: true }
]

export const XYManyZ = [
  { title: 'X', value: '', next: 'Y', data_key: 'x', active: true }
]

export const XYZMany = [
  { title: 'X', value: '', next: 'Y', data_key: 'x', active: true }
]


export const TernaryTriplets = [
  { title: 'X1', value: '', next: 'Y1', data_key: 'x', active: true, Xidx: 1, Yidx: 1, Zidx: 1 }
]

export const TernaryXYPairs = [
  { title: 'X1', value: '', next: 'Y1', data_key: 'x', active: true, Xidx: 1, Yidx: 1 }
]
export const TernaryYZPairs = [
  { title: 'Y1', value: '', next: 'Z1', data_key: 'y', active: true, Yidx: 1, Zidx: 1 }
]
export const TernaryXZPairs = [
  { title: 'X1', value: '', next: 'Z1', data_key: 'x', active: true, Xidx: 1, Zidx: 1 }
]

export const SingleColumn = [
  { title: 'Pie', value: '', next: undefined, data_key: 'pie', active: true }
]

export const XYXY = [
  { title: 'X1', value: '', next: 'Y1', data_key: 'x', active: true, xidx: 1, yidx: 1 }
]
// XYAM Pending

export const DifferencesData = [
  { title: 'Studies Names', value: '', next: 'Studies Values', active: true }
]

export const RatiosData = [
  { title: 'Studies Names', value: '', next: 'Studies Values', active: true }
]

export const XBarpair = [
  { title: 'X', value: '', next: 'Bar', data_key: 'x', active: true }
]


export const XSetError = [
  { title: 'X', value: '', next: 'Set', active: true, sidx: 1, eidx: 1 }
]

export const ManyXYError = [
  { title: 'X1', value: '', next: 'Y1', active: true, Xidx: 1, Yidx: 1, Eidx: 1 }
]

export const XYError1 = [
  { title: 'X', value: '', next: 'Y1', data_key: 'x', active: true }
]

export const XError1 = [
  { title: 'X', value: '', next: 'Error1', data_key: 'x', active: true }
]

export const YError1 = [
  { title: 'Y', value: '', next: undefined, data_key: 'y', active: true }
]

export const XYPairsError1 = [
  { title: 'X1', value: '', next: 'Y1', data_key: 'x', active: true, xidx: 1, yidx: 1, eidx: 1 }
]

export const XManyYError1 = [
  { title: 'X', value: '', next: 'Y1', data_key: 'x', active: true, yidx: 1, eidx: 1 }
]

export const YManyXError1 = [
  { title: 'Y', value: '', next: 'X1', data_key: 'y', active: true, xidx: 1, eidx: 1 }
]

export const ManyYError1 = [
  { title: 'Y1', value: '', next: 'Error1', data_key: 'y', active: true, yidx: 2, eidx: 1 }
]

export const ManyXError1 = [
  { title: 'X1', value: '', next: 'Error1', data_key: 'x', active: true, xidx: 2, eidx: 1 }
]

export const YXPairError1 = [
  { title: 'Y', value: '', next: 'X', data_key: 'y', active: true }
]

export const YXPairsError1 = [
  { title: 'Y1', value: '', next: 'X1', data_key: 'y', active: true, xidx: 1, yidx: 1, eidx: 1 }
]

//asymmetric columns

export const XYError2 = [
  { title: 'X', value: '', next: 'Y1', data_key: 'x', active: true }
]


export const XError2 = [
  { title: 'X', value: '', next: 'ErrorUpper', data_key: 'x', active: true }
]

export const YError2 = [
  { title: 'Y', value: '', next: 'ErrorUpper', data_key: 'y', active: true }
]

export const XYPairsError2 = [
  { title: 'X1', value: '', next: 'Y1', data_key: 'x', active: true, xidx: 1, yidx: 1, e1idx: 1, e2idx: 1 }
]

export const XManyYError2 = [
  { title: 'X', value: '', next: 'Y1', data_key: 'x', active: true, yidx: 1, e1idx: 1, e2idx: 1 }
]

export const YManyXError2 = [
  { title: 'Y', value: '', next: 'X1', data_key: 'y', active: true, xidx: 1, e1idx: 1, e2idx: 1 }
]

export const ManyYError2 = [
  { title: 'Y1', value: '', next: 'ErrorUpper', data_key: 'y', active: true, yidx: 1, e1idx: 1, e2idx: 1 }
]

export const ManyXError2 = [
  { title: 'X1', value: '', next: 'ErrorUpper', data_key: 'x', active: true, xidx: 1, e1idx: 1, e2idx: 1 }
]

export const YXPairsError2 = [
  { title: 'Y1', value: '', next: 'X1', data_key: 'y', active: true, xidx: 1, yidx: 1, e1idx: 1, e2idx: 1 }
]

export const BarErrorSingleY = [
  { title: 'bar', value: '', next: 'error', active: true, data_key: 'bar', }
]

export const XYpairBubble = [
  { title: 'X', value: '', next: 'Y', data_key: 'x', active: true }
]

export const YErrorScatter = [
  { title: 'Y', value: '', next: 'error', data_key: 'y', active: true }
]

export const SingleXBubble = [
  { title: 'X', value: '', next: 'Bubble size', data_key: 'x', active: true }
]

export const SingleYBubble = [
  { title: 'Y', value: '', next: 'Bubble size', data_key: 'x', active: true }
]

const nextTarget = (tableList, title, next, datakey) => {
  let Obj = {};
  Obj = { title: title, data_key: datakey, value: '', next: next, active: true };
  tableList.push(Obj);
  return tableList;
}

const manyX = (tableList, currObj, title, idx, data_key) => {
  let Obj = { title: title + currObj[idx], data_key: data_key || title.toLowerCase(), value: '', next: title + currObj[idx] + 1, active: true, [idx]: currObj[idx] + 1 };
  tableList.push(Obj);
  return tableList;
}

const XManyYFun = (tableList, currObj, singleTitle, RepeatTitle, idx, datakey) => {
  let Obj = {};
  if (currObj.title !== singleTitle) {
    if (currObj[idx]) {
      Obj = { title: RepeatTitle + currObj[idx], data_key: datakey || RepeatTitle.toLowerCase(), value: '', next: RepeatTitle + currObj[idx] + 1, active: true, [idx]: currObj[idx] + 1 };
    }
  }
  if (currObj.title == singleTitle) {
    Obj = { title: RepeatTitle + '1', data_key: datakey || RepeatTitle.toLowerCase(), value: '', next: RepeatTitle + '2', active: true, [idx]: 2 };
  }
  tableList.push(Obj);
  return tableList;
}


export const findTarget = (tableList, currObj, currStep) => {
  if (currStep == Status.XYpair) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'Y', value: '', data_key: 'y', next: undefined, active: true };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XBarpair) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'Bar', value: '', data_key: 'bar', next: undefined, active: true };
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
      let Obj = { title: 'Categories', value: '', next: undefined, data_key: 'category', active: true };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YCategory) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'Categories', value: '', next: undefined, data_key: 'category', active: true };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XYCategory) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title == 'Y') {
        Obj = { title: 'Categories', data_key: 'category', value: '', next: undefined, active: true };
      }
      if (currObj.title == 'X') {
        Obj = { title: 'Y', value: '', data_key: 'y', next: 'Categories', active: true };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XYpairs) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx + 1, yidx: currObj.yidx }
      } else {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XYReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'StartSet', value: '', next: 'EndSet', data_key: 'startset', active: true }
      }
      if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet', value: '', next: undefined, data_key: 'endset', active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet', value: '', next: undefined, data_key: 'endset', active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XManyYReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'StartSet' + currObj.sidx, value: '', data_key: 'startset', next: 'EndSet' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx }
      } else if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet' + currObj.eidx, value: '', data_key: 'endset', next: 'StartSet' + currObj.sidx, active: true, sidx: currObj.sidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('EndSet')) {
        Obj = { title: 'StartSet' + currObj.sidx, data_key: 'startset', value: '', next: 'EndSet' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YManyXReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = { title: 'StartSet' + currObj.sidx, value: '', data_key: 'startset', next: 'EndSet' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx }
      } else if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet' + currObj.eidx, value: '', data_key: 'endset', next: 'StartSet' + currObj.sidx, active: true, sidx: currObj.sidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('EndSet')) {
        Obj = { title: 'StartSet' + currObj.sidx, data_key: 'startset', value: '', next: 'EndSet' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.ManyYReplicate || currStep == Status.ManyXReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet' + currObj.eidx, value: '', data_key: 'endset', next: 'StartSet' + currObj.sidx, active: true, sidx: currObj.sidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('EndSet')) {
        Obj = { title: 'StartSet' + currObj.sidx, value: '', data_key: 'startset', next: 'EndSet' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.CategoryY) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'Y', active: true, yidx: currObj.yidx + 1 };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.CategoryX) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'X', active: true, xidx: currObj.xidx + 1 };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YXpairs) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx + 1, yidx: currObj.yidx }
      } else {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.ThetaR) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Theta')) {
        Obj = { title: 'R' + currObj.Ridx, data_key: 'r', value: '', next: 'ThetaR' + currObj.TRidx, active: true, TRidx: currObj.TRidx + 1, Ridx: currObj.Ridx }
      } else {
        Obj = { title: 'ThetaR' + currObj.TRidx, data_key: 'theta', value: '', next: 'R' + currObj.Ridx, active: true, TRidx: currObj.TRidx, Ridx: currObj.Ridx + 1 }
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
      return XManyYFun(tableList, currObj, 'R', 'Theta', 'TRidx', 'theta');
    }
  }

  if (currStep == Status.ManyR) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'R', 'Ridx', 'theta');
    }
  }

  if (currStep == Status.ManyTheta) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Theta', 'TRidx', 'theta');
    }
  }


  if (currStep == Status.LabelManySeries) {
    if (currObj.next !== undefined) {
      return XManyYFun(tableList, currObj, 'Label', 'Series', 'SRidx', 'theta');
    }
  }

  if (currStep == Status.ManyLabel) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Label', 'Lblidx');
    }
  }

  if (currStep == Status.ManySeries) {
    if (currObj.next !== undefined) {
      return manyX(tableList, currObj, 'Series', 'SRidx', 'theta');
    }
  }

  if (currStep == Status.LabelManySeriesError || currStep == Status.ManySeriesError) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Error') || currObj.title.includes('Label')) {
        Obj = { data_key: 'theta', title: 'Series' + ((currObj.SRidx) ? currObj.SRidx : 1), value: '', next: 'Error' + currObj.Erridx, active: true, Erridx: currObj.Erridx + 1, SRidx: ((currObj.SRidx) ? currObj.SRidx : 1) }
      } else if (currObj.title.includes('Series')) {
        Obj = { data_key: 'theta', title: 'Error' + ((currObj.Erridx) ? currObj.Erridx : 1), value: '', next: 'Series' + currObj.SRidx, active: true, Erridx: ((currObj.Erridx) ? currObj.Erridx : 1), SRidx: currObj.SRidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
      // return manyX( tableList, currObj, Status.ManySeries, 'Series', 'SRidx');
    }
  }

  if (currStep == Status.YXpair) {
    if (currObj.next !== undefined) {
      let Obj = { title: 'X', data_key: 'x', value: '', next: undefined, active: true };
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YXReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = { title: 'StartSet', value: '', next: 'EndSet', active: true }
      }
      if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet', value: '', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.YManyXReplicate) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = { title: 'StartSet' + currObj.sidx, value: '', next: 'EndSet' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx }
      } else if (currObj.title.includes('StartSet')) {
        Obj = { title: 'EndSet' + currObj.eidx, value: '', next: 'StartSet' + currObj.sidx, active: true, sidx: currObj.sidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('EndSet')) {
        Obj = { title: 'StartSet' + currObj.sidx, value: '', next: 'EndSet' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.CategoryManyY) {
    if (currObj.next !== undefined) return XManyYFun(tableList, currObj, 'Category', 'Y', 'yidx');
  }

  if (currStep == Status.CategoryManyX) {
    if (currObj.next !== undefined) return XManyYFun(tableList, currObj, 'Category', 'X', 'xidx');
  }

  if (currStep == Status.XYZTriplet) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Y') return nextTarget(tableList, 'Y', 'Z', 'y');

      if (currObj.next == 'Z') return nextTarget(tableList, 'Z', undefined, 'z');

    }
  }

  if (currStep == Status.ManyZ) {
    if (currObj.next !== undefined) return nextTarget(tableList, 'Last Z', undefined, 'z');
  }

  if (currStep == Status.XYManyZ) {
    if (currObj.next !== undefined) {
      if (currObj.next == 'Y') return nextTarget(tableList, 'Y', 'First Z', 'y');

      if (currObj.next == 'First Z') return nextTarget(tableList, 'First Z', 'Last Z', 'z');

      if (currObj.next == 'Last Z') return nextTarget(tableList, 'Last Z', undefined, 'z');

    }
  }

  if (currStep == Status.XYZMany) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'Y', data_key: 'y', value: '', next: 'Z1', active: true, Zidx: 1 };
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Y')) {
        let Obj = { title: 'Z' + currObj.Zidx, data_key: 'z', value: '', next: 'Z' + currObj.Zidx, active: true, Zidx: currObj.Zidx + 1 }
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Z')) {
        let Obj = { title: 'Z' + currObj.Zidx, data_key: 'z', value: '', next: 'Z' + currObj.Zidx, active: true, Zidx: currObj.Zidx + 1 }
        tableList.push(Obj);
        return tableList;
      }
    }

  }

  if (currStep == Status.TernaryTriplets) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('X')) {
        let Obj = { title: 'Y' + currObj.Yidx, data_key: 'y', value: '', next: 'Z' + currObj.Zidx, active: true, Xidx: currObj.Xidx + 1, Yidx: currObj.Yidx, Zidx: currObj.Zidx }
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Y')) {
        let Obj = { title: 'Z' + currObj.Zidx, data_key: 'z', value: '', next: 'X' + currObj.Xidx, active: true, Xidx: currObj.Xidx, Yidx: currObj.Yidx + 1, Zidx: currObj.Zidx }
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Z')) {
        let Obj = { title: 'X' + currObj.Xidx, data_key: 'x', value: '', next: 'Y' + currObj.Yidx, active: true, Xidx: currObj.Xidx, Yidx: currObj.Yidx, Zidx: currObj.Zidx + 1 }
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.TernaryXYPairs) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('X')) {
        let Obj = { title: 'Y' + currObj.Yidx, data_key: 'y', value: '', next: 'X' + currObj.Xidx, active: true, Xidx: currObj.Xidx + 1, Yidx: currObj.Yidx }
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Y')) {
        let Obj = { title: 'X' + currObj.Xidx, data_key: 'x', value: '', next: 'Y' + currObj.Yidx, active: true, Xidx: currObj.Xidx, Yidx: currObj.Yidx + 1 }
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.TernaryYZPairs) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('Y')) {
        let Obj = { title: 'Z' + currObj.Zidx, data_key: 'z', value: '', next: 'Y' + currObj.Yidx, active: true, Zidx: currObj.Zidx, Yidx: currObj.Yidx + 1 }
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Z')) {
        let Obj = { title: 'Y' + currObj.Yidx, data_key: 'y', value: '', next: 'Z' + currObj.Zidx, active: true, Zidx: currObj.Zidx + 1, Yidx: currObj.Yidx }
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.TernaryXZPairs) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('X')) {
        let Obj = { title: 'Z' + currObj.Zidx, data_key: 'z', value: '', next: 'X' + currObj.Xidx, active: true, Zidx: currObj.Zidx, Xidx: currObj.Xidx + 1 }
        tableList.push(Obj);
        return tableList;
      }
      if (currObj.title.includes('Z')) {
        let Obj = { title: 'X' + currObj.Xidx, data_key: 'x', value: '', next: 'Z' + currObj.Zidx, active: true, Zidx: currObj.Zidx + 1, Xidx: currObj.Xidx }
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.XYXY) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X') && (currObj.xidx < 3)) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx + 1, yidx: currObj.yidx }
        tableList.push(Obj);
        return tableList;
      } else if (currObj.title.includes('Y') && (currObj.yidx < 2)) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx + 1 }
        tableList.push(Obj);
        return tableList;
      }
    }
  }

  if (currStep == Status.DifferencesData || currStep == Status.RatiosData) {
    if (currObj.next !== undefined) {
      let Obj = {}, title = currObj.title.toLowerCase()
      if (title == 'studies names') {
        Obj = { title: 'Studies Values', value: '', next: 'Studies LCLs', active: true }
      }
      if (title == 'studies values') {
        Obj = { title: 'Studies LCLs', value: '', next: 'Studies UCLs', active: true }
      }
      if (title == 'studies lcls') {
        Obj = { title: 'Studies UCLs', value: '', next: 'Studies Weights', active: true }
      }
      if (title == 'studies ucls') {
        Obj = { title: 'Studies Weights', value: '', next: 'Overall Value', active: true }
      }
      if (title == 'studies weights') {
        Obj = { title: 'Overall Value', value: '', next: 'Overall LCL', active: true }
      }
      if (title == 'overall value') {
        Obj = { title: 'Overall LCL', value: '', next: 'Overall UCL', active: true }
      }
      if (title == 'overall lcl') {
        Obj = { title: 'Overall UCL', value: '', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.XSetError) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'Set' + currObj.sidx, value: '', next: 'End' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx }
      } else if (currObj.title.includes('Set')) {
        Obj = { title: 'End' + currObj.eidx, value: '', next: 'Set' + currObj.sidx, active: true, sidx: currObj.sidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('End')) {
        Obj = { title: 'Set' + currObj.sidx, value: '', next: 'End' + currObj.eidx, active: true, sidx: currObj.sidx, eidx: currObj.eidx + 1 }
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
        Obj = { title: 'Y' + currObj.Yidx, value: '', data_key: 'y', next: 'Y Error' + currObj.Eidx, active: true, Yidx: currObj.Yidx, Eidx: currObj.Eidx, Xidx: currObj.Xidx + 1 }
      } else if (currObj.title.includes('Error')) {
        Obj = { title: 'X' + currObj.Xidx, value: '', data_key: 'x', next: 'Y' + currObj.Yidx, active: true, Xidx: currObj.Xidx, Yidx: currObj.Yidx, Eidx: currObj.Eidx + 1 }
      } else if (currObj.title.includes('Y')) {
        Obj = { title: 'Y Error' + currObj.Eidx, data_key: 'error', value: '', next: 'X' + currObj.Xidx, active: true, Xidx: currObj.Xidx, Eidx: currObj.Eidx, Yidx: currObj.Yidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //Worksheet columns

  if (currStep == Status.XYError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('X')) {
        Obj = { title: 'Y', value: '', data_key: 'y', next: 'Error1', active: true }
      } else if (currObj.title.includes('Y')) {
        Obj = { title: 'Error', value: '', data_key: 'error1', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  // YX pair

  if (currStep == Status.YXPairError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('Y')) {
        Obj = { title: 'X', value: '', data_key: 'x', next: 'Error1', active: true }
      } else if (currObj.title.includes('X')) {
        Obj = { title: 'Error', value: '', data_key: 'error1', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //Single X error

  if (currStep == Status.XError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('X')) {
        Obj = { title: 'Error1', value: '', data_key: 'error1', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //Single Y error


  if (currStep == Status.YError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('Y')) {
        Obj = { title: 'Error1', value: '', data_key: 'error1', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //XY pairs Error

  if (currStep == Status.XYPairsError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'Error' + currObj.eidx, active: true, xidx: currObj.xidx + 1, yidx: currObj.yidx, eidx: currObj.eidx }
      } else if (currObj.title.includes('Y')) {
        Obj = { title: 'Error' + currObj.eidx, data_key: 'error1', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('Error')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //XManyY Error

  if (currStep == Status.XManyYError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X') || currObj.title.includes('Error')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'Error' + currObj.eidx, active: true, yidx: currObj.yidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('Y')) {
        Obj = { title: 'Error' + currObj.eidx, data_key: 'error1', value: '', next: 'Y' + currObj.yidx, active: true, yidx: currObj.yidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //ManyY Error

  if (currStep == Status.ManyYError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Error')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'Error' + currObj.eidx, active: true, yidx: currObj.yidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('Y')) {
        Obj = { title: 'Error' + currObj.eidx, data_key: 'error1', value: '', next: 'Y' + currObj.yidx, active: true, yidx: currObj.yidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }


  //YManyX Error

  if (currStep == Status.YManyXError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y') || currObj.title.includes('Error')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Error' + currObj.eidx, active: true, xidx: currObj.xidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('X')) {
        Obj = { title: 'Error' + currObj.eidx, data_key: 'error1', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //ManyX Error

  if (currStep == Status.ManyXError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Error')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Error' + currObj.eidx, active: true, xidx: currObj.xidx + 1, eidx: currObj.eidx }
      } else if (currObj.title.includes('X')) {
        Obj = { title: 'Error' + currObj.eidx, data_key: 'error1', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }



  //YX pairs Error

  if (currStep == Status.YXPairsError1) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Error' + currObj.eidx, active: true, yidx: currObj.yidx + 1, xidx: currObj.xidx, eidx: currObj.eidx }
      } else if (currObj.title.includes('X')) {
        Obj = { title: 'Error' + currObj.eidx, data_key: 'error1', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx + 1, yidx: currObj.yidx, eidx: currObj.eidx }
      } else if (currObj.title.includes('Error')) {
        Obj = { title: 'Y' + currObj.xidx, data_key: 'y', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx, eidx: currObj.eidx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  // Asymmetric columns  

  if (currStep == Status.XYError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('X')) {
        Obj = { title: 'Y', value: '', data_key: 'y', next: 'ErrorUpper', active: true }
      } else if (currObj.title.includes('Y')) {
        Obj = { title: 'ErrorUpper', value: '', data_key: 'error1', next: 'ErrorLower', active: true }
      } else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower', value: '', data_key: 'error2', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  // YX pair

  if (currStep == Status.YXPairError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('Y')) {
        Obj = { title: 'X', value: '', data_key: 'x', next: 'ErrorUpper', active: true }
      } else if (currObj.title.includes('X')) {
        Obj = { title: 'ErrorUpper', value: '', data_key: 'error1', next: 'ErrorLower', active: true }
      } else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower', value: '', data_key: 'error2', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }


  //Single X error

  if (currStep == Status.XError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('X')) {
        Obj = { title: 'ErrorUpper', value: '', data_key: 'error1', next: 'ErrorLower', active: true }
      } else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower', value: '', data_key: 'error2', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //   //Single Y error


  if (currStep == Status.YError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      // Don't change if condition order....
      if (currObj.title.includes('Y')) {
        Obj = { title: 'ErrorUpper', value: '', data_key: 'error1', next: 'Errorlower', active: true }
      } else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'Errorlower', value: '', data_key: 'error2', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //   //XY pairs Error

  if (currStep == Status.XYPairsError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'ErrorUpper' + currObj.e1idx, active: true, xidx: currObj.xidx + 1, yidx: currObj.yidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('Y')) {
        Obj = { title: 'ErrorUpper' + currObj.e1idx, data_key: 'error1', value: '', next: 'ErrorLower' + currObj.e2idx, active: true, xidx: currObj.xidx, yidx: currObj.yidx + 1, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower' + currObj.e2idx, data_key: 'error2', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx, e1idx: currObj.e1idx + 1, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorLower')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //   //XManyY Error

  if (currStep == Status.XManyYError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X') || currObj.title.includes('ErrorLower')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'ErrorUpper' + currObj.e1idx, active: true, yidx: currObj.yidx + 1, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('Y')) {
        Obj = { title: 'ErrorUpper' + currObj.e1idx, data_key: 'error1', value: '', next: 'ErrorLower' + currObj.e2idx, active: true, yidx: currObj.yidx, e1idx: currObj.e1idx + 1, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower' + currObj.e1idx, data_key: 'error2', value: '', next: 'Y' + currObj.yidx, active: true, yidx: currObj.yidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx + 1 }
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  //   //ManyY Error

  if (currStep == Status.ManyYError2) {
    if (currObj.next !== undefined) {
      let Obj = {};

      if (currObj.title.includes('Y')) {
        Obj = { title: 'ErrorUpper' + currObj.e1idx, data_key: 'error1', value: '', next: 'ErrorLower' + currObj.e2idx, active: true, yidx: currObj.yidx + 1, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower' + currObj.e2idx, data_key: 'error2', value: '', next: 'Y' + currObj.yidx, active: true, yidx: currObj.yidx, e1idx: currObj.e1idx + 1, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorLower')) {
        Obj = { title: 'Y' + currObj.yidx, data_key: 'y', value: '', next: 'ErrorUpper' + currObj.e1idx, active: true, yidx: currObj.yidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx + 1 }
      }


      tableList.push(Obj);
      return tableList;
    }
  }


  //   //YManyX Error

  if (currStep == Status.YManyXError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y') || currObj.title.includes('ErrorLower')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'ErrorUpper' + currObj.e1idx, active: true, xidx: currObj.xidx + 1, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('X')) {
        Obj = { title: 'ErrorUpper' + currObj.e1idx, data_key: 'error1', value: '', next: 'ErrorLower' + currObj.e2idx, active: true, xidx: currObj.xidx, e1idx: currObj.e1idx + 1, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower' + currObj.e2idx, data_key: 'error2', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx + 1 }
      }

      tableList.push(Obj);
      return tableList;
    }
  }

  //   //ManyX Error

  if (currStep == Status.ManyXError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('X')) {
        Obj = { title: 'ErrorUpper' + currObj.e1idx, data_key: 'error1', value: '', next: 'ErrorLower' + currObj.e2idx, active: true, xidx: currObj.xidx + 1, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower' + currObj.e2idx, data_key: 'error2', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx, e1idx: currObj.e1idx + 1, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorLower')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'ErrorUpper' + currObj.e1idx, active: true, xidx: currObj.xidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx + 1 }
      }

      tableList.push(Obj);
      return tableList;
    }
  }



  // //YX pairs Error

  if (currStep == Status.YXPairsError2) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = { title: 'X' + currObj.xidx, data_key: 'x', value: '', next: 'ErrorUpper' + currObj.e1idx, active: true, xidx: currObj.xidx, yidx: currObj.yidx + 1, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('X')) {
        Obj = { title: 'ErrorUpper' + currObj.e1idx, data_key: 'error1', value: '', next: 'ErrorLower' + currObj.e2idx, active: true, xidx: currObj.xidx + 1, yidx: currObj.yidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorUpper')) {
        Obj = { title: 'ErrorLower' + currObj.e2idx, data_key: 'error2', value: '', next: 'Y' + currObj.yidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx, e1idx: currObj.e1idx + 1, e2idx: currObj.e2idx }
      }

      else if (currObj.title.includes('ErrorLower')) {
        Obj = { title: 'Y' + currObj.xidx, data_key: 'y', value: '', next: 'X' + currObj.xidx, active: true, xidx: currObj.xidx, yidx: currObj.yidx, e1idx: currObj.e1idx, e2idx: currObj.e2idx + 1 }
      }

      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.BarErrorSingleY) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('bar')) {
        Obj = { title: 'error', data_key: 'error', value: '', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }

  }

  if (currStep == Status.XYpairBubble) {
    if (currObj.next !== undefined) {
      if (currObj.title.includes('X')) {
        let Obj = { title: 'Y', value: '', data_key: 'y', next: 'Bubble Size', active: true };
        tableList.push(Obj);
      }
      else if (currObj.title.includes('Y')) {
        let Obj = { title: 'Bubble Size', value: '', data_key: 'bubblesize', next: undefined, active: true };
        tableList.push(Obj);
      }

      return tableList;
    }
  }

  if (currStep == Status.YErrorScatter) {
    if (currObj.next !== undefined) {
      let Obj = {};
      if (currObj.title.includes('Y')) {
        Obj = { title: 'error', data_key: 'error', value: '', next: undefined, active: true }
      }
      tableList.push(Obj);
      return tableList;
    }

  }

  if (currStep == Status.SingleXBubble) {
    if (currObj.next !== undefined) {
      let Obj = {}
      if (currObj.title.includes('X')) {
        Obj = { title: 'Bubble Size', value: '', data_key: 'bubblesize', next: undefined, active: true };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

  if (currStep == Status.SingleYBubble) {
    if (currObj.next !== undefined) {
      let Obj = {}
      if (currObj.title.includes('Y')) {
        Obj = { title: 'Bubble Size', value: '', data_key: 'bubblesize', next: undefined, active: true };
      }
      tableList.push(Obj);
      return tableList;
    }
  }

}
