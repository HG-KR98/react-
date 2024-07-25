import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  // useSelector에 전달한 이 함수는 리액트 리덕스에 의해 실행된다.
  // 따라서 현재 상태를 자동으로 수신하고 이 컴포넌트에서 사용하려는 데이터를 반환해야 한다.
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
