// @ts-nocheck
export function polyfill() {
  const originalAddEventListener = this.addEventListener;

  let onBeforeToggle = null;

  // This is the only way to get access to the private functions onFocusOut and onBeforeToggle.
  this.addEventListener = function (type, listener, options) {
    if (type === 'focusout') {
      // focusout doesn't work properly in firefox, so we ignore it.
      return;
    }
    if (type === 'beforetoggle') {
      // Intercept the beforetoggle event so we can dispatch our own event.
      onBeforeToggle = event => {
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

  const findParentPopover = element => {
    if (!element.parentElement) return null;
    if (element.parentElement?.tagName === 'UUI-POPOVER-CONTAINER') {
      return element.parentElement;
    }
    return findParentPopover(element.parentElement);
  };

  const onParentPopoverUpdate = event => {
    if (event.detail.newState === 'closed') {
      this.hidePopover();
    }
  };

  this.style.display = 'none';
  this.style.position = 'fixed';
  this.style.inset = '0';
  this.showPopover = () => {
    this.polyfill_parentPopoverContainer = findParentPopover(this);
    if (
      this.parentNode !== document.body &&
      this.polyfill_hasBeenMovedToBody !== true
    ) {
      this.parentNode?.removeChild(this);
      document.body.appendChild(this);

      this.polyfill_hasBeenMovedToBody = true;
    }
    onBeforeToggle({
      oldState: 'closed',
      newState: 'open',
    });
    this.style.display = 'block';
    this.polyfill_parentPopoverContainer?.addEventListener(
      'polyfill-beforetoggle',
      onParentPopoverUpdate
    );
  };
  this.hidePopover = () => {
    this.polyfill_parentPopoverContainer?.removeEventListener(
      'polyfill-beforetoggle',
      onParentPopoverUpdate
    );
    onBeforeToggle({
      oldState: 'open',
      newState: 'closed',
    });
    this.style.display = 'none';
  };
}
