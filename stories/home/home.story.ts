import type { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import './home.story.element.ts';

export default {
  id: 'composite-home',
  title: 'A-Composite/Home',
  component: '',
};

export const Overview: Story = () => html`<story-home></story-home>`;
