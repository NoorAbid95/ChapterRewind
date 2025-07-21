import { describe, it, expect, vi, beforeEach } from "vitest";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { protectRoute } from "./auth.middleware.js";
import * as sendResponse from "../utils/sendResponse.js";

vi.mock("jsonwebtoken");
vi.mock("../models/user.models.js");
vi.mock("../utils/sendResponse.js", () => ({
  sendError: vi.fn(),
}));

describe("protectRoute middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {
        jwt: "valid_token",
      },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();

    jwt.verify.mockReset();
    User.findById.mockReset();
    sendResponse.sendError.mockReset();
    res.status.mockReset();
    res.json.mockReset();
    next.mockReset();
  });

  it("should attach user to req and call next() if token is valid", async () => {
    jwt.verify.mockReturnValue({ id: "user123" });
    User.findById.mockReturnValue({
      select: vi.fn().mockResolvedValue({ _id: "user123", name: "Test" }),
    });

    await protectRoute(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(
      "valid_token",
      process.env.JWT_SECRET
    );
    expect(User.findById).toHaveBeenCalledWith("user123");
    expect(req.user).toEqual({ _id: "user123", name: "Test" });
    expect(next).toHaveBeenCalled();
    expect(sendResponse.sendError).not.toHaveBeenCalled();
  });

  it("should return 401 if no token is provided", async () => {
    req.cookies.jwt = null;

    await protectRoute(req, res, next);

    expect(sendResponse.sendError).toHaveBeenCalledWith(
      res,
      "Unauthorized - No Token Provided",
      401
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if token is invalid", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    await protectRoute(req, res, next);

    expect(sendResponse.sendError).toHaveBeenCalledWith(res);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 404 if user not found", async () => {
    jwt.verify.mockReturnValue({ id: "user123" });
    User.findById.mockReturnValue({
      select: vi.fn().mockResolvedValue(null),
    });

    await protectRoute(req, res, next);

    expect(sendResponse.sendError).toHaveBeenCalledWith(
      res,
      "User not found",
      404
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 if unexpected error occurs", async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("some unexpected error");
    });

    await protectRoute(req, res, next);

    expect(sendResponse.sendError).toHaveBeenCalledWith(res);
    expect(next).not.toHaveBeenCalled();
  });
});
