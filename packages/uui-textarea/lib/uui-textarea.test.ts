import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUITextareaElement } from './uui-textarea.element';
import '.';

describe('UUITextareaElement', () => {
  let element: UUITextareaElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-textarea label="textarea"></uui-textarea>
    `);
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

describe('UUITextareaElement', () => {
  let element: UUITextareaElement;
  let textarea: HTMLTextAreaElement;
  beforeEach(async () => {
    element = await fixture(html`
      <uui-textarea label="a textarea label"></uui-textarea>
    `);
    textarea = element.shadowRoot?.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;
  });
  it('test that disable works', async () => {
    element.disabled = true;
    await elementUpdated(element);
    expect(textarea.disabled).to.be.true;
  });

  it('changes the value to the textarea value when textarea event is emitted', async () => {
    textarea.value = 'test value';
    textarea.dispatchEvent(new Event('input'));
    expect(element.value).to.equal('test value');
  });

  it('emits a change event when native textarea fires one', async () => {
    let event: Event | null = null;
    element.addEventListener('change', e => (event = e));
    textarea.dispatchEvent(new Event('change'));
    expect(event!.target).to.equal(element);
  });
});

describe('UuiTextarea with label', () => {
  let dom: Element;
  beforeEach(async () => {
    dom = await fixture(html`
      <label for="test">Textarea</label>
      <uui-textarea id="test" label="a textarea label"></uui-textarea>
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(dom).shadowDom.to.be.accessible();
  });
});

describe('UuiTextarea in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUITextareaElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form>
        <uui-textarea
          label="a textarea label"
          name="textarea"
          value="Hello uui-textarea"></uui-textarea>
      </form>`,
    );
    element = formElement.querySelector('uui-textarea') as any;
  });

  it('value is correct', async () => {
    await expect(element.value).to.be.equal('Hello uui-textarea');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('textarea')).to.be.equal('Hello uui-textarea');
  });

  it('change value and check output', async () => {
    element.value = 'anotherValue';
    const formData = new FormData(formElement);
    await expect(formData.get('textarea')).to.be.equal('anotherValue');
  });
});
