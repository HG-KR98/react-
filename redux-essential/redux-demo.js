const redux = require("redux");

// 리듀서는 항상 새로운 상태 객체를 리턴해야만 한다.
// 리듀서 함수는 순수한 함수가 되어야 한다.
// 동일한 입력, 즉 동일한 입력 값을 넣으면 항상 정확히 같은 출력이 산출되어야 한다.
// 함수 안에서는 어떠한 부수적인 효과도 없어야 한다.
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
};

// 실행하지 않고 함수를 포인트하기만 한다.
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// 실행하지 않고 함수를 포인트하기만 한다.
store.subscribe(counterSubscriber);

// dispatch는 액션을 발송하는 메소드이다.
// 액션은 타입을 식별자로 가지는 자바스크립트 객체이다.
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
