import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 부모 라우트의 경로에 대해 HomePage의 경로를 부모와 같게 설정하려면 ""으로도
      // 설정할 수 있지만 아래처럼 index 라우트를 사용해도 된다. 부모 라우트가 현재 활성이면 표시되어야 하는
      // 기본 라우트가 이 라우트라는 의미이다.
      { index: true, element: <HomePage /> },
      {
        path: "products",
        element: <ProductsPage />,
      },
      { path: "products/:productId", element: <ProductDetailPage /> },

      // { path: "/", element: <HomePage /> }, /가 있으면 절대 경로, 없으면 상대경로
      // {
      //   path: "/products",
      //   element: <ProductsPage />,
      // },
      // { path: "/products/:productId", element: <ProductDetailPage /> },
    ],
  },
]);

// const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
