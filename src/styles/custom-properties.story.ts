import { html, svg } from 'lit';

import '../components/table/table.js';
import '../components/button/button.js';

// Import CSS files as raw text so we can parse custom properties at runtime
import paletteCSS from './custom-properties/palette.css?raw';
import colorsCSS from './custom-properties/colors.css?raw';
import sizesCSS from './custom-properties/sizes.css?raw';
import shadowCSS from './custom-properties/shadow.css?raw';
import fontsCSS from './custom-properties/fonts.css?raw';

/**
 * Parse CSS text and extract custom property declarations (--uui-*).
 * Returns an array of { key, value } objects.
 */
function parseCustomProperties(
  ...sources: string[]
): { key: string; value: string }[] {
  const props: { key: string; value: string }[] = [];
  const re = /(--uui-[\w-]+)\s*:\s*([^;]+)/g;
  for (const css of sources) {
    let match;
    while ((match = re.exec(css)) !== null) {
      props.push({ key: match[1], value: match[2].trim() });
    }
  }
  return props;
}

const properties = parseCustomProperties(
  paletteCSS,
  colorsCSS,
  sizesCSS,
  shadowCSS,
  fontsCSS,
);

const copyIcon = svg`<svg style="pointer-events: none" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
<path fill="currentColor" fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
</svg>`;

export default {
  title: 'Design/Custom Properties',
};

const copyToClipboard = (e: Event) => {
  const button = e.target as any;
  const text = button.dataset.copyToClipboard;
  if (text) {
    navigator.clipboard.writeText(text);
    button.state = 'success';
  }
};

const propertyColorTemplate = (property: { key: string; value: string }) =>
  html` <uui-table-row>
    <uui-table-cell>
      <div
        style="display: flex; justify-content: space-between; align-items: center;">
        ${property.key}<uui-button
          data-copy-to-clipboard=${property.key}
          title="Copy custom property to clipboard"
          label="Copy custom property to clipboard"
          compact
          >${copyIcon}</uui-button
        >
      </div>
    </uui-table-cell>
    <uui-table-cell>
      <div
        style="display: flex; justify-content: space-between; align-items: center;">
        <code>${property.value}</code
        ><uui-button
          data-copy-to-clipboard=${property.value}
          title="Copy color value to clipboard"
          label="Copy color value to clipboard"
          compact
          >${copyIcon}</uui-button
        >
      </div>
    </uui-table-cell>
    <uui-table-cell>
      <div
        style="background:var(${property.key}); width:60px; height:60px;"></div>
    </uui-table-cell>
  </uui-table-row>`;

const propertySizeTemplate = (property: { key: string; value: string }) =>
  html` <uui-table-row>
    <uui-table-cell>
      <div
        style="display: flex; justify-content: space-between; align-items: center;">
        ${property.key}<uui-button
          data-copy-to-clipboard=${property.key}
          title="Copy custom property to clipboard"
          label="Copy custom property to clipboard"
          compact
          >${copyIcon}</uui-button
        >
      </div>
    </uui-table-cell>
    <uui-table-cell>
      <div
        style="display: flex; justify-content: space-between; align-items: center;">
        <code>${property.value}</code
        ><uui-button
          data-copy-to-clipboard=${property.value}
          title="Copy size value to clipboard"
          label="Copy size value to clipboard"
          compact
          >${copyIcon}</uui-button
        >
      </div>
    </uui-table-cell>
  </uui-table-row>`;

