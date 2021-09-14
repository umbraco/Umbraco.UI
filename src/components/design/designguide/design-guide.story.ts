import { html } from 'lit-html';
import './index';
import '../../layout/uui-lead/index';

export default {
  title: 'Design',
};

export const DesignSystem = () => html`
  <div style="background-color: var(--uui-color-cocoa-black); color:white;">
    <uui-design>
      <br />
      <br />
      <br />
      <h1>Design Guide</h1>
      <uui-lead>
        Following predictable rhythms, will form harmonious arrangements<br />
        — ensuring a calm & friendly visual experience.
      </uui-lead>
      <p>
        The following guide will take you through the concepts of the Umbraco
        Design. The main purpose is to establish a common visual appearance by
        incorporating a common mathematical rhythm for spacing and sizing. This
        guide will suit you for contributing or implementing our design.
      </p>
    </uui-design>
  </div>
  <uui-design>
    <h2>Baseline grid & base unit</h2>
    <p>
      Baseline grids is a classic layout method, ensuring everything aligns
      vertically on line with a certain rhythm. This rhythm will be of same size
      as our base-unit, which almost everything in our design will be based
      upon.
    </p>
    <blockquote>
      You can view the baseline grid at anytime by pressing CTRL + G on your
      keyboard.
    </blockquote>
    <p>
      Our base-unit is 6px, providing sizing options of 6, 12, 18, 24, 30, 36,
      42, ... This provides a wide variety of sizes kept in a certain system.
    </p>

    <h2>Spacing</h2>
    <p>
      The general rule of spacing is that the space between elements declares
      the relation of those. The more related elements are they should stay
      closer than ones that are less related. Its not a absolute rule as we can
      use other visual elements to indicate separation, like lines are
      background color. When using pure space for separation we need to ensure
      the space divided is distuinqusable for the eye.
    </p>
    <p>Our selection of sizes to be used in most cases:</p>

    <div style="width: 100%; margin-bottom: 11px;">
      <style>
        table {
          width: 100%;
          margin: 0;
          padding: 0;
          border: solid 1px #ddeeee;
          border-collapse: collapse;
          border-spacing: 0;
        }

        th {
          background-color: #e7e7e7;
          border: solid 1px #e7e7e7;
          color: #525252;
          padding: 5px 12px 6px 12px;
          text-align: left;
        }
        td {
          border: solid 1px #e7e7e7;
          color: #252525;
          padding: 5px 12px 6px 12px;
        }
      </style>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Custom property name</th>
            <th>Size</th>
            <th>Calculation</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Half base unit</td>
            <td>--uui-size-half-base-unit</td>
            <td>3</td>
            <td>6 / 2</td>
            <td>
              <div
                style="background:var(--uui-color-space-cadet); width:3px; height:3px;"></div>
            </td>
          </tr>

          <tr>
            <td>Base unit</td>
            <td>--uui-size-base-unit</td>
            <td>6</td>
            <td></td>
            <td>
              <div
                style="background:var(--uui-color-space-cadet); width:6px; height:6px;"></div>
            </td>
          </tr>

          <tr>
            <td>Small</td>
            <td>--uui-size-small</td>
            <td>12</td>
            <td>6 * 2</td>
            <td>
              <div
                style="background:var(--uui-color-space-cadet); width:12px; height:12px;"></div>
            </td>
          </tr>

          <tr>
            <td>Medium</td>
            <td>--uui-size-medium</td>
            <td>24</td>
            <td>6 * 4</td>
            <td>
              <div
                style="background:var(--uui-color-space-cadet); width:24px; height:24px;"></div>
            </td>
          </tr>

          <tr>
            <td>Large</td>
            <td>--uui-size-large</td>
            <td>30</td>
            <td>24 + 6</td>
            <td>
              <div
                style="background:var(--uui-color-space-cadet); width:30px; height:30px;"></div>
            </td>
          </tr>

          <tr>
            <td>Extra Large</td>
            <td>--uui-size-xlarge</td>
            <td>42</td>
            <td>30 + 12</td>
            <td>
              <div
                style="background:var(--uui-color-space-cadet); width:42px; height:42px;"></div>
            </td>
          </tr>

          <tr>
            <td>Extra Extra Large</td>
            <td>--uui-size-xxlarge</td>
            <td>60</td>
            <td>42 + 18</td>
            <td>
              <div
                style="background:var(--uui-color-space-cadet); width:60px; height:60px;"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      The first part of the selection is based on the base unit of 6, the medium
      size is the one used for our baseline-grid, technically the line-height.
      This value is the origin for our geometric sequence. The chosen sequence
      provides a certain growth without begin too aggressive. This is due to our
      screen real estate is often very valuable.
    </p>

    <h2>Sizing</h2>
    <p>
      Sizing of visual elements is a very individual matter, consider the
      relations both internal and external of that context. Use the base-unit as
      the general unit but don't be scared to make minor adjustments if
      necessary, its common to make optical adjustments of a few pixels to make
      a space seem right.
    </p>

    <h2>Typography</h2>
    <p>
      The Umbraco font-face is the Google Font: Lato, we have it available in 3
      different thicknesses 300 400 and 700.
    </p>
    <p>Here is the different headline sizes displayed.</p>
    <h1>Headline H1</h1>
    <h2>Headline H2</h2>
    <h3>Headline H3</h3>
    <h4>Headline H4</h4>
    <h5>Headline H5</h5>
    <p>
      The default font-size is 15px, for a nice reading experience this conforms
      well with a line-height of 24px, which is our base-unit times 4.
      <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <small>
      For small descriptions we will use 12px, for a nice reading experience
      this conforms well with a line-height of 18px, which is our base-unit
      times 3. <br />Lorem ipsum enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
      nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.</small
    >

    <h2>Colors</h2>
    <p>
      We provide all the Umbraco Identity colors as css custom properties, but
      we do not recommend using those directly. All interface should be based on
      interface color properties. Here is an overview of colors:
    </p>
    <div
      style="background:var(--uui-color-deep-saffron); width:60px; height:60px;">
      deep-saffron
    </div>
    <div style="background:var(--uui-color-sunglow); width:60px; height:60px;">
      sunglow
    </div>
    <div
      style="background:var(--uui-color-spanish-pink); width:60px; height:60px;">
      spanish-pink
    </div>
    <div style="background:var(--uui-color-gunmetal); width:60px; height:60px;">
      gunmetal
    </div>
    <div
      style="background:var(--uui-color-space-cadet); width:60px; height:60px;">
      space-cadet
    </div>
    <div
      style="background:var(--uui-color-violet-blue); width:60px; height:60px;">
      violet-blue
    </div>
    <div style="background:var(--uui-color-matisse); width:60px; height:60px;">
      matisse
    </div>
    <div style="background:var(--uui-color-malibu); width:60px; height:60px;">
      malibu
    </div>
    <div
      style="background:var(--uui-color-maroon-flush); width:60px; height:60px;">
      maroon-flush
    </div>
    <div
      style="background:var(--uui-color-jungle-green); width:60px; height:60px;">
      jungle-green
    </div>
    <div
      style="background:var(--uui-color-cocoa-black); width:60px; height:60px;">
      cocoa-black
    </div>
    <div
      style="background:var(--uui-color-dune-black); width:60px; height:60px;">
      dune-black
    </div>
    <div
      style="background:var(--uui-color-cocoa-brown); width:60px; height:60px;">
      cocoa-brown
    </div>
    <div
      style="background:var(--uui-color-chamoisee); width:60px; height:60px;">
      chamoisee
    </div>
    <div
      style="background:var(--uui-color-timberwolf); width:60px; height:60px;">
      timberwolf
    </div>
    <div style="background:var(--uui-color-gravel); width:60px; height:60px;">
      gravel
    </div>
    <div style="background:var(--uui-color-sand); width:60px; height:60px;">
      sand
    </div>
    <div style="background:var(--uui-color-white); width:60px; height:60px;">
      white
    </div>
    <div style="background:var(--uui-color-black); width:60px; height:60px;">
      black
    </div>
    <div style="background:var(--uui-color-grey); width:60px; height:60px;">
      grey
    </div>
    <div
      style="background:var(--uui-color-dusty-grey); width:60px; height:60px;">
      dusty-grey
    </div>
    <div
      style="background:var(--uui-color-mine-grey); width:60px; height:60px;">
      mine-grey
    </div>
  </uui-design>
`;
