declare module '@popperjs/core/dist/esm/popper-lite.js' {
  import {
    popperGenerator,
    defaultModifiers,
  } from '@popperjs/core/lib/popper-lite';

  export { popperGenerator, defaultModifiers };
}

declare module '@popperjs/core/dist/esm/types.js' {
  import { Instance, Modifier } from '@popperjs/core/lib/types.js';

  export { Instance, Modifier };
}
declare module '@popperjs/core/dist/esm/enums.js' {
  import { Placement } from '@popperjs/core/lib/enums.js';

  export { Placement };
}

declare module '@popperjs/core/dist/esm/modifiers/flip.js' {
  import flip from '@popperjs/core/lib/modifiers/flip.js';

  export default flip;
}

declare module '@popperjs/core/dist/esm/modifiers/preventOverflow.js' {
  import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';

  export default preventOverflow;
}

// declare module '@popperjs/core/dist/esm/modifiers/arrow.js' {
//   import arrow from '@popperjs/core/lib/modifiers/arrow.js';

//   export default arrow;
// }

declare module '@popperjs/core/dist/esm/modifiers/offset.js' {
  import offset from '@popperjs/core/lib/modifiers/offset.js';

  export default offset;
}
