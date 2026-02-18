import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';

import { UUIInputElement } from './uui-input.element';
import { UUIInputEvent } from './UUIInputEvent';

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('UuiInputElement', () => {
  let element: UUIInputElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-input label="label"></uui-input> `);
    input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIInputElement);
  });

  describe('properties', () => {
    it('has a name property', () => {
      expect(element).to.have.property('name');
    });
    it('has a type property', () => {
      expect(element).to.have.property('type');
    });
    it('has a value property', () => {
      expect(element).to.have.property('value');
    });
    it('has a placeholder property', () => {
      expect(element).to.have.property('placeholder');
    });
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
    it('has a readonly property', () => {
      expect(element).to.have.property('readonly');
    });
    it('has a error property', () => {
      expect(element).to.have.property('error');
    });
    it('has a errorMessage property', () => {
      expect(element).to.have.property('errorMessage');
    });
    it('has a required property', () => {
      expect(element).to.have.property('required');
    });
    it('has a requiredMessage property', () => {
      expect(element).to.have.property('requiredMessage');
    });
    it('has a autocomplete property', () => {
      expect(element).to.have.property('autocomplete');
    });
    it('has a autoWidth property', () => {
      expect(element).to.have.property('autoWidth');
    });

    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await elementUpdated(element);
      expect(input.disabled).to.be.true;
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });

    it('renders a prepend slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=prepend]')!;
      expect(slot).to.exist;
    });

    it('renders an append slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=append]')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('focus', () => {
      it('emits a focus event when focused', async () => {
        const listener = oneEvent(element, 'focus');
        element.focus();
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('focus');
      });
    });
    describe('change', () => {
      it('emits a change event when native input fires one', async () => {
        const listener = oneEvent(element, UUIInputEvent.CHANGE);

        input.dispatchEvent(new Event('change'));

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIInputEvent.CHANGE);
        expect(event.bubbles).to.be.true;
        expect(event.composed).to.be.false;
        expect(event!.target).to.equal(element);
      });
      it('change event bubbles up to a parent element', async () => {
        const outerElement = await fixture(html`
          <uui-input label="label" id="outer">
            <uui-input label="label" id="inner" slot="prepend"></uui-input>
          </uui-input>
        `);

        const innerElement = outerElement.querySelector('#inner');
        let outerEventTriggered = false;

        const innerElementInput = innerElement!.shadowRoot?.querySelector(
          'input',
        ) as HTMLInputElement;

        const innerListener = oneEvent(innerElement!, UUIInputEvent.CHANGE);
        outerElement!.addEventListener(UUIInputEvent.CHANGE, () => {
          outerEventTriggered = true;
        });

        innerElementInput.dispatchEvent(new Event('change'));

        const innerEvent = await innerListener;
        await Promise.resolve();

        expect(outerEventTriggered).to.be.true;
        expect(innerElement).to.exist;
        expect(innerElementInput).to.exist;
        expect(innerEvent).to.exist;
        expect(innerEvent.type).to.equal(UUIInputEvent.CHANGE);
        expect(innerEvent!.target).to.equal(innerElement);
      });
    });
  });

  it('changes the value to the input value when input event is emitted', async () => {
    input.value = 'test value';
    input.dispatchEvent(new Event('input'));
    expect(element.value).to.equal('test value');
  });

  describe('text overflow', () => {
    it('has text-overflow ellipsis applied to input element', () => {
      const computedStyle = window.getComputedStyle(input);
      expect(computedStyle.textOverflow).to.equal('ellipsis');
    });
  });
});

describe('UuiInput with native label element', () => {
  let dom: Element;
  beforeEach(async () => {
    dom = await fixture(html`
      <label for="test">Input</label>
      <uui-input id="test" label="a input label"></uui-input>
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(dom).shadowDom.to.be.accessible();
  });
});

