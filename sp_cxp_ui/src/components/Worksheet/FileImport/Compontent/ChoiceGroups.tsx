import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';



export const ChoiceGroups: React.FunctionComponent = (props) => {
  // [
  //   { key: 'A', text: 'Option A' },
  //   { key: 'B', text: 'Option B' },
  //   { key: 'C', text: 'Option C', disabled: true },
  //   { key: 'D', text: 'Option D' },
  // ]\
  const _onChange = (ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void =>{
  // console.dir(option);
  // return ev;
    props.selectRadio(ev, option);
  }
  const options: IChoiceGroupOption[] = props.itemList;
  return <ChoiceGroup defaultSelectedKey={props.defaultValue} options={options} onChange={props._onChange} label="Pick one" required={true} />;
};

// function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
//   // console.dir(option);
//   // return ev;
//   props._onChange(ev, option);
// }
