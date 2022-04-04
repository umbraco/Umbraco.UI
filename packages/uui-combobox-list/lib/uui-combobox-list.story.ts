import '.';
import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { repeat } from 'lit/directives/repeat.js';

export default {
  id: 'uui-combobox-list',
  title: 'Inputs/Combobox/Combobox List',
  component: 'uui-combobox-list',
  parameters: {
    docs: {
      source: {
        code: `<uui-combobox-list></uui-combobox-list>`,
      },
    },
  },
};

const fruits = ['apple', 'orange', 'lemon'];

export const AAAOverview: Story = () =>
  html`<uui-combobox-list
    style="border: 1px solid var(--uui-interface-border); border-radius: var(--uui-border-radius);">
    <uui-combobox-list-option style="padding: var(--uui-size-2);">
      apple
    </uui-combobox-list-option>
    <uui-combobox-list-option style="padding: var(--uui-size-2);">
      orange
    </uui-combobox-list-option>
    <uui-combobox-list-option style="padding: var(--uui-size-2);">
      lemon
    </uui-combobox-list-option>
  </uui-combobox-list>`;

AAAOverview.parameters = {
  docs: {
    source: {
      code: `
<uui-combobox-list>
  <uui-combobox-list-option>apple</uui-combobox-list-option>
  <uui-combobox-list-option>orange</uui-combobox-list-option>
  <uui-combobox-list-option>lemon</uui-combobox-list-option>
</uui-combobox-list>
`,
    },
  },
};
AAAOverview.storyName = 'Overview';

export const Disabled: Story = () =>
  html`<uui-combobox-list
    style="border: 1px solid var(--uui-interface-border); border-radius: var(--uui-border-radius);">
    <uui-combobox-list-option style="padding: var(--uui-size-2);">
      apple
    </uui-combobox-list-option>
    <uui-combobox-list-option disabled style="padding: var(--uui-size-2);">
      orange
    </uui-combobox-list-option>
    <uui-combobox-list-option style="padding: var(--uui-size-2);">
      lemon
    </uui-combobox-list-option>
  </uui-combobox-list>`;

Disabled.parameters = {
  docs: {
    source: {
      code: `
<uui-combobox-list>
  <uui-combobox-list-option>apple</uui-combobox-list-option>
  <uui-combobox-list-option disabled>orange</uui-combobox-list-option>
  <uui-combobox-list-option>lemon</uui-combobox-list-option>
</uui-combobox-list>
`,
    },
  },
};
