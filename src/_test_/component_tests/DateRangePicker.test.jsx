import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DateRangePicker from "@/components/ui/DateRangePicker";
import "@testing-library/jest-dom";

describe("DateRangePicker", () => {
  const mockOnChange = vi.fn();
  const today = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  beforeEach(() => {
    render(
      <DateRangePicker
        startDate={sevenDaysAgo}
        endDate={today}
        onChange={mockOnChange}
      />
    );
  });

  it("renders two date pickers", () => {
    const datePickers = screen.getAllByRole("textbox");
    expect(datePickers.length).toBe(2);
  });

  it("calls onChange when a new start date is selected", () => {
    const startInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(startInput, { target: { value: "2025-05-01" } });

    expect(mockOnChange).toHaveBeenCalledWith("startDate", "2025-05-01");
  });

  it("calls onChange when a new end date is selected", () => {
    const endInput = screen.getAllByRole("textbox")[1];
    fireEvent.change(endInput, { target: { value: "2025-05-20" } });

    expect(mockOnChange).toHaveBeenCalledWith("endDate", "2025-05-20");
  });
});
