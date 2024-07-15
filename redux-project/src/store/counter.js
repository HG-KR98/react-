import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      // Redux만 사용할 때는 이런식으로 상태를 직접 변경하면 안됐으나 tootkit과
      // 같이 사용하면 toolkit이 immer라는 다른 패키지를 사용하는데 이런 코드를 감지하고
      // 자동으로 원래 있는 상태를 복제한다. 그리고 새로운 상태 객체를 생성하고 모든 상태를 변경할 수 없게 유지하고,
      // 우리가 변경한 상태는 변하지 않도록 오버라이드 한다.
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
