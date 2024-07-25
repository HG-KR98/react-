import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

// 액션 내보내기
export const uiActions = uiSlice.actions;

// 슬라이스 내보내기
export default uiSlice;
