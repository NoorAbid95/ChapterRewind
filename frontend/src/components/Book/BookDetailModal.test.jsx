import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import BookDetailModal from "./BookDetailModal";
import axios from "axios";
import { toast } from "react-toastify";

vi.mock("axios");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockBook = {
  _id: "123",
  title: "test book",
  author: "test author",
  coverUrl: "test-url.jpg",
  summary: "test summary",
};

describe("BookDetailModal", () => {
  const onClose = vi.fn();
  const onUpdateLibrary = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    render(
      <BookDetailModal
        book={mockBook}
        isOpen={false}
        onClose={onClose}
        onUpdateLibrary={onUpdateLibrary}
      />
    );
    expect(screen.queryByText(/test book/i)).not.toBeInTheDocument();
  });
  it("should render modal when isOpen is true", () => {
    render(
      <BookDetailModal
        book={mockBook}
        isOpen={true}
        onClose={onClose}
        onUpdateLibrary={onUpdateLibrary}
      />
    );
    expect(screen.getByText(/test book/i)).toBeInTheDocument();
    expect(screen.getByText(/by test author/i)).toBeInTheDocument();
  });

  it("should fetch and display note on mount", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: "Test note content" } });
    render(
      <BookDetailModal
        book={mockBook}
        isOpen={true}
        onClose={onClose}
        onUpdateLibrary={onUpdateLibrary}
      />
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/api/books/mylibrary/123/notes",
        { withCredentials: true }
      );
    });
    expect(screen.getByText(/Test note content/i)).toBeInTheDocument();
  });
  it("should enter edit mode when clicking 'Add Book Notes' ", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: " " } });
    render(
      <BookDetailModal
        book={mockBook}
        isOpen={true}
        onClose={onClose}
        onUpdateLibrary={onUpdateLibrary}
      />
    );
    await waitFor(() => screen.getByText(/Add Book Notes/i));
    fireEvent.click(screen.getByText(/Add Book Notes/i));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should save note with POST if no original note", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: " " } });
    axios.post.mockResolvedValueOnce({});

    render(
      <BookDetailModal
        book={mockBook}
        isOpen={true}
        onClose={onClose}
        onUpdateLibrary={onUpdateLibrary}
      />
    );
    await waitFor(() => screen.getByText(/Add Book Notes/i));

    fireEvent.click(screen.getByText(/Add Book Notes/i));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New note" },
    });
    fireEvent.click(screen.getByText(/Save Note/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/api/books/mylibrary/123/notes",
        { note: "New note" },
        { withCredentials: true }
      );
      expect(toast.success).toHaveBeenCalledWith("Note Saved");
    });
  });
  it("should delete the book when confirmed", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: "Existing note" } });
    axios.delete.mockResolvedValueOnce({});

    render(
      <BookDetailModal
        book={mockBook}
        isOpen={true}
        onClose={onClose}
        onUpdateLibrary={onUpdateLibrary}
      />
    );
    await waitFor(() => screen.getByText(/Remove Book From Library/i));
    fireEvent.click(screen.getByText(/Remove Book From Library/i));
    fireEvent.click(screen.getByText(/Confirm/i));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:3000/api/books/mylibrary/123",
        { withCredentials: true }
      );
      expect(toast.success).toHaveBeenCalledWith("Book deleted from library");
      expect(onUpdateLibrary).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
