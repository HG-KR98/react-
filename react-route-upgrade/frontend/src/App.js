// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";
import { loader as eventsLoader } from "./pages/Event.js";
import ErrorPage from "./pages/Error.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // 이러한 errorElement는 유효하지 않은 라우트 경로인 경우 폴백 페이지를 표시하기 위해서만 있는 건 아니다.
    // errorElement는 loader도 포함해서 어떤 라우트 관련 코드에 오류가 발생할 때마다 화면에 표시될 것이다.
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            // 라우터가 페이지에 방문하기 직전에 이 함수를 실행한다.
            // 그럼 이 라우트가 렌더링되기 직전 loader() 함수가 리액트 라우터에 의해
            // 트리거되고 실행될 것이다.
            // loader를 모두 App.js 파일에 몰아서 넣으면 코드가 길어지고 복잡해지며
            // 결국 App.js가 무거워지게 된다. 그러므로 loader를 컴포넌트에 넣는 것이 권장사항이다.
            loader: eventsLoader,
          },
          {
            // 역동적인 세그먼트
            path: ":eventId",
            // 특수 id 프로퍼티
            id: "event-detail",
            // 이 중첩된 라우트 기능을 단지 래버 레이아웃 컴포넌트만이 아니라
            // 공통 loader를 사용하기 위해 쓸 수 있다.
            // 리액트 라우터가 제공하는 특수 훅인 useLoaderData를 사용해서
            // loader가 추가된 라우트보다 더 낮은 수준 또는 같은 수준에 있는 컴포넌트에 있는
            // loader 데이터에 엑세스할 수 있기 때문이다.
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
                // loader: eventDetailLoader,
              },
              {
                path: "edit",
                element: <EditEventPage />,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: newEventAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
