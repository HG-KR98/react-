import {
  useParams,
  useLoaderData,
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

async function EventDetailPage() {
  // const params = useParams();
  // const data = useLoaderData();
  // const data = useRouteLoaderData("event-detail");

  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
    // <>
    //   <h1>{params.someId}</h1>
    //   <Link to=".." relative="path">
    //     Back
    //   </Link>
    // </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    // 수동으로 이벤트 추출
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // defer를 사용할 경우 직접 response를 받을 수 없기 때문에 파싱을 해주어야 한다. loader()와 useLoaderData 사이에 defer 단계가 있기 때문임.
    // defer 기능을 쓰면 페이지 속도가 높아지고 다른 콘텐츠를 기다리는 종안에 약간의 콘텐츠를 이미 보여줄 수 있게 된다.
    //return response;
    const resData = await response.json();
    return resData.events;
  }
}

// loader 함수를 호출하는 리액트 라우터가 실행되면
// 객체 하나가 loader 함수에 전달된다. 이 객체에는 request와 params라는 프로퍼티가 들어있다.
export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    // await를 사용하게 되면 defer는 이 데이터가 로딩될 때까지 기다렸다가 이 페이지 컴포넌트를 로딩을 하고 이 페이지 컴포넌트로 이동하게 된다.
    // await은 일종의 레버 또는 스위치로서 이 페이지로 이동하기 전에 어떤 데이터를 기다려야 하는지 그리고 어떤 데이터를 연기해야 하는지
    // 즉, 페이지로 이동한 다음에 어떤 데이터를 로딩해야 하는지 제어할 수 있게 된다.
    event: await loadEvent(id),
    events: loadEvents(),
  });
  // // 싱글 이벤트에 관한 데이터를 가져오기 위해 fetch 함수를 사용

  // // const response = await fetch('http://localhost:8080/events/' + id);
  // // return response;
  // // 이 방법도 있지만 아래의 방법도 활용이 가능하다
  // // 리액트 라우터는 자동으로 Promise를 기다렸다가 그게 리졸빙한 데이터에 엑세스하게 해준다.
  // // return fetch('http://localhost:8080/events/' + id);

  // const response = await fetch("http://localhost:8080/events/" + id);

  // if (!response.ok) {
  //   throw json(
  //     { message: "Could not fetch details for selected event." },
  //     {
  //       status: 500,
  //     }
  //   );
  // } else {
  //   return response;
  // }
  // // 이렇게 loader를 추가한 후 이제 loader를 라우트 정의에 등록해야 한다.
  // // 리액트 라우터는 loader를 자동으로 찾지 않기 때문에 loader 함수만 추가해서는
  // // 아무런 역할을 하지 않는다.
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  // 이렇게만 작성해서 요청을 하게되면 이벤트를 삭제하지 않는다.
  // 이벤트를 삭제하는 건 백엔드가 기다리고 있는 요청이 아니기 때문이다.
  // 대신에 우리는 여기서 전송하는 이 요청을 설정해야 한다.
  // const response = await fetch("http://localhost:8080/events/" + eventId);
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
