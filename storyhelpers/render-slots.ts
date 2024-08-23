import { html, nothing, TemplateResult } from 'lit';

export function renderSlots(
  slots: TemplateResult[],
): TemplateResult | typeof nothing {
  // Filter out any null or undefined slots to avoid rendering empty content
  const validSlots = slots.filter(Boolean);

  // If there are no valid slots, return an empty html result
  if (validSlots.length === 0) {
    return nothing;
  }

  // Join slots with consistent formatting; no extra line breaks between them
  // prettier-ignore
  const formattedSlots = validSlots.map((slot, index) =>
    html`${ index === 0 ? '' : '\n'}  ${slot}`
  );

  // Return the combined template results
  return html`${formattedSlots}`;
}
