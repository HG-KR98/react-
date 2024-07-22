import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  // loader와 마찬가지로 가장 가까운 액션에 대한 액세스를 제공한다.
  // action에서 response를 리턴하면 이 response는 loader에서와 같이
  // 리액트 라우터에 의해 자동으로 파싱되고 여기 이 data는 검증 오류가 있을 경우에
  // 백엔드에 리턴하는 데이터이다.
  const data = useActionData();
  const navigate = useNavigate();

  // useNavigation 훅은 네비게이션 객체에 대한 액세스를 제공한다.
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }
  // 처음에 defaultValue를 설정을 하면 에러가 뜬다.
  // 우리가 useLoaderData를 사용할 때 기본값으로서 가장 가까운 가용한 loader 데이터를 검색하고
  // 그 데이터를 검색하는 가장 높은 수준이 이 컴포넌트이므로 로딩된 라우트의 라우트 정의이기 때문이다.
  // 부모 loader 데이터를 사용하려면 App.js에서 특수 id 프로퍼티를 추가해야 하고 useLoaderData를 사용하는 대신에
  // useRouteLoaderData를 사용해야 한다. EventDetailPage 참조!!
  return (
    // 이 Form 태그는 백엔드로 요청을 전송하는 브라우저의 기본값을 생략하게 만들고
    // 대신에, 전송되었을 그 요청을 받아서 액션에 주게 된다.
    // 그 요청에는 폼의 일부로서 제출되었던 모든 데이터가 포함될 것이기 때문에 상당히 유용하다.
    // 또한 이러한 요청은 자동으로 백엔드로 전송되지 않고 액션으로 전송되며 모든 데이터가 포함된다.

    // 리액트 라우터가 제공하는 Form 컴포넌트를 이용하는 방법이 가장 일반적이다.
    <Form method="post" className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          requireddefaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
