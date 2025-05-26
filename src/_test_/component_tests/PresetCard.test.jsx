import { render, screen, fireEvent } from '@testing-library/react';
import PresetCard from '@/components/PresetCard';
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

// Sample preset for testing
const mockPreset = {
  id: 1,
  title: 'Tomato Growth',
  name: 'Tomato Growth',
  image: 'https://example.com/tomato.jpg',
  minAirHumidity: 70,
  maxAirHumidity: 75,
  minSoilHumidity: 40,
  maxSoilHumidity: 50,
  minTemperature: 20,
  maxTemperature: 25,
  hoursOfLight: 14,
};

describe('PresetCard component', () => {
  test('renders preset info and buttons', () => {
    render(<PresetCard preset={mockPreset} onDelete={() => {}} />, {
      wrapper: MemoryRouter,
    });

    // Check name and type
    expect(screen.getByText(/Name:/)).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
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
    render(<PresetCard preset={mockPreset} />, {
      wrapper: MemoryRouter,
    });

    fireEvent.click(screen.getByText('Edit'));
    expect(mockNavigate).toHaveBeenCalledWith('/presets/edit/1');
  });

  test('shows hover details on mouse enter', () => {
    render(<PresetCard preset={mockPreset} />, {
      wrapper: MemoryRouter,
    });

    const card = screen.getByText('Edit').closest('.preset-card');
    fireEvent.mouseEnter(card);

    expect(screen.getByText(/Air humidity/i)).toHaveTextContent('70–75%');
    expect(screen.getByText(/Soil humidity/i)).toHaveTextContent('40–50%');
    expect(screen.getByText(/Temperature/i)).toHaveTextContent('20–25°C');
    expect(screen.getByText(/Light/i)).toHaveTextContent('14 hrs');
  });
});
