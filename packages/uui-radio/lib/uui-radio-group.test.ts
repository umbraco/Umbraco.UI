import '../define';

import { expect, fixture, html } from '@open-wc/testing';

import { UUIRadioGroupElement } from './uui-radio-group.element';
import { UUIRadioElement } from './uui-radio.element';

describe('UuiRadio', () => {
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
  beforeEach(async () => {
    element = await fixture(html`
      <uui-radio-group>
        <uui-radio .value=${'Value 1'} label="Option 1">Option 1</uui-radio>
        <uui-radio .value=${'Value 2'} label="Option 2"></uui-radio>
        <uui-radio .value=${'Value 3'} label="Option 3">Option 3</uui-radio>
      </uui-radio-group>
    `);
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('has internals', async () => {
    await expect(element).to.have.property('_internals');
  });

  //describe('methods', () => {
  /*
    it('has a focus method', () => {
      expect(element).to.have.property('focus').that.is.a('function');
    });
    */
  /*
    it('focus method sets focus', async () => {
      expect(document.activeElement).not.to.equal(element);
      element.focus();
      expect(document.activeElement).to.equal(element);
    });
    */
  //});

  it('it selects an item', async () => {
    radios[1].check();
    await expect(element.selected).to.equal(1);
  });
});

describe('UuiRadio in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroupElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form action="">
        <uui-radio-group name="Test">
          <uui-radio value="Value 1" label="Option 1">Option 1</uui-radio>
          <uui-radio value="Value 2" label="Option 2" checked></uui-radio>
          <uui-radio value="Value 3" label="Option 3">Option 3</uui-radio>
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

//test double select
//test proagramatically selection
// with none checked
//test if the click works .click()
