import { Args } from '@storybook/web-components';
import { nothing, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * Render a list of slots, filtering out any null or undefined slots to prevent empty lines.
 * Accepts an array of TemplateResults or an Args object. If an Args object is provided, it will render any properties that end with 'slot'.
 */
// TODO: add a way to control the new lines. Eg exclude newlines: before, after, between as an array
function renderSlots(args: Args): TemplateResult[] | typeof nothing;
function renderSlots(param: TemplateResult[] | Args) {
  let slots: TemplateResult[] = [];

  // if param is array, set slots to param
  // if param is object, set slots to values of properties that end with 'slot'

  if (Array.isArray(param)) {
    slots = param;
  } else {
    const slotKeys = Object.keys(param).filter(
      key => key === 'slot' || key.endsWith(' slot'),
    );
    slots = slotKeys.map(key => param[key]);
  }

  // Filter out any null or undefined slots to avoid rendering empty content
  const validSlots = slots.filter(Boolean);

  // If there are no valid slots, return an empty html result
  if (validSlots.length === 0) {
    return nothing;
  }

  // Join slots with consistent formatting; no extra line breaks between them
  const spacing = '  ';

  const stringSlots = validSlots.map(slot =>
    typeof slot === 'string' ? slot : slot.strings?.[0] ?? '',
  );
  const stringSlotsJoined = stringSlots.join('\n');
  const stringSlotsJoinedWithSpacing = stringSlotsJoined
    .split('\n')
    .map(line => spacing + line)
    .join('\n');

  return unsafeHTML(stringSlotsJoinedWithSpacing);
}
export { renderSlots };
