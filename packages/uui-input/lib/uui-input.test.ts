import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';

import { UUIInputElement } from './uui-input.element';
import { UUIInputEvent } from './UUIInputEvent';

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
        expect(event!.target).to.equal(element);
      });
    });
  });

  it('changes the value to the input value when input event is emitted', async () => {
    input.value = 'test value';
    input.dispatchEvent(new Event('input'));
    expect(element.value).to.equal('test value');
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
    formElement = await fixture(
      html`
        <form>
          <uui-input label="a input label" name="input" value="Hello uui-input">
          </uui-input>
        </form>
      `
    );
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

    describe('custom error', () => {
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
  });

  describe('native validation', () => {
    element.setAttribute('type', 'email');

    it('sets element to invalid when value is empty', async () => {
      expect(element.checkValidity()).to.be.false;
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
});
