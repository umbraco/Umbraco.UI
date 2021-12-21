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

export const Overview: Story = () => html` <article style="max-width:580px;">
  <h2>CSS</h2>
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
      <b>uui-root.css</b> — use the .uui-root class if you like to declare the
      Umbraco typography, this is needed for getting the Umbraco typography.
    </li>
    <li>
      <b>uui-text.css</b> — use the .uui-text class if you like to declare
      styles for typography, must be used together with .uui-root. This is
      needed for having proper styling for H1, H2, P etc.
    </li>
    <li>
      <b>uui-css.css</b>
      This stylesheet includes all of the above stylesheets.
    </li>
  </ul>
</article>`;
