import './radio.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';

import { UUIRadioGroupElement } from './radio-group.element';
import { UUIRadioElement } from './radio.element';
import { UUIRadioGroupEvent } from './UUIRadioGroupEvent';

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UUIRadio', () => {
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
  beforeEach(async () => {
    element = render(html`
      <uui-radio-group name="groupname">
        <uui-radio .value=${'Value 1'} label="Option 1">Option 1</uui-radio>
        <uui-radio .value=${'Value 2'} label="Option 2"></uui-radio>
        <uui-radio .value=${'Value 3'} label="Option 3">Option 3</uui-radio>
      </uui-radio-group>
    `).container.querySelector('uui-radio-group')!;

    await element.updateComplete;
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  it('is defined with its own instance', () => {
    expect(element).toBeInstanceOf(UUIRadioGroupElement);
  });

  it('has internals', () => {
    expect(element).toHaveProperty('_internals');
  });

  describe('properties', () => {
    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
    it('has a value property', () => {
      expect(element).toHaveProperty('value');
    });
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).toHaveProperty('focus');
    });
    it('focus method sets focus on first radio element', async () => {
      expect(document.activeElement).not.toBe(radios[0]);
      await element.focus();
      expect(document.activeElement).toBe(radios[0]);
    });
    it('focus method sets focus on first enabled radio', async () => {
      expect(document.activeElement).not.toBe(radios[0]);
      expect(document.activeElement).not.toBe(radios[1]);
      radios[0].disabled = true;
      await element.focus();
      expect(document.activeElement).toBe(radios[1]);
    });

    it('has a click method', () => {
      expect(element).toHaveProperty('click');
    });

    it('click method clicks on first radio element', async () => {
      expect(document.activeElement).not.toBe(radios[0]);
      await element.click();
      expect(element.value).toBe(radios[0].value);
    });
    it('click method clicks on first enabled radio', async () => {
      expect(document.activeElement).not.toBe(radios[0]);
      expect(document.activeElement).not.toBe(radios[1]);
      radios[0].disabled = true;
      await element.click();
      expect(element.value).toBe(radios[1].value);
    });

    it('click does nothing when there is a checked radio', async () => {
      const listener = oneEvent(element, UUIRadioGroupEvent.CHANGE);
      radios[2].click();

      const event = await listener;
      expect(event).not.toBe(null);
      expect(event.type).toBe(UUIRadioGroupEvent.CHANGE);

      expect(radios[2].checked).toBe(true);
      expect(element.value).toBe(radios[2].value);

      // Click method on radio-group should then do nothing.
      element.click();
      expect(radios[2].checked).toBe(true);
      expect(element.value).toBe(radios[2].value);
    });
  });

  it('value is changed when a radio is selected', () => {
    radios[1].click();
    expect(element.value).toBe(radios[1].value);
  });
});

describe('UuiRadioGroup value', () => {
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
  beforeEach(async () => {
    element = render(html`
      <uui-radio-group>
        <uui-radio .value=${'Value 1'} label="Option 1">Option 1</uui-radio>
        <uui-radio checked .value=${'Value 2'} label="Option 2"></uui-radio>
        <uui-radio .value=${'Value 3'} label="Option 3">Option 3</uui-radio>
      </uui-radio-group>
    `).container.querySelector('uui-radio-group')!;

    await element.updateComplete;
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });

  it('value matched the checked radio', () => {
    expect(element.value).toBe(radios[1].value);
  });

  it('value is changed when clicking another radio', async () => {
    radios[2].click();
    expect(element.value).toBe(radios[2].value);
  });

  it('name is propagated to radio children', () => {
    expect(element.name).toBe(radios[0].name);
    expect(element.name).toBe(radios[1].name);
    expect(element.name).toBe(radios[2].name);
  });

  it('disabled is propagated to radio children', () => {
    expect(element.disabled).toBe(radios[0].disabled);
    expect(element.disabled).toBe(radios[1].disabled);
    expect(element.disabled).toBe(radios[2].disabled);
  });

  it('disabled state on radio-group is reflected on radio children', async () => {
    element.disabled = true;
    await element.updateComplete;
    expect(element.disabled).toBe(radios[0].disabled);
    expect(element.disabled).toBe(radios[1].disabled);
    expect(element.disabled).toBe(radios[2].disabled);
  });
});

