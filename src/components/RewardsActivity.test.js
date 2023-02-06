import RewardsActivity from './RewardsActivity';
import { act } from "@testing-library/react";
import { createRoot } from 'react-dom/client';

let container = null;
let root = null;

beforeEach(() => {
  container = document.createElement("div");
  root = createRoot(container);
  act(() => {
    root.render();
  });
  jest.clearAllMocks()
});

afterEach(() => {
  act(() => {
    root.unmount()
  });
});

it("should render <RewardsActivity /> component", () => {
  act(() => {
    root.render(<RewardsActivity />);
  });
  expect(container.textContent).toBe("");
});

