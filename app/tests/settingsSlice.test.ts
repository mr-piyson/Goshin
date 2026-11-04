import { describe, it, expect } from "vitest";
import reducer, { setWidget, setSidebarApp, setSidebarPinned, setSidebarPosition, setAll, setDateStyle, setShowDate, setShowYear, setWeatherSource, setWeatherCity, type SettingsState } from "../store/settingsSlice";

describe("settingsSlice", () => {
  const initial = reducer(undefined, { type: "@@INIT" });

  it("initializes with default sidebarApps, sidebarPinned, and clean widgets", () => {
    expect(initial.sidebarPinned).toBe(true);
    expect(initial.sidebarPosition).toBe("left");
    expect(initial.sidebarApps.calendar).toBe(true);
    expect(initial.sidebarApps.gmail).toBe(true);
    expect(initial.sidebarApps.notes).toBe(true);
    expect(initial.sidebarApps.tasks).toBe(true);
    expect(initial.widgets.time).toBe(true);
    expect(initial.widgets.weather).toBe(true);
    expect(initial.widgets.motivation).toBe(true);
  });

  it("updates a sidebar app visibility", () => {
    const state = reducer(initial, setSidebarApp({ id: "calendar", value: false }));
    expect(state.sidebarApps.calendar).toBe(false);
    expect(state.sidebarApps.gmail).toBe(true);
  });

  it("toggles sidebar pin and position", () => {
    let state = reducer(initial, setSidebarPinned(false));
    expect(state.sidebarPinned).toBe(false);

    state = reducer(state, setSidebarPosition("right"));
    expect(state.sidebarPosition).toBe("right");
  });

  it("updates an ambient widget", () => {
    const state = reducer(initial, setWidget({ id: "weather", value: false }));
    expect(state.widgets.weather).toBe(false);
  });

  it("safely handles setAll with backward-compatible defaults", () => {
    const partial: Partial<SettingsState> = {
      theme: "light",
    };
    const state = reducer(initial, setAll(partial));
    expect(state.theme).toBe("light");
    expect(state.sidebarApps).toBeDefined();
    expect(state.sidebarPinned).toBe(true);
    expect(state.sidebarPosition).toBe("left");
  });

  it("defaults the date style and weather location", () => {
    expect(initial.dateStyle).toBe("smart");
    expect(initial.showDate).toBe(true);
    expect(initial.showYear).toBe(true);
    expect(initial.weatherSource).toBe("auto");
    expect(initial.weatherCity).toBeNull();
  });

  it("updates the date style and date visibility", () => {
    let state = reducer(initial, setDateStyle("long"));
    expect(state.dateStyle).toBe("long");

    state = reducer(state, setShowDate(false));
    expect(state.showDate).toBe(false);

    state = reducer(state, setShowYear(false));
    expect(state.showYear).toBe(false);
  });

  it("switches weather to a manually pinned city and back", () => {
    let state = reducer(initial, setWeatherSource("manual"));
    expect(state.weatherSource).toBe("manual");

    state = reducer(state, setWeatherCity({ name: "Amman", lat: 31.95, lon: 35.93, country: "Jordan" }));
    expect(state.weatherCity).toEqual({ name: "Amman", lat: 31.95, lon: 35.93, country: "Jordan" });

    state = reducer(state, setWeatherCity(null));
    expect(state.weatherCity).toBeNull();
  });

  it("fills new fields when importing an older settings blob", () => {
    const state = reducer(initial, setAll({ theme: "dark" } as Partial<SettingsState>));
    expect(state.dateStyle).toBe("smart");
    expect(state.showDate).toBe(true);
    expect(state.showYear).toBe(true);
    expect(state.weatherSource).toBe("auto");
    expect(state.weatherCity).toBeNull();
  });
});
