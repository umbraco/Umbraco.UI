import { html } from 'lit-html';
import '@umbraco-ui/uui-tabs/index';
import { Story } from '@storybook/web-components';

export default {
  title: 'Buttons/Tabs',
  component: 'uui-tabs',
};

export const TabGroup: Story = () => html`
  <uui-tab-group>
    <uui-tab active> Content </uui-tab>
    <uui-tab> Packages </uui-tab>
    <uui-tab> Media </uui-tab>
  </uui-tab-group>
`;

export const Styles: Story = () => html`
  <h3>Default</h3>
  <div>
    <uui-tab-group>
      <uui-tab active> Content </uui-tab>
      <uui-tab> Packages </uui-tab>
      <uui-tab> Media </uui-tab>
    </uui-tab-group>
  </div>
  <br />
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
  <br />
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
