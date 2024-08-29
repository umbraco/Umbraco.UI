import { Args } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';

/**
 * Render a list of slots, filtering out any null or undefined slots to prevent empty lines.
 * Accepts an array of TemplateResults or an Args object. If an Args object is provided, it will render any properties that end with 'slot'.
 */

function renderSlots(args: Args): TemplateResult | typeof nothing;
function renderSlots(
  param: TemplateResult[] | Args,
): TemplateResult | typeof nothing {
  let slots: TemplateResult[] = [];

  // if param is array, set slots to param
  // if param is object, set slots to values of properties that end with 'slot'

  if (Array.isArray(param)) {
    slots = param;
  } else {
    const slotKeys = Object.keys(param).filter(key => key.endsWith('slot'));
    slots = slotKeys.map(key => param[key]);
  }

  // Filter out any null or undefined slots to avoid rendering empty content
  const validSlots = slots.filter(Boolean);

  // If there are no valid slots, return an empty html result
  if (validSlots.length === 0) {
    return nothing;
  }

  // Join slots with consistent formatting; no extra line breaks between them
  // prettier-ignore
  const spacing = '  ';
  const formattedSlots = validSlots.map(
    (slot, index) => html`${index === 0 ? '' : '\n'}${spacing}${slot}`,
  );

  // Return the combined template results
  return html`${formattedSlots}`;
}
export { renderSlots };
