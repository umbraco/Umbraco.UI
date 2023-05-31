import { html } from 'lit';
import readme from '../README.md?raw';

export default {
  title: 'Design/Style Guide',
  parameters: {
    readme: {
      markdown: readme,
    },
  },
};

export const Layout = () => html`
  <article style="max-width:580px;">
    <div
      style="display:block; border-bottom: 1px solid var(--uui-color-cocoa-black); padding-top: var(--uui-size-layout-5); margin-bottom:var(--uui-size-layout-3); padding-bottom:var(--uui-size-layout-1);">
      <h1>Layout Style Guide</h1>
      <p class="uui-lead">
        Following predictable rhythms, will form harmonious arrangements<br />
        — ensuring a calm & friendly visual experience.
      </p>
      <p>
        The following guide will take you through the concepts of the Umbraco
        Layout System. The main purpose is to establish a common visual
        appearance by incorporating a common mathematical rhythm for spacing and
        sizing. This guide will suit you for contributing or implementing our
        design.
      </p>
    </div>

    <h2>Baseline grid & base unit</h2>
    <p>
      Baseline grids is a classic layout method, the goal of it is to ensuring
      everything aligns vertically to a certain rhythm. This rhythm will be of
      same size as our base-unit, which almost everything in our design will be
      based upon.
    </p>
    <p>
      We have no technical ways to ensuring this in a web application, but we
      should try to follow this concept when we setup the layout of an
      application.
    </p>
    <blockquote>
      You can view the baseline grid at anytime by pressing CTRL + G on your
      keyboard.
    </blockquote>
    <p>
      Base-unit is 6px, providing sizing options of 6, 12, 18, 24, 30, 36, 42,
      ... This provides a wide variety of sizes with noticeable difference.
    </p>

    <h2>Spacing</h2>
    <p>
      The general rule of spacing is that the space between elements declares
      the relation of those. The more related elements should stay closer than
      ones that are less related. It's not a absolute rule as we can use other
      visual elements to indicate separation (ex.: a line or different
      background colors). When using pure space for separation we need to ensure
      the space divided is distinguishable for the eye.
    </p>
    <blockquote>
      The space between elements matters more than getting the size of the
      elements right.
    </blockquote>
    <p>
      The layout custom properties provides layout spacing options for most
      cases. using this system will ensure layout spacing will be coherent
      across different parts of the UI.
    </p>

    <h2>Sizing</h2>
    <p>
      Sizing of visual elements is a very individual matter, consider the
      relations both internal and external of that context. Use the base-unit as
      the general unit but don't be scared to make minor adjustments if
      necessary, its common to make optical adjustments of a few pixels to make
      a space seem right.
    </p>
  </article>
`;

export const Typography = () => html`
  <article style="max-width:580px;">
    <div
      style="display:block; border-bottom: 1px solid var(--uui-color-cocoa-black); padding-top: var(--uui-size-layout-5); margin-bottom:var(--uui-size-layout-3); padding-bottom:var(--uui-size-layout-1);">
      <h1>Typography Style Guide</h1>
      <p class="uui-lead">
        Typography should differentiate enough to establish a visual hierarchy,
        providing orientation points for a calm reading experience.
      </p>
      <p>
        The following guide will take you through the concepts of the Umbraco
        Typography Styles. This establishes a common textual layouts across
        parts and implementations.
      </p>
    </div>

    <h2>Setup</h2>
    <p>
      The Umbraco Typography can be used on a full web application or on a
      dedicated spot. To set the font use the <b>uui-font</b> class on the root
      element or a element of interest. Additionally the <b>uui-text</b> class
      must be set to expose the Umbraco Typography Styles. See the UUI-CSS
      package for more.
    </p>

    <h2>Paragraphs & other elements</h2>
    <p class="uui-lead">
      A lead paragraph can summarize the following text. Lead paragraphs does
      not have a corresponding native element, this is solved by applying the
      class 'uui-lead' to a &#60;p&#62; element.
    </p>
    <p>
      The default font-size is 15px, for a nice reading experience this conforms
      well with a line-height of 24px, (base-unit * 4).
    </p>

    <blockquote>
      A blockquote can spice up the reading experience by highlighting a certain
      point.
    </blockquote>

    <p>
      Each &#60;p&#62; tag is nicely separated, in this way its easier to
      identify and relocated after a distraction.
    </p>

    <small>
      The &#60;small&#62; tag can be used for descriptions that cannot use too
      much space. The small descriptions use 12px, for a nice reading experience
      this conforms well with a line-height of 18px, (base-unit * 3).
    </small>

    <h2>Headlines</h2>
    <p>
      The headlines can be used via the dedicated native tag or by one of the
      equivalent classes. This means that <b>Headline 1</b> can be used used via
      <b>&#60;h1&#62;</b> or the class <b>uui-h1</b>.
    </p>
    <h5>Headline H5</h5>
    <h4>Headline H4</h4>
    <h3>Headline H3</h3>
    <h2>Headline H2</h2>
    <h1>Headline H1</h1>
    <ul>
      <li>&#60;h5&#62; — .uui-h5</li>
      <li>&#60;h4&#62; — .uui-h4</li>
      <li>&#60;h3&#62; — .uui-h3</li>
      <li>&#60;h2&#62; — .uui-h2</li>
      <li>&#60;h1&#62; — .uui-h1</li>
    </ul>
  </article>
`;
