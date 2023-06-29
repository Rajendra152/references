import React, { useState } from 'react';
import {
  Stack,
  Label,
  Dropdown,
  BaseButton,
  SpinButton,
  DefaultButton,
  PrimaryButton,
  IDropdownStyles,
  ISpinButtonStyles,
} from '@fluentui/react';
import CommonModalComp from '../../../CommonComp/CommonModalComp';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

// export type BoxProperties = {
//   bgcolor: string;
//   bgendcolor: string;
//   bgopacity: number;
//   bgendopacity: number;
//   bgcolorangle: number;
//   bordercolor: string;
//   borderwidth: number;
// };

export type BoxProperties = {
  bgcolor: string;
  bordercolor: string;
  borderwidth: number;
};

const defaultBoxProperties = {
  bgcolor: 'white',
  bordercolor: 'black',
  borderwidth: 1,
};

const styles: {
  dropdown: Partial<IDropdownStyles>;
  spinbutton: Partial<ISpinButtonStyles>;
} = {
  dropdown: {
    dropdown: { width: 120 },
    root: { display: 'flex', width: '100%' },
    label: { whiteSpace: 'noWrap', width: 110, fontWeight: 400 },
  },
  spinbutton: {
    input: { width: 100 },
    label: { width: 50, fontWeight: 400 },
  },
};

const LegendBoxContent = ({
  hideBoxDialog,
  handleSubmit,
  legendBox,
}: {
  hideBoxDialog: Function;
  handleSubmit: Function;
  legendBox: BoxProperties;
}) => {
  const [boxProperties, setBoxProperties] = useState<BoxProperties>({
    ...defaultBoxProperties,
    ...legendBox,
  });

  return (
    <Stack tokens={{ childrenGap: 10, padding: 10 }}>
      <Stack.Item>
        <Stack tokens={{ childrenGap: 7 }}>
          <Stack.Item grow>
            <CustomColorPicker
              value={boxProperties.bgcolor}
              pickerId="legend-box-color-picker"
              changeFn={(value: string) =>
                setBoxProperties((prev) => ({
                  ...prev,
                  bgcolor: value,
                }))
              }
              label="Fill Color"
            />
          </Stack.Item>
          <Stack.Item grow>
            <CustomColorPicker
              value={boxProperties.bordercolor}
              pickerId="legend-box-bordercolor-picker"
              changeFn={(value: string) =>
                setBoxProperties((prev) => ({
                  ...prev,
                  bordercolor: value,
                }))
              }
              label="Line Color"
            />
          </Stack.Item>
          <Stack.Item grow>
            <Dropdown
              label="Line Type"
              options={[]}
              styles={styles.dropdown}
              disabled
            />
          </Stack.Item>
          <Stack.Item grow>
            <SpinButton
              label="Line Thickness"
              styles={{
                label: { width: 100, fontWeight: 400 },
                spinButtonWrapper: { width: 60 },
              }}
              value={boxProperties.borderwidth.toString()}
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
              min={0}
              onDecrement={() =>
                setBoxProperties((prev) => ({
                  ...prev,
                  borderwidth: prev.borderwidth - 1,
                }))
              }
              onIncrement={() =>
                setBoxProperties((prev) => ({
                  ...prev,
                  borderwidth: prev.borderwidth + 1,
                }))
              }
            />
          </Stack.Item>
          <Stack.Item>
            <div className="insets-container">
              <div className="insets-header">
                <Label style={{ paddingLeft: '0px' }}>Position</Label>
              </div>
            </div>
          </Stack.Item>
          <Stack.Item>
            <Stack horizontal tokens={{ childrenGap: 30 }}>
              <Stack.Item>
                <SpinButton
                  label="Top"
                  disabled
                  styles={styles.spinbutton}
                  incrementButtonAriaLabel="Increase value by 1"
                  decrementButtonAriaLabel="Decrease value by 1"
                />
              </Stack.Item>
              <Stack.Item>
                <SpinButton
                  label="Width"
                  disabled
                  styles={styles.spinbutton}
                  incrementButtonAriaLabel="Increase value by 1"
                  decrementButtonAriaLabel="Decrease value by 1"
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack horizontal tokens={{ childrenGap: 30 }}>
              <Stack.Item>
                <SpinButton
                  label="Left"
                  disabled
                  styles={styles.spinbutton}
                  incrementButtonAriaLabel="Increase value by 1"
                  decrementButtonAriaLabel="Decrease value by 1"
                />
              </Stack.Item>
              <Stack.Item>
                <SpinButton
                  label="Height"
                  disabled
                  styles={styles.spinbutton}
                  incrementButtonAriaLabel="Increase value by 1"
                  decrementButtonAriaLabel="Decrease value by 1"
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item align="end">
        <Stack tokens={{ childrenGap: 5 }} horizontal>
          <PrimaryButton
            text="Apply"
            onClick={() => handleSubmit(boxProperties)}
          />
          <DefaultButton
            text="Cancel"
            onClick={hideBoxDialog as React.MouseEventHandler<BaseButton>}
          />
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

const LegendBox = ({
  hideBoxDialog,
  handleSubmit,
  legendBox,
}: {
  hideBoxDialog: Function;
  handleSubmit: Function;
  legendBox: BoxProperties;
}) => {
  return (
    <CommonModalComp
      close={() => hideBoxDialog()}
      zIndex={101}
      title={
        <Label
          styles={{ root: { fontSize: 20, fontWeight: 600, paddingLeft: 10 } }}
        >
          Object Properties
        </Label>
      }
      customClass=""
      component={
        <LegendBoxContent
          hideBoxDialog={hideBoxDialog}
          handleSubmit={handleSubmit}
          legendBox={legendBox}
        />
      }
    />
  );
};

export default LegendBox;

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
        <Label styles={{ root: { fontWeight: 400 } }}>{label}</Label>
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
