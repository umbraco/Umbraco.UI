import { html } from 'lit-html';
import '@umbraco-ui/uui-radio/lib/index';

export default {
  title: 'Inputs/Radio',
  component: 'uui-radio',
};

export const Default = () =>
  html` <uui-radio>Label</uui-radio> <uui-radio label="Hola"></uui-radio>`;

export const Disabled = () => html` <uui-radio>Active</uui-radio>
  <uui-radio disabled>Disabled</uui-radio>
  <uui-radio disabled checked>Selected disabled</uui-radio>`;

export const InAForm = () => html`
  <form id="testForm">
    <uui-radio name="tets" value="test">Active</uui-radio>
  </form>
`;

export const GroupedOverview = () =>
  html`
    MAKE SURE THERE CAN ALWAYS BE ONLY ONE SELECTED ELEMENT
    <button>xxx</button>
    <uui-radio-group name="Test">
      <uui-radio value="Value 1" disabled>Option 1</uui-radio>
      <uui-radio value="Value 2" label="Option 2"></uui-radio>
      <uui-radio value="Value 3">Option 3</uui-radio>
      <uui-radio value="Value 4" disabled>Option 4</uui-radio>
      <uui-radio value="Value 5" checked>Option 5</uui-radio>
      <uui-radio value="Value 6">Option 6</uui-radio>
      <uui-radio value="Value 7" disabled>Option 7</uui-radio>
    </uui-radio-group>
    <button>xxx</button>
  `;

export const GroupedDoubleSelect = () =>
  html`
    If you add more then 1 child with "checked" attribiute it will throw an
    error in the console and no option will be selected
    <uui-radio-group name="Test">
      <uui-radio .value=${'Value 1'} checked>Option 1</uui-radio>
      <uui-radio .value=${'Value 2'} label="Option 2" checked></uui-radio>
      <uui-radio .value=${'Value 3'}>Option 3</uui-radio>
      <uui-radio .value=${'Value 4'} disabled>Option 4</uui-radio>
      <uui-radio .value=${'Value 5'}>Option 5</uui-radio>
      <uui-radio .value=${'Value 6'}>Option 6</uui-radio>
      <uui-radio .value=${'Value 7'} disabled>Option 7</uui-radio>
    </uui-radio-group>
  `;

export const GroupedCheckedFurtherDownTheList = () =>
  html`
    If you add more then 1 child with "checked" attribiute it will throw an
    error in the console and no option will be selected
    <uui-radio-group name="Test">
      <uui-radio .value=${'Value 1'}>Option 1</uui-radio>
      <uui-radio .value=${'Value 2'} label="Option 2"></uui-radio>
      <uui-radio .value=${'Value 3'}>Option 3</uui-radio>
      <uui-radio .value=${'Value 4'} disabled>Option 4</uui-radio>
      <uui-radio .value=${'Value 5'} checked>Option 5</uui-radio>
      <uui-radio .value=${'Value 6'}>Option 6</uui-radio>
      <uui-radio .value=${'Value 7'} disabled>Option 7</uui-radio>
    </uui-radio-group>
  `;

export const GroupedInFrorm = () =>
  html`
    <form action="">
      <uui-radio-group name="Test">
        <uui-radio .value=${'Value 1'}>Option 1</uui-radio>
        <uui-radio .value=${'Value 3'}>Option 3</uui-radio>
        <uui-radio .value=${'Value 2'} label="Option 2"></uui-radio>
      </uui-radio-group>
    </form>
  `;

export const GroupedSelectDisabled = () =>
  html`
    <uui-radio-group name="Test">
      <uui-radio .value=${'Value 1'}>Option 1</uui-radio>
      <uui-radio
        .value=${'Value 2'}
        disabled
        checked
        label="Option 2"></uui-radio>
      <uui-radio .value=${'Value 3'}>Option 3</uui-radio>
    </uui-radio-group>
  `;
