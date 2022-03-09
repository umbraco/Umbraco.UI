// /my-addon/src/register.js

import React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import ReactMarkdown from 'react-markdown';
import { STORY_CHANGED, STORY_UNCHANGED } from '@storybook/core-events';

const ADDON_ID = 'readme';
const PANEL_ID = `${ADDON_ID}/panel`;

const Readme = props => {
  return (
    <div>
      <ReactMarkdown children={props.markdown} />
    </div>
  );
};

addons.register(ADDON_ID, api => {
  let markdown = '';

  api.on(STORY_CHANGED, eventData => {
    console.log('EHM HALLO', eventData);
    const component = api.getCurrentStoryData().component;
    console.log('TESTING', component);
    markdown =
      require(`!raw-loader!../../packages/${component}/README.md`).default;
  });

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Readme',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Readme markdown={markdown} />
      </AddonPanel>
    ),
  });
});
