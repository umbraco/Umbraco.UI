import { html, fixture, expect } from '@open-wc/testing';

import '.';
import '../uui-radio/index';
import { UUIRadioGroup } from './uui-radio-group.element';
import { UUIRadioElement } from '../uui-radio/uui-radio.element';

describe('UuiToggle', () => {
  let element: UUIRadioGroup;
  beforeEach(async () => {
    element = await fixture(html`
      <uui-radio-group>
        <uui-radio value="Value 1">Option 1</uui-radio>
        <uui-radio value="Value 2" label="Option 2" checked></uui-radio>
        <uui-radio value="Value 3">Option 3</uui-radio></uui-radio-group
      >
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('has internals', async () => {
    await expect(element).to.have.property('_internals');
  });
});

describe('UuiToggle in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroup;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form action="">
        <uui-radio-group name="Test">
          <uui-radio value="Value 1">Option 1</uui-radio>
          <uui-radio value="Value 2" label="Option 2" checked></uui-radio>
          <uui-radio value="Value 3">Option 3</uui-radio>
        </uui-radio-group>
      </form>`
    );
    element = formElement.querySelector('uui-radio-group') as any;
  });

  it('form output is empty if element not checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('Value 2');
  });
});
