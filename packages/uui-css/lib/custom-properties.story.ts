import { html, svg } from 'lit-html';

import '@umbraco-ui/uui-table/lib';
import readme from '../README.md?raw';

// @ts-ignore-start
// eslint-disable-next-line -- // @typescript-eslint/ban-ts-comment // @ts-ignore
import customProperties from '../custom-properties.module.js'; // eslint-disable-line
// @ts-ignore-end
const properties = Object.keys(customProperties.customProperties).map(
  // @ts-ignore
  key => ({ key: key, value: customProperties.customProperties[key] }),
);

const copyIcon = svg`<svg style="pointer-events: none" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon m-2">
<path fill="currentColor" fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
</svg>`;

export default {
  title: 'Design/Custom properties',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

const copyToClipboard = (e: Event) => {
  const button = e.target as any;
  const text = button.dataset.copyToClipboard;
  if (text) {
    navigator.clipboard.writeText(text);
    button.state = 'success';
  }
};

const propertyColorTemplate = (property: any) =>
  html` <uui-table-row>
    <uui-table-cell
      ><div
        style="display: flex; justify-content: space-between; align-items: center;">
        ${property.key}<uui-button
          data-copy-to-clipboard=${property.key}
          title="Copy custom property to clipboard"
          label="Copy custom property to clipboard"
          compact
          >${copyIcon}</uui-button
        >
      </div></uui-table-cell
    >
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

const propertySizeTemplate = (property: any) =>
  html` <uui-table-row>
    <uui-table-cell
      ><div
        style="display: flex; justify-content: space-between; align-items: center;">
        ${property.key}<uui-button
          data-copy-to-clipboard=${property.key}
          title="Copy custom property to clipboard"
          label="Copy custom property to clipboard"
          compact
          >${copyIcon}</uui-button
        >
      </div></uui-table-cell
    >
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
    '--uui-color-color-border',
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
    '--uui-color-disabled',
  ];
  const universal = ['--uui-color-header'];

  return html`
    <article style="max-width:580px;">
      <div
        style="display:block; border-bottom: 1px solid var(--uui-palette-cocoa-black); padding-top: var(--uui-size-layout-5); margin-bottom:var(--uui-size-layout-3); padding-bottom:var(--uui-size-layout-1);">
        <h1>Interface Colors</h1>
        <p class="uui-lead">
          Interface styling should use the following properties to ensure
          contrasts and appearance follows the current theme.
        </p>
        <p>
          Here's a description and examples of how to use the interface colors.
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
          default variant as it's background. Mostly used for text and icons.
        </li>
        <li>
          <b>Standalone</b> - This color will have a higher contrast to the
          background than it's default variant. Example: if the background is
          light, the standalone variant will be a darker variant of the default
          variant. Often used when thin or smaller items has to stand out on the
          background. Useful for items such as: text, icons and border.
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

//TODO update and uncomment when the spacing system is set in stone
// export const DesignSystem = () => html` <div
//     style="background-color: var(--uui-color-cocoa-black); color:white;">
//     <div class="design">
//       <br />
//       <br />
//       <br />
//       <h1>Design Guide</h1>
//       <div class="lead">
//         Following predictable rhythms, will form harmonious arrangements<br />
//         — ensuring a calm & friendly visual experience.
//       </div>
//       <p>
//         The following guide will take you through the concepts of the Umbraco
//         Design. The main purpose is to establish a common visual appearance by
//         incorporating a common mathematical rhythm for spacing and sizing. This
//         guide will suit you for contributing or implementing our design.
//       </p>
//     </div>
//   </div>
//   <div class="design">
//     <h2>Baseline grid & base unit</h2>
//     <p>
//       Baseline grids is a classic layout method, ensuring everything aligns
//       vertically on line with a certain rhythm. This rhythm will be of same size
//       as our base-unit, which almost everything in our design will be based
//       upon.
//     </p>
//     <blockquote>
//       You can view the baseline grid at anytime by pressing CTRL + G on your
//       keyboard.
//     </blockquote>
//     <p>
//       Our base-unit is 6px, providing sizing options of 6, 12, 18, 24, 30, 36,
//       42, ... This provides a wide variety of sizes kept in a certain system.
//     </p>

