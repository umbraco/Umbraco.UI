import { html } from 'lit-html';
import '@umbraco-ui/uui-tabs/lib/index';
import { Story } from '@storybook/web-components';

export default {
  title: 'Buttons/Tabs',
  component: 'uui-tabs',
  id: 'uui-tabs',
  args: {
    '--uui-tab-divider': 'rgba(0,0,0,0)',
  },
  argTypes: {
    '--uui-tab-text': { control: { type: 'color' } },
    '--uui-tab-text-hover': { control: { type: 'color' } },
    '--uui-tab-text-active': { control: { type: 'color' } },
    '--uui-tab-background': { control: { type: 'color' } },
    '--uui-tab-divider': { control: { type: 'color' } },
  },
  parameters: {
    docs: {
      source: {
        code: html`<uui-tab-group>
          <uui-tab>Tab A</uui-tab>
          <uui-tab>Tab B</uui-tab>
          <uui-tab>Tab C</uui-tab>
        </uui-tab-group>`.strings,
      },
    },
  },
};

export const AAAOverview: Story = props => html`
  <uui-tab-group
    style="
    --uui-tab-text: ${props['--uui-tab-text']}; 
    --uui-tab-text-hover: ${props['--uui-tab-text-hover']}; 
    --uui-tab-text-active: ${props['--uui-tab-text-active']}; 
    --uui-tab-background: ${props['--uui-tab-background']}; 
    --uui-tab-divider: ${props['--uui-tab-divider']}; 
    ${props.inlineStyles}">
    <uui-tab active> Content </uui-tab>
    <uui-tab ?disabled=${props.disabled}> Packages </uui-tab>
    <uui-tab> Media </uui-tab>
  </uui-tab-group>
`;
AAAOverview.storyName = 'Overview';

export const WithBorders: Story = () => html`
  <h3>With Borders</h3>
  <div
    style="
    height: 48px; 
    font-size: 14px;
    --uui-tab-text: var(--uui-look-primary-surface); 
    --uui-tab-text-hover: var(--uui-look-primary-surface-hover); 
    --uui-tab-text-active: var(--uui-look-primary-surface-hover); 
    --uui-tab-background: none; 
    --uui-tab-divider: var(--uui-interface-border);
    ">
    <uui-tab-group>
      <uui-tab> Content </uui-tab>
      <uui-tab> Packages </uui-tab>
      <uui-tab active> Media </uui-tab>
    </uui-tab-group>
  </div>
`;

export const Navbar: Story = () => html`
  <h3>Navbar</h3>
  <div
    style="
    height: 60px; 
    font-size: 16px;
    --uui-tab-text: var(--uui-look-primary-contrast-disabled);
    --uui-tab-text-hover: var(--uui-look-primary-contrast-hover); 
    --uui-tab-text-active: var(--uui-interface-active); 
    --uui-tab-background: var(--uui-look-primary-surface); 
    ">
    <uui-tab-group>
      <uui-tab>
        <div slot="icon">i am icon</div>
        Content
      </uui-tab>
      <uui-tab active> Packages </uui-tab>
      <uui-tab> Media </uui-tab>
    </uui-tab-group>
  </div>
`;

// export const IconWithText = () =>
//   html` <uui-tab><uui-icon name="bug"></uui-icon>Tab A</uui-tab>`;

// export const JustIcon = () =>
//   html` <uui-tab><uui-icon name="bug"></uui-icon></uui-tab>`;
