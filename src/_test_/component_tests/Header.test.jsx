import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '@/components/Header';

// Mock the routes that the Header component uses from router.jsx
// This lets us simulate what links should be displayed in the header
vi.mock('../router.jsx', () => ({
  routes: [
    {
      children: [
        { path: 'dashboard', navLabel: 'Dashboard' },
        { path: 'greenhouses', navLabel: 'Greenhouses' },
        { path: 'lighting', navLabel: 'Lighting' },               // method
        { path: 'soil', navLabel: 'Soil Humidity Levels' },       // method
      ],
    },
  ],
}));

describe('Header', () => {
  //  Test that the main header and top-level links are visible immediately
  test('renders main links', () => {
    // Render the Header inside MemoryRouter to provide routing context
    render(<Header />, { wrapper: MemoryRouter });

    // Check for static text
    expect(screen.getByText('SmartGrow')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Greenhouses')).toBeInTheDocument();

    // "Methods" is likely a dropdown toggle, not a direct link
    expect(screen.getByText('Methods')).toBeInTheDocument();
  });

  // Test that clicking the "Methods" dropdown reveals method links
  test('dropdown shows method links when clicked', async () => {
    render(<Header />, { wrapper: MemoryRouter });

    // Find the "Methods" dropdown toggle and simulate a user click
    const dropdownToggle = screen.getByText('Methods');
    fireEvent.click(dropdownToggle);

    // Use findByText to wait for the links that appear after clicking
    expect(await screen.findByText('Lighting')).toBeInTheDocument();
    expect(await screen.findByText('Soil Humidity Levels')).toBeInTheDocument();
  });
});
