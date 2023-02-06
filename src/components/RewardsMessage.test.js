import RewardsMessage from './RewardsMessage';
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
});

afterEach(() => {
    act(() => {
        root.unmount()
    });
});

it("should render without props", () => {
    act(() => {
        root.render(<RewardsMessage />);
    });
    expect(container.textContent).toBe("");
});

it("should render with props for monthly total", () => {
    act(() => {
        root.render(<RewardsMessage selectedCustomer={"Dave Warbrick"}
            pointsPerMonth={20}
            selectedMonth={"October"}
        />);
    });
    expect(container.textContent).toBe("Dave Warbrick earned 20 PTS for the October month");
});

it("should render with props for total points", () => {
    act(() => {
        root.render(<RewardsMessage selectedCustomer={"Dave Warbrick"}
            totalPoints={720}
        />);
    });
    expect(container.textContent).toBe("Dave Warbrick earned total of 720 PTS");
});