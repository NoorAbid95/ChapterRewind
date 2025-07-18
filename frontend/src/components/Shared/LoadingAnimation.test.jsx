import { render, screen } from "@testing-library/react";
import LoadingAnimation from "./LoadingAnimation.jsx";
import { describe, it, expect, vi, afterEach } from "vitest";

const playMock = vi.fn();
const goToAndStopMock = vi.fn();
const destroyMock = vi.fn();

vi.mock("lottie-web", () => ({
  default: {
    loadAnimation: () => ({
      play: playMock,
      goToAndStop: goToAndStopMock,
      destroy: destroyMock,
    }),
  },
}));

describe("LoadingAnimation", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render the container div", () => {
    render(<LoadingAnimation />);
    const container = screen.getByTestId("lottie-container");
    expect(container).toBeInTheDocument();
  });

  it("should initialise lottie animation and stop at frame 285 on mount", () => {
    render(<LoadingAnimation />);
    expect(goToAndStopMock).toHaveBeenCalledWith(285, true);
  });
  it("should play animation when playing prop is set to true", () => {
    render(<LoadingAnimation playing={true} />);
    expect(playMock).toHaveBeenCalled();
  });
  it("should stop animation when playing prop is false", () => {
    render(<LoadingAnimation playing={false} />);
    expect(goToAndStopMock).toHaveBeenCalledWith(285, true);
  });
});
