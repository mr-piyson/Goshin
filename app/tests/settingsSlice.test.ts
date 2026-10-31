import { describe, it, expect } from "vitest";
import reducer, { setWidget, setSidebarApp, setSidebarPinned, setSidebarPosition, setAll, type SettingsState } from "../store/settingsSlice";

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
});
