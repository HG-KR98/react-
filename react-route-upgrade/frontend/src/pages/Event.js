import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  // const data = useLoaderData();
  const { events } = useLoaderData();

  // // 커스텀 오류를 이용한 오류 처리
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
  // return <EventsList events={events} />;

  // 연기된 값을 처리
  // resolve에 넣은 데이터가 올때까지 기다리고 이어서 시작 태그와 종료 태그 사이에서 역동적인 값을 출력한다.
  return (
    // Suspense 컴포넌트는 다른 데이터가 도착하길 기다리는 동안에 폴백을 보여주는 특정한 상황에서 사용할 수 있다.
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

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

// 이 loader 코드는 서버에서 실행되지 않는다. (브라우저에서만 실행됨.)
// 그럼에도 Response 생성자를 생성할 수 있는 이유는 브라우저에서 기능을 지원하기 때문이다.
export function loader() {
  // const response = await fetch("http://localhost:8080/events");
  // if (!response.ok) {
  //   // 커스텀 오류를 이용한 오류 처리
  //   // 첫번째 방법 : return { isError: true, message: "Could not fetch events." };
  //   // 두번째 방법 : throw new Error();
  //   // 리액트 라우터는 간단히 가장 근접한 오류 요소를 렌더링한다.
  //   // 우리는 404 오류와 다른 오류들을, 우리 loader에 있는 오류와 구분할 수도 있다.
  //   // 오류들을 구분하기 위해 우리는 객체를 throw하는 대신에 new Response()를 throw할 수 있다.
  //   // throw { message: "Coule not fetch events." };
  //   // 이렇게 Response로 일일히 길게 작성하면 귀찮기 때문에 react-router에서는
  //   // json()이라는 작은 헬퍼 유틸리티를 제공한다.
  //   // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
  //   //   status: 500,
  //   // });
  //   // json()은 json 형식의 데이터가 포함된 Response 객체를 생성하는 함수이다.
  //   return json({ message: "Could not fetch events." }, { status: 500 });
  // } else {
  //   // const resData = await response.json();
  //   // Response의 첫번째 인자는 어떠한 데이터도 받는 인자이며
  //   // 두번째 인자는 설정할 수 있는 추가 객체를 이용해서 그걸 더욱 자세히 설정할 수 있다.
  //   // 예를 들어서 응답 상태 코드를 예시로 들 수 있다.
  //   // 이러한 Response 생성자를 사용할 때 loader에서 응답을 리턴할 때마다
  //   // 리액트 라우터 패키지는 useLoaderData를 사용할 때 응답에서 자동으로 데이터를 추출한다.
  //   // useLoaderData가 리턴하는 데이터는 loader에서 리턴한 응답의 일부인 응답 데이터이다.
  //   // return resData.event;로도 충분히 별도의 응답 객체를 생성할 수 있다.
  //   // 이 편이 좀 더 코드도 더 짧다. 하지만 new Response()가 존재하는 이유는
  //   // 이 loader 함수에서 브라우저에 내장된 fetch 함수로 백엔드에 도달하는 방식을
  //   // 상당히 널리 사용하기 때문이다. fetch 함수는 실제로 Response로 리졸빙 되는
  //   // Promise를 리턴한다. 더구나 리액트 라우터는 이런 응답 객체들을 지원하고 자동으로 데이터를
  //   // 추출하기 때문에 간단히 말하자면 여기서 받는 response 즉 이 응답 객체를 취해서
  //   // 그걸 우리의 loader에서 리턴할 수 있다. 우리는 이 response에서 수작업으로 데이터를 추출할
  //   //const data = await fetch("http://localhost:8080/events");
  //   // const events = data.events;
  //   // return response;
  //   // 필요가 없다. 대신에 위의 식으로 문제 없는지 확인하거나 확인하지 않고서 response를 리턴할 수 있다.
  //   // 위의 방식으로 response를 리턴한다면 useLoaderData는 response의 일부인 데이터를 자동으로 우리에게 준다.
  //   // 이렇게 하면 loader 코드도 줄일 수 있고 내장된 응답 객체에 대한 지원을 활용할 수 있게 된다.
  //   return response;
  // }

  // 우리는 defer 객체에 이 페이지에서 오갈 수 있는 모든 HTTP 요청을 넣어줘야 한다.
  return defer({
    events: loadEvents(),
  });
}
