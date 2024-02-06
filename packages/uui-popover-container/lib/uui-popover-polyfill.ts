// @ts-nocheck

export function polyfill() {
  const originalAddEventListener = this.addEventListener;

  // This is the only way to get access to the private functions onFocusOut and onBeforeToggle.
  this.addEventListener = function (type, listener, options) {
    if (type === 'focusout') {
      // focusout doesn't work properly in firefox, so we ignore it.
      return;
    }
    if (type === 'beforetoggle') {
      // Intercept the beforetoggle event so we can dispatch our own event.
      this.polyfill_onBeforeToggle = event => {
        this.dispatchEvent(
          new CustomEvent('polyfill-beforetoggle', {
            bubbles: false,
            composed: false,
            detail: {
              oldState: event.oldState,
              newState: event.newState,
            },
          }),
        );

        listener(event);
      };
      return;
    }
    originalAddEventListener.call(this, type, listener, options);
  };

  this.polyfill_onFocusout = event => {
    const target = event.relatedTarget;
    if (!target) return;

    const isInsidePopoverContainer = target?.closest('uui-popover-container');
    const isInsidePopoverTarget = target?.closest('[popovertarget]');

    if (!isInsidePopoverContainer && !isInsidePopoverTarget) {
      this.hidePopover();
    }
  };

  this.polyfill_onClick = event => {
    const path = event.composedPath();
    const isInsidePopoverContainer = path.some(element => {
      return (
        element.tagName === 'UUI-POPOVER-CONTAINER' ||
        element.attributes?.popovertarget
      );
    });

    if (!isInsidePopoverContainer) {
      this.hidePopover();
    }
  };

  this.polyfill_onParentPopoverUpdate = event => {
    if (event.detail.newState === 'closed') {
      this.hidePopover();
    }
  };

  const findParentPopover = element => {
    if (!element.parentElement) return null;
    if (element.parentElement?.tagName === 'UUI-POPOVER-CONTAINER') {
      return element.parentElement;
    }
    return findParentPopover(element.parentElement);
  };

  if (!this.polyfill_hasBeenMovedToBody) {
    this.style.display = 'none';
    this.style.position = 'fixed';
    this.style.inset = '0';
    this.style.zIndex = '9999';
  }

  this.showPopover = () => {
    if (!this.polyfill_hasBeenMovedToBody) {
      this.polyfill_parentPopoverContainer = findParentPopover(this);
    }

    this.polyfill_onBeforeToggle({
      oldState: 'closed',
      newState: 'open',
    });
    this.style.display = 'block';
    this.polyfill_parentPopoverContainer?.addEventListener(
      'polyfill-beforetoggle',
      this.polyfill_onParentPopoverUpdate,
    );
    window.addEventListener('click', this.polyfill_onClick);
    window.addEventListener('focusout', this.polyfill_onFocusout);

    //Find the dom position that the popover is currently at and save it so we can restore it later.
    this.polyfill_originalParent = this.parentNode;
    this.polyfill_originalNextSibling = this.nextSibling;

    //TODO: Find the render root of this component and get the stylesheet from there.
    const renderRoot = this.getRootNode();

    if (renderRoot && renderRoot.adoptedStyleSheets) {
      // Styles from the parent are lost when moving the popover to the body, so we need to add them back.
      const adoptedStyleSheets = renderRoot.adoptedStyleSheets;
      const combinedStyles = adoptedStyleSheets.reduce((acc, styleSheet) => {
        return (
          acc +
          Object.values(styleSheet.cssRules).reduce((acc, rule) => {
            return acc + `#${this.id} ${rule.cssText}`;
          }, '')
        );
      }, '');

      const styleTag = document.createElement('style');
      styleTag.innerHTML = combinedStyles;
      styleTag.id = 'uui-popover-polyfill-style';

      //look in slot for existing style tag and remove it.
      const existingStyleTag = this.shadowRoot.host.querySelector(
        '#uui-popover-polyfill-style',
      );

      if (existingStyleTag) {
        existingStyleTag.parentNode.removeChild(existingStyleTag);
      }

      this.insertAdjacentElement('beforeend', styleTag);
    }

    //Move the popover to the body so it sits on top of everything else.
    if (this.parentNode !== document.body) {
      this.parentNode?.removeChild(this);
      this.polyfill_hasBeenMovedToBody = true;
      document.body.appendChild(this);
    }
  };
  this.hidePopover = () => {
    //Restore previous dom position.
    if (this.polyfill_hasBeenMovedToBody) {
      document.body.removeChild(this);
      this.polyfill_hasBeenMovedToBody = false;
      this.polyfill_originalParent?.insertBefore(
        this,
        this.polyfill_originalNextSibling,
      );
    }

    window.removeEventListener('click', this.polyfill_onClick);
    window.removeEventListener('focusout', this.polyfill_onFocusout);
    this.polyfill_parentPopoverContainer?.removeEventListener(
      'polyfill-beforetoggle',
      this.polyfill_onParentPopoverUpdate,
    );
    this.polyfill_onBeforeToggle({
      oldState: 'open',
      newState: 'closed',
    });
    this.style.display = 'none';
  };
}
