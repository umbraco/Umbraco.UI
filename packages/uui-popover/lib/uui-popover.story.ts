import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-popover',
  title: 'Displays/Popover',
  component: 'uui-popover',
  argTypes: {
    overlayPos: {
      options: [
        'topLeft',
        'topCenter',
        'topRight',
        'botLeft',
        'botCenter',
        'botRight',
        'leftTop',
        'leftCenter',
        'leftBot',
        'rightTop',
        'rightCenter',
        'rightBot',
      ],
      control: { overlayPos: 'select' },
    },
  },
  args: {
    overlayPos: 'botLeft',
    margin: 8,
    useClamp: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<uui-popover></uui-popover>`,
      },
    },
  },
};

// export const Default = () => {
//   const element = html`
//     <!-- <div style="position: fixed; top: 0; left: 0; width: 50vw; height: 100vh; pointer-events: none; background: #ff000033"></div>
//   <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 50vh; pointer-events: none; background: #0000ff1a"></div> -->
//     <h1>Scroll to find me</h1>
//     <div style="padding: 1500px">
//       <dropdown-test></dropdown-test>
//     </div>
//   `;
//   return element;
// };

function handleClick(e: MouseEvent) {
  //@ts-ignore
  e.target.parentNode.open = !e.target.parentNode.open;
}

export const AAAOverview: Story = props => html`
  <div style="display: flex; height: 100%; width: 100%">
    <uui-popover
      id="pop-out"
      style="margin: auto"
      .margin=${props.margin}
      .overlayPos=${props.overlayPos || 'botLeft'}
      .open=${props.open}
      .useClamp=${props.useClamp}
      .useAutoPlacement=${props.useAutoPlacement}>
      <span
        @click=${handleClick}
        @keydown=${() => ''}
        slot="parent"
        style="padding: .5rem 1rem; border: 1px solid; display: inline-block; cursor: pointer; user-select: none; border-radius: 4px;">
        I will open the dropdown
      </span>
      <div
        slot="overlay"
        style="padding: .5rem; border: 1px solid; border-radius: 4px; width: 200px">
        I am the dropdown container
        <div
          style="padding: 1rem; height: 100px; width: 100px; border: 1px solid">
          more content
        </div>
      </div>
    </uui-popover>
  </div>
`;

AAAOverview.storyName = 'Overview';

export const ScrollContainer: Story = props => html`
  <div
    style="display: flex; width: 500px; height: 500px; border: 1px solid; overflow: auto;">
    <div style="display: flex; min-height: 1000px; min-width: 1000px">
      <uui-popover
        id="pop-out"
        style="margin: auto"
        .margin=${props.margin}
        .overlayPos=${props.overlayPos}
        .open=${props.open}
        .useClamp=${props.useClamp}
        .useAutoPlacement=${props.useAutoPlacement}>
        <span
          @click=${handleClick}
          @keydown=${() => ''}
          slot="parent"
          style="padding: .5rem 1rem; border: 1px solid; display: inline-block; cursor: pointer; user-select: none; border-radius: 4px;">
          I will open the dropdown
        </span>
        <div
          slot="overlay"
          style="padding: .5rem; border: 1px solid; border-radius: 4px; width: 100px; height: 100px">
          I am the dropdown container
        </div>
      </uui-popover>
    </div>
  </div>
`;
export const ScrollBody: Story = props => html`
  <div style="display: flex; min-height: 1000px; min-width: 1000px">
    <uui-popover
      id="pop-out"
      style="margin: auto"
      .margin=${props.margin}
      .overlayPos=${props.overlayPos}
      ?open=${props.open}
      .useClamp=${props.useClamp}
      .useAutoPlacement=${props.useAutoPlacement}>
      <span
        @click=${handleClick}
        @keydown=${() => ''}
        slot="parent"
        style="padding: .5rem 1rem; border: 1px solid; display: inline-block; cursor: pointer; user-select: none; border-radius: 4px;">
        I will open the dropdown
      </span>
      <div
        slot="overlay"
        style="padding: .5rem; border: 1px solid; border-radius: 4px; width: 100px; height: 100px">
        I am the dropdown container
      </div>
    </uui-popover>
  </div>
`;
