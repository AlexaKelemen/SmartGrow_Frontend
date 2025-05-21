import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import GreenhouseForm from "@/components/forms/GreenhouseForm";

describe("GreenhouseForm", () => {
  const mockOnCancel = vi.fn();
  const mockOnSubmit = vi.fn();

  test("renders required fields and buttons correctly", () => {
    render(
      <MemoryRouter>
        <GreenhouseForm
          title="Edit greenhouse"
          nameValue="Test Greenhouse"
          nameDisabled={true}
          macValue="00:1A:2B:3C"
          macDisabled={true}
          showMacField={true}
          submitLabel="Save changes"
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Edit greenhouse")).toBeInTheDocument();
    expect(screen.getByLabelText("Name of the greenhouse:")).toHaveValue("Test Greenhouse");
    expect(screen.getByLabelText("Name of the greenhouse:")).toBeDisabled();

    expect(screen.getByLabelText("MAC Address:")).toHaveValue("00:1A:2B:3C");
    expect(screen.getByLabelText("MAC Address:")).toBeDisabled();

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save changes")).toBeInTheDocument();
  });

  test("calls onCancel when Cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <GreenhouseForm
          title="Edit"
          submitLabel="Save"
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
          title="Edit"
          nameValue="Greenhouse"
          macValue="11:22:33:44:55"
          showMacField={true}
          submitLabel="Save"
          onCancel={mockOnCancel}
          onSubmit={mockOnSubmit}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Save"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
