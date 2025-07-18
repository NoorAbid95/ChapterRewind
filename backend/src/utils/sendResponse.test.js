import { describe, it, expect, vi } from "vitest";
import { sendSuccess, sendError } from "./sendResponse.js";

describe("sendSuccess", () => {
  it("should send success with defaults", () => {
    const jsonMock = vi.fn();
    const statusMock = vi.fn((statusCode) => ({ json: jsonMock }));
    const mockRes = { status: statusMock };

    sendSuccess(mockRes);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      message: "Success",
      data: {},
    });
  });

  it("should send success response with custom data and message", () => {
    const jsonMock = vi.fn();
    const statusMock = vi.fn((statusCode) => ({ json: jsonMock }));
    const mockRes = { status: statusMock };

    const data = { id: 1 };
    const message = "Custom success message";
    const status = 201;

    sendSuccess(mockRes, data, message, status);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      message,
      data,
    });
  });
});

describe("sendError", () => {
  it("should send error response with defaults", () => {
    const jsonMock = vi.fn();
    const statusMock = vi.fn((statusCode) => ({ json: jsonMock }));
    const mockRes = { status: statusMock };

    sendError(mockRes);

    expect(statusMock).toBeCalledWith(500);
    expect(jsonMock).toBeCalledWith({
      success: false,
      message: "Internal Server Error",
    });
  });
  it("should send error response with custom message and status", () => {
    const jsonMock = vi.fn();
    const statusMock = vi.fn((statusCode) => ({ json: jsonMock }));

    const mockRes = { status: statusMock };

    const message = "Not found";
    const status = 404;

    sendError(mockRes, message, status);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message,
    });
  });
});
