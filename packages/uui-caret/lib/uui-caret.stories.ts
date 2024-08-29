import '.';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers';

const meta: Meta = {
  id: 'uui-caret',
  component: 'uui-caret',
  title: 'Symbols/Caret',
  render: args => html`<uui-caret ${spread(args)}></uui-caret>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
