import '../define';

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import { UUISelectElement } from './uui-select.element';

const options: Array<Option> = [
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple' },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
];

describe('UUISelectElement', () => {
  let element: UUISelectElement;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-select label="foo" name="bar" .options=${options}></uui-select>`
    );
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).to.have.property('focus').that.is.a('function');
    });
    it('focus method sets focus', async () => {
      expect(document.activeElement).not.to.equal(element);
      element.focus();
      expect(document.activeElement).to.equal(element);
    });
  });
});

describe('UUISelect in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUISelectElement;
  let select: HTMLSelectElement;

  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-select
          label="foo"
          name="bar"
          .options=${options}
          value=${options[0].value}></uui-select>
      </form>`
    );
    element = formElement.querySelector('uui-select') as any;
    select = element.shadowRoot?.querySelector('select') as HTMLSelectElement;
  });

  it('value is correct', async () => {
    await expect(element.value).to.be.equal('orange');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('bar')).to.be.equal('orange');
  });

  it('change value and check output', async () => {
    element.value = 'purple';
    const formData = new FormData(formElement);
    await expect(formData.get('bar')).to.be.equal('purple');
  });

  it('can be disabled', async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(select.disabled).to.be.true;
  });
});
