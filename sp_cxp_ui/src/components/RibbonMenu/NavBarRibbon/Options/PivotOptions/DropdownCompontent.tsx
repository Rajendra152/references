import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { Icon } from '@fluentui/react/lib/Icon';
import { Label } from '@fluentui/react/lib/Label';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { IconButton } from '@fluentui/react/lib/Button';

const exampleOptions: IDropdownOption[] = [
  { key: 'A', text: 'Option a', data: { icon: 'Memo' } },
  { key: 'B', text: 'Option b', data: { icon: 'Print' } },
  { key: 'C', text: 'Option c', data: { icon: 'ShoppingCart' } },
  { key: 'D', text: 'Option d', data: { icon: 'Train' } },
  { key: 'E', text: 'Option e', data: { icon: 'Repair' } },
];

const stackTokens: IStackTokens = { childrenGap: 20 };
const iconStyles = { marginRight: '8px' };

const onRenderOption = (option: IDropdownOption): JSX.Element => {
  return (
    <div>
      {option.data && option.data.icon && (
        <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
      )}
      <span>{option.text}</span>
    </div>
  );
};

// const onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
//   const option = options[0];

//   return (
//     <div>
//       {option.data && option.data.icon && (
//         <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
//       )}
//       <span>{option.text}</span>
//     </div>
//   );
// };

// const onRenderCaretDown = (): JSX.Element => {
//   return <Icon iconName="CirclePlus" />;
// };

// const onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
//   return (
//     <div className="dropdownExample-placeholder">
//       <Icon style={iconStyles} iconName={'MessageFill'} aria-hidden="true" />
//       <span>{props.placeholder}</span>
//     </div>
//   );
// };

const dropdownStyles = { dropdown: { width: 300 } };

export const DropdownCompontent: React.FunctionComponent = () => (
  <Stack tokens={stackTokens}>
    <Dropdown
      placeholder="Select an option"
      // label="Custom example"
      ariaLabel="Custom dropdown example"
      // onRenderPlaceholder={onRenderPlaceholder}
      // onRenderTitle={onRenderTitle}
      onRenderOption={onRenderOption}
      // onRenderCaretDown={onRenderCaretDown}
      styles={dropdownStyles}
      options={exampleOptions}
    />
  </Stack>
);