export const InterfaceColors = () => {
  const base = [
    '--uui-color-surface',
    '--uui-color-background',
    '--uui-color-text',
    '--uui-color-border',
    '--uui-color-divider',
    '--uui-color-interactive',
  ];
  const state = [
    '--uui-color-selected',
    '--uui-color-current',
    '--uui-color-disabled',
    '--uui-color-focus',
  ];
  const color = [
    '--uui-color-default',
    '--uui-color-positive',
    '--uui-color-warning',
    '--uui-color-danger',
    '--uui-color-invalid',
  ];
  const universal = ['--uui-color-header'];

  return html`
    <article style="max-width:580px;">
      <div
        style="display:block; border-bottom: 1px solid var(--uui-color-cocoa-black); padding-top: var(--uui-size-layout-5); margin-bottom:var(--uui-size-layout-3); padding-bottom:var(--uui-size-layout-1);">
        <h1>Interface Colors</h1>
        <p class="uui-lead">
          Interface styling should use the following properties to ensure
          contrasts and appearance follows the current theme.
        </p>
      </div>

      <h4>Text and interactables</h4>
      <ul>
        <li>
          <b>Text</b> - Use it for text, icons or other elements that needs to
          standout from the base of the element
        </li>
        <li>
          <b>Interactable</b> - Used when the text or icon is interactable, such
          as a link
        </li>
      </ul>

      <h4>States</h4>
      <ul>
        <li>
          <b>Selected</b> - Use to highlight text or background when a component
          is in the 'selected' state.
        </li>
        <li>
          <b>Current</b> - Use to highlight text or background when a component
          is in the 'current' state, only used by navigation items to indicate
          the current location.
        </li>
        <li><b>Disabled</b> - Use for displaying disabled state.</li>
      </ul>

      <h4>Borders and dividers</h4>
      <ul>
        <li><b>Border</b> - Use for component borders</li>
        <li>
          <b>Divider</b> - Used for thin border that provides a visual
          separation. Example: a list of items
        </li>
      </ul>

      <h4>Misc</h4>
      <ul>
        <li><b>Surface</b> - The general background color for elements</li>
        <li><b>Background</b> - The general background color of the app</li>
        <li><b>Header</b> - Background color of the header of the app</li>
        <li>
          <b>Focus</b> - Color for the focus outline on inputs, buttons, links
          and so on
        </li>
      </ul>

      <h4>Color variants</h4>
      <p>
        Each color can come in additional variants. What below is refereed to as
        the default variant, meaning no variant-name is prepended to the
        variable-name:
      </p>
      <ul>
        <li>
          <b>Contrast</b> - This color will stand out and be readable with the
          default variant as its background. Mostly used for text and icons.
        </li>
        <li>
          <b>Standalone</b> - This color will have a higher contrast to the
          background than its default variant. Often used for text, icons and
          borders.
        </li>
        <li>
          <b>Emphasis</b> - Used when you want to emphasize an element, make it
          stand out. Mostly used for hover and focus states.
        </li>
      </ul>
    </article>

    <h3>Base</h3>
    <uui-table @click=${copyToClipboard}>
      <uui-table-head>
        <uui-table-head-cell>Custom property name</uui-table-head-cell>
        <uui-table-head-cell>Value</uui-table-head-cell>
        <uui-table-head-cell>Example</uui-table-head-cell>
      </uui-table-head>
      ${properties
        .filter(property => base.some(x => property.key.includes(x)))
        .map(property => propertyColorTemplate(property))}
    </uui-table>

    <h3>State</h3>
    <uui-table @click=${copyToClipboard}>
      <uui-table-head>
        <uui-table-head-cell>Custom property name</uui-table-head-cell>
        <uui-table-head-cell>Value</uui-table-head-cell>
        <uui-table-head-cell>Example</uui-table-head-cell>
      </uui-table-head>
      ${properties
        .filter(property => state.some(x => property.key.includes(x)))
        .map(property => propertyColorTemplate(property))}
    </uui-table>

    <h3>Color</h3>
    <uui-table @click=${copyToClipboard}>
      <uui-table-head>
        <uui-table-head-cell>Custom property name</uui-table-head-cell>
        <uui-table-head-cell>Value</uui-table-head-cell>
        <uui-table-head-cell>Example</uui-table-head-cell>
      </uui-table-head>
      ${properties
        .filter(property => color.some(x => property.key.includes(x)))
        .map(property => propertyColorTemplate(property))}
    </uui-table>

    <h3>Universal</h3>
    <uui-table @click=${copyToClipboard}>
      <uui-table-head>
        <uui-table-head-cell>Custom property name</uui-table-head-cell>
        <uui-table-head-cell>Value</uui-table-head-cell>
        <uui-table-head-cell>Example</uui-table-head-cell>
      </uui-table-head>
      ${properties
        .filter(property => universal.some(x => property.key.includes(x)))
        .map(property => propertyColorTemplate(property))}
    </uui-table>
  `;
};

