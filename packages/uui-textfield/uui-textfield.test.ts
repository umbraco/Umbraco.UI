import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUITextFieldElement } from './uui-textfield.element';
import '.';

describe('UuiTextfield', () => {
  let element: UUITextFieldElement;
  let input: HTMLInputElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-textfield label="a textfield label"></uui-textfield> `
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

  it('emits a change event when native input fires one', async () => {
    let event: Event | null = null;
    element.addEventListener('change', e => (event = e));
    input.dispatchEvent(
      new Event('change', { bubbles: true, composed: false })
    );
    expect(event!.target).to.equal(element);
  });
});

describe('UuiTextfield with label', () => {
  let dom: Element;
  beforeEach(async () => {
    dom = await fixture(html`
      <label for="test">TextField</label>
      <uui-textfield id="test" label="a textfield label"></uui-textfield>
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(dom).shadowDom.to.be.accessible();
  });
});

describe('UuiTextfield in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUITextFieldElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-textfield
          label="a textfield label"
          name="textfield"
          value="Hello uui-textfield"></uui-textfield>
      </form>`
    );
    element = formElement.querySelector('uui-textfield') as any;
  });

  it('value is correct', async () => {
    await expect(element.value).to.be.equal('Hello uui-textfield');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('textfield')).to.be.equal('Hello uui-textfield');
  });

  it('change value and check output', async () => {
    element.value = 'anotherValue';
    const formData = new FormData(formElement);
    await expect(formData.get('textfield')).to.be.equal('anotherValue');
  });
});
