// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress JSDOM virtualConsole stylesheet parsing warnings for complex modern CSS
const originalConsoleError = console.error;
console.error = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('Could not parse CSS stylesheet') ||
    msg.includes('VirtualConsole') ||
    msg.includes('virtual-console')
  ) {
    return;
  }
  originalConsoleError(...args);
};

// jsdom ships no window.matchMedia, but App's phone-only Book Now docking effect
// reads it to decide whether it should run. Default to "not a phone" so tests
// that don't care about the media query get plain desktop behaviour.
// jsdom implements no media playback, so the tour videos' pause()/play() calls
// (fired on mount and on slide changes) would only log "Not implemented".
HTMLMediaElement.prototype.pause = () => {};
HTMLMediaElement.prototype.play = () => Promise.resolve();

if (!window.matchMedia) {
  window.matchMedia = query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}
