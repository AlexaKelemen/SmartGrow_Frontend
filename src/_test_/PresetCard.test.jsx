import { render, screen, fireEvent } from '@testing-library/react';
import PresetCard from '@/components/PresetCard'; // Adjust the path if needed
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

//  Sample preset for testing
const mockPreset = {
  id: 1,
  title: 'Tomato Growth',
  name: 'Tomato Growth',
  type: 'Vegetable',
  creationDate: '2024-01-01',
  updateDate: '2024-04-15',
  image: 'https://example.com/tomato.jpg',
  airHumidity: '70%',
  soilHumidity: '50%',
  co2: '350 ppm',
  temperature: '22°C',
  brightness: 'Medium',
};

describe('PresetCard component', () => {
  test('renders preset info and buttons', () => {
    render(<PresetCard preset={mockPreset} onDelete={() => {}} />, {
      wrapper: MemoryRouter,
    });

    // Title in header
    expect(screen.getAllByText('Tomato Growth')[0]).toBeInTheDocument();

    // Static info
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText(/2024-01-01 - 2024-04-15/)).toBeInTheDocument();

    // Buttons
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<PresetCard preset={mockPreset} onDelete={handleDelete} />, {
      wrapper: MemoryRouter,
    });

    fireEvent.click(screen.getByText('Delete'));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  test('navigates to edit when Edit button is clicked', () => {
    render(<PresetCard preset={mockPreset} onDelete={() => {}} />, {
      wrapper: MemoryRouter,
    });

    fireEvent.click(screen.getByText('Edit'));
    expect(mockNavigate).toHaveBeenCalledWith('/presets/edit');
  });

  test('shows hover details on mouse enter', () => {
    render(<PresetCard preset={mockPreset} onDelete={() => {}} />, {
      wrapper: MemoryRouter,
    });

    // Hover over the outer card div
    const card = screen.getByText('Edit').closest('.preset-card');
    fireEvent.mouseEnter(card);

    // Hover-only content checks (use content matcher to avoid DOM nesting issues)
    expect(
      screen.getByText((_, el) => el?.textContent === 'Air humidity: 70%')
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === 'Soil Humidity: 50%')
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === 'CO₂: 350 ppm')
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === 'Temperature: 22°C')
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, el) => el?.textContent === 'Brightness: Medium')
    ).toBeInTheDocument();
  });
});
