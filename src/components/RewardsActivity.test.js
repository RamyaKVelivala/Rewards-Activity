import RewardsActivity from './RewardsActivity';
import { act } from "@testing-library/react";
import { createRoot } from 'react-dom/client';
import getTransactionsList from '../services/transactions.data.service';

let container = null;
let root = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  root = createRoot(container);
  act(() => {
    root.render();
  });
  jest.clearAllMocks()
});

afterEach(() => {
  // cleanup on exiting
  act(() => {
    root.unmount()
  });
});

it("should render <RewardsActivity /> component wihtout any props", () => {
  act(() => {
    root.render(<RewardsActivity />);
  });
  expect(container.textContent).toBe("No Transactions Available");
});

it("should render RewardsActivity component with empty transaction list props", async () => {
  const emptyList = [];

  await act(async () => {
    root.render(<RewardsActivity transactionsList={emptyList} />);
  });

  expect(container.textContent).toContain("No Transactions Available");
});

it("should render RewardsActivity component with transaction list", async () => {
  const transactionsList = [{
    "id": 1,
    "amount": "20",
    "customerId": "1",
    "customerName": "Dave Warbrick",
    "merchantName": "walmart",
    "transactionDate": "10/1/2022"
  }];

  await act(async () => {
    root.render(<RewardsActivity transactionsList={transactionsList} />);
  });

  expect(container.textContent).toContain("Calculate Reward Points");
});

