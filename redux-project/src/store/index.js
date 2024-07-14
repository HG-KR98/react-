import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };

// 상태를 업데이트 할때는 기존의 값을 덮어씌운다는 개념이다.
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    // 밑의 코드로 작성하면 작동은 하는데 잘못된 방법인 이유는
    // Redux로 작업할 때 절대로 해서는 안되는 것이며 절대 기존의 state를
    // 변형해서는 안되기 때문이다. 새로운 state 객체를 반환하여 항상 재정의 하는 방법을 사용해야한다.
    // javaScript에서는 객체나 배열이 참조 값
    // state.counter++;
    // return state;

    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      howCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      counter: state.counter,
      howCounter: !state.showCounter,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer);

// const counterSubscriber = () => {
//   const latestState = store.getState();
//   console.log(latestState);
// };

// store.subscribe(counterSubscriber);

// store.dispatch({ type: "increment" });
// store.dispatch({ type: "decrement" });

export default store;
