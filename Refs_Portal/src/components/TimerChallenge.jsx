import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

// 상태를 사용하게 되면 값이 변할 때마다 컴포넌트 함수가 재실행 되므로
// 관련 변수를 함수 밖으로 빼주고 사용해야 한다.
// handleStart가 실행되어서 상태가 변하게 되면 컴포넌트 함수가 재실행되기 때문에
// 이후에 handleStop 함수를 실행하게 되면 다른 timer로 인식하므로 밖으로 빼줘야 한다.
// 변수 재생성

// 만약 1초와 5초를 둘다 시작하고 다시 둘다 멈추면 한쪽은 멈추지 않게 된다
// 왜냐하면 timer라는 변수가 함수 컴포넌트에 있는 모든 인스턴스에서 접근이 가능하기 때문에
// timer의 값이 덮어 씌워지기 때문이다.
// 이럴 때에는 참조를 사용해야 한다.

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  // 참조를 이용하게 되면 독립적으로 참조를 이용하기 때문에 충돌이 발생하지 않음.
  // 이 참조는 컴포넌트 함수가 재실행 될때 초기화되거나 지워지지 않는다.
  // 또한 참조는 컴포넌트 함수를 재실행 시키지 않는다.
  // 제어해야 하는 값이 있는데 상태로 쓰이기는 힘들 경우 참조를 이용한다.
  // UI에 영향을 끼치지 않는 값을 제어하고 싶을 때
  // 컴포넌트가 재실행될 때 초기화되지 않는 그런 경우에 참조가 좋은 방법이다.

  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);
    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <>
      {/* ref는 props 속성이 아니다  */}
      {/* forwardRef를 사용할 경우 속성명을 무조건 ref로 설정해야 한다. */}
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
