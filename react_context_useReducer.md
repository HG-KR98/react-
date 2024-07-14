## React Context

React에서 Context는 컴포넌트 트리 전체에 걸쳐 전역적인 데이터를 공유할 수 있게 해주는 기능이다. 일반적으로 컨포넌트 트리의 깊숙한 자손에게 데이터를 전달할 때 props를 계속해서 전달해야 하는 문제를 해결한다. Context를 사용하면 데이터를 보다 쉽게 공유할 수 있다.

</br>

### 주요 개념

- Context 생성 : createContext를 사용하여 Context를 생성한다.

```jsx
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});
```

- Provider : Context에서 데이터를 제공하는 컴포넌트이다. `Provider` 컴포넌트는 `value` prop을 받아서 하위 컴포넌트에게 데이터를 전달한다.

```jsx
export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
```

- Consumer : Context에서 데이터를 소비하는 컴포넌트이다. `consumer` 컴포넌트를 사용하거나 `useContext` 훅을 사용하여 Context 값을 읽을 수 있다.

```jsx
import React from "react";
import MyContext from "./MyContext";

const MyComponent = () => {
  return (
    <MyContext.Consumer>{({ value }) => <div>{value}</div>}</MyContext.Consumer>
  );
};

export default MyComponent;
```

```jsx
import React, { useContext } from "react";
import MyContext from "./MyContext";

const MyComponent = () => {
  const { value } = useContext(MyContext);

  return <div>{value}</div>;
};

export default MyComponent;
```

</br>

### Context의 장점

- 전역 상태 관리 : Context를 사용하면 전역적으로 상태를 관리할 수 있음.
- Props Drilling 방지 : 깊은 컴포넌트 트리 구조에서 props를 계속해서 전달할 필요가 없다.
- 코드 가독성 향상 : 전역 상태를 보다 명확하게 관리할 수 있다.

### Context의 단점

- 성능 문제 : 모든 하위 컴포넌트가 렌더링될 때마다 다시 렌더링 될 수 있다. 이를 해결하기 위해 `React.demo`와 같은 최적화 기법을 사용할 수 있다.
- 코드 복잡성 증가 : Context API를 잘못 사용하면 코드가 복잡해질 수 있다.
