import {
  html,
  fixture,
  expect,
  elementUpdated,
  oneEvent,
} from '@open-wc/testing';
import { UUIInputElement } from './uui-input.element';
import './index';

describe('UuiInput', () => {
  let element: UUIInputElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-input label="a input label"></uui-input> `
    );
    input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
  });

  describe('properties', () => {
    it('has a name property', () => {
      expect(element).to.have.property('name');
    });
    it('has a error property', () => {
      expect(element).to.have.property('error');
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

    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await elementUpdated(element);
      expect(input.disabled).to.be.true;
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
        let event: Event | null = null;
        element.addEventListener('change', e => (event = e));
        input.dispatchEvent(new Event('change'));
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
      html` <form>
        <uui-input
          label="a input label"
          name="input"
          value="Hello uui-input"></uui-input>
      </form>`
    );
    element = formElement.querySelector('uui-input') as any;
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
});
