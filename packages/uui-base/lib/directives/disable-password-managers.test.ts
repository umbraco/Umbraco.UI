import { html, fixture, expect } from '@open-wc/testing';
import { render } from 'lit';
import { uuiDisablePasswordManagers } from './disable-password-managers.directive';

const PASSWORD_MANAGER_ATTRS = [
  ['data-1p-ignore', ''],
  ['data-bwignore', ''],
  ['data-form-type', 'other'],
  ['data-lpignore', 'true'],
] as const;

function expectAttrsPresent(element: Element) {
  PASSWORD_MANAGER_ATTRS.forEach(([name, value]) => {
    expect(element.getAttribute(name)).to.equal(value);
  });
}

function expectAttrsAbsent(element: Element) {
  PASSWORD_MANAGER_ATTRS.forEach(([name]) => {
    expect(element.hasAttribute(name)).to.be.false;
  });
}

describe('UUIDisablePasswordManagersDirective', () => {
  it('applies the correct attributes when enabled on a div', async () => {
    const element = await fixture(html`
      <div ${uuiDisablePasswordManagers(true)}>Div test element</div>
    `);
    expectAttrsPresent(element);
  });

  it('applies the correct attributes when enabled on an input', async () => {
    const element = await fixture(html`
      <input
        name="password"
        autocomplete="current-password"
        ${uuiDisablePasswordManagers(true)} />
    `);
    expectAttrsPresent(element);
  });

  it('does not apply attributes when disabled', async () => {
    const element = await fixture(html`
      <input ${uuiDisablePasswordManagers(false)} />
    `);
    expectAttrsAbsent(element);
  });

  it('removes attributes when toggled from true to false', async () => {
    // Must use the same template function so Lit reuses the same directive
    // instance across renders. Two separate html`` literals have different
    // strings-array references and would cause Lit to replace the DOM entirely.
    const template = (enabled: boolean) =>
      html`<input ${uuiDisablePasswordManagers(enabled)} />`;

    const container = document.createElement('div');
    document.body.appendChild(container);

    render(template(true), container);
    const input = container.querySelector('input')!;
    expectAttrsPresent(input);

    render(template(false), container);
    expectAttrsAbsent(input);

    container.remove();
  });
});
