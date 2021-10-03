import { html } from 'lit-html';
import { UUIEvent } from '@umbraco-ui/uui-base/lib/events';
import './index';

export default {
  title: 'Compositions/Confirm Dialog',
  component: 'uui-confirm-dialog',
};

export const Danger = () => html`
  <uui-confirm-dialog
    title="Are you sure about this?"
    look="danger"
    @cancel=${(e: UUIEvent) => console.log('Cancelled', e)}
    @submit=${(e: UUIEvent) => console.log('Submitted', e)}
    submitLabel="Delete">
    Description of this very dangerous dialog
  </uui-confirm-dialog>
`;

export const Positive = () => html`
  <uui-confirm-dialog
    title="Would you like to make it happen?"
    look="positive"
    @cancel=${(e: UUIEvent) => console.log('Cancelled', e)}
    @submit=${(e: UUIEvent) => console.log('Submitted', e)}>
    Description of this very positive dialog
  </uui-confirm-dialog>
`;
