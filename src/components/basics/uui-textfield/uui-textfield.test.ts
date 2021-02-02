import { html, fixture, expect, elementUpdated } from '@open-wc/testing';

import '.';
import { UUITextFieldElement } from './uui-textfield.element';

describe('UuiTextfield', () => {
  let element: UUITextFieldElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-textfield></uui-textfield> `);
  });
  it('test that disable works', async () => {
    return true;
  });
});

describe('UuiTextfield with label', () => {
  let dom: Element;
  beforeEach(async () => {
    dom = await fixture(html`
      <label for="test">TextField</label>
      <uui-textfield id="test"></uui-textfield>
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
          name="textfield"
          value="Hello uui-textfield"
        ></uui-textfield>
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
