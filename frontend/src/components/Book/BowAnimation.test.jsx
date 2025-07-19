import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import BowAnimation from "./BowAnimation";

//Mock lottie-web methods
const playSegmentsMock = vi.fn();
const goToAndStopMock = vi.fn();
const destroyMock = vi.fn();

vi.mock("lottie-web", () => ({
  default: {
    loadAnimation: () => ({
      playSegments: playSegmentsMock,
      goToAndStop: goToAndStopMock,
      destroy: destroyMock,
    }),
  },
}));

describe("BowAnimation", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the animation container", () => {
    render(<BowAnimation />);
    const container = screen.getByRole("presentation");
    expect(container).toBeInTheDocument();
  });

  it("should initialise animation and stop at frame 21", () => {
    render(<BowAnimation />);
    expect(goToAndStopMock).toHaveBeenCalledWith(21, true);
  });
  it("should play the 'draw' segment on mouse enter", () => {
    render(<BowAnimation />);
    const container = screen.getByRole("presentation");
    fireEvent.mouseEnter(container)
    expect(playSegmentsMock).toHaveBeenCalledWith([21, 60], true)
  });
  it("should play 'idle' segment on mouse leave", () =>{
    render(<BowAnimation/>)
    const container = screen.getByRole("presentation")
    fireEvent.mouseLeave(container)
    expect(playSegmentsMock).toHaveBeenCalledWith([21,22], true)
  })
  it("should play 'fire' segment on mouse click", () =>{
    render(<BowAnimation/>)
    const container = screen.getByRole("presentation")
    fireEvent.click(container)
    expect(playSegmentsMock).toHaveBeenCalledWith([61, 85], true)
  })
  it("should clean up animation on unmount", () =>{
    const {unmount }= render(<BowAnimation/>)
    unmount()
    expect(destroyMock).toHaveBeenCalled()
  })
});
