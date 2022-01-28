import '../define';

import { expect, fixture, html, oneEvent } from '@open-wc/testing';

import { UUIButtonElement } from './uui-button.element';

describe('UuiButton', () => {
  let formElement: HTMLFormElement;
  let inputElement: HTMLInputElement;
  let element: UUIButtonElement;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    formElement = await fixture(
      html`
        <form action="">
          <input type="text" name="test" value="" />
          <uui-button label="My label">Hello uui-button</uui-button>
        </form>
      `
    );

    inputElement = formElement.querySelector('input') as any;
    element = formElement.querySelector('uui-button') as any;
    button = element.shadowRoot!.querySelector('button') as any;
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a label property', () => {
      expect(element).to.have.property('label');
    });

    it('has a type property', () => {
      expect(element).to.have.property('type');
    });
    it('type property defaults to "button"', () => {
      expect(element.type).to.equal('button');
    });

    it('has a disable property', () => {
      expect(element).to.have.property('disabled');
    });
    it('disable property defaults to false', () => {
      expect(element.disabled).to.false;
    });

    it('has a look property', () => {
      expect(element).to.have.property('look');
    });

    it('has a compact property', () => {
      expect(element).to.have.property('compact');
    });
    it('compact property defaults to false', () => {
      expect(element.compact).to.false;
    });

    it('has a state property', () => {
      expect(element).to.have.property('state');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });
    it('renders a extra slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=extra]')!;
      expect(slot).to.exist;
    });
  });

  describe('events', () => {
    describe('click', async () => {
      it('emits a click event when native button fires one', async () => {
        const listener = oneEvent(element, 'click');

        button.click();

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal('click');
        expect(event!.target).to.equal(element);
      });
    });
  });

  describe('submit', () => {
    let wasSubmitted: boolean;

    beforeEach(async () => {
      wasSubmitted = false;

      formElement.addEventListener('submit', event => {
        event.preventDefault();
        wasSubmitted = true;
      });
    });

    it('does not submit a form by default', async () => {
      element.click();
      expect(wasSubmitted).to.false;
    });

    it('can submit a form when type is submit', async () => {
      element.setAttribute('type', 'submit');
      element.click();
      expect(wasSubmitted).to.true;
    });

    it('does not submit when disabled', async () => {
      element.disabled = true;
      element.click();
      expect(wasSubmitted).to.false;
    });
  });

  describe('reset', () => {
    let wasReset: boolean;

    beforeEach(async () => {
      element.setAttribute('type', 'reset');
      inputElement.value = 'Test value';

      wasReset = false;

      formElement.addEventListener('reset', () => {
        wasReset = true;
      });
    });

    it('can reset a form when type is reset', async () => {
      element.click();
      expect(wasReset).to.true;

      const formData = new FormData(formElement);
      expect(formData.get('test')).to.equal('');
    });

    it('does not reset when disabled', async () => {
      element.disabled = true;

      element.click();
      expect(wasReset).to.false;

      const formData = new FormData(formElement);
      expect(formData.get('test')).to.equal('Test value');
    });
  });

  describe('click', () => {
    let wasClicked: boolean;

    beforeEach(async () => {
      wasClicked = false;
      element.setAttribute('type', 'button');

      element.addEventListener('click', () => {
        wasClicked = true;
      });
    });

    it('dispatches click event when type is button', async () => {
      element.click();
      expect(wasClicked).to.true;
    });

    it('does not click when disabled', async () => {
      element.disabled = true;
      element.click();
      expect(wasClicked).to.false;
    });
  });
});
