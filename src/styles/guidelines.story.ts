import { html } from 'lit';

import '../components/dialog/dialog.js';
import '../components/dialog-layout/dialog-layout.js';
import '../components/button/button.js';
import '../components/icon-registry-essential/icon-registry-essential.js';

export default {
  title: 'Design/Style Guide',
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
      dedicated spot. To set the font use the <strong>uui-font</strong> class on
      the root element or an element of interest. Additionally, the
      <strong>uui-text</strong> class must be set to expose the Umbraco
      Typography Styles. See the UUI-CSS package for more.
    </p>

    <h2>Paragraphs & other elements</h2>
    <p class="uui-lead">
      A lead paragraph can summarize the following text. Lead paragraphs does
      not have a corresponding native element, this is solved by applying the
      class 'uui-lead' to a &#60;p&#62; element.
    </p>
    <p>
      The default font-size is 14px, for a nice reading experience this conforms
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
      equivalent classes. This means that <strong>Headline 1</strong> can be
      used used via <strong>&#60;h1&#62;</strong> or the class
      <strong>uui-h1</strong>.
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

export const Dialog = () => html`
  <article style="max-width:580px;">
    <div
      style="display:block; border-bottom: 1px solid var(--uui-color-cocoa-black); padding-top: var(--uui-size-layout-5); margin-bottom:var(--uui-size-layout-3); padding-bottom:var(--uui-size-layout-1);">
      <h1>Dialog Style Guide</h1>
      <p class="uui-lead">
        The following guide will suit you to write sharp and concrete dialogs.
        Guiding the user to the right action. Requires minimal cognitive effort
        by delivering a very clear message.
      </p>

      <br />

      <uui-dialog>
        <uui-dialog-layout headline="Headline">
          Description
          <uui-button slot="actions">Cancel</uui-button>
          <uui-button slot="actions" look="primary" color="positive"
            >Action</uui-button
          >
        </uui-dialog-layout>
      </uui-dialog>
      <br />

      <p>
        The knowledge of our users varies and this must be carefully considered
        when writing dialogs. Some will feel so much at home that they will
        assume the message, for those users we want something that is easy to
        digest for their eyes.<br />
        Others are learning the system and need to be suited to all of the
        consequences to have confidence in what they do. They will read
        everything but not necessarily understand all words — Therefore we will
        use the description to write sentences and confirm the understanding.
      </p>

      <p>
        One of the dialogs below uses the word 'publishing', and then the
        description unfolds that it will make something public available.
        <br />

        Below you will see a few examples that give you some examples of how
        this can be done in condensed form.
      </p>
    </div>

    <h2>Headline</h2>
    <p>
      The headline must represent the action that will be taken in a short form.
      That way the user can quickly identify what they are asked to take action
      on. In some cases there is room to write out the name of the target, but
      do only so if it will become the last part of the sentence.
    </p>
    <blockquote>
      If the user feels unsure, they will jump to read the description. Use this
      to keep the headline super short.
    </blockquote>
    <h5>Good examples:</h5>
    <ul>
      <li>Delete ´My Page 1´</li>
      <li>Publish with descendants</li>
      <li>Transfer to ´Development´</li>
    </ul>
    <h5>Bad examples:</h5>
    <ul>
      <li>Confirm deleting ´My Page 1´</li>
      <li>Publish ´My Page 1´ with descendants</li>
      <li>Transfer document</li>
    </ul>

    <br />

    <h2>Description</h2>
    <p>
      The description should be used to explain the headline without
      assumptions.<br />
      Try to avoid repeating what the headline said, instead use the description
      to clarify the effect of the action.<br />
    </p>
    <p>
      Notice the description can be styled, for an easier read. We will use bold
      to highlight data. In this way it makes the data stand out and makes it
      easier to anchor that part of the text.
    </p>

    <h4>Good examples:</h4>

    <uui-dialog>
      <uui-dialog-layout headline="Delete 'My Page 1'">
        <strong>My Page 1</strong> and all content items underneath will be
        transferred to the trash bin.
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="danger"
          >Delete</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      In the above example the description helps the user understand the effect
      — and guides the user by mentioning where it goes.
    </p>
    <br />

    <uui-dialog>
      <uui-dialog-layout headline="Publish with descendants">
        Make <strong>My Page 1</strong> and all content items underneath
        publicly available.
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="positive"
          >Publish</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      This helps the user understand the effect of publishing and ´descendants´
      — which for someone who does not have experience can be hard to understand
      at first.
    </p>

    <br />

    <uui-dialog>
      <uui-dialog-layout headline="Transfer to 'Development'">
        Create or update <strong>My Page 1</strong> on the
        <strong>Development</strong> environment. This does not include
        descendant content.
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="positive"
          >Transfer</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      The description must clarify all the factors, in this example both the
      name of the target item and the new environment name is written out.
    </p>
    <br />

    <uui-dialog>
      <uui-dialog-layout headline="Delete 'My Block Type 1'">
        This will permanently delete <strong>My Block Type 1</strong>.
        <br /><br />
        <i>
          Content using this type will no longer be editable and will be shown
          as unsupported content.
        </i>
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="danger"
          >Delete</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      Describe the direct effect first. And if there are secondary effects then
      describe it as well. In this example italicized text is used to describe
      the secondary effect.
    </p>
    <br />

    <h4>Bad examples:</h4>

    <uui-dialog>
      <uui-dialog-layout headline="Delete 'My Page 1'">
        Are you sure you want to delete this content and all content items
        underneath?
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="danger"
          >Confirm</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      No need to write out "Are you sure", the concept of a dialog is a point of
      confirmation so it is intuitively part of the format.
    </p>
    <br />

    <uui-dialog>
      <uui-dialog-layout headline="Publish with descendants">
        Are you sure you want to publish <strong>My Page 1</strong> and all
        descendant items.
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="positive"
          >Publish</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      The description here is not helping the user if they are slightly in doubt
      about the meaning of the words 'publishing' or 'descendant'.
    </p>
    <br />

    <uui-dialog>
      <uui-dialog-layout headline="Transfer to 'Development'">
        Confirm transferring <strong>My Page 1</strong> to the
        <strong>Development</strong> environment. This does not include
        descendant content items.
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="positive"
          >Transfer 'My Page 1'</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      This example displays how writing the name of the page in the action
      button is making it hard to read. See for yourself how much easier it is
      to read the page name as part of the description instead, leaving the
      action very easy to read.
    </p>
    <br />

    <h2>Actions</h2>
    <p>
      Ideally, a dialog is a question of whether the user wants to carry out an
      action or refuse it. Leaving the user with only two options.<br />
      For fast visual confirmation the wording on the actions must be short and
      clear. Use the name of the actual action. And make sure to use that exact
      same word in the headline or alternatively in the description. In this way
      it establishes a connection between the text and the action.
    </p>

    <uui-dialog>
      <uui-dialog-layout headline="Delete 'My Page 1'">
        <strong>My Page 1</strong> and all content items underneath will be
        transferred to the trash bin.
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="danger"
          >Delete</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>

    <br />
    <p>
      There the action is named 'Delete' which has a close relation to the
      headline 'Delete My Page'. In this way the headline helps clarify what the
      action does.<br />
    </p>
    <br />

    <uui-dialog>
      <uui-dialog-layout headline="Publish with descendants">
        Make <strong>My Page 1</strong> and all content items underneath
        publicly available.
        <uui-button slot="actions">Cancel</uui-button>
        <uui-button slot="actions" look="primary" color="positive"
          >Publish</uui-button
        >
      </uui-dialog-layout>
    </uui-dialog>
    <br />
    <p>
      In this case Publish, binds with the headline cause its using the same
      word. If the user is unsure about the target, their eyes can easily spot
      the bold text without reading the actual description and intuitively
      conclude a relation between the Bold text and the action.<br />
    </p>
    <br />
  </article>
`;
