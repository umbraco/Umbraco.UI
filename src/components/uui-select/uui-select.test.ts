import { html, fixture, expect } from '@open-wc/testing';
import { UUISelectElement } from './uui-select.element';
import '../uui-select-option/index';
import '.';

const options = [
  {
    color: 'red',
    value: '#f00',
  },
  {
    color: 'green',
    value: '#0f0',
  },
  {
    color: 'blue',
    value: '#00f',
  },
  {
    color: 'cyan',
    value: '#0ff',
  },
  {
    color: 'magenta',
    value: '#f0f',
  },
  {
    color: 'yellow',
    value: '#ff0',
  },
  {
    color: 'black',
    value: '#000',
  },
];

describe('UuiButton', () => {
  let element: UUISelectElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-select>
      ${options.map(
        option =>
          html`<uui-select-list-item
            ><uui-icon
              slot="left"
              name="bug"
              .style="color: ${option.value}"></uui-icon
            >${option.color}<uui-icon
              slot="right"
              name="bug"
              .style="color: ${option.value}"></uui-icon
          ></uui-select-list-item>`
      )}
    </uui-select>`);
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
