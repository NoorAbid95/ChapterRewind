import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateToken } from "./generateToken.js";
import jwt from "jsonwebtoken";

vi.mock("jsonwebtoken");

describe("generateToken", () => {
  const mockRes = {
    cookie: vi.fn(),
  };

  const fakeToken = "mocked.jwt.token";

  beforeEach(() => {
    vi.clearAllMocks();
    jwt.sign.mockReturnValue(fakeToken);
    process.env.JWT_SECRET = "test-secret";
    process.env.NODE_ENV = "production";
  });

  it("should generate a token and set it as a cookie", () => {
    const userId = "user1";
    const result = generateToken(userId, mockRes);
    expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, "test-secret", {
      expiresIn: "7d",
    });
    expect(mockRes.cookie).toHaveBeenCalledWith(
      "jwt",
      fakeToken,
      expect.objectContaining({
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
    );
    expect(result).toBe(fakeToken);
  });
});
