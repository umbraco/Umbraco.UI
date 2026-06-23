import { UUITextareaElement } from './textarea.element';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';
import './textarea.js';

describe('UUITextareaElement', () => {
  let element: UUITextareaElement;

  beforeEach(async () => {
    element = render(html`
      <uui-textarea label="textarea"></uui-textarea>
    `).container.querySelector('uui-textarea')!;

    await element.updateComplete;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).toHaveProperty('focus');
    });
    it('focus method sets focus', async () => {
      expect(document.activeElement).not.toBe(element);
      await element.focus();
      expect(document.activeElement).toBe(element);
    });
  });
});

describe('UUITextareaElement', () => {
  let element: UUITextareaElement;
  let textarea: HTMLTextAreaElement;
  beforeEach(async () => {
    element = render(html`
      <uui-textarea label="a textarea label"></uui-textarea>
    `).container.querySelector('uui-textarea')!;

    await element.updateComplete;
    textarea = element.shadowRoot?.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;
  });
  it('test that disable works', async () => {
    element.disabled = true;
    await element.updateComplete;
    expect(textarea.disabled).toBe(true);
  });

  it('changes the value to the textarea value when textarea event is emitted', async () => {
    textarea.value = 'test value';
    textarea.dispatchEvent(new Event('input'));
    expect(element.value).toBe('test value');
  });

  it('emits a change event when native textarea fires one', async () => {
    let event: Event | null = null;
    element.addEventListener('change', e => (event = e));
    textarea.dispatchEvent(new Event('change'));
    expect(event!.target).toBe(element);
  });
});

describe('UuiTextarea with label', () => {
  let dom: Element;
  beforeEach(async () => {
    dom = render(html`
      <label for="test">Textarea</label>
      <uui-textarea id="test" label="a textarea label"></uui-textarea>
    `).container.querySelector('label')!;
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(dom)).toHaveNoViolations();
  });
});

describe('UuiTextarea in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUITextareaElement;
  beforeEach(async () => {
    formElement = render(html` <form>
        <uui-textarea
          label="a textarea label"
          name="textarea"
          value="Hello uui-textarea"></uui-textarea>
      </form>`).container.querySelector('form')!;
    element = formElement.querySelector('uui-textarea') as any;
  });

  it('value is correct', async () => {
    await expect(element.value).toBe('Hello uui-textarea');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('textarea')).toBe('Hello uui-textarea');
  });

  it('change value and check output', async () => {
    element.value = 'anotherValue';
    const formData = new FormData(formElement);
    await expect(formData.get('textarea')).toBe('anotherValue');
  });
});

describe('UuiTextarea with auto-height', () => {
  let element: UUITextareaElement;
  let textarea: HTMLTextAreaElement;

  beforeEach(async () => {
    element = render(html`
      <uui-textarea
        label="auto-height textarea"
        auto-height
        style="--uui-textarea-min-height: 50px; --uui-textarea-max-height: 300px;"></uui-textarea>
    `).container.querySelector('uui-textarea')!;

    await element.updateComplete;
    textarea = element.shadowRoot?.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;
    await element.updateComplete;
  });

  it('should update height when value is set programmatically', async () => {
    // Set initial short value
    element.value = 'Short text';
    await element.updateComplete;
    // Wait for requestAnimationFrame to complete
    await new Promise(resolve => requestAnimationFrame(resolve));
    await element.updateComplete;

    const initialHeight = textarea.offsetHeight;

    // Set a much longer value programmatically
    element.value =
      'This is a very long text\nwith multiple lines\nthat should cause\nthe textarea\nto grow\nin height\nautomatically\nwhen auto-height is enabled.\nLine 9\nLine 10\nLine 11\nLine 12';
    await element.updateComplete;
    // Wait for requestAnimationFrame to complete
    await new Promise(resolve => requestAnimationFrame(resolve));
    await element.updateComplete;

    const updatedHeight = textarea.offsetHeight;

    // The rendered height should have increased
    expect(updatedHeight).toBeGreaterThan(initialHeight);
    // The style.height should be set to a specific value by autoUpdateHeight
    expect(textarea.style.height).not.toBe('');
  });

  it('should update height when cleared programmatically', async () => {
    // Set initial long value
    element.value =
      'This is a very long text\nwith multiple lines\nthat should cause\nthe textarea\nto grow\nin height\nautomatically\nwhen auto-height is enabled.\nLine 9\nLine 10\nLine 11\nLine 12';
    await element.updateComplete;
    // Wait for requestAnimationFrame to complete
    await new Promise(resolve => requestAnimationFrame(resolve));
    await element.updateComplete;

    const initialHeight = textarea.offsetHeight;
    const initialStyleHeight = textarea.style.height;
    // After setting long text, style.height should be set
    expect(initialStyleHeight).not.toBe('');

    // Clear the value programmatically
    element.value = '';
    await element.updateComplete;
    // Wait for requestAnimationFrame to complete
    await new Promise(resolve => requestAnimationFrame(resolve));
    await element.updateComplete;

    const updatedHeight = textarea.offsetHeight;

    // The rendered height should have decreased
    expect(updatedHeight).toBeLessThan(initialHeight);
    // After clearing, style.height may be removed or set to a smaller value
    const finalStyleHeight = textarea.style.height;
    expect(
      finalStyleHeight === '' ||
        parseInt(finalStyleHeight) < parseInt(initialStyleHeight),
    ).toBe(true);
  });
});
