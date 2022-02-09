import '.';

import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import { UUIRadioGroupElement } from './uui-radio-group.element';
import { UUIRadioElement } from './uui-radio.element';
import { UUIRadioGroupEvent } from './UUIRadioGroupEvent';

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

  it('has internals', () => {
    expect(element).to.have.property('_internals');
  });

  describe('properties', () => {
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
    it('has a value property', () => {
      expect(element).to.have.property('value');
    });
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).to.have.property('focus').that.is.a('function');
    });
    it('focus method sets focus on first radio element', () => {
      expect(document.activeElement).not.to.equal(radios[0]);
      element.focus();
      expect(document.activeElement).to.equal(radios[0]);
    });
    it('focus method sets focus on first enabled radio', () => {
      expect(document.activeElement).not.to.equal(radios[0]);
      expect(document.activeElement).not.to.equal(radios[1]);
      radios[0].disabled = true;
      element.focus();
      expect(document.activeElement).to.equal(radios[1]);
    });

    it('has a click method', () => {
      expect(element).to.have.property('click').that.is.a('function');
    });

    it('click method clicks on first radio element', () => {
      expect(document.activeElement).not.to.equal(radios[0]);
      element.click();
      expect(element.value).to.equal(radios[0].value);
    });
    it('click method clicks on first enabled radio', () => {
      expect(document.activeElement).not.to.equal(radios[0]);
      expect(document.activeElement).not.to.equal(radios[1]);
      radios[0].disabled = true;
      element.click();
      expect(element.value).to.equal(radios[1].value);
    });

    it('click does nothing when there is a checked radio', async () => {
      const listener = oneEvent(element, UUIRadioGroupEvent.CHANGE);
      radios[2].click();

      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal(UUIRadioGroupEvent.CHANGE);

      expect(radios[2].checked).to.be.true;
      expect(element.value).to.equal(radios[2].value);

      // Click method on radio-group should then do nothing.
      element.click();
      expect(radios[2].checked).to.be.true;
      expect(element.value).to.equal(radios[2].value);
    });
  });

  it('value is changed when a radio is selected', () => {
    radios[1].click();
    expect(element.value).to.equal(radios[1].value);
  });
});

describe('UuiRadioGroup value', () => {
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
  beforeEach(async () => {
    element = await fixture(html`
      <uui-radio-group>
        <uui-radio .value=${'Value 1'} label="Option 1">Option 1</uui-radio>
        <uui-radio checked .value=${'Value 2'} label="Option 2"></uui-radio>
        <uui-radio .value=${'Value 3'} label="Option 3">Option 3</uui-radio>
      </uui-radio-group>
    `);
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });

  it('value matched the checked radio', () => {
    expect(element.value).to.equal(radios[1].value);
  });

  it('value is changed when clicking another radio', async () => {
    radios[2].click();
    expect(element.value).to.equal(radios[2].value);
  });
});

describe('UuiRadioGroup in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
  beforeEach(async () => {
    formElement = await fixture(
      html` <form action="">
        <uui-radio-group name="Test">
          <uui-radio value="Value 1" label="Option 1">Option 1</uui-radio>
          <uui-radio value="Value 2" label="Option 2"></uui-radio>
          <uui-radio value="Value 3" label="Option 3">Option 3</uui-radio>
        </uui-radio-group>
      </form>`
    );
    element = formElement.querySelector('uui-radio-group') as any;
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });

  it('form output is empty if element not checked', () => {
    expect(element.value).to.equal('');
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal(null);
  });

  it('form output is equivalent to the value of the checked radio', () => {
    radios[1].click();
    expect(element.value).to.equal(radios[1].value);
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('Value 2');
  });

  it('radio gets reset by form-reset', async () => {
    const listener = oneEvent(element, UUIRadioGroupEvent.CHANGE);
    radios[1].click();
    await listener;
    formElement.reset();
    expect(element.value).to.equal('');
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('');
  });
});

describe('UuiRadioGroup when multiple radio childs are checked', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroupElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form action="">
        <uui-radio-group name="Test">
          <uui-radio value="Value 1" label="Option 1">Option 1</uui-radio>
          <uui-radio value="Value 2" label="Option 2" checked></uui-radio>
          <uui-radio value="Value 3" label="Option 3" checked
            >Option 3</uui-radio
          >
        </uui-radio-group>
      </form>`
    );
    element = formElement.querySelector('uui-radio-group') as any;
  });

  it('form output is empty when multiple children was checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('');
  });
});

describe('UuiRadioGroup when one radio child radio is checked', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
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
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });
  it('form output and component value is equal to the value of the child hat was checked', () => {
    expect(element.value).to.equal(radios[1].value);
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).to.be.equal('Value 2');
  });
});