//     <h2>Spacing</h2>
//     <p>
//       The general rule of spacing is that the space between elements declares
//       the relation of those. The more related elements are they should stay
//       closer than ones that are less related. It's not a absolute rule as we can
//       use other visual elements to indicate separation, like lines are
//       background color. When using pure space for separation we need to ensure
//       the space divided is distinguishable for the eye.
//     </p>
//     <p>
//       If the size of the component is defined with an attribute these are the
//       absolute values:
//     </p>

//     <div style="width: 100%; margin-bottom: 11px;">
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Custom property name</th>
//             <th>Size</th>
//             <th>Calculation</th>
//             <th>Example</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Base unit</td>
//             <td>--uui-size-1</td>
//             <td>3</td>
//             <td></td>
//             <td>
//               <div
//                 style="background:var(--uui-color-space-cadet); width:6px; height:6px;"></div>
//             </td>
//           </tr>

//           <tr>
//             <td>Small</td>
//             <td>--uui-size-4</td>
//             <td>12</td>
//             <td>3 * 4</td>
//             <td>
//               <div
//                 style="background:var(--uui-color-space-cadet); width:12px; height:12px;"></div>
//             </td>
//           </tr>

//           <tr>
//             <td>Medium</td>
//             <td>--uui-size-8</td>
//             <td>24</td>
//             <td>3 * 8</td>
//             <td>
//               <div
//                 style="background:var(--uui-color-space-cadet); width:24px; height:24px;"></div>
//             </td>
//           </tr>

//           <tr>
//             <td>Large</td>
//             <td>--uui-size-10</td>
//             <td>30</td>
//             <td>3 * 10</td>
//             <td>
//               <div
//                 style="background:var(--uui-color-space-cadet); width:30px; height:30px;"></div>
//             </td>
//           </tr>

//           <tr>
//             <td>Extra Large</td>
//             <td>--uui-size-14</td>
//             <td>42</td>
//             <td>3 * 14</td>
//             <td>
//               <div
//                 style="background:var(--uui-color-space-cadet); width:42px; height:42px;"></div>
//             </td>
//           </tr>

//           <tr>
//             <td>Extra Extra Large</td>
//             <td>--uui-size-20</td>
//             <td>60</td>
//             <td>3 * 20</td>
//             <td>
//               <div
//                 style="background:var(--uui-color-space-cadet); width:60px; height:60px;"></div>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     <p>
//       The chosen sequence provides a certain growth without begin too
//       aggressive. This is due to our screen real estate is often very valuable.
//     </p>

//     <h2>Sizing</h2>
//     <p>
//       Sizing of visual elements is a very individual matter, consider the
//       relations both internal and external of that context. Use the base-unit as
//       the general unit but don't be scared to make minor adjustments if
//       necessary, its common to make optical adjustments of a few pixels to make
//       a space seem right.
//     </p>

//     <h2>Typography</h2>
//     <p>
//       The Umbraco font-face is the Google Font: Lato, we have it available in 3
//       different thicknesses 300 400 and 700.
//     </p>
//     <p>Here is the different headline sizes displayed.</p>
//     <h1>Headline H1</h1>
//     <h2>Headline H2</h2>
//     <h3>Headline H3</h3>
//     <h4>Headline H4</h4>
//     <h5>Headline H5</h5>
//     <br />
//     <p>
//       The default font-size is 15px, for a nice reading experience this conforms
//       well with a line-height of 24px, which is our base-unit times 4.
//     </p>
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//       veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//       commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
//       velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
//       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
//       est laborum.
//     </p>

//     <p>
//       For small descriptions we will use 12px, for a nice reading experience
//       this conforms well with a line-height of 18px, which is our base-unit
//       times 3.
//     </p>

//     <small>
//       Lorem ipsum enim ad minim veniam, quis nostrud exercitation ullamco
//       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
//       qui officia deserunt mollit anim id est laborum.</small
//     >
//   </div>`;
