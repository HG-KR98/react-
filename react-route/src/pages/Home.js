import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }
  return (
    <>
      <h1>My Home Page</h1>
      {/* a 태그를 통해 링크 요청을 서버에 보내면 자바스크립트와 리액트를 재 가동 하기 때문에
        컨텍스트나 전체 애플리케이션의 상태를 잃게 되므로 react-router-dom에서 사용하는 방식을
        기용해야 한다.
      */}
      <p>
        {/* 
            이러한 Link 컴포넌트는 배후에서 앵커 요소(a 태그)를 렌더링을 하지만
            기본적으로는 그 요소에 대한 클릭을 감시하고 링크를 클릭했을 때 HTTP 요청을
            전송하는 브라우저 기본 설정을 막아주게 된다.
        */}
        Go to <Link to="products">the list of products</Link>.
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
