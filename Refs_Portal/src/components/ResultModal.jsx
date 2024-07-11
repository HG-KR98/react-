// ref는 props로 넘겨 줄 수 없기 때문에 forwardRef로 대체한다.
// 하나의 컴포넌트에서 다른 컴포넌트로 참조가 사용될 수 있게 하는 것
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

// forwardRef를 사용하게 되면 컴포넌트 함수는 두번째 인자를 받게 된다.
// 여기서 첫번째 인자는 props이고 두번째 인자는 ref이다.
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // 대부분의 상황에서는 props를 사용하기 때문에 이 훅을 자주 사용하지는 않는다.
  useImperativeHandle(ref, () => {
    return {
      // 여기서의 메소드 이름은 마음대로 지으면 된다.
      // 이 메소드를 통해서 호출할 함수들에게 노출 시킬수 있다.
      open() {
        dialog.current.showModal();
      },
    };
  });
  // 이 컴포넌트에 렌더링이 될 HTML 코드를 DOM 내에 다른 곳으로 옮기는 역할을 한다.
  return createPortal(
    // 브라우저에 명령을 보내서 backdrop을 받아와야 하기에 참조를 사용해야 한다.
    // 여기서 사용하는 ref는 우리가 작성할 때는 어떻게 쓰이는지 알지만
    // 다른 사람과 협업을 할 때에는 다른 사람이 못 알아볼수도 있기 때문에
    // useImperativeHandle 훅을 사용해서 함수를 노출시켜주면 좋다.
    // ESC로 모달창을 닫았을 때 onReset이 트리거가 되게 하려면 onClose를 이용하면 된다.
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
