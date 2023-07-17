import { Story } from '@storybook/web-components';
import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  id: 'uui-css',
  title: 'Design/Css',
  component: 'uui-css',
  parameters: {
    readme: {
      markdown: readme,
    },
    docs: {
      source: {
        code: `
// Include each of the following:
import '@umbraco-ui/uui-css/dist/custom-properties.css';
import '@umbraco-ui/uui-css/dist/uui-font.css';
import '@umbraco-ui/uui-css/dist/uui-text.css';

// Alternatively include the compiled bundle
import '@umbraco-ui/uui-css/dist/uui-css.css';
        `,
      },
    },
  },
};

export const Overview: Story = () =>
  html` <article style="max-width:580px;">
    <h2>CSS</h2>
    <p>
      UUI-CSS package contains css files which can be included in your project
      or components if needed.
    </p>
    <ul>
      <li>
        <b>custom-properties.css</b> — use this if you like to include our
        custom properties in your project.
      </li>
      <li>
        <b>uui-font.css</b> — use the .uui-font class if you like to declare the
        Umbraco typography, this is needed for getting the Umbraco typography.
      </li>
      <li>
        <b>uui-text.css</b> — use the .uui-text class if you like to declare
        styles for typography, must be used together with .uui-font. This is
        needed for having proper styling for H1, H2, P etc.
      </li>
      <li>
        <b>uui-css.css</b>
        This stylesheet includes all of the above stylesheets.
      </li>
    </ul>
  </article>`;

export const Usage: Story = () => html`
  <div class="uui-text">
    <h1>Hello uui-css!</h1>
    <p>
      This component will now use the styling from uui-text because the root of
      the component has the uui-text class.
    </p>
    <p style="background: var(--uui-interface-surface-alt);">
      this paragraph uses a custom property from the uui custom properties to
      set its background color.
    </p>
  </div>
`;
Usage.parameters = {
  docs: {
    source: {
      code: `
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = [
    UUITextStyles,
    css\`
    /* your css goes here */
  \`,
  ];

  render() {
    return html\`
    <div class="uui-text">
      <h1>Hello uui-css!</h1>
      <p>
      This component will now use the styling from uui-text because the root of the component has the uui-text class.
      </p>
      <p style="background: var(--uui-interface-surface-alt);">
       this paragraph uses a custom property from the uui custom properties to set its background color.
      </p>
    </div>
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
    `,
    },
  },
};