export const BrandPalette = () => {
  return html`<h2>Colors</h2>
    <p>
      We provide all the Umbraco Identity colors as css custom properties, but
      we do not recommend using those directly. All interface should be based on
      interface color properties. Here is an overview of colors:
    </p>

    <uui-table @click=${copyToClipboard}>
      <uui-table-head>
        <uui-table-head-cell>Custom property name</uui-table-head-cell>
        <uui-table-head-cell>Value</uui-table-head-cell>
        <uui-table-head-cell>Example</uui-table-head-cell>
      </uui-table-head>
      ${properties
        .filter(property => property.key.includes('palette'))
        .map(property => propertyColorTemplate(property))}
    </uui-table>`;
};

export const Sizing = () => html`
  <h3>Spacing properties</h3>
  <uui-table @click=${copyToClipboard}>
    <uui-table-head>
      <uui-table-head-cell>Custom property name</uui-table-head-cell>
      <uui-table-head-cell>Value</uui-table-head-cell>
    </uui-table-head>
    ${properties
      .filter(property => property.key.includes('--uui-size-space'))
      .map(property => propertySizeTemplate(property))}
  </uui-table>

  <h3>Layout properties</h3>
  <uui-table @click=${copyToClipboard}>
    <uui-table-head>
      <uui-table-head-cell>Custom property name</uui-table-head-cell>
      <uui-table-head-cell>Value</uui-table-head-cell>
    </uui-table-head>
    ${properties
      .filter(property => property.key.includes('--uui-size-layout'))
      .map(property => propertySizeTemplate(property))}
  </uui-table>

  <h3>Border radius</h3>
  <uui-table @click=${copyToClipboard}>
    <uui-table-head>
      <uui-table-head-cell>Custom property name</uui-table-head-cell>
      <uui-table-head-cell>Value</uui-table-head-cell>
    </uui-table-head>
    ${properties
      .filter(property => property.key.includes('--uui-border-radius'))
      .map(property => propertySizeTemplate(property))}
  </uui-table>

  <h3>Typography</h3>
  <uui-table @click=${copyToClipboard}>
    <uui-table-head>
      <uui-table-head-cell>Custom property name</uui-table-head-cell>
      <uui-table-head-cell>Value</uui-table-head-cell>
    </uui-table-head>
    ${properties
      .filter(property => property.key.includes('--uui-type-'))
      .map(property => propertySizeTemplate(property))}
  </uui-table>

  <h3>Shadows</h3>
  <uui-table @click=${copyToClipboard}>
    <uui-table-head>
      <uui-table-head-cell>Custom property name</uui-table-head-cell>
      <uui-table-head-cell>Value</uui-table-head-cell>
    </uui-table-head>
    ${properties
      .filter(property => property.key.includes('--uui-shadow'))
      .map(property => propertySizeTemplate(property))}
  </uui-table>

  <h3>Font</h3>
  <uui-table @click=${copyToClipboard}>
    <uui-table-head>
      <uui-table-head-cell>Custom property name</uui-table-head-cell>
      <uui-table-head-cell>Value</uui-table-head-cell>
    </uui-table-head>
    ${properties
      .filter(property => property.key.includes('--uui-font'))
      .map(property => propertySizeTemplate(property))}
  </uui-table>

  <h3>General sizes</h3>
  <uui-table @click=${copyToClipboard}>
    <uui-table-head>
      <uui-table-head-cell>Custom property name</uui-table-head-cell>
      <uui-table-head-cell>Value</uui-table-head-cell>
    </uui-table-head>
    ${properties
      .filter(
        property =>
          property.key.includes('--uui-size') &&
          !property.key.includes('--uui-size-space') &&
          !property.key.includes('--uui-size-layout'),
      )
      .map(property => propertySizeTemplate(property))}
  </uui-table>
`;
