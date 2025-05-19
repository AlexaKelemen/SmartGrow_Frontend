import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GreenhouseForm from "@/components/forms/GreenhouseForm";

describe("GreenhouseForm", () => {
  const mockOnCancel = vi.fn();
  const mockOnSubmit = vi.fn();

  test("renders all form fields with provided props", () => {
    render(
      <MemoryRouter>
        <GreenhouseForm
          title="Test Title"
          nameValue="Test Greenhouse"
          nameDisabled={true}
          something1="value1"
          something2="value2"
          submitLabel="Save"
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Name of the greenhouse:")).toHaveValue("Test Greenhouse");
    expect(screen.getByLabelText("Name of the greenhouse:")).toBeDisabled();
    expect(screen.getAllByLabelText("Something:")[0]).toHaveValue("value1");
    expect(screen.getAllByLabelText("Something:")[1]).toHaveValue("value2");
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("calls onCancel when Cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <GreenhouseForm
          title="Test"
          submitLabel="Submit"
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("calls onSubmit when form is submitted", () => {
    render(
      <MemoryRouter>
        <GreenhouseForm
          title="Test"
          nameValue="Test Name"
          submitLabel="Submit"
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});