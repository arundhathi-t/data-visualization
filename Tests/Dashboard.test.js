// src/tests/Dashboard.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { toMatchSnapshot } from "jest-snapshot";
import { DashboardProvider } from "../Context/DashboardContext";
import Dashboard from "../Pages/Dashboard";

// Mock Chart Component (since Charts is a child component)
jest.mock("../components/Charts", () => () => <div>Mocked Charts Component</div>);

describe("Dashboard Component", () => {
  const renderDashboard = () =>
    render(
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    );

  it("renders the dashboard header", () => {
    renderDashboard();
    expect(screen.getByText(/Data Visualization Dashboard/i)).toBeInTheDocument();
  });

  it("renders the search bar and allows input", () => {
    renderDashboard();

    const searchInput = screen.getByPlaceholderText(/Search metrics.../i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });

  it("renders and interacts with time filters", () => {
    renderDashboard();

    const allTimeFilter = screen.getByLabelText(/All Time/i);
    const lastHourFilter = screen.getByLabelText(/Last Hour/i);
    const lastDayFilter = screen.getByLabelText(/Last Day/i);
    const lastWeekFilter = screen.getByLabelText(/Last Week/i);

    expect(allTimeFilter).toBeInTheDocument();
    expect(lastHourFilter).toBeInTheDocument();
    expect(lastDayFilter).toBeInTheDocument();
    expect(lastWeekFilter).toBeInTheDocument();

    // Simulate clicking filters
    fireEvent.click(lastHourFilter);
    expect(lastHourFilter.checked).toBe(true);

    fireEvent.click(lastDayFilter);
    expect(lastDayFilter.checked).toBe(true);

    fireEvent.click(lastWeekFilter);
    expect(lastWeekFilter.checked).toBe(true);
  });

  it("renders the charts section", () => {
    renderDashboard();

    expect(screen.getByText(/Mocked Charts Component/i)).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = renderDashboard();
    expect(asFragment()).toMatchSnapshot();
  });
});
