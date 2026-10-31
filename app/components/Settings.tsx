import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWidget,
  setTimeFormat,
  setShowSeconds,
  setWeatherUnit,
  setSearchEngine,
  setTheme,
  setAll,
} from '@/store/settingsSlice';
import type { RootState, AppDispatch } from '@/store';

const WIDGET_OPTIONS = [
  { id: 'time', label: 'Time & date' },
  { id: 'weather', label: 'Weather' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'search', label: 'Search' },
  { id: 'launchpad', label: 'Launchpad' },
  { id: 'notes', label: 'Notes' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'gmail', label: 'Gmail' },
  { id: 'history', label: 'History' },
  { id: 'topSites', label: 'Top sites' },
  { id: 'translator', label: 'Translator' },
  { id: 'ticTacToe', label: 'Tic-tac-toe' },
  { id: 'lifeTimer', label: 'Life timer' },
];

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider ui-muted">{title}</h3>
      {description && <p className="mt-1 text-xs ui-muted">{description}</p>}
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-[color:var(--border)] p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3 py-1 text-xs capitalize transition ${
            value === option.value ? 'ui-btn-active' : 'ui-muted hover:text-[color:var(--text)]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-150 ${
        checked ? 'border-transparent bg-violet-500' : 'border-[color:var(--border)] ui-field'
      }`}
    >
      <span
        className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-150 ${
          checked ? 'translate-x-[18px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const s = useSelector((state: RootState) => state.settings);

  const exportSettings = () => {
    const blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manganum-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          dispatch(setAll(parsed));
        }
      } catch {
        /* ignore malformed files */
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <Section title="Widgets" description="Choose what shows on your new tab page.">
        <div className="grid grid-cols-2 gap-1.5">
          {WIDGET_OPTIONS.map((widget) => {
            const enabled = s.widgets[widget.id] ?? true;
            return (
              <label
                key={widget.id}
                className="ui-tile flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs"
              >
                <span className="truncate">{widget.label}</span>
                <Switch
                  checked={enabled}
                  label={widget.label}
                  onChange={() => dispatch(setWidget({ id: widget.id, value: !enabled }))}
                />
              </label>
            );
          })}
        </div>
      </Section>

      <Section title="Time & date">
        <div className="flex flex-wrap items-center gap-3">
          <Segmented
            value={s.timeFormat}
            options={[
              { value: '24', label: '24-hour' },
              { value: '12', label: '12-hour' },
            ]}
            onChange={(value) => dispatch(setTimeFormat(value))}
          />
          <label className="flex cursor-pointer items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={s.showSeconds}
              onChange={(event) => dispatch(setShowSeconds(event.target.checked))}
              className="h-3.5 w-3.5 accent-violet-500"
            />
            Show seconds
          </label>
        </div>
      </Section>

      <Section title="Weather">
        <Segmented
          value={s.weatherUnit}
          options={[
            { value: 'C', label: '°Celsius' },
            { value: 'F', label: '°Fahrenheit' },
          ]}
          onChange={(value) => dispatch(setWeatherUnit(value))}
        />
      </Section>

      <Section title="Search engine">
        <Segmented
          value={s.searchEngine}
          options={[
            { value: 'google', label: 'Google' },
            { value: 'bing', label: 'Bing' },
            { value: 'duckduckgo', label: 'DuckDuckGo' },
          ]}
          onChange={(value) => dispatch(setSearchEngine(value))}
        />
      </Section>

      <Section title="Theme">
        <Segmented
          value={s.theme}
          options={[
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
            { value: 'system', label: 'System' },
          ]}
          onChange={(value) => dispatch(setTheme(value))}
        />
      </Section>

      <Section title="Data" description="Keep a copy of your preferences, or restore them on another device.">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportSettings} className="ui-btn rounded-lg px-3 py-1.5 text-xs">
            Export settings
          </button>
          <label className="ui-btn cursor-pointer rounded-lg px-3 py-1.5 text-xs">
            Import settings
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) importSettings(file);
                event.target.value = '';
              }}
            />
          </label>
        </div>
      </Section>
    </div>
  );
}
