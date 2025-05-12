import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

vi.mock('react-gauge-chart', () => ({
  default: () => <div>Mocked Gauge Chart</div>
}));


describe('Sanity check', () => {
  it('always passes', () => {
    expect(1 + 1).toBe(2);
  });
});
