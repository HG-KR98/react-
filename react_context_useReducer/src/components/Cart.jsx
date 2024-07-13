import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

// 우리가 컴포넌트의 컨텍스트의 값에 접근할 때 해당 값은 그 값에 접근하는
// 컴포넌트의 함수를 바꾸고 업데이트된 내부 상태가 사용되었거나
// 부모 컴포넌트가 다시 실행되었다거나 컴포넌트 함수가 재실행되는 것과 같이
// 리액트에 의한 재실행이 이루어진다. 이러한 상황들에서 리액트는 컴포넌트 함수를
// 재실행하게 되는데 재실행이 진행되는 또다른 상황은 컴포넌트 함수가 useContext 훅을 사용함으로
// 관련 컨텍스트 값에 연결되었을 때이다. 이러한 상황에서 UI 업데이트 진행을 위해
// 컴포넌트는 필히 재실행되어야 하고 이에 따라 해당 값은 변경된다. 연결된 컨텍스트 값이
// 변경되었을 때 리액트가 컴포넌트 함수를 재실행하는 이유는 해당 컴포넌트 함수가
// 새로운 UI를 만들어낼 수 있게 하기 위해서이다.
export default function Cart() {
  const { items, updateItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
