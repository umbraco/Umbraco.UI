import { html, fixture, expect } from '@open-wc/testing';
import { uuiDisablePasswordManagers } from './disable-password-managers.directive';

describe('UUIDisablePasswordManagersDirective', () => {
  it('applies the correct attributes to disable password managers to a div', async () => {
    const element = await fixture(html`
      <div ${uuiDisablePasswordManagers()}>Div test element</div>
    `);
    expect(element.getAttribute('data-1p-ignore')).to.equal('');
    expect(element.getAttribute('data-bwignore')).to.equal('');
    expect(element.getAttribute('data-form-type')).to.equal('other');
    expect(element.getAttribute('data-lpignore')).to.equal('true');
  });

  it('applies the correct attributes to disable password managers to an input', async () => {
    const element = await fixture(html`
      <input name="password" autocomplete="current-password" ${uuiDisablePasswordManagers()}>Input test element</input>
    `);
    expect(element.getAttribute('data-1p-ignore')).to.equal('');
    expect(element.getAttribute('data-bwignore')).to.equal('');
    expect(element.getAttribute('data-form-type')).to.equal('other');
    expect(element.getAttribute('data-lpignore')).to.equal('true');
  });
});
