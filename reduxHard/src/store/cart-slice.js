import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === item.id);
      if (!existingItem) {
        // push는 기존 상태의 기존 배열을 조작하기 때문에
        // 리덕스만 사용할 경우 반드시 결과가 안좋을 것이며
        // 즉 절대 그렇게 해서는 안된다. 하지만 리덕스 툴킷을 사용하면
        // 리덕스 툴킷이 내부적으로 기존 상태를 조작하지 않도록 보장하기 때문에
        // 문제가 발생하지 않는다. 대신 이것을 변경할 수 없는 방식으로 상태를 업데이트하는
        // 작업으로 변환하는 것이라 보면 된다. 결론적으로 리덕스 툴킷으로 작업할 때는
        // 여기에서 push를 사용할 수 있다.
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart() {},
  },
});
