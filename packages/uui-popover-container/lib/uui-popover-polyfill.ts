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
          })
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

  this.style.display = 'none';
  this.style.position = 'fixed';
  this.style.inset = '0';
  this.style.zIndex = '9999';
  this.showPopover = () => {
    if (!this.polyfill_hasBeenMovedToBody) {
      this.polyfill_parentPopoverContainer = findParentPopover(this);
      if (this.parentNode !== document.body) {
        this.parentNode?.removeChild(this);
        document.body.appendChild(this);

        this.polyfill_hasBeenMovedToBody = true;
      }
    }
    this.polyfill_onBeforeToggle({
      oldState: 'closed',
      newState: 'open',
    });
    this.style.display = 'block';
    this.polyfill_parentPopoverContainer?.addEventListener(
      'polyfill-beforetoggle',
      this.polyfill_onParentPopoverUpdate
    );
    window.addEventListener('click', this.polyfill_onClick);
    window.addEventListener('focusout', this.polyfill_onFocusout);
  };
  this.hidePopover = () => {
    window.removeEventListener('click', this.polyfill_onClick);
    window.removeEventListener('focusout', this.polyfill_onFocusout);
    this.polyfill_parentPopoverContainer?.removeEventListener(
      'polyfill-beforetoggle',
      this.polyfill_onParentPopoverUpdate
    );
    this.polyfill_onBeforeToggle({
      oldState: 'open',
      newState: 'closed',
    });
    this.style.display = 'none';
  };
}
