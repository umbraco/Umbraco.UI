import { directive, Directive } from 'lit/directive.js';

class UUIStoryBookSpreadDirective extends Directive {
  // TODO: We don't need the render method, but it's required by the Directive class
  render(...props: Array<unknown>): unknown {
    return this.render(...props);
  }
  update(part: any, [props, excludeProps = []]: [any, string[]]): void {
    // Remove Storybooks onClick event from props
    delete props.onClick;

    const excludeSet = new Set(excludeProps);

    // Apply each property from props to the element
    Object.keys(props).forEach(key => {
      if (excludeSet.has(key)) return;

      part.element[key] = props[key];
      (part.element as HTMLElement).setAttribute(key, props[key]);
    });
  }
}

// Export the directive so it can be used in the template
export const spread = directive(UUIStoryBookSpreadDirective);
