import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import getTransactionsList from './services/transactions.data.service';
import { act } from "react-dom/test-utils";

jest.mock("./services/transactions.data.service");

describe("App Component", () => {
    // After each test clear the mock
    beforeEach(() => jest.clearAllMocks());

    it("should render transaction list when api responds", async () => {
        // test the mocked api output
        getTransactionsList.mockResolvedValue(
            [{ "id": 1, "amount": "20", "customerId": "1", "customerName": "Dave Warbrick", "merchantName": "walmart", "transactionDate": "10/1/2022" }]
        );

        // Render the component
        await act(async () => {
            render(<App />)
        });

        // check if the app is rendered for the mocked response
        await waitFor(() => {
            screen.getAllByText("Rewards Activity");
        });
    });
});
