import { useNavigate } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  // 처음에 defaultValue를 설정을 하면 에러가 뜬다.
  // 우리가 useLoaderData를 사용할 때 기본값으로서 가장 가까운 가용한 loader 데이터를 검색하고
  // 그 데이터를 검색하는 가장 높은 수준이 이 컴포넌트이므로 로딩된 라우트의 라우트 정의이기 때문이다.
  // 부모 loader 데이터를 사용하려면 App.js에서 특수 id 프로퍼티를 추가해야 하고 useLoaderData를 사용하는 대신에
  // useRouteLoaderData를 사용해야 한다. EventDetailPage 참조!!
  return (
    <form className={classes.form}>
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
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </form>
  );
}

export default EventForm;