describe('UuiRadioGroup in a Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
  beforeEach(async () => {
    formElement = render(
      html` <form @submit=${preventSubmit} action="">
        <uui-radio-group name="Test">
          <uui-radio value="Value 1" label="Option 1">Option 1</uui-radio>
          <uui-radio value="Value 2" label="Option 2"></uui-radio>
          <uui-radio value="Value 3" label="Option 3">Option 3</uui-radio>
        </uui-radio-group>
      </form>`,
    ).container.querySelector('form')!;
    element = formElement.querySelector('uui-radio-group') as any;
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });

  it('form output is empty if element not checked', () => {
    expect(element.value).toBe('');
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe(null);
  });

  it('form output is equivalent to the value of the checked radio', () => {
    radios[1].click();
    expect(element.value).toBe(radios[1].value);
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe('Value 2');
  });

  it('radio gets reset by form-reset', async () => {
    const listener = oneEvent(element, UUIRadioGroupEvent.CHANGE);
    radios[1].click();
    await listener;
    formElement.reset();
    expect(element.value).toBe('');
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe('');
  });

  describe('submit', () => {
    it('should submit when pressing enter', async () => {
      const listener = oneEvent(formElement, 'submit');
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      const event = await listener;
      expect(event).not.toBe(null);
      expect(event.type).toBe('submit');
      expect(event!.target).toBe(formElement);
    });

    it('should submit when pressing enter on an individual radio', async () => {
      const listener = oneEvent(formElement, 'submit');
      radios[0].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }),
      );

      const event = await listener;
      expect(event).not.toBe(null);
      expect(event.type).toBe('submit');
      expect(event!.target).toBe(formElement);
    });
  });
});

describe('UuiRadioGroup when multiple radio childs are checked', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroupElement;
  beforeEach(async () => {
    formElement = render(
      html` <form action="">
        <uui-radio-group name="Test">
          <uui-radio value="Value 1" label="Option 1">Option 1</uui-radio>
          <uui-radio value="Value 2" label="Option 2" checked></uui-radio>
          <uui-radio value="Value 3" label="Option 3" checked
            >Option 3</uui-radio
          >
        </uui-radio-group>
      </form>`,
    ).container.querySelector('form')!;
    element = formElement.querySelector('uui-radio-group') as any;
  });

  it('form output is empty when multiple children was checked', () => {
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe('');
  });
});

describe('UuiRadioGroup when one radio child radio is checked', () => {
  let formElement: HTMLFormElement;
  let element: UUIRadioGroupElement;
  let radios: UUIRadioElement[];
  beforeEach(async () => {
    formElement = render(
      html` <form action="">
        <uui-radio-group name="Test">
          <uui-radio value="Value 1" label="Option 1">Option 1</uui-radio>
          <uui-radio value="Value 2" label="Option 2" checked></uui-radio>
          <uui-radio value="Value 3" label="Option 3">Option 3</uui-radio>
        </uui-radio-group>
      </form>`,
    ).container.querySelector('form')!;
    element = formElement.querySelector('uui-radio-group') as any;
    radios = Array.from(element.querySelectorAll('uui-radio'));
  });
  it('form output and component value is equal to the value of the child hat was checked', () => {
    expect(element.value).toBe(radios[1].value);
    const formData = new FormData(formElement);
    expect(formData.get(`${element.name}`)).toBe('Value 2');
  });
});

describe('UuiRadioGroup with start value', () => {
  let radioGroup: UUIRadioGroupElement;
  let radios: Array<UUIRadioElement>;
  beforeEach(async () => {
    radioGroup = render(
      html` <uui-radio-group value="2">
        <uui-radio value="1">one</uui-radio>
        <uui-radio value="2">two</uui-radio>
        <uui-radio value="3">three</uui-radio>
        <uui-radio value="4">four</uui-radio>
      </uui-radio-group>`,
    ).container.querySelector('uui-radio-group')!;

    await radioGroup.updateComplete;
    radios = Array.from(radioGroup.querySelectorAll('uui-radio'));
  });
  it('propagates the start value to the correct child radio', async () => {
    expect(radios[0].hasAttribute('checked')).toBe(false);
    expect(radios[1].hasAttribute('checked')).toBe(true);
    expect(radios[2].hasAttribute('checked')).toBe(false);
    expect(radios[3].hasAttribute('checked')).toBe(false);
  });
});

describe('UUIRadio keyboard accessibility', () => {
  let radio: UUIRadioElement;
  beforeEach(async () => {
    radio = render(html`
      <uui-radio value="test-value" label="Test Radio"></uui-radio>
    `).container.querySelector('uui-radio')!;

    await radio.updateComplete;
  });

  it('should check radio when Space key is pressed', async () => {
    expect(radio.checked).toBe(false);

    radio.focus();
    radio.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await radio.updateComplete;

    expect(radio.checked).toBe(true);
  });

  it('should not respond to keyboard when disabled', async () => {
    radio.disabled = true;
    await radio.updateComplete;

    expect(radio.checked).toBe(false);

    radio.focus();
    radio.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await radio.updateComplete;

    expect(radio.checked).toBe(false);
  });

  it('should not respond to keyboard when readonly', async () => {
    radio.readonly = true;
    await radio.updateComplete;

    expect(radio.checked).toBe(false);

    radio.focus();
    radio.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await radio.updateComplete;

    expect(radio.checked).toBe(false);
  });
});
