import {
  html,
  fixture,
  expect,
  elementUpdated,
  oneEvent,
} from '@open-wc/testing';
import { UUIInputElement } from './uui-input.element';
import './index';
import { UUIInputEvent } from './UUIInputEvent';

describe('UuiInputElement', () => {
  let element: UUIInputElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-input label="label"></uui-input> `);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has an error property', () => {
      expect(element).to.have.property('error');
    });

    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });

    it('has a placeholder property', () => {
      expect(element).to.have.property('placeholder');
    });

    it('has a hideLabel property', () => {
      expect(element).to.have.property('hideLabel');
    });

    it('has a name property', () => {
      expect(element).to.have.property('name');
    });

    it('has a value property', () => {
      expect(element).to.have.property('value');
    });

    it('has a type property', () => {
      expect(element).to.have.property('type');
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
    describe('change', () => {
      it('emits a change event on input', async () => {
        const inputElement = element.shadowRoot?.querySelector(
          'input'
        ) as HTMLInputElement;
        const listener = oneEvent(element, UUIInputEvent.CHANGE);

        inputElement.dispatchEvent(
          new Event('change', { bubbles: true, composed: false })
        );

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIInputEvent.CHANGE);
      });
    });
  });
});

describe('UuiInput with label', () => {
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

describe('UuiInput Misc', () => {
  let element: UUIInputElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-input label="a input label"></uui-input> `
    );
    input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
  });
  it('test that disable works', async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(input.disabled).to.be.true;
  });

  it('changes the value to the input value when input event is emitted', async () => {
    input.value = 'test value';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    expect(element.value).to.equal('test value');
  });
});
