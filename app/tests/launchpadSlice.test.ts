import { describe, it, expect } from 'vitest';
import reducer, { setAll, add, remove, reorder } from '../store/launchpadSlice';

describe('launchpadSlice', () => {
  it('setAll populates items', () => {
    const s = reducer({ items: [], loaded: false }, setAll([{ id: 'a', title: 'A', url: 'https://a.com' }]));
    expect(s.items).toHaveLength(1);
    expect(s.loaded).toBe(true);
  });
  it('add appends', () => {
    const s = reducer({ items: [], loaded: true }, add({ id: 'b', title: 'B', url: 'https://b.com' }));
    expect(s.items).toHaveLength(1);
  });
  it('remove filters', () => {
    const s = reducer({ items: [{ id: 'a', title: 'A', url: 'https://a.com' }], loaded: true }, remove('a'));
    expect(s.items).toHaveLength(0);
  });
  it('reorder replaces', () => {
    const items = [{ id: 'b', title: 'B', url: 'https://b.com' }, { id: 'a', title: 'A', url: 'https://a.com' }];
    const s = reducer({ items: [], loaded: true }, reorder(items));
    expect(s.items[0]!.id).toBe('b');
  });
});