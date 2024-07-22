import {
  useParams,
  useLoaderData,
  useRouteLoaderData,
  json,
  redirect,
} from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  // const params = useParams();
  // const data = useLoaderData();
  const data = useRouteLoaderData("event-detail");

  return (
    <EventItem event={data.event} />
    // <>
    //   <h1>{params.someId}</h1>
    //   <Link to=".." relative="path">
    //     Back
    //   </Link>
    // </>
  );
}

export default EventDetailPage;

// loader 함수를 호출하는 리액트 라우터가 실행되면
// 객체 하나가 loader 함수에 전달된다. 이 객체에는 request와 params라는 프로퍼티가 들어있다.
export async function loader({ request, params }) {
  const id = params.eventId;
  // 싱글 이벤트에 관한 데이터를 가져오기 위해 fetch 함수를 사용

  // const response = await fetch('http://localhost:8080/events/' + id);
  // return response;
  // 이 방법도 있지만 아래의 방법도 활용이 가능하다
  // 리액트 라우터는 자동으로 Promise를 기다렸다가 그게 리졸빙한 데이터에 엑세스하게 해준다.
  // return fetch('http://localhost:8080/events/' + id);

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
  // 이렇게 loader를 추가한 후 이제 loader를 라우트 정의에 등록해야 한다.
  // 리액트 라우터는 loader를 자동으로 찾지 않기 때문에 loader 함수만 추가해서는
  // 아무런 역할을 하지 않는다.
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
