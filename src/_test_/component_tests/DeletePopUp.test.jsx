import React from "react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import DeletePopUp from "../../components/DeletePopUp";

describe("DeletePopUp", () => {
  const mockOnCancel = vi.fn();
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("renders correct title and message", () => {
    render(
      <DeletePopUp
        title="Unpair Greenhouse?"
        description="unpair"
        nameLabel="Greenhouse #5"
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
        confirmLabel="Unpair"
      />
    );

    // Title appears
    expect(screen.getByText("Unpair Greenhouse?")).toBeInTheDocument();

    // Check button text
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Unpair")).toBeInTheDocument();

    // Does not crash while rendering the message
    expect(screen.getByTestId("popup-message")).toBeInTheDocument();
  });

  test("calls onCancel and onConfirm correctly", () => {
    render(
      <DeletePopUp
        nameLabel="Tomato Preset"
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    fireEvent.click(screen.getByText("Delete"));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});
