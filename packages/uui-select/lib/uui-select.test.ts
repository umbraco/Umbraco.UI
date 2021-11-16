import { html, fixture, expect } from '@open-wc/testing';
import { UUISelectElement } from './uui-select.element';
import '.';

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
});

describe('UUISelect in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUISelectElement;
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
});
