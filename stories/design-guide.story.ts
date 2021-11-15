import { html, svg } from 'lit-html';
import customProperties from './../custom-properties.json';

const properties = Object.keys(customProperties.customProperties).map(
  // @ts-ignore:
  key => ({ key: key, value: customProperties.customProperties[key] })
);

const copyIcon = svg`<svg style="pointer-events: none" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon m-2">
<path fill="currentColor" fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
</svg>`;

export default {
  title: 'Design/Design',
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const propertyTemplate = (property: any) => html` <tr>
<td><div style="display: flex; justify-content: space-between">
${property.key}<uui-button title="Copy to clipboard" compact @click=${(
  e: MouseEvent
) => {
  copyToClipboard(property.key);
  const button = e.target as any;
  button.state = 'success';
}}>${copyIcon}</uui-button></td>
<td>
  <div style="display: flex; justify-content: space-between">
    <code>${property.value}</code
    ><uui-button
    title="Copy to clipboard"
      compact
      @click=${(e: MouseEvent) => {
        copyToClipboard(property.value);
        const button = e.target as any;
        button.state = 'success';
      }}
      >${copyIcon}</uui-button
    >
  </div>
</td>
<td>
  <div
    style="background:var(${property.key}); width:60px; height:60px;"></div>
</td>
</tr>`;

export const Looks = () => html` <h2>Looks</h2>
  <p>
    These are used to overwrite selected interface properties to get a specific
    look.
  </p>

  <h3>Primary Look</h3>
  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('look-primary'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>

  <h3>Secondary Look</h3>
  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('look-secondary'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>

  <h3>Positive Look</h3>
  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('look-positive'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>

  <h3>Warning Look</h3>
  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('look-warning'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>

  <h3>Danger Look</h3>
  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('look-danger'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>

  <h3>Placeholder Look</h3>
  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('look-placeholder'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>

  <h3>OutLine Look</h3>
  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('look-outline'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>`;

export const InterfaceColors = () => html`
  <p>
    THe UI Library components use predefined custom properties.If you want your
    element to fit into umbraco's backoffice you can use following custom
    properties. The fallback values are inserted automatically during build.
  </p>

  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('interface'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>
`;

export const BrandColors = () => html`<h2>Colors</h2>
  <p>
    We provide all the Umbraco Identity colors as css custom properties, but we
    do not recommend using those directly. All interface should be based on
    interface color properties. Here is an overview of colors:
  </p>

  <table>
    <thead>
      <tr>
        <th>Custom property name</th>
        <th>Value</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      ${properties
        .filter(property => property.key.includes('color'))
        .map(property => propertyTemplate(property))}
    </tbody>
  </table>`;

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
