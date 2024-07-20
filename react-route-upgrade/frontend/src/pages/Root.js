import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      {/*
      여기서 EventsPage의 데이터를 useLoaderData 훅을 사용해 받으려고 하면
      하위의 컴포넌트 페이지의 데이터를 가져오려고 하는 것이기 때문에 undefined로 표시된
      데이터 즉, 데이터를 가져오지 못한다. 데이터를 가져오는 수준에서 같은 수준이나 더 낮은 수준의 컴포넌트에서는 받을 수 있다.
    */}
      <MainNavigation />
      <main>
        {/* 데이터를 로딩하고 있다는 걸 사용자에게 알려준다. */}
        {/* {navigation === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
