import { type AxeResults } from 'axe-core';
import { expect } from 'vitest';
import type { ExpectationResult } from '@vitest/expect';

/**
 * Custom Vitest matcher: expect(await axeRun(el)).toHaveNoViolations()
 */
expect.extend({
  toHaveNoViolations(results: AxeResults): ExpectationResult {
    const violations = results.violations;

    if (violations.length === 0) {
      return {
        pass: true,
        message: () => 'Expected accessibility violations but found none',
      };
    }

    const messages = violations.map(v => {
      const nodes = v.nodes.map(n => `  - ${n.html}`).join('\n');
      return `${v.id} (${v.impact}): ${v.description}\n${nodes}`;
    });

    return {
      pass: false,
      message: () =>
        `Expected no accessibility violations but found ${violations.length}:\n\n${messages.join('\n\n')}`,
    };
  },
});

declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
