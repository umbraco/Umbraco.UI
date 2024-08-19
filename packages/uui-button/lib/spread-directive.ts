import { directive, Directive } from 'lit/directive.js';

class SpreadDirective extends Directive {
  update(part, [props]) {
    // Remove Storybooks onClick event from props
    delete props.onClick;

    console.log('props', props);
    // Apply each property from props to the element
    Object.keys(props).forEach(key => {
      part.element[key] = props[key];
      (part.element as HTMLElement).setAttribute(key, props[key]);
    });
  }
}

// Export the directive so it can be used in the template
export const spread = directive(SpreadDirective);
