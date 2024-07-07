import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }

    // 가장 효율적인 방식이다.
    // setIsEditing(!isEditing);
    // 이 코드는 작동을 하지만 문제가 있다.
    // 이 작업을 하는 리액트가 상태에 대한 변화의 스케줄을 조율한다는 점이다.
    // 이것은 setIsEditing과 같은 상태 변경 함수를 통해 실행
    // 즉 이 상태 변경은 즉각적으로 수행되는 것이 아니라
    // 리액트가 미래에 수행하고자 상태 변경 스케줄을 조율하는 것이다.
    // 이 시간은 몇 밀리초밖에 되지 않으므로 아주 빠른 시간이지만 즉각적이진 않다.
    // setIsEditing(!isEditing);
    // setIsEditing(!isEditing);
    // 코드를 이렇게 짠다면 결과적으로는 아무런 변화가 없을 것 같지만
    // 실제로 실행을 해보면 변화가 생긴다.
    // 리액트가 이 상태 변경 스케줄을 조율하는데
    // 두 변화 모두 isEditing의 현재 상태를 기준으로 삼기 때문이다.
    // 둘다 isEditing을 False로 보는 것이다.
    // 이 컴포넌트 함수가 처음 실행되는 시점에 isEditing의 값이 false
    // handleEditClick 함수는 생성될 당시 컴포넌트 함수 실행에 포함되어 있기 때문에
    // isEditing은 시작 지점의 값을 가지고 있다.
    // setIsEditing을 isEditing의 반대격으로 호출할 때
    // 상태 변경 스케줄을 조율하게 되는데 이때 setIsEditing을 true로 바꾸라는 명령이
    // 즉각적으로 실행되지 않는 것이다. 그렇기 때문에 이전과 동일한 상태가 유지된다.
    // 이는 동일한 컴포넌트 함수 실행의 사이클을 돌고 있는 도중이기 때문이다.
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = "Edit";

  if (isEditing) {
    editablePlayerName = (
      // 양방향 바인딩
      <input type="text" required value={playerName} onChange={handleChange} />
      // event 값은 자동으로 handleChange로 넘어간다
    );
    // defaultValue를 이용하여 특정 값으로 지속적으로 덮어쓰지 못하게 하여
    // 값을 변화시킬 수 있도록 할수도 있음.
    // btnCaption = "save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
