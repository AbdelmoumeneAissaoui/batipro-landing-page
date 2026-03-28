import '@testing-library/jest-dom';

// Framer Motion et autres dépendances s'appuient sur IntersectionObserver en DOM.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserverEntry', {
  writable: true,
  configurable: true,
  value: function IntersectionObserverEntry() {},
});
