import '@localization/config';
// import './__mocks__/zustand';
if (typeof localStorage !== 'undefined') {
  localStorage.clear();
}

jest.useFakeTimers();
jest.mock('zustand');

// Mocking Date
const RealDate = Date;
class MockDate extends RealDate {
  constructor(date) {
    if (date) return new RealDate(date);
    return new RealDate('2020-05-14T11:01:58.135Z');
  }
}

// @ts-ignore
global.Date = MockDate;
Date.now = () => new RealDate('2020-05-14T11:01:58.135Z').getTime();

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
