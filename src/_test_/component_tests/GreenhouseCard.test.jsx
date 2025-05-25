import { render, screen, fireEvent } from '@testing-library/react';
import GreenhouseCard from '@/components/GreenhouseCard';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock greenhouse data
const mockGreenhouse = {
  id: 1,
  name: 'Tomato House',
  imageUrl: 'https://example.com/tomato.jpg',
  lightingMethod: 'Manual',
  wateringMethod: 'Manual',
  fertilizationMethod: 'Manual',
};

// Sample preset list
const mockPresets = [
  { id: 101, name: 'Tomato Boost' },
  { id: 102, name: 'Lettuce Cool' },
];

describe('GreenhouseCard', () => {
  test('displays lighting, watering, and fertilization values', () => {
    render(
      <GreenhouseCard
        greenhouse={mockGreenhouse}
        presets={mockPresets}
        onUnpair={() => {}}
        onConfigure={() => {}}
        onApplyPreset={() => {}}
      />,
      { wrapper: MemoryRouter }
    );

    // Match labels and values using partial matching
    expect(screen.getAllByText('Lighting')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Watering')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Fertilization')[0]).toBeInTheDocument();

  });

  test('calls onApplyPreset when a preset is selected and Apply is clicked', () => {
    const handleApply = vi.fn();

    render(
      <GreenhouseCard
        greenhouse={mockGreenhouse}
        presets={mockPresets}
        onUnpair={() => {}}
        onConfigure={() => {}}
        onApplyPreset={handleApply}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent.change(screen.getByDisplayValue('Choose a preset'), {
      target: { value: '101' },
    });

    fireEvent.click(screen.getByText('Apply Preset'));

    expect(handleApply).toHaveBeenCalledWith(1, 101);
  });

  test('navigates to edit and logs page on button clicks', () => {
    render(
      <GreenhouseCard
        greenhouse={mockGreenhouse}
        presets={mockPresets}
        onUnpair={() => {}}
        onConfigure={() => {}}
        onApplyPreset={() => {}}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockNavigate).toHaveBeenCalledWith('/edit-greenhouse/1');

    fireEvent.click(screen.getByText('View Logs and action'));
    expect(mockNavigate).toHaveBeenCalledWith('/greenhouses/logs/1');
  });
  test('calls onUnpair when Unpair Greenhouse is clicked', () => {
    const handleUnpair = vi.fn();

    render(
      <GreenhouseCard
        greenhouse={mockGreenhouse}
        presets={mockPresets}
        onUnpair={handleUnpair}
        onConfigure={() => {}}
        onApplyPreset={() => {}}
      />,
      { wrapper: MemoryRouter }
    );

    fireEvent.click(screen.getByText('Unpair Greenhouse'));
    expect(handleUnpair).toHaveBeenCalledWith(mockGreenhouse);
  });
});
