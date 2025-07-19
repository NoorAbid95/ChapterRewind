import { describe, it, expect, afterEach } from "vitest";
import useSummaryStore from "./useSummaryStore";

afterEach(() => {
  useSummaryStore.setState({
    summary: "",
    videos: [],
    formData: { title: "", author: "" },
  });
});

describe("useSummaryStore", () => {
  it("should have initial state", () => {
    const state = useSummaryStore.getState();
    expect(state.summary).toBe("");
    expect(state.videos).toEqual([]);
    expect(state.formData).toEqual({ title: "", author: "" });
  });

  it("should update summary", () => {
    useSummaryStore.getState().setSummary("This is the recap");
    expect(useSummaryStore.getState().summary).toBe("This is the recap");
  });

  it("should update videos", () => {
    const mockVideo = [{ id: "123", title: "Summary video" }];
    useSummaryStore.getState().setVideos(mockVideo);
    expect(useSummaryStore.getState().videos).toEqual(mockVideo);
  });

  it("should update fromData", () => {
    const mockFormData = { title: "Mock Book", author: "Mock Author" };
    useSummaryStore.getState().setFormData(mockFormData);
    expect(useSummaryStore.getState().formData).toEqual(mockFormData);
  });
});
