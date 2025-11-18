import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, PANEL_ID } from './constants';
import { ReadmePanel } from './panel';

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Readme',
    render: ({ active }) => ReadmePanel({ active: active || false }),
  });
});
