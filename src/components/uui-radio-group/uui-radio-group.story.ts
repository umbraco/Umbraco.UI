import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Radio Group',
  component: 'uui-radio-group',
};

export const Overview = () =>
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

export const doubleSelect = () =>
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

export const InFrorm = () =>
  html`
    <form action="">
      <uui-radio-group name="Test">
        <uui-radio .value=${'Value 1'}>Option 1</uui-radio>
        <uui-radio .value=${'Value 3'}>Option 3</uui-radio>
        <uui-radio .value=${'Value 2'} label="Option 2"></uui-radio>
      </uui-radio-group>
    </form>
  `;

export const SelectDisabled = () =>
  html`
    <uui-radio-group name="Test">
      <uui-radio .value=${'Value 1'}>Option 1</uui-radio>
      <uui-radio
        .value=${'Value 2'}
        disabled
        checked
        label="Option 2"
      ></uui-radio>
      <uui-radio .value=${'Value 3'}>Option 3</uui-radio>
    </uui-radio-group>
  `;
