export const findText = (param: Object, grid, findOptionList) => {
  let gridData = [...grid];
  let recentCell = {}, found = false, update = false;

  const cellUpdate = (a, index, childIndex) =>{
    let cell = { cell: a };
    cell.row = index;
    cell.col = childIndex;
    cell.value = a.value;
    cell.searched = false;
    if (!update) {
      cell.searched = true;
      cell.cell.className = (!cell.cell.className.includes('selected')) ? cell.cell.className + ' selected' : cell.cell.className;
      recentCell = cell;
      update = true;
    }
    findOptionList.push(cell);
  }

  const classUpdate = (element) =>{
    recentCell = element;
    element.searched = true;
    element.cell.className = (!element.cell.className.includes('selected')) ? element.cell.className + ' selected' : element.cell.className;
    found = true;
    return element;
  }

  if (findOptionList.length > 0) {
    for (let i = 0; i < findOptionList.length; i++) {
      const element = findOptionList[i];
      if (element.value == param.value) {
        found = true;
        break;
      }
    }
    if (found) {
      if (param.direction == 'up') {
        let count = findOptionList.length;
        for (let i = count - 1; i >= 0; i--) {
          const element = findOptionList[i];
          if (element.searched == false) {
            classUpdate(element);
            break;
          }
        }
      } else {
        for (let i = 0; i < findOptionList.length; i++) {
          const element = findOptionList[i];
          if (element.searched == false) {
            classUpdate(element);
            break;
          }
        }
      }

    }
  };

  if (!found) {
    gridData.forEach((row, index) => {
      for (let childIndex = 0; childIndex < row.length; childIndex++) {
        const a = row[childIndex];
        if (a.readOnly !== true && param.matchcase == true) {
          if (param.value == a.value) {
            cellUpdate(a, index, childIndex);
          }
        } else if (a.readOnly !== true) {
          if (a.value.toString().includes(param.value)) {
            cellUpdate(a, index, childIndex);
          }
        }
      }
    });
  };

  return {
    recentCell: recentCell,
    grid: grid,
    findOptionList: findOptionList
  }
};
