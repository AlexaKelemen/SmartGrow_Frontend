import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { vi } from 'vitest';


vi.mock('@/pages/viewmodels/dashboardModel', () => ({
  dashboardModel: vi.fn(),
}));

import { dashboardModel } from '@/pages/viewmodels/dashboardModel';

describe('Dashboard Integration', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('shows loading state', () => {
    dashboardModel.mockReturnValue({
      getTemperatureReading: () => ({}),
      getHumidityReading: () => ({}),
      getBrightnessReading: () => ({}),
      isLoading: true,
      isError: false,
    });

    render(<Dashboard />);
    expect(screen.getAllByText('Loading...')).toHaveLength(3);
  });

  test('shows error state', () => {
    dashboardModel.mockReturnValue({
      getTemperatureReading: () => ({}),
      getHumidityReading: () => ({}),
      getBrightnessReading: () => ({}),
      isLoading: false,
      isError: true,
    });

    render(<Dashboard />);
    expect(screen.getByText('Error loading sensor data.')).toBeInTheDocument();
  });

  test('renders gauges correctly with data', () => {
    dashboardModel.mockReturnValue({
      getTemperatureReading: () => ({ value: 25 }),
      getHumidityReading: () => ({ value: 60 }),
      getBrightnessReading: () => ({ value: 300 }),
      isLoading: false,
      isError: false,
    });

    render(<Dashboard />);

    // Can check for labels or heading
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Soil humidity')).toBeInTheDocument();
    expect(screen.getByText('Brightness')).toBeInTheDocument();
    expect(screen.getByText('Air humidity')).toBeInTheDocument();

    // You can also look for gauge output text if available
  });
});
