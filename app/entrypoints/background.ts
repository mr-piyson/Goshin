import { browser } from 'wxt/browser';

export default defineBackground(() => {
  console.log('[bg] Manganum clone background started');

  // Open side panel on action click (Chrome)
  browser.action?.onClicked?.addListener(async (tab) => {
    if (tab.id != null && (browser as any).sidePanel) {
      await (browser as any).sidePanel.open({ tabId: tab.id });
    }
  });

  // Alarm example: daily background refresh
  browser.alarms.create('daily-bg-refresh', { periodInMinutes: 60 * 24 });

  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'daily-bg-refresh') {
      console.log('[bg] daily background refresh tick');
    }
  });

  // Message router
  browser.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type === 'GET_TOP_SITES') {
      browser.topSites?.get().then((sites) => sendResponse({ sites })).catch(() => sendResponse({ sites: [] }));
      return true;
    }
    return false;
  });
});