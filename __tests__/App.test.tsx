import React from "react";
import {
  screen,
  render,
  fireEvent,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "../src/App";
import { mockApis } from "./testHelpers/mockApis";
import { weatherUrl } from "../src/app.config";

const mockAxios = new MockAdapter(axios);
mockApis(mockAxios);
const searchPlaceholder = "Search for location...";
const noData = "Search valid location to get the weather forecast.";

const triggerSearch = async (value) => {
  fireEvent.click(screen.getByRole("combobox"));
  fireEvent.change(screen.getByRole("combobox"), {
    target: { value },
  });

  await waitFor(() =>
    expect(mockAxios.history.get[0].url).toContain(
      `api/location/search/?query=${value}`
    )
  );
};

const triggerClick = async (el): Promise<any> => fireEvent.click(el);

const selectedLocation = async () => {
  await triggerSearch("San");
  mockAxios.resetHistory();
  triggerClick(screen.getAllByRole("option")[0]);
  await waitFor(() =>
    expect(mockAxios.history.get[0].url).toContain("/api/location/2487956/")
  );
};

describe("App Component", () => {
  beforeEach(() => {
    mockApis(mockAxios);
    mockAxios.resetHistory();
    render(<App />);
  });

  it("should load successfully", () => {
    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText(noData)).toBeTruthy();
    expect(screen.getByPlaceholderText(searchPlaceholder)).toBeTruthy();
  });

  it("should load location dropdown typeahead", async () => {
    await triggerSearch("San");
    const dropdown = screen.getByRole("listbox");

    expect(dropdown).toBeInTheDocument();
    await waitFor(() =>
      expect(within(dropdown).getAllByRole("option").length).toBe(2)
    );
  });

  it("should call forecast weather data on location selection", async () => {
    await selectedLocation();

    expect(screen.queryByText(noData)).toBeFalsy();
    expect(
      screen.getByRole("heading", { name: "San Francisco" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("forecast-block").length).toBe(5);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Tomorrow")).toBeInTheDocument();
    expect(screen.getByText(/Updated time/i)).toBeInTheDocument();
  });

  describe("API Errors", () => {
    it("should handle location search API error gracefully", async () => {
      mockAxios.onGet(`${weatherUrl}api/location/search/?query=San`).reply(500);

      await triggerSearch("San");

      expect(screen.getByText("No matches found.")).toBeTruthy();
    });

    it("should handle weather API error gracefully", async () => {
      mockAxios.onGet(`${weatherUrl}api/location/2487956/`).reply(500);

      await triggerSearch("San");
      await act(
        async () => await triggerClick(screen.getAllByRole("option")[0])
      );

      expect(screen.getByText(noData)).toBeTruthy();
    });
  });

  describe("Unit Change", () => {
    it("should switch to Metric/Imperial unit on click", async () => {
      await selectedLocation();
      triggerClick(screen.getByRole("button", { name: "°C, km, km/h" }));

      expect(screen.getAllByText(/kmph/i).length).toBeTruthy();
      expect(screen.getAllByText(/°C/i).length).toBeTruthy();

      triggerClick(screen.getByRole("button", { name: "°F, Mile, mi/h" }));
      expect(screen.getAllByText(/mi/i).length).toBeTruthy();
      expect(screen.getAllByText(/°F/i).length).toBeTruthy();
    });
  });
});
