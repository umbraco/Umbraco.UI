import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

import { UUIPopoverElement } from './uui-popover.element';
import readme from '../README.md?raw';

export default {
  id: 'uui-popover',
  title: 'Displays/Popover',
  component: 'uui-popover',
  argTypes: {
    placement: {
      options: [
        'auto',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
      control: { type: 'select' },
    },
  },
  args: {
    placement: 'bottom',
    margin: 8,
  },
  parameters: {
    readme: { markdown: readme },
    docs: {
      source: {
        code: `
<script>
  var popover = document.getElementById('myPopover');
  var popoverOpenBtn = document.getElementById('myPopoverBtn');

  popoverOpenBtn.addEventListener('click', () => {
    popover.open = !popover.open;
  });
</script>

<uui-popover placement="bottom-start" id="myPopover">
  <uui-button
    slot="trigger"
    look="primary"
    label="Open dropdown"
    id="myPopoverBtn">
  </uui-button>
  <div slot="popover">
    My Content appearing inside popover box.
  </div>
</uui-popover>`,
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export const AAAOverview: Story = props => {
  const handleClick = (e: MouseEvent) => {
    //@ts-ignore
    e.target.parentNode.open = !e.target.parentNode.open;
  };

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      const popover = document.querySelector(
        'uui-popover',
      ) as UUIPopoverElement;
      popover.open = false;
    }
  }

  return html`
    <div
      style="display: flex; border: 2px solid black; width: 100%; height: 100%; max-height: 80vh; overflow: auto;">
      <div style="display: flex; padding: 200%; flex-direction: column">
        <div>
          <h3 style="width: 300px; text-align: center">
            Scroll around to see how I react!
          </h3>
          <p>
            I will flip up or down if there's no room, and I will squeeze myself
            onto the screen if I get too close the sides.
          </p>
        </div>
        <uui-popover
          id="popover"
          style="margin: auto"
          .margin=${props.margin}
          .placement=${props.placement}
          .open=${props.open}
          @keydown=${onKeyDown}>
          <uui-button
            look="primary"
            @click=${handleClick}
            @keydown=${() => ''}
            slot="trigger"
            style="user-select: none; white-space: nowrap">
            I will open the dropdown
          </uui-button>
          <div
            slot="popover"
            style="display: flex; flex-direction: column; padding: 1rem; border-radius: 3px; width: 200px; background: white; box-shadow: var(--uui-shadow-depth-3)">
            <h3
              style="text-align: center; line-height: normal; margin-bottom: 0;">
              Popover
            </h3>
            <p>
              This can contain any content: buttons, lists, images and so on.
            </p>
            <uui-button look="primary">Button</uui-button>
          </div>
        </uui-popover>
      </div>
    </div>
  `;
};
AAAOverview.storyName = 'Overview';
AAAOverview.args = {};
AAAOverview.play = () => {
  const popover = document.getElementById('popover');
  if (popover) {
    setTimeout(() => {
      popover.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }, 10);
  }
};

export const Nested: Story = props => {
  const togglePopover = (id: string) => {
    let popover = document.querySelector(id) as UUIPopoverElement;

    if (!popover) {
      popover = document.querySelector('#popover-content')!.children[
        Number.parseInt(id.split('-')[1]) - 1
      ] as UUIPopoverElement;
    }

    popover.open = !popover.open;
  };

  const getFirstPopover = (el: Node): Node => {
    if (!(el instanceof UUIPopoverElement) && el !== document.body) {
      return getFirstPopover(el.parentNode!);
    } else {
      return el;
    }
  };

  const closePopover = async (id: string) => {
    let popover = document.querySelector(id) as UUIPopoverElement;
    if (!popover) {
      popover = document.querySelector('#popover-content')!.children[
        Number.parseInt(id.split('-')[1]) - 1
      ] as UUIPopoverElement;
    }

    setTimeout(() => {
      const root = popover.getRootNode();
      // @ts-ignore
      const active = root.activeElement;
      const el = getFirstPopover(active);

      if (popover !== el) {
        popover.open = false;
      }
    }, 0);
  };

  const onkeydown = (e: KeyboardEvent, id: string) => {
    if (e?.key === 'Escape') {
      const popover = document.querySelector('#popover-content')!.children[
        Number.parseInt(id.split('-')[1]) - 1
      ] as UUIPopoverElement;

      popover.open = false;
    }
  };

  const createMenuItem = (id: string) =>
    html`<uui-popover
      id=${id}
      placement="right-start"
      @focusout=${() => closePopover(id)}
      @keydown=${(e: KeyboardEvent) => onkeydown(e, id)}>
      <uui-button
        slot="trigger"
        @click=${() => togglePopover(id)}
        style="--uui-button-border-radius: 0; width: 100%; z-index: 1"
        look="secondary"
        >Click me</uui-button
      >
      <div
        slot="popover"
        style="border: 1px solid var(--uui-color-default); width: 300px; background: white; padding: 1rem; color: var(--uui-color-default); box-sizing: border-box; box-shadow: var(--uui-shadow-depth-3)">
        <h3 style="text-align: center">Content</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
          nesciunt fugiat, ipsa <b tabindex="0">FOCUSABLE</b> molestias maiores
          enim veniam numquam alias minus delectus nam dignissimos assumenda,
          ullam, voluptates hic <b tabindex="0">FOCUSABLE</b> aut natus nobis
          similique!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
          nesciunt fugiat, <b tabindex="0">FOCUSABLE</b> ipsa molestias maiores
          enim veniam numquam alias minus delectus nam dignissimos assumenda,
          ullam, voluptates hic aut natus nobis similique!
        </p>
      </div>
    </uui-popover>`;

  return html`
    <uui-popover
      id="popover"
      style="margin: auto"
      .margin=${props.margin}
      .placement=${props.placement}
      .open=${props.open}>
      <uui-button
        look="secondary"
        @click=${() => togglePopover('#popover')}
        slot="trigger"
        style=" width: 220px; user-select: none; --uui-button-border-radius: 0">
        Click to open dropdown
      </uui-button>
      <div
        id="popover-content"
        slot="popover"
        style="width: 220px; display: flex; flex-direction: column; box-shadow: var(--uui-shadow-depth-3); box-sizing: border-box; background: white; box-shadow: var(--uui-shadow-depth-3)">
        ${createMenuItem('#menu-1')} ${createMenuItem('#menu-2')}
        ${createMenuItem('#menu-3')} ${createMenuItem('#menu-4')}
      </div>
    </uui-popover>
  `;
};

Nested.parameters = {
  controls: {
    include: ['placement', 'margin'],
  },
  docs: {
    source: {
      code: `See story code as example`,
    },
  },
};

export const Tooltip: Story = props => {
  const mouseover = (id: string) => {
    const popover = document.querySelector(id) as UUIPopoverElement;
    popover.open = true;
  };

  const mouseout = (id: string) => {
    const popover = document.querySelector(id) as UUIPopoverElement;
    popover.open = false;
  };

  return html`
    <div
      style="display: flex; border: 2px solid black; width: 100%; height: 100%; max-height: 80vh; overflow: auto;">
      <div style="display: flex; padding: 200%; flex-direction: column">
        <div id="content" style="width: 200px">
          <h3 style="text-align: center">Tooltip</h3>
          <div>
            The two bold words has a
            <uui-popover
              style="margin: auto"
              id="tooltip"
              placement="${props.placement}"
              margin="8">
              <b
                slot="trigger"
                tabindex="0"
                style="cursor: pointer; width: 200px"
                @mouseover=${() => mouseover('#tooltip')}
                @mouseout=${() => mouseout('#tooltip')}
                @focus=${() => mouseover('#tooltip')}
                @blur=${() => mouseout('#tooltip')}>
                tooltip
              </b>
              <div
                slot="popover"
                style="position: relative; z-index: 1; padding: 1rem; border: 1px solid; border-radius: 4px; background: white; box-shadow: var(--uui-shadow-depth-3); white-space: nowrap">
                I am a tooltip!
              </div>
            </uui-popover>
            using auto placement. It will
            <uui-popover
              style="margin: auto"
              id="tooltip-2"
              placement="${props.placement}"
              margin="8">
              <b
                slot="trigger"
                tabindex="0"
                style="cursor: pointer; width: 200px;"
                @mouseover=${() => mouseover('#tooltip-2')}
                @mouseout=${() => mouseout('#tooltip-2')}
                @focus=${() => mouseover('#tooltip-2')}
                @blur=${() => mouseout('#tooltip-2')}>
                automatically
              </b>
              <div
                slot="popover"
                style="z-index: 1; padding: 1rem; border: 1px solid; border-radius: 4px; background: white; box-shadow: var(--uui-shadow-depth-3); width: 200px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                nulla repellat reprehenderit? Explicabo autem dicta neque
                voluptatem velit? Labore dicta perferendis laudantium ad unde
                accusantium aspernatur, fugiat quas! Perspiciatis, et.
              </div>
            </uui-popover>
            place itself to the side that has the most space. <br />
            Hover or focus the bold text to make the tooltips appear.
          </div>
        </div>
      </div>
    </div>
  `;
};

Tooltip.args = {
  placement: 'auto',
};

Tooltip.parameters = {
  controls: {
    include: ['placement', 'margin'],
  },
  docs: {
    source: {
      code: `See story code as example`,
    },
  },
};

Tooltip.play = () => {
  const content = document.getElementById('content');
  if (content) {
    setTimeout(() => {
      content.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }, 10);
  }
};
