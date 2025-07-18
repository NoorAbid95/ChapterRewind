import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

vi.mock("axios");

const mockNavigate = vi.fn();
const mockLocation = { pathname: "/" };

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

vi.mock("../../store/useAuthStore", () => ({
  default: vi.fn(),
}));

vi.mock("../../assets/bookshelf-nav.svg?react", () => ({
  default: () => <div data-testid="bookshelf-icon">BookshelfIcon</div>,
}));

import useAuthStore from "../../store/useAuthStore";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  const mockClearUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockClearUser.mockClear();
    mockLocation.pathname = "/";
  });

  it("renders login/signup when no user and not on login/signup pages", () => {
    useAuthStore.mockReturnValue({ user: null, clearUser: mockClearUser });

    render(<Navbar fadeNavItems={false} />);

    expect(screen.getByText("LOGIN")).toBeInTheDocument();
    expect(screen.getByText("SIGNUP")).toBeInTheDocument();
    expect(screen.queryByText("MY LIBRARY")).not.toBeInTheDocument();
    expect(screen.queryByText("LOGOUT")).not.toBeInTheDocument();
  });

  it("does not show LOGIN link on /login page", () => {
    mockLocation.pathname = "/login";
    useAuthStore.mockReturnValue({ user: null, clearUser: mockClearUser });

    render(<Navbar fadeNavItems={false} />);

    expect(screen.queryByText("LOGIN")).not.toBeInTheDocument();
    expect(screen.getByText("SIGNUP")).toBeInTheDocument();
  });

  it("renders MY LIBRARY and LOGOUT when user is logged in", () => {
    useAuthStore.mockReturnValue({
      user: { id: 1, name: "User" },
      clearUser: mockClearUser,
    });

    render(<Navbar fadeNavItems={false} />);

    expect(screen.getByText("MY LIBRARY")).toBeInTheDocument();
    expect(screen.getByText("LOGOUT")).toBeInTheDocument();
    expect(screen.queryByText("LOGIN")).not.toBeInTheDocument();
    expect(screen.queryByText("SIGNUP")).not.toBeInTheDocument();
  });

  it("calls logout API, clears user, and navigates home on logout click", async () => {
    useAuthStore.mockReturnValue({
      user: { id: 1, name: "User" },
      clearUser: mockClearUser,
    });
    axios.post.mockResolvedValue({ data: { success: true } });

    render(<Navbar fadeNavItems={false} />);

    fireEvent.click(screen.getByText("LOGOUT"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      expect(mockClearUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("navigates to '/' when clicking bookshelf icon from other page", () => {
    mockLocation.pathname = "/otherpage";
    useAuthStore.mockReturnValue({ user: null, clearUser: mockClearUser });

    render(<Navbar fadeNavItems={false} />);

    const button = screen.getByTestId("bookshelf-icon").closest("button");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("scrolls to top when clicking bookshelf icon on '/' page", () => {
    useAuthStore.mockReturnValue({ user: null, clearUser: mockClearUser });


    const scrollToMock = vi.fn();
    document.body.innerHTML = `<div id="scroll-container" style="height: 1000px; overflow: scroll;"></div>`;
    const scrollContainer = document.getElementById("scroll-container");
    scrollContainer.scrollTo = scrollToMock;

    render(<Navbar fadeNavItems={false} />);

    const button = screen.getByTestId("bookshelf-icon").closest("button");
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
