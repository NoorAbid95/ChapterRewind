import { create } from "zustand";

const useSummaryStore = create((set) => ({
  summary: "",
  videos: [],
  formData: { title: "", author: "" },
  setSummary: (summary) => set({ summary }),
  setVideos: (videos) => set({ videos }),
  setFormData: (formData) => set({ formData }),
}));


export default useSummaryStore