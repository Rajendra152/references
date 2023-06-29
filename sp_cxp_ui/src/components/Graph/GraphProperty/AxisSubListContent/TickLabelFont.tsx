import { useState } from 'react';
import {
  Stack,
  Label,
  Checkbox,
  TextField,
  Dropdown,
  DefaultButton,
  PrimaryButton,
  BaseButton,
  IStyleFunctionOrObject,
  IDropdownStyleProps,
  IDropdownStyles,
  ITextFieldStyleProps,
  ITextFieldStyles,
  SpinButton,
} from '@fluentui/react';
import React from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import CommonModalComp from '../../../CommonComp/CommonModalComp';
import { fontDropdown } from '../../../../utils/graphDailogProperty/differentPropertyList';

export type FontAttr = {
  family: string;
  style: 'Regular' | 'Bold' | 'Italic' | 'Bold Italic';
  color: string;
  size: number;
  underline: boolean;
};

const mapOptions = (options: string[]) =>
  options.map((item) => ({
    key: item,
    text: item.charAt(0).toUpperCase() + item.substring(1),
  }));

const fontStyleOptions = mapOptions([
  'Regular',
  'Bold',
  'Italic',
  'Bold Italic',
]);

const defaultFontAttr = {
  family: 'Times New Roman',
  color: 'black',
  style: 'Regular',
  underline: false,
  size: 10,
};

const styles: {
  dropdown: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
  input: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;
} = {
  dropdown: {
    root: { display: 'flex', width: '100%' },
    dropdown: { width: '100%' },
    label: { paddingRight: 10, whiteSpace: 'noWrap' },
  },
  input: {
    wrapper: { display: 'flex', width: '100%' },
    fieldGroup: { marginLeft: 10 },
  },
};

type CustomColorPickerProps = {
    label: string;
    value: string;
    changeFn: Function;
    pickerId: string;
  };
  
  export const CustomColorPicker = ({
    label,
    value,
    changeFn,
    pickerId,
  }: CustomColorPickerProps) => {
    return (
      <Stack horizontal>
        <Stack.Item styles={{ root: { width: 110 } }}>
          <Label>{label}</Label>
        </Stack.Item>
        <Stack.Item>
          <ColorPickerComponent
            value={value}
            id={pickerId}
            change={(args: any) => changeFn(args.value as string)}
            mode="Palette"
            cssClass="e-hide-value"
          />
        </Stack.Item>
      </Stack>
    );
  };

const TickLabelFontContent = (
  {
  hideFontDialog,
  handleSubmit,
  tickLabelFont,
}: {
  hideFontDialog: Function;
  handleSubmit: Function;
  tickLabelFont: FontAttr;
}) => 
{
  const [fontAttr, setFontAttr] = useState<FontAttr>({
    ...defaultFontAttr,
    ...tickLabelFont,
  });
console.log(fontAttr);
  const fontStyles: React.CSSProperties = {
    fontFamily: fontAttr.family,
    color: fontAttr.color,
    fontSize: fontAttr.size + 5,
    fontStyle: fontAttr.style.includes('Italic') ? 'italic' : 'normal',
    fontWeight: fontAttr.style.includes('Bold') ? 'bold' : 'normal',
    textDecoration: fontAttr.underline ? 'underline' : 'none',
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Stack.Item grow>
        <Dropdown
          label="Font"
          options={fontDropdown()}
          styles={styles.dropdown}
          selectedKey={fontAttr.family}
          onChange={(_, item) =>
            setFontAttr((prev) => ({
              ...prev,
              family: item?.key as string,
            }))
          }
        />
      </Stack.Item>
      <Stack.Item>
        <Stack
          horizontal
          tokens={{ childrenGap: 20 }}
          horizontalAlign="space-between"
        >
          <Stack.Item grow>
            <Dropdown
              label="Style"
              options={fontStyleOptions}
              selectedKey={fontAttr.style}
              styles={styles.dropdown}
              onChange={(_, item) =>
                setFontAttr((prev) => ({
                  ...prev,
                  style: item?.key as
                    | 'Regular'
                    | 'Bold'
                    | 'Italic'
                    | 'Bold Italic',
                }))
              }
            />
          </Stack.Item>
          <Stack.Item>
            <TextField
              label="Size"
              type="number"
              value={fontAttr.size.toString()}
              styles={styles.input}
              onChange={(_, value) =>
                setFontAttr((prev) => ({ ...prev, size: Number(value) }))
              }
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <Stack horizontal tokens={{ childrenGap: 60 }}>
          <Stack.Item grow>
            <Dropdown
              styles={styles.dropdown}
              label="Alignment"
              options={[]}
              disabled
            />
          </Stack.Item>
          <Stack.Item>
            <CustomColorPicker
              pickerId="majorlabel-font-color-picker"
              label="Color"
              value={fontAttr.color}
              changeFn={(value: string) =>
                setFontAttr((prev) => ({
                  ...prev,
                  color: value,
                }))
              }
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <Stack horizontal tokens={{ childrenGap: 30 }}>
          <Stack.Item>
            <SpinButton
              label="Line Spacing"
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
              disabled
            />
          </Stack.Item>
          <Stack.Item>
            <SpinButton
              label="Rotation"
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
              disabled
            />
          </Stack.Item>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <Checkbox
          checked={fontAttr.underline}
          label="Underline"
          onChange={(_, checked) =>
            setFontAttr((prev: FontAttr) => ({ ...prev, underline: !!checked }))
          }
        />
      </Stack.Item>
      <Stack.Item>
        <div
          style={{
            height: 50,
            backgroundColor: 'snow',
            border: '1px solid black',
            padding: 20,
          }}
        >
          <span style={fontStyles}>AaBbYyZz</span>
        </div>
      </Stack.Item>

      <Stack.Item align="end">
        <Stack tokens={{ childrenGap: 20 }} horizontal>
          <PrimaryButton text="Apply" onClick={() => handleSubmit(fontAttr)} />
          <DefaultButton
            text="Cancel"
            onClick={hideFontDialog as React.MouseEventHandler<BaseButton>}
          />
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

const TickLabelFont = ({
  hideFontDialog,
  handleSubmit,
  tickLabelFont,
}: {
  hideFontDialog: Function;
  handleSubmit: Function;
  tickLabelFont: FontAttr;
}) => {
    console.log("<<<<<<<", tickLabelFont);
    console.log("<<<<<<<", handleSubmit);
    if (!tickLabelFont.family) tickLabelFont.family = defaultFontAttr.family;
    if (!tickLabelFont.size) tickLabelFont.size = defaultFontAttr.size;
    if (!tickLabelFont.color) tickLabelFont.color = defaultFontAttr.color;
  return (
    <CommonModalComp
      close={() => hideFontDialog()}
      zIndex={101}
      title="Text Properties"
      customClass=""
      component={
        <TickLabelFontContent
          hideFontDialog={hideFontDialog}
          handleSubmit={handleSubmit}
          tickLabelFont={tickLabelFont}
        />
      }
    />
  );
};

export default TickLabelFont;
