import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  today: "",
  keywords: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setToday: (state, action) => {
      state.today = action.payload;
    },
    addKeyword: (state, action) => {
      state.keywords.push(action.payload);
    },
    clearHistory: (state) => {
      state.today = "";
      state.keywords = [];
    },
  },
});

export const { setToday, addKeyword, clearHistory } =
  historySlice.actions;
export default historySlice.reducer;
