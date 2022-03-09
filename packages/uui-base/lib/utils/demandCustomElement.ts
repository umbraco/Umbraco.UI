/**
 * Fire a warning if the custom element with the provided name isn't available.
 * @func defineElement
 * @param {HTMLElement} requester - Reference to the element requiring this custom element..
 * @param {string} elementName - Tag name of the required custom element.
 * @param {string} message - Optional message describing the consequences of it not begin available.
 */
export const demandCustomElement = (
  requester: HTMLElement,
  elementName: string,
  message: string = `This element has to be present for ${requester.nodeName} to work appropriate.`
) => {
  if (!customElements.get(elementName)) {
    console.warn(
      `%c ${requester.nodeName} requires ${elementName} element to be registered!`,
      'font-weight: bold;',
      message,
      requester
    );
  }
};
