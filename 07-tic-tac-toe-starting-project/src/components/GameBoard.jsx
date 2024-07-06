const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   // 만약 상태가 객체나 배열이라면 해당 상태를 업데이트할 때
  //   // 변경 불가능하게 하는 것이 좋다.
  //   // 즉 이전 상태를 하나 복제해서 새 객체 또는 배열로 저장해 놓고
  //   // 이 복제된 버전을 수정하는 방식이다.
  //   // 즉, 원본 객체 또는 배열은 변경되지 않는다.
  //   // 이러한 방식을 추천하는 이유는 만약 상태가 객체 혹은 배열이라면
  //   // 이는 자바스크립트 내의 참조 값이다.
  //   // 그러므로 이런 방식으로 업데이트한다면
  //   // 메모리 속의 기존 값을 바로 변경하게 되는데
  //   // 이 시점은 리액트가 실행하는 예정된 상태 업데이트보다 이전에 일어나게 된다.
  //   // 그러므로 알 수 없는 버그나 부작용이 생길 수 있다.
  //   // 이것은 앱 내부의 한 상태에 대해 상태 업데이트가 여러 개 예정되어 있을 때 일어난다.
  //   setGameBoard((prevGameBoard) => {
  //     const updateBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updateBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updateBoard;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={onSelectSquare}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
