import '.';

import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'FormControlMixin',
  title: 'Inputs/Form/FormControlMixin',
};

export const AAAOverview: Story = () =>
  html`
    <p>FormControlMixin can be used to make a web component part of a form.</p>
  `;
AAAOverview.storyName = 'Overview';
