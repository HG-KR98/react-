// ref는 props로 넘겨 줄 수 없기 때문에 forwardRef로 대체한다.
// 하나의 컴포넌트에서 다른 컴포넌트로 참조가 사용될 수 있게 하는 것
import { forwardRef } from "react";

// forwardRef를 사용하게 되면 컴포넌트 함수는 두번째 인자를 받게 된다.
// 여기서 첫번째 인자는 props이고 두번째 인자는 ref이다.
const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  return (
    // 브라우저에 명령을 보내서 backdrop을 받아와야 하기에 참조를 사용해야 한다.
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
