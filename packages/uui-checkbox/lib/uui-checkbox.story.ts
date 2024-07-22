import '.';

import { StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Inputs/Checkbox',
  component: 'uui-checkbox',
  id: 'uui-checkbox',
  args: {
    value: 'toggle',
    name: 'toggle',
    error: false,
    label: 'label',
    labelPosition: 'right',
    disabled: false,
    readonly: false,
    checked: false,
    '--uui-checkbox-size': '18px',
  },
  parameters: {
    controls: {
      exclude: ['change'],
    },
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `<uui-checkbox label="Checkbox"></uui-checkbox>`,
      },
    },
  },
};

export const AAAOverview: StoryFn = props => html`
  <uui-checkbox
    style="--uui-checkbox-size: ${props['--uui-checkbox-size']}"
    .value=${props.value}
    .name=${props.name}
    .error=${props.error}
    .label=${props.label}
    .labelPosition=${props.labelPosition}
    ?disabled=${props.disabled}
    ?readonly=${props.readonly}
    ?checked=${props.checked}
    >${props.slot}</uui-checkbox
  >
`;
AAAOverview.args = { label: 'label' };
AAAOverview.storyName = 'Overview';

AAAOverview.argTypes = {
  labelPosition: {
    options: ['left', 'right', 'top', 'bottom'],
    control: 'select',
  },
  slot: { control: { type: 'text' } },
  '--uui-checkbox-size': { control: { type: 'text' } },
};

export const Error: StoryFn = props =>
  html`<div style="display: flex; gap: 20px;">
    <uui-checkbox
      .label=${'Checkbox label'}
      ?error=${props.error}></uui-checkbox>
    <uui-checkbox
      ?error=${props.error}
      .label=${'Checkbox label'}
      checked></uui-checkbox>
    <uui-checkbox
      disabled
      .label=${'Checkbox label'}
      ?error=${props.error}></uui-checkbox>
    <uui-checkbox
      ?error=${props.error}
      disabled
      .label=${'Checkbox label'}
      checked></uui-checkbox>
  </div> `;
Error.args = { error: true };
Error.parameters = {
  controls: { include: ['error'] },
  docs: {
    source: {
      code: `<uui-checkbox label="Checkbox" error></uui-checkbox>`,
    },
  },
};

export const WithSlottedLabel: StoryFn = props => html`
  <uui-checkbox
    .label=${'Checkbox label'}
    ?checked=${props.checked}
    value="checkbox"
    >Using <b>Slot</b> to display label
  </uui-checkbox>
`;
WithSlottedLabel.parameters = {
  controls: { include: ['checked'] },
  docs: {
    source: {
      code: `<uui-checkbox>Using <b>Slot</b> to display label</uui-checkbox>`,
    },
  },
};

export const LabelPosition: StoryFn = props => html`
  <div
    style="display: grid; grid-template-columns: repeat(4, 128px); align-items: center; justify-items: center">
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'left'}
      label-position="left"></uui-checkbox>
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'top'}
      label-position="top"></uui-checkbox>
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'right'}
      label-position="right"></uui-checkbox>
    <uui-checkbox
      ?checked=${props.checked}
      .label=${'bottom'}
      label-position="bottom"></uui-checkbox>
  </div>
`;
LabelPosition.parameters = {
  controls: { include: ['checked'] },
  docs: {
    source: {
      code: `
      <uui-checkbox label-position="left"></uui-checkbox>
      <uui-checkbox label-position="top"></uui-checkbox>
      <uui-checkbox label-position="right"></uui-checkbox>
      <uui-checkbox label-position="bottom"></uui-checkbox>
      `,
    },
  },
};

export const Disabled: StoryFn = props => html`
  <uui-checkbox
    ?disabled=${props.disabled}
    .label=${'Checkbox label'}></uui-checkbox>
  <uui-checkbox
    ?disabled=${props.disabled}
    .label=${'Checkbox label'}
    style="margin-left: 20px;"
    checked></uui-checkbox>
`;
Disabled.args = { disabled: true };
Disabled.parameters = {
  controls: { include: ['disabled'] },
  docs: {
    source: {
      code: `<uui-checkbox label="Checkbox label" disabled></uui-checkbox>`,
    },
  },
};

export const Readonly: StoryFn = props => html`
  <uui-checkbox
    ?readonly=${props.readonly}
    .label=${'Readonly'}
    checked></uui-checkbox>
`;
Readonly.args = { readonly: true };
Readonly.parameters = {
  controls: { include: ['readonly'] },
  docs: {
    source: {
      code: `<uui-checkbox label="Readonly" checked readonly></uui-checkbox>`,
    },
  },
};

export const Indeterminate: StoryFn = props =>  {

  const { label, name, initialValues, parent, options } = props;

  let values = initialValues || [];

  let someChecked = options.some(option => values.includes(option.value));
  let allChecked = options.every(option => values.includes(option.value));

  let prevValues = options.map(opt => ({ ...opt, selected: initialValues.includes(opt.value) }));

  //console.log('prevValues', prevValues);

  const handleOptionChange = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    const eventValue = target.value;
    //const prevValues = options.filter(x => x.selected);

    values = values.includes(eventValue) ? values.filter(v => v !== eventValue) : values.concat(eventValue);

    console.log('handleOptionChange values', values);

    //values = prevValues.includes(eventValue) ? prevValues.filter(v => v !== eventValue) : prevValues.concat(eventValue);
    setValues(values);
  };

  const handleParentChange = (event: InputEvent) => {
    const target = event.target as HTMLInputElement;

    const results = options.map(opt => ({ ...opt, selected: target.checked }));

    prevValues = results.filter(x => x.selected);

    values = prevValues.length === options.length ? options.map(option => option.value) : [];

    console.log('handleParentChange values', values);
    setValues(values);
  };

  const setValues = (values: string[]) => {
    someChecked = values.length > 0;
    allChecked = values.length === options.length;

    console.log('setValues someChecked', someChecked);
    console.log('setValues allChecked', allChecked);
  };

  console.log("someChecked", someChecked);
  console.log("allChecked", allChecked);

  return html`
    <fieldset name=${name} style="border: none;">
      <legend>${label}</legend>
      <uui-checkbox
        value=${parent.value}
        label=${parent.label}
        @change=${handleParentChange}
        name=${name}
        ?indeterminate=${someChecked && !allChecked}
        ?checked=${allChecked}
      ></uui-checkbox>
      <ul style="list-style: none; margin: 0;">
        ${options.map((option) => html`
          <li>
            <uui-checkbox
              value=${option.value}
              label=${option.label}
              @change=${handleOptionChange}
              name=${name}
              ?checked=${values.includes(option.value)}
            ></uui-checkbox>
            ${values}<br>
            ${values.includes(option.value)}
          </li>`
        )}
      </ul>
    </fieldset>`;
}

Indeterminate.args = {
  indeterminate: true,
  label: 'Choose your favorite fruits',
  name: 'indeterminate',
  initialValues: ['mango'],
  parent: {
    label: 'All fruits',
    value: 'all',
  },
  options: [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Banana',
      value: 'banana',
    },
    {
      label: 'Mango',
      value: 'mango',
    },
  ],
 };
Indeterminate.parameters = {
  controls: { include: ['indeterminate'] },
  docs: {
    source: {
      code: `<uui-checkbox label="Indeterminate" indeterminate></uui-checkbox>`,
    },
  },
};
