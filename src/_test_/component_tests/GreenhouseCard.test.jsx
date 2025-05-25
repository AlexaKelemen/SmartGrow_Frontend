import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GreenhouseCard from '@/components/GreenhouseCard'; 
import React from 'react';

// Mock greenhouse data for test purposes
const mockGreenhouse = {
  name: 'Tomato House',
  imageUrl: 'https://example.com/tomato.jpg',
  lightingMethod: 'Manual',
  wateringMethod: 'Drip',
  fertilizationMethod: 'Organic',
};

describe('GreenhouseCard', () => {
  test('renders greenhouse image with alt text', () => {
    // Render the component with mock data
    render(<MemoryRouter><GreenhouseCard greenhouse={mockGreenhouse} /></MemoryRouter>);

    // Check that the image is displayed with the correct alt text
    const image = screen.getByAltText('Tomato House');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockGreenhouse.imageUrl);
  });

  test('displays the greenhouse name and unpair button', () => {
    render(<MemoryRouter><GreenhouseCard greenhouse={mockGreenhouse} /></MemoryRouter>);

    // Check for greenhouse name
    expect(screen.getByText('Tomato House')).toBeInTheDocument();

    // Check that the "Unpair Greenhouse" button is visible
    expect(screen.getByText('Unpair Greenhouse')).toBeInTheDocument();
  });

  test('displays lighting, temperature, and humidity values', () => {
    render(<MemoryRouter><GreenhouseCard greenhouse={mockGreenhouse} /></MemoryRouter>);

  });
});
