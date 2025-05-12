import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from "../components/Footer";

describe('Footer component', () => {
    // Test 1: Check that the footer renders successfully and contains the correct text
    test('renders without crashing', () => {
        // Render the Footer component in a virtual DOM
        render(<Footer />);

        // Look for the text content "© 2025 SmartGrow" in the rendered output
        const footerElement = screen.getAllByText(/© 2025 SmartGrow/i);

        // Assert that the element is in the document (i.e., it was rendered)
        expect(footerElement[0]).toBeInTheDocument();
        expect(footerElement[0]).toHaveClass('footer');
        expect(footerElement[0]).toHaveClass('flex-center');
    });

    // Test 2: Check that the footer has the correct CSS class names
    test('has correct class name', () => {
        // Render the Footer component
        render(<Footer />);

        // Get the same footer element by its text
        const footerElement = screen.getByText(/© 2025 SmartGrow/i);

        // Assert that it has the expected class names for styling
        expect(footerElement).toHaveClass('footer');
        expect(footerElement).toHaveClass('flex-center');
    });
});