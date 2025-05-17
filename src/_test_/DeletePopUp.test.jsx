import { vi } from 'vitest';
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import DeletePopUp from '../components/DeletePopUp';

describe('DeletePopUp component', () => {
    const nameLabel = 'Vegetable Preset';
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
  
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    test('renders with default props and displays correct title and content', () => {
      render(
        <DeletePopUp
          nameLabel={nameLabel}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      );
  
      expect(screen.getByText('Delete preset?')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
  
      // Flexible match for dynamic sentence with embedded <strong>
      expect(screen.getByText((_, element) =>
        element?.textContent?.includes('Are you sure you want to delete') &&
        element?.textContent?.includes(nameLabel)
      )).toBeInTheDocument();
    });
  
    test('renders with custom title and confirmLabel', () => {
      render(
        <DeletePopUp
          title="Unpair Greenhouse?"
          description="unpair"
          nameLabel="Greenhouse #2"
          confirmLabel="Unpair"
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      );
  
      expect(screen.getByText('Unpair Greenhouse?')).toBeInTheDocument();
      expect(screen.getByText('Unpair')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
  
      expect(screen.getByText((_, element) =>
        element?.textContent?.includes('Are you sure you want to unpair') &&
        element?.textContent?.includes('Greenhouse #2')
      )).toBeInTheDocument();
    });
  
    test('calls onCancel when Cancel button is clicked', () => {
      render(
        <DeletePopUp
          nameLabel={nameLabel}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      );
  
      fireEvent.click(screen.getByText('Cancel'));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  
    test('calls onConfirm when Delete button is clicked', () => {
      render(
        <DeletePopUp
          nameLabel={nameLabel}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      );
  
      fireEvent.click(screen.getByText('Delete'));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });