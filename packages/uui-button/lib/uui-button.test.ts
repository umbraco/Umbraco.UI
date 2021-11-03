import { html, fixture, expect } from '@open-wc/testing';
import { UUIButtonElement } from './uui-button.element';
import '.';

describe('UuiButton', () => {
  let formElement: HTMLFormElement;
  let inputElement: HTMLInputElement;
  let element: UUIButtonElement;
  
  beforeEach(async () => {
    formElement = await fixture(
      html`
        <form action="">
          <input type="text" name="test" value="" />
          <uui-button label="My label">Hello uui-button</uui-button>
        </form>
      `
    );
    
    inputElement = formElement.querySelector('input');
    element = formElement.querySelector('uui-button');
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('submit', () => {
    let wasSubmitted: boolean;

    beforeEach(async () => {
      wasSubmitted = false;

      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        wasSubmitted = true;
      });
    });

    it('submits a form by default', async () => {  
      element.click();
      expect(wasSubmitted).to.true;
    });

    it ('can submit a form when type is submit', async () => {
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

    it ('can reset a form when type is reset', async () => {
      element.click();
      expect(wasReset).to.true;
  
      const formData = new FormData(formElement);
      expect(formData.get('test')).to.equal('');
    });

    it ('does not reset when disabled', async () => {
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
