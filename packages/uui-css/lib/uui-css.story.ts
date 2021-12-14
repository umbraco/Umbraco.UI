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
      <b>local-typography.css</b> — use this if you like to declare styles for
      typography, this is needed when using ex.: H1 in a Shadow DOM.
    </li>
    <li>
      <b>root.css</b> — If you like your project to be styled for Umbraco UI,
      then include this in the root of your project.
    </li>
  </ul>`;
