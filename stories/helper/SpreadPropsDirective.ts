/* eslint-disable */
import { nothing } from 'lit/html.js';
import { directive, AsyncDirective } from 'lit/async-directive.js';

class SpreadPropsDirective extends AsyncDirective {
  host!: EventTarget;
  element!: Element;
  prevData: { [key: string]: unknown } = {};

  // @ts-ignore
  render(spreadData: { [key: string]: unknown }) {
    return nothing;
  }
  update(part: any, [spreadData]: Parameters<this['render']>) {
    if (this.element !== part.element) {
      this.element = part.element;
    }
    this.host = part.options?.host || this.element;
    this.apply(spreadData);
    this.groom(spreadData);
    this.prevData = spreadData;
  }

  apply(data: { [key: string]: unknown }) {
    if (!data) return;
    const { prevData, element } = this;
    for (const key in data) {
      const value = data[key];
      if (value === prevData[key]) {
        continue;
      }
      // @ts-ignore
      element[key] = value;
    }
  }

  groom(data: { [key: string]: unknown }) {
    const { prevData, element } = this;
    if (!prevData) return;
    for (const key in prevData) {
      if (!data || !(key in data)) {
        // @ts-ignore
        element[key] = undefined;
      }
    }
  }
}

export const spreadProps = directive(SpreadPropsDirective);
