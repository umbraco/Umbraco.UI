import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Displays/Avatar/Avatar',
  id: 'uui-avatar',
  component: 'uui-avatar',
  args: {
    name: 'Umbraco HQ',
    fontSize: 12,
  },
  argTypes: {
    slot: { control: { type: 'text' } },
  },
  // argTypes: {
  //   'img-src': { table: { disable: true } },
  //   'img-srcset': { table: { disable: true } },
  // },
  // parameters: { controls: { exclude: ["img-src"] } }
};

const avatarSrc =
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9';

// @ts-ignore
const avatarSrcSet = [
  `${avatarSrc}&h=100&w=100`,
  `${avatarSrc}&h=200&w=200`,
  `${avatarSrc}&h=300&w=300`,
];

const Template: Story = (props: any) => html`<uui-avatar
  .overflow=${props.overflow}
  .imgSrc=${props.imgSrc}
  .imgSrcset=${props.imgSrcset}
  .name=${props.name}
  style="font-size: ${props.fontSize}px; background-color: ${props.backgroundColor}; color: ${props.color}"
  >${props.slot}</uui-avatar
>`;

export const AAAOverview = Template.bind({});
AAAOverview.storyName = 'Overview';
AAAOverview.args = { color: '#1b264f', backgroundColor: '#f5c1bc' };
AAAOverview.argTypes = {
  color: { table: { category: 'inline styling' } },
  backgroundColor: { table: { category: 'inline styling' } },
  fontSize: { table: { category: 'inline styling' } },
};
AAAOverview.parameters = {
  docs: {
    source: {
      code: `<uui-avatar name="Umbraco HQ"></uui-avatar>`,
    },
  },
};

export const Picture = Template.bind({});
Picture.args = { imgSrc: avatarSrcSet[0] };
Picture.parameters = {
  controls: { include: ['imgSrc', 'imgSrcset', 'name'] },
  docs: {
    source: {
      code: `<uui-avatar src="..." name="Firstname Lastname"></uui-avatar>`,
    },
  },
};

export const Sizes = Template.bind({});
Sizes.argTypes = {
  fontSize: { table: { category: 'inline styling' } },
};
Sizes.parameters = {
  controls: { include: ['fontSize', 'name'] },
  docs: {
    source: {
      code: `<uui-avatar style="font-size: 12px;"></uui-avatar>`,
    },
  },
};

export const Colors = Template.bind({});
Colors.args = { color: 'white', backgroundColor: 'blue' };
Colors.argTypes = {
  color: { table: { category: 'inline styling' } },
  backgroundColor: { table: { category: 'inline styling' } },
};
Colors.parameters = {
  controls: { include: ['backgroundColor', 'color', 'name'] },
  docs: {
    source: {
      code: `<uui-avatar style="background-color: blue; color: white" name="Umbraco HQ"></uui-avatar>`,
    },
  },
};

export const SlottedContent = Template.bind({});
SlottedContent.args = { slot: 'overflow', name: '' };
SlottedContent.parameters = {
  controls: { include: ['overflow', 'slot'] },
  docs: {
    source: {
      code: `<uui-avatar overflow name="overflow name">overflow content</uui-avatar>`,
    },
  },
};

export const InlineWithText = (props: any) => html`
  <div>
    Text
    <uui-avatar
      name="Hello world"
      style="background-color: ${props.backgroundColor}; color: ${props.color}"
      >${props.slot}</uui-avatar
    >
    around
  </div>
`;
InlineWithText.parameters = {
  docs: {
    source: {
      code: `Text <uui-avatar name="Hello world">overflow</uui-avatar> around`,
    },
  },
};

export const WithBadge = Template.bind({});
WithBadge.args = { slot: html`<uui-badge>!</uui-badge>`, overflow: true };
WithBadge.parameters = {
  controls: { include: ['overflow', 'name'] },
  docs: {
    source: {
      code: `<uui-avatar name="Umbraco HQ"><uui-badge>!</uui-badge></uui-avatar>`,
    },
  },
};
