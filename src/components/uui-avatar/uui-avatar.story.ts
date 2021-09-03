import { Story } from "@storybook/web-components";
import { html } from "lit";
import { spreadProps } from "../../storybook/helper/SpreadPropsDirective";
import "./index";

export default {
  title: "Displays/Avatar",
  component: "uui-avatar",
  args: {
    title: "First Last",
  },
};

const avatarSrc =
  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&s=b616b2c5b373a80ffc9636ba24f7a4a9";

  // @ts-ignore
const avatarSrcSet = [
  `${avatarSrc}&h=100&w=100`,
  `${avatarSrc}&h=200&w=200`,
  `${avatarSrc}&h=300&w=300`,
];

// @ts-ignore
const sizes = [0, 1, 2, 3, 4, 5];

const avatar = (props: any, style?: string) =>
  html`<uui-avatar ${spreadProps(props)} style=${style!}
    >${props.slot}</uui-avatar
  >`;

export const Basic: Story = (props) => avatar(props);

export const Picture: Story = (props) => avatar(props);
Picture.args = { imgSrc: avatarSrcSet[0] };
Picture.parameters = { controls: { include: ["imgSrc", "title"] } };

export const Sizes: Story = (props) => html`
  <div style="display: flex">
    ${sizes.map((size) => avatar(props, `font-size: ${1 + size / 2}em;`))}
  </div>
`;
Sizes.parameters = { controls: { include: ["title"] } };

export const Colors: Story = (props) => avatar(props, `background-color: ${props.backgroundColor}; color: ${props.textColor}`);

Colors.parameters = { controls: { include: ["title", "backgroundColor", "textColor"] } };
Colors.args = { textColor: "white", backgroundColor: "blue" };

export const SlottedContent: Story = (props) => avatar(props);
SlottedContent.parameters = {
  controls: { include: ["title", "overflow", "slot"] },
};
SlottedContent.args = { slot: "Hello" };

export const WidthBadge: Story = (props) => html`
  <div style="font-size: 1.5em; display: flex; align-items: center;">
    <uui-avatar ${spreadProps(props)}><uui-badge>!</uui-badge></uui-avatar>
    <uui-avatar
      ${spreadProps(props)}
      img-src="${avatarSrcSet[0]}"
      img-srcset="${avatarSrcSet[1]} 2x, ${avatarSrcSet[2]} 3x"
      ><uui-badge>!</uui-badge></uui-avatar
    >
  </div>
`;
WidthBadge.args = { overflow: true };
WidthBadge.parameters = { controls: { include: ["title", "overflow"] } };
