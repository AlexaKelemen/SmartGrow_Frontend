import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PresetForm from '@/components/forms/PresetForm';

describe('PresetForm', () => {
  it('renders Create preset mode correctly', () => {
    render(
      <MemoryRouter>
        <PresetForm mode="create" onSubmit={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Create preset')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Tomato')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('renders Edit preset mode correctly', () => {
    render(
      <MemoryRouter>
        <PresetForm mode="edit" onSubmit={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Edit Preset')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('e.g. Tomato')).toBeNull();
  });

  it('calls onSubmit when button is clicked', () => {
    const mockSubmit = vi.fn();

    render(
      <MemoryRouter>
        <PresetForm mode="create" onSubmit={mockSubmit} />
      </MemoryRouter>
    );

    // ✅ Fill required input (e.g. preset name)
    fireEvent.change(screen.getByPlaceholderText('e.g. Tomato'), {
      target: { value: 'Test Preset' }
    });

    // ✅ Click the Create button
    fireEvent.click(screen.getByText('Create'));

    // ✅ Expect the mock to be called
    expect(mockSubmit).toHaveBeenCalled();
  });
});
