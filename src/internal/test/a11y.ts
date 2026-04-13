import axe, { type AxeResults } from 'axe-core';

/**
 * Run axe-core accessibility checks on an element.
 * Handles ShadowRoot by using the host element (axe traverses shadow DOM automatically).
 */
export async function axeRun(
  element: Element | ShadowRoot,
): Promise<AxeResults> {
  const target = element instanceof ShadowRoot ? element.host : element;
  return axe.run(target as HTMLElement);
}
