import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/ui/Button';

describe('Button component', () => {
  test('renders with children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('applies variant and size classes', () => {
    render(<Button variant="destructive" size="lg">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });

    expect(button.className).toContain('btn');
    expect(button.className).toContain('btn--destructive');
    expect(button.className).toContain('btn--lg');
  });

  test('renders icon when provided', () => {
    render(<Button icon={<span data-testid="icon">🌟</span>}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('shows spinner when loading', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText('⏳')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('is disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button', { name: /disabled/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
