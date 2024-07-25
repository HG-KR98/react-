import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

// 이 컴포넌트는 메인 네브바에 있기 때문에 어디서든지 사용이 가능하므로
// 모든 라우트에 포함되어있다. (MainNavigation의 일부분)
// 그래서 action을 모든 라우트에 추가해야 한다.
// 하지만 그렇게 되면 엄청나게 반복해야 하고 우리의 라우트가 필요할 수 있는
// 다른 액션과 충돌하게 된다. 이러한 현상을 해결하기 위해 useFetcher 훅을 사용한다.
function NewsletterSignup() {
  // useFetcher 훅은 우리가 전환하지 않은 채로 액션이나 loader와
  // 상호작용하려는 경우에 사용해야 할 툴이기 때문이다.
  // 즉, 라우트 변경을 트리거하지 않은 채로 배후에서 요청을 전송할 때 사용한다.
  // 이러한 역할 때문에 fetcher 객체에는 우리가 트리거한 액션이나 loader가 성공했는지
  // 알 수 있게 도와주는 프로퍼티가 많이 포함되어 있다. 그 중에서는 action이나 loader 에 의해 리턴된 data 프로퍼티와 객체를 꺼낼 수 있다.
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    // 기존의 Form과 submit과 fetcher.Form과 fetcher.submit의 차이점으로
    // 실제로 액션을 트리거하지만 라우트 전환을 시작하지 않는다.
    // 그래서 fetcher는 우리가 액션을 트리거하거나 loader 함수의 도움으로 loader를 트리거하지만
    // 실제로 그 loader가 속한 페이지 또는 그 액션이 속한 페이지로 이동하지 않을 때 사용해야 한다.
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
