import { describe, it, expect, vi, beforeEach } from "vitest";
import { signup } from "./auth.controller.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import * as sendResponse from "../utils/sendResponse.js";
import * as generateToken from "../utils/generateToken.js";

vi.mock("../models/user.models.js");
vi.mock("bcryptjs");
vi.mock("../utils/sendResponse.js");
vi.mock("../utils/generateToken.js");

const mockReq = (body) => ({ body });

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn();
  return res;
};

describe("signup controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return error if required fields are missing", async () => {
    const req = mockReq({ email: "test@test.com", password: "123456" }); // missing fullName
    const res = mockRes();

    await signup(req, res);

    expect(sendResponse.sendError).toHaveBeenCalledWith(
      res,
      "All fields required",
      400
    );
  });

  it("should return error if password is less than 6 characters", async () => {
    const req = mockReq({
      fullName: "Test User",
      email: "test@test.com",
      password: "123",
    });
    const res = mockRes();

    await signup(req, res);

    expect(sendResponse.sendError).toHaveBeenCalledWith(
      res,
      "Password must be at least 6 characters long",
      400
    );
  });
  it("should render error if email already exists", async () => {
    const req = mockReq({
      fullName: "Test User",
      email: "test@test.com",
      password: "123456",
    });
    const res = mockRes();

    User.findOne.mockResolvedValue({ _id: "123", email: "test@test.com" });

    await signup(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
    expect(sendResponse.sendError).toHaveBeenCalledWith(
      res,
      "Account email already exists",
      400
    );
  });

  it("should create a new user and sends success response", async () => {
    const req = mockReq({
      fullName: "Test User",
      email: "test_user@test.com",
      password: "123456",
    });
    const res = mockRes();

    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedPassword");

    const saveMock = vi.fn().mockResolvedValue(true);
    User.mockImplementation(function (userObj) {
      return {
        ...userObj,
        _id: "newUserId",
        save: saveMock,
      };
    });
    generateToken.generateToken.mockImplementation(() => {});
    await signup(req, res);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(12);
    expect(bcrypt.hash).toHaveBeenCalledWith("123456", "salt");
    expect(saveMock).toHaveBeenCalled();

    expect(generateToken.generateToken).toHaveBeenCalledWith("newUserId", res);

    expect(sendResponse.sendSuccess).toHaveBeenCalledWith(
      res,
      { _id: "newUserId", fullName: "Test User", email: "test_user@test.com" },
      "User registered successfully",
      201
    );
  });
  it("should call sendError if an unexpected error occurs", async() =>{
    const req = mockReq({fullName: "Test", email: "test@test.com", password: "123456"})
    const res = mockRes()

    User.findOne.mockRejectedValue(new Error("DB Failure"))

    await signup(req, res)

    expect(sendResponse.sendError).toHaveBeenCalled(res)
  })
});
