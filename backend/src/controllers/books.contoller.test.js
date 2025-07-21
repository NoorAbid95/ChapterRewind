vi.mock("../models/user.models.js", () => ({
  default: {
    findOne: vi.fn(),
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  },
}));

import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import User from "../models/user.models.js";
import * as sendResponse from "../utils/sendResponse.js";
import * as bookController from "../controllers/books.controller.js";

//Mock dependencies
vi.mock("axios");
vi.mock("../models/user.model.js");
vi.mock("../utils/sendResponse.js");

const mockReq = (data = {}) => ({
  body: data.body || {},
  params: data.params || {},
  user: data.user || {},
});

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("homePage", () => {
  it("should send success response", () => {
    const req = mockReq();
    const res = mockRes();

    bookController.homePage(req, res);

    expect(sendResponse.sendSuccess).toHaveBeenCalledWith(
      res,
      {},
      "Homepage Loaded Successfully"
    );
  });
});

describe("searchBookYT", () => {
  it("should send YouTube dataon success", async () => {
    const req = mockReq({
      body: { title: "Harry Potter", author: "JK Rowling" },
    });
    const res = mockRes();

    const fakeResponse = { data: { items: ["video1", "video2"] } };
    axios.get.mockResolvedValue(fakeResponse);

    await bookController.searchBookYT(req, res);

    expect(axios.get).toHaveBeenCalledWith(
      "https://www.googleapis.com/youtube/v3/search",
      expect.objectContaining({
        params: expect.objectContaining({
          q: "Harry Potter by JK Rowling book recap",
        }),
      })
    );

    expect(sendResponse.sendSuccess).toHaveBeenCalledWith(
      res,
      fakeResponse.data.items,
      200
    );
  });
  it("should call sendError on API failure", async () => {
    const req = mockReq({
      body: { title: "Harry Potter", author: "JK Rowling" },
    });
    const res = mockRes();

    axios.get.mockRejectedValue(new Error("API down"));

    await bookController.searchBookYT(req, res);

    expect(sendResponse.sendError).toHaveBeenCalledWith(res);
  });
});

describe("add book to library", () => {
  it("should add book to user library when all data is valid", async () => {
    const req = mockReq({
      body: {
        title: "The Hobbit",
        author: "Tolkien",
        summary: "A fantasy novel",
      },
      user: { _id: "userId123" },
    });
    const res = mockRes();

    axios.get
      .mockResolvedValueOnce({
        data: {
          items: [
            {
              volumeInfo: { title: "The Hobbit", authors: ["J.R.R. Tolkien"] },
            },
          ],
        },
      })
      .mockResolvedValueOnce({ data: { url: "https://cover.url/hobbit.jpg" } });

    //Returns null if book not in library
    User.findOne.mockResolvedValue(null);

    //Returns updated user with new library array
    User.findByIdAndUpdate.mockResolvedValue({
      library: [
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          coverURL: "https://cover.url/hobbit.jpg",
          summary: "A fantasy novel",
          notes: "",
        },
      ],
    });
    await bookController.addBookToLibrary(req, res);

    expect(axios.get).toHaveBeenCalledTimes(4)
    expect(User.findOne).toHaveBeenCalledWith({
      _id: "userId123", 
      "library.title": "The Hobbit", 
      "library.author": "J.R.R. Tolkien", 
    })
    expect(User.findByIdAndUpdate).toHaveBeenCalled()
    expect(sendResponse.sendSuccess).toHaveBeenCalledWith(
      res, 
      expect.any(Array), 
      "Book added to library", 
      201
    )
    
  });
  it("should send error if no book found in Google API", async () =>{
    const req = mockReq({
      body: {title: "Uknown Book", author: "No One"}, 
      user: {_id: "userId123"},
    })
    const res = mockRes()

    axios.get.mockResolvedValueOnce({data: {items: []}})
    
    await bookController.addBookToLibrary(req, res)
    expect(sendResponse.sendError).toHaveBeenCalledWith(res, "No book found with that title/author", 404)

  })
  it("should send error if book already in library", async() =>{
    const req = mockReq({
      body: {title: "The Hobbit", author: "Tolkien", summary: "summary"}, 
      user: {_id: "userId123"},
    })
    const res = mockRes()

    axios.get.mockResolvedValueOnce({
      data: {
        items: [
          {volumeInfo: {title: "The Hobbit", authors: ["J.R.R. Tolkien"]}},
        ],
      },
    })
    .mockResolvedValueOnce({data: {url: "some_url"}})

    User.findOne.mockResolvedValue({_id: "userid123"})

    await bookController.addBookToLibrary(req, res)

    expect(sendResponse.sendError).toHaveBeenCalledWith(res, "Book already exists in library", 409)
  })

  it("should call sendError on unexpected error", async () =>{
    const req = mockReq({body: {title: "Error Book", author: "Error"}, user: {_id: "userId123"}})
    const res = mockRes()

    axios.get.mockRejectedValue(new Error("Network Error"))

    await bookController.addBookToLibrary(req, res)

    expect(sendResponse.sendError).toHaveBeenCalledWith(res)
  })
});

describe("getNote", () => {
  it("should return notes if book found", async () => {
    const req = mockReq({ params: { bookId: "book1" }, user: { _id: "userId" } });
    const res = mockRes();

    const mockBook = { notes: "My notes" };
    const mockUser = {
      library: {
        id: vi.fn().mockReturnValue(mockBook),
      },
    };

    User.findById.mockResolvedValue(mockUser);

    await bookController.getNote(req, res);

    expect(User.findById).toHaveBeenCalledWith("userId");
    expect(sendResponse.sendSuccess).toHaveBeenCalledWith(res, "My notes", 200);
  });

  it("should send error if book not found", async () => {
    const req = mockReq({ params: { bookId: "book1" }, user: { _id: "userId" } });
    const res = mockRes();

    const mockUser = {
      library: {
        id: vi.fn().mockReturnValue(null),
      },
    };

    User.findById.mockResolvedValue(mockUser);

    await bookController.getNote(req, res);

    expect(sendResponse.sendError).toHaveBeenCalledWith(res, "Book not found", 404);
  });
});
