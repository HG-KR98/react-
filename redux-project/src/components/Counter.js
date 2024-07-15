import { Component } from "react";
// redux 팀이 만든 커스텀 훅
// useStore 훅도 있지만 useSelector를 사용하는 이유는
// 저장소가 관리하는 상태 부분을 우리가 자동으로 선택할 수 있기 때문이다.
// 만약 클래스형 컴포넌트를 사용할 경우 connect 함수를 사용하여
// 이를 감싸는 래퍼로 사용해서 그 클래스 컴포넌트를 저장소에 연결할 수 있다.
import { useSelector, useDispatch, connect } from "react-redux";
import { counterActions } from "../store/counter.js";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();

  // useSelector를 사용할 때 react-redux는 이 컴포넌트를 위해 리덕스 저장소에
  // 자동으로 구독을 설정한다는 게 중요하다.
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
    // dispatch({ type: "toggle" });
  };

  const incrementHandler = () => {
    dispatch(counterActions.increase(10)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 } 여기서 필드명은 Redux Toolkit이 기본값으로 사용하는 필드명이다.
    // dispatch({ type: "increment" });
  };

  const increaseHandler = () => {
    dispatch(counterActions.increment);
    // dispatch({ type: "increase", amount: 5 });
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
    // dispatch({ type: "decrement" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "increment" }),
//     decrement: () => dispatch({ type: "decrement" }),
//   };
// };

// 실행하지는 않고 포인트만 함.
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
