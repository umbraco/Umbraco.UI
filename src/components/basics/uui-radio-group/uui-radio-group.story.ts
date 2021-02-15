import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Radio Group',
  component: 'uui-radio-group',
};

export const Overview = () =>
  html`
    MAKE SURE THERE CAN ALWAYS BE ONLY ONE SELECTED ELEMENT
    <uui-radio-group name="Test">
      <uui-radio value="Value 1" checked>Option 1</uui-radio>
      <uui-radio value="Value 2" label="Option 2"></uui-radio>
      <uui-radio value="Value 3">Option 3</uui-radio>
      <uui-radio value="Value 4" disabled>Option 4</uui-radio>
      <uui-radio value="Value 5" checked>Option 5</uui-radio>
      <uui-radio value="Value 6">Option 6</uui-radio>
      <uui-radio value="Value 7" disabled>Option 7</uui-radio>
    </uui-radio-group>
    <hr />
    <uui-radio-group>
      <uui-radio value="Value 1">Option 1</uui-radio>
      <uui-radio value="Value 2" label="Option 2"></uui-radio>
      <uui-radio value="Value 3">Option 3</uui-radio>
      <uui-radio value="Value 3" disabled checked>Option 4</uui-radio>
    </uui-radio-group>
  `;

export const InFrorm = () =>
  html`
    <form action="">
      <uui-radio-group name="Test">
        <uui-radio value="Value 1">Option 1</uui-radio>
        <uui-radio value="Value 2" label="Option 2"></uui-radio>
        <uui-radio value="Value 3">Option 3</uui-radio>
      </uui-radio-group>
    </form>
  `;
