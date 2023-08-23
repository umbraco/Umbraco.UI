import type { Meta, StoryObj } from '@storybook/web-components';

import './uui-popover-container.element';
import type { UUIPopoverContainerElement } from './uui-popover-container.element';
// import readme from '../README.md?raw';
import { html } from 'lit';

const meta: Meta<UUIPopoverContainerElement> = {
  id: 'uui-popover-container',
  title: 'Popover Container',
  component: 'uui-popover-container',
  parameters: {
    // readme: { markdown: readme },
    docs: {
      source: {
        code: `<uui-popover-container></uui-popover-container>`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<UUIPopoverContainerElement>;

export const Overview: Story = {
  render: () => html`
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <button id="popover-button" popovertarget="popover-container">
      open popover
    </button>
    <div>Whatever</div>
    <uui-popover-container
      id="popover-container"
      popover></uui-popover-container>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>

    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequuntur
      voluptate nihil iste praesentium nesciunt reiciendis voluptates? Dolore
      quis animi soluta perspiciatis, debitis tempore, harum qui hic ea
      necessitatibus molestias!
    </div>
  `,
};
