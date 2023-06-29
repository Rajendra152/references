export const setOptions = (property: string, value: any, props: any) => {
    let collection = JSON.parse(JSON.stringify(props.optionsState.optionsCollection));
    setPropertyValue(property, collection, value);
    props.optionsAction.OptionsUpdateCollection({message: collection});
}

export const setPropertyValue = (objProps: string, dataObj: any, value: any) => {
    let propList = objProps.split('.');
    propList.reduce((prev: any, curr: string, index: number) => {
      if(index === (propList.length - 1)) {
        prev[curr] = value;
      }
      return prev ? prev[curr] : null
    }, dataObj);
}
  
export const worksheetValues = (instance: any, ) => {
  
}