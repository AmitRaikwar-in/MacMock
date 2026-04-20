import '@localization/config';
// import './__mocks__/zustand';

jest.useFakeTimers();
jest.mock('zustand');

// Mocking Date
class MockDate extends Date {
  constructor() {
    super('2020-05-14T11:01:58.135'); // add whatever date you'll expect to get
  }
}

global.Date = MockDate;

// Mocking Draft.js
jest.mock('draft-js', () => ({
  ...jest.requireActual('draft-js'),
  Editor: () => <div>Editor</div>,
}));

jest.mock('react-clock', () => {
  return function MockClock() {
    return <div aria-label="mock-clock"></div>;
  };
});

window.HTMLElement.prototype.scrollTo = jest.fn();
window.Element.prototype.scrollTo = jest.fn();
