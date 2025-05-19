import { vi } from 'vitest';
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import DeletePopUp from '../../components/DeletePopUp';

describe('DeletePopUp component', () => {
    const presetName = 'Vegetable Preset';  // Example preset name
    const onCancel = vi.fn();          // Mock function for onCancel
    const onConfirm = vi.fn();         // Mock function for onConfirm

    test('renders without crashing and displays preset name', () => {
        render(<DeletePopUp presetName={presetName} onCancel={onCancel} onConfirm={onConfirm} />);
        
        // Check that the preset name is displayed
       expect(screen.getByText((content, element) => element?.textContent === `Are you sure you want to delete ${presetName} preset?`)).toBeInTheDocument();     
        // Check that the "Delete preset?" heading is visible
        expect(screen.getByText('Delete preset?')).toBeInTheDocument();
    });

    test('calls onCancel when Cancel button is clicked', () => {
        render(<DeletePopUp presetName={presetName} onCancel={onCancel} onConfirm={onConfirm} />);
        
        // Simulate clicking the Cancel button
        fireEvent.click(screen.getByText('Cancel'));
        
        // Ensure that onCancel is called
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test('calls onConfirm when Delete button is clicked', () => {
        render(<DeletePopUp presetName={presetName} onCancel={onCancel} onConfirm={onConfirm} />);
        
        // Simulate clicking the Delete button
        fireEvent.click(screen.getByText('Delete'));
        
        // Ensure that onConfirm is called
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });
});
