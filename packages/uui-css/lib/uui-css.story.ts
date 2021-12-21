import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-css',
  title: 'Design/Css',
  component: 'uui-css',
  parameters: {
    docs: {
      source: {
        code: `
          <style src="@umbraco-ui/uui-css/root.css"></style>
        `,
      },
    },
  },
};

export const Overview: Story = () => html`<h2>CSS</h2>
  <p>
    UUI-CSS package contains css files which can be included in your project or
    components if needed.
  </p>
  <ul>
    <li>
      <b>custom-properties.css</b> — use this if you like to include our custom
      properties in your project.
    </li>
    <li>
      <b>uui-text.css</b> — use the .uui-text class if you like to declare
      styles for typography, this is needed when using ex.: H1 in a Shadow DOM.
    </li>
    <li>
      <b>uui-root.css</b> — Set the .uui-root class on the root of your
      application that should be styled as Umbraco UI. This includes the other
      stylesheets.
    </li>
  </ul>`;
