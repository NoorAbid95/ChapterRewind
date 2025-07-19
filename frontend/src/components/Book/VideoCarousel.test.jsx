import { describe, it, expect, beforEach, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import VideoCarousel from "./VideoCarousel.jsx";

const mockVideos = [
  {
    id: { videoId: "testId1" },
    snippet: { title: "Test Video 1" },
  },
  {
    id: { videoId: "testId2" },
    snippet: { title: "Test Video 2" },
  },
  {
    id: { videoId: "testId3" },
    snippet: { title: "Test Video 3" },
  },
];

describe("VideoCarousel", () => {
  it("should render the first video by default", () => {
    render(<VideoCarousel videos={mockVideos} />);
    const iframe = screen.getByTitle("Test Video 1");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", expect.stringContaining("testId1"));
  });

  it("should navigate to the next video on right arrow click", () => {
    render(<VideoCarousel videos={mockVideos} />);
    const nextButton = screen.getByLabelText("Next Slide");

    fireEvent.click(nextButton);
    const iframe = screen.getByTitle("Test Video 2");
    expect(iframe).toBeInTheDocument();
  });

  it("should navigate to previous video on left arrow click", () => {
    render(<VideoCarousel videos={mockVideos} />);
    const leftArrow = screen.getByLabelText("Previous Slide");
    fireEvent.click(leftArrow);

    const iframe = screen.getByTitle("Test Video 3");
    expect(iframe).toBeInTheDocument();
  });
  it("should navigate to the correct video when a dot is clicked", () => {
    render(<VideoCarousel videos={mockVideos} />);
    const dots = screen.getAllByTestId("dot");
    fireEvent.click(dots[2]);
    const iframe = screen.getByTitle("Test Video 3");
    expect(iframe).toBeInTheDocument();
  });
});
