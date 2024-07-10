import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);

  // function handleChange(event) {
  //   setSubmitted(false);
  //   setEnteredPlayerName(event.target.value);
  // }

  // ref는 페이지의 모든 종류의 값들을 읽고 조정하기 위해서 사용하는 것이 아니라는 것을 알아두어야 함!

  // 참조와 상태의 차이
  // 참조를 사용할 경우 참조만 사용한다면 작동을 안하게 된다.
  // 첫 컴포넌트 랜더링 사이클에서 컴포넌트 함수가 처음 실행될 때
  // playerName.current는 정의되지 않는다.
  // 그건 다음 렌더링 사이클에서만 연결 필드와 연결이 끊기고
  // 그제야 값에 접근할 수 있다는 것이다.
  // 또한 참조가 바뀔 때마다 컴포넌트 함수가 재실행되지 않는다는 것도 알아야 한다.
  // 참조를 사용해야 하는 경우는 DOM 요소에 직접적인 접근이 필요할 때이다.

  // 반면 상태의 경우 상태를 업데이트 하게 되면 컴포넌트 함수는 재실행된다.
  // 상태를 사용하지 말아야 하는 경우는 시스템 내부에 보이지 않는 쪽에서만 다루는 값들이나
  // UI에 직접적인 영향을 끼치지 않는 값들을 갖고 있을 경우이다.
  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ""; // DOM을 조작하는 명령적 코드 입력 후 이름 설정 버튼을 누르면 input칸이 초기화 됨.
    // setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>
        {/* 다음 사이클을 위해 이 코드를 수정하더라도 에러는 사라지지만 연결을 되지 않는다. */}
        Welcome {enteredPlayerName ? enteredPlayerName : "unknown entity"}
      </h2>
      <p>
        <input
          ref={playerName}
          type="text"
          // onChange={handleChange}
          // value={enteredPlayerName}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
