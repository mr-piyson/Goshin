export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('[content] loaded');
  },
});