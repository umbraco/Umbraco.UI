import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUICheckboxElement } from './uui-checkbox.element';
import './index';

describe('UuiToggle', () => {
  let element: UUICheckboxElement;
  let input: HTMLInputElement | null | undefined;
  let iconCheck: HTMLElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-checkbox label="test label" name="test"></uui-checkbox> `
    );
    input = element.shadowRoot?.querySelector('#input');
    iconCheck = element.shadowRoot?.querySelector('#icon-check') as HTMLElement;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('native input has a correct role', async () => {
    expect(input).to.have.attr('role', 'checkbox');
  });

  it('changes the opacity value of #icon-check element to 1 when element is checked', async () => {
    element.checked = true;
    await elementUpdated(element);
    expect(window.getComputedStyle(iconCheck as Element).opacity).to.equal('1');
  });
});
