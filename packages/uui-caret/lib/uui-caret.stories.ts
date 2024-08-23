import '.';
import { html, nothing } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { spread } from '../../../storyhelpers/spread-directive';

const meta: Meta = {
  id: 'uui-caret',
  component: 'uui-caret',
  title: 'Symbols/Caret',
  render: props => html`<uui-caret ${spread(props)}></uui-caret>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
