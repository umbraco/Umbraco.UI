import { html } from 'lit-html';

export default {
  title: 'Design/Guidelines',
};

export const LayoutSystem = () => html`
  <article class="uui-root uui-text" style="max-width:580px;">
    <div
      style="display:block; border-bottom: 1px solid var(--uui-color-cocoa-black); padding-top: var(--uui-size-layout-5); margin-bottom:var(--uui-size-layout-3); padding-bottom:var(--uui-size-layout-1);">
      <h1>Layout System</h1>
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
      Baseline grids is a classic layout method, ensuring everything aligns
      vertically on line with a certain rhythm. This rhythm will be of same size
      as our base-unit, which almost everything in our design will be based
      upon.
    </p>
    <p>
      We have no creat way of ensuring this in web applications, but we should
      try to follow this concept when we design out layouts.
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
      closer than ones that are less related. It's not a absolute rule as we can
      use other visual elements to indicate separation, like lines and
      background color. When using pure space for separation we need to ensure
      the space divided is distinguishable for the eye.
    </p>
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

export const TypographyGuideline = () => html`
  <article class="uui-root uui-text" style="max-width:580px;">
    <div
      style="display:block; border-bottom: 1px solid var(--uui-color-cocoa-black); padding-top: var(--uui-size-layout-5); margin-bottom:var(--uui-size-layout-3); padding-bottom:var(--uui-size-layout-1);">
      <h1>Typography Guide</h1>
      <p class="uui-lead">
        Typography should differentiated enough visually to establish hierarchy.
        This hierarchy should provide a visual overview of the textual content.
      </p>
      <p>
        The following guide will take you through the concepts of the Umbraco
        Textual Styles. This establishes a common textual reading experience
        across sections and implementations.
      </p>
    </div>

    <h2>Font & Weights</h2>
    <p>
      The Umbraco font-face is the Google Font: Lato, we have it available in 3
      different thicknesses 300 400 and 700.
    </p>

    <br />

    <h2>Headlines</h2>
    <p>There is five headline sizings to pick from:</p>
    <h5>Headline H5</h5>
    <h4>Headline H4</h4>
    <h3>Headline H3</h3>
    <h2>Headline H2</h2>
    <h1>Headline H1</h1>

    <br />

    <h2>Paragraphs & other elements</h2>
    <p>
      The default font-size is 15px, for a nice reading experience this conforms
      well with a line-height of 24px, which is our base-unit times 4.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>

    <blockquote>
      A blockquote can spice up the reading experience by highlighting a certain
      point.
    </blockquote>

    <p>
      Each paragraph is nicely separated, in this way its easier to identify and
      relocated after a distraction.
    </p>

    <small>
      The small tag can be used for descriptions that cannot take too much
      space. The small descriptions use 12px, for a nice reading experience this
      conforms well with a line-height of 18px, which is our base-unit times 3.
    </small>
  </article>
`;
