// import React from 'react';
// const { IStackTokens, Stack, Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption, ThemeProvider, initializeIcons } = window.FluentUIReact;

// // Initialize icons in case this example uses them
// initializeIcons();

// const dropdownStyles: Partial<IDropdownStyles> = {
//   dropdown: { width: 300 },
 
// };

// const options: IDropdownOption[] = [
//   { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
//   { key: 'apple', text: 'Apple' },
//   { key: 'banana', text: 'Banana' },
//   { key: 'orange', text: 'Orange', disabled: true },
//   { key: 'grape', text: 'Grape' },
//   { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
//   { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
//   { key: 'broccoli', text: 'Broccoli' },
//   { key: 'carrot', text: 'Carrot' },
//   { key: 'lettuce', text: 'Lettuce' },
// ];

// const stackTokens: IStackTokens = { childrenGap: 20 };

// export default function GraphWizardDataSelection() {
//   return (
//     <Stack tokens={stackTokens}>
//       <Dropdown
//         placeholder="Select an option"
//         label="Basic uncontrolled example"
//         options={options}
//         styles={dropdownStyles}
//       />
//     </Stack>
//   );
// };

