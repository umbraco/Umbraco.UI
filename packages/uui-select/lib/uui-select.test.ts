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
  let input: HTMLSelectElement | null | undefined;

  beforeEach(async () => {
    element = await fixture(
      html`<uui-select
        label="foo"
        name="bar"
        .value="orange"
        .options=${options}></uui-select>`,
    );
    input = element.shadowRoot?.querySelector('#native');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUISelectElement);
  });

  it('has internals', () => {
    expect(element).to.have.property('_internals');
  });

  it('input exists', () => {
    expect(input).to.exist;
  });

  it('if disabled, disables the native input', async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(input?.disabled).to.equal(true);
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).to.have.property('focus').that.is.a('function');
    });
    it('focus method sets focus', async () => {
      expect(document.activeElement).not.to.equal(element);
      await element.focus();
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
          .value="orange"
          .options=${options}></uui-select>
      </form>`,
    );
    element = formElement.querySelector('uui-select') as any;
    select = element.shadowRoot?.querySelector('select') as HTMLSelectElement;
  });

  it('value is correct', () => {
    expect(element.value).to.be.equal('orange');
  });

  it('if value is set to a string that is not in the options array the value is empty string', async () => {
    element.value = 'something silly';
    await elementUpdated(element);
    const formData = new FormData(formElement);
    expect(element.value).to.be.equal('');
    expect(formData.get('bar')).to.be.equal('');
  });

  it('form output', () => {
    const formData = new FormData(formElement);
    expect(formData.get('bar')).to.be.equal('orange');
  });

  it('change value and check output', () => {
    element.value = 'purple';
    const formData = new FormData(formElement);
    expect(formData.get('bar')).to.be.equal('purple');
  });

  it('can be disabled', async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(select.disabled).to.be.true;
  });

  describe('validation', () => {
    let formElement: HTMLFormElement;
    let element: UUISelectElement;
    beforeEach(async () => {
      formElement = await fixture(
        html`<form>
          <uui-select
            label="test label"
            name="test"
            .value="orange"
            .options=${options}></uui-select>
        </form>`,
      );
      element = formElement.querySelector('uui-select') as UUISelectElement;
    });

    describe('required', () => {
      beforeEach(async () => {
        element.setAttribute('required', 'true');
        await elementUpdated(element);
      });

      it('sets element to invalid when value is empty', async () => {
        element.value = '';
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.false;
      });

      it('sets element to valid when it has a value', async () => {
        element.value = options[0].value;
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });

      it('sets the form to valid when it has a value', async () => {
        element.value = options[0].value;
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });

    describe('custom error', () => {
      beforeEach(async () => {
        element.setAttribute('error', 'true');
        await elementUpdated(element);
      });

      it('sets element to invalid when it has a custom error attribute', () => {
        expect(element.checkValidity()).to.be.false;
      });

      it('sets element to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });

      it('sets the form to invalid when value is empty', () => {
        expect(formElement.checkValidity()).to.be.false;
      });

      it('sets the form to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });
  });
});
