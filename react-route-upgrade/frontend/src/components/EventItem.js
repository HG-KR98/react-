import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      // 첫번째 인자 데이터 (자동으로 폼 데이터 객체로 감싸진다.)
      // 하지만 삭제 부분에서는 데이터가 필요하지 않기 떄문에 null 처리
      // 두번째 인자는 우리가 폼에 설정할 수 있는 것과 기본적으로 같은 값들을 설정할 수 있게 해준다.
      // 만일 액션이 다른 라우트 경로에서 정의된다면 우린 action 키를 다른 경로로 설정할 수 있다.
      // 하지만 지금 상황은 이 컴포넌트가 속한 라우트가 같거나 이 컴포넌트가 렌더링되는 라우트와 같은 라우트에서 정의되므로 액션 경로를 추가할 필요가 없다.
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        {/* 굳이 Form을 사용해서 요청을 보낼 수 있지만 사용하지 않는 이유는 위의 startDeleteHandler 함수의
        프롬프트를 출력을 하여 사용자에게 선택의 기회를 주기 위해 일반 button을 사용하였다.   */}
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
