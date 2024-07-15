// import { createStore, combineReducers } from "redux";
// createSlice가 createReducer보다 더 강력하다.
// configureStore는 createStore처럼 store를 만들지만 여러 개의
import { configureStore } from "@reduxjs/toolkit";
import coutnerReducer from "./counter.js";
import authReducer from "./auth.js";
// 상태를 업데이트 할때는 기존의 값을 덮어씌운다는 개념이다.
// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     // 밑의 코드로 작성하면 작동은 하는데 잘못된 방법인 이유는
//     // Redux로 작업할 때 절대로 해서는 안되는 것이며 절대 기존의 state를
//     // 변형해서는 안되기 때문이다. 새로운 state 객체를 반환하여 항상 재정의 하는 방법을 사용해야한다.
//     // javaScript에서는 객체나 배열이 참조 값
//     // state.counter++;
//     // return state;

//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "increase") {
//     return {
//       counter: state.counter + action.amount,
//       howCounter: state.showCounter,
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//       counter: state.counter,
//       howCounter: !state.showCounter,
//     };
//   }

//   return state;
// };

// createStore에는 하나의 reducer만 적용해야한다.
// configureStore는 createStore처럼 store를 만든다.
// 하지만 다른 점으로 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다.
const store = redux.configureStore({
  reducer: { counter: coutnerReducer, auth: authReducer },
});

// createSlice에서 actions의 객체에 접근하는 방법
// 메소드를 호출하면 액션 객체가 생성된다. (액션 생성자)
// 이런 객체는 액션마다 다른 고유 식별자와 함께 이미 type 프로퍼티를 가지고 있다.



// const store = redux.createStore(counterSlice.reducer);

// const counterSubscriber = () => {
//   const latestState = store.getState();
//   console.log(latestState);
// };

// store.subscribe(counterSubscriber);

// store.dispatch({ type: "increment" });
// store.dispatch({ type: "decrement" });

export default store;