describe('UuiInput in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUIInputElement;
  beforeEach(async () => {
    formElement = await fixture(html`
      <form @submit=${preventSubmit}>
        <uui-input label="a input label" name="input" value="Hello uui-input">
        </uui-input>
      </form>
    `);
    element = formElement.querySelector('uui-input') as UUIInputElement;
  });

  it('value is correct', async () => {
    await expect(element.value).to.be.equal('Hello uui-input');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('input')).to.be.equal('Hello uui-input');
  });

  it('change value and check output', async () => {
    element.value = 'anotherValue';
    const formData = new FormData(formElement);
    await expect(formData.get('input')).to.be.equal('anotherValue');
  });

  describe('submit', () => {
    it('should submit when pressing enter', async () => {
      const listener = oneEvent(formElement, 'submit');
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal('submit');
      expect(event!.target).to.equal(formElement);
    });

    it('should not submit if type=color', async () => {
      element.type = 'color';
      await elementUpdated(element);

      let isFulfilled = false;

      const listener = oneEvent(formElement, 'submit');

      listener.then(() => (isFulfilled = true));

      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      await sleep(100);

      expect(isFulfilled).to.be.false;
    });
  });

  describe('validation', () => {
    describe('required', () => {
      beforeEach(async () => {
        element.setAttribute('required', 'true');
        element.value = '';
        await elementUpdated(element);
      });

      it('sets element to invalid when value is empty', async () => {
        expect(element.checkValidity()).to.be.false;
      });

      it('sets element to valid when it has a value', async () => {
        element.value = 'new value';
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });

      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).to.be.false;
      });

      it('sets the form to valid when it has a value', async () => {
        element.value = 'new value';
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });

    describe('custom error though attributes', () => {
      beforeEach(async () => {
        element.setAttribute('error', 'true');
        await elementUpdated(element);
      });

      it('sets element to invalid when it has a custom error attribute', async () => {
        expect(element.checkValidity()).to.be.false;
      });

      it('sets element to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });

      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).to.be.false;
      });

      it('sets the form to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });

    describe('custom error through setCustomValidity', () => {
      it('sets element to invalid when it sets custom validity', async () => {
        const validationMessage = 'custom error';
        element.setCustomValidity(validationMessage);
        expect(element.checkValidity()).to.be.false;
        expect(element.validationMessage).to.equal(validationMessage);
      });

      it('sets the form to invalid when value is empty', async () => {
        element.setCustomValidity('custom error');
        expect(formElement.checkValidity()).to.be.false;
      });

      it('sets element to valid when it sets custom validity to an empty string', async () => {
        const validationMessage = '';
        element.setCustomValidity(validationMessage);
        expect(element.checkValidity()).to.be.true;
        expect(element.validationMessage).to.equal(validationMessage);
      });

      it('sets the form to valid when it doesnt have custom validity', async () => {
        element.setCustomValidity('');
        expect(formElement.checkValidity()).to.be.true;
      });
    });
  });

  describe('native validation', () => {
    describe('email', () => {
      beforeEach(async () => {
        element.value = '';
        element.setAttribute('type', 'email');
        await elementUpdated(element);
      });

      it('sets element to valid when value is empty', async () => {
        expect(element.checkValidity()).to.be.true;
      });

      it('email element is invalid when it has a none compliant value', async () => {
        element.value = 'new value';
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.false;
      });

      it('email element is valid when it has a email value', async () => {
        element.value = 'my@email.com';
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });
    });

    describe('url', () => {
      beforeEach(async () => {
        element.value = '';
        element.setAttribute('type', 'url');
        await elementUpdated(element);
      });

      it('sets element to valid when value is empty', async () => {
        expect(element.checkValidity()).to.be.true;
      });

      it('url element is invalid when it has a none compliant value', async () => {
        element.value = 'new value';
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.false;
      });

      it('url element is valid when it has a email value', async () => {
        element.value = 'http://umbraco.com';
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });
    });
  });
});
