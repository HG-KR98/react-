import { useParams, Link } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        {/* 
        처음에 to=".."으로 설정하게 되면 메인 페이지로 이동하게 된다
        왜냐하면 상대 경로가 라우트 정의에 대해 리졸빙 되었기 때문이다.
        현재는 부모가 /root로 지정되어 있고 자녀 라우트 중에서 products와
        products/:productId가 형제로 설정되어 있기 때문이다.
        하지만 아래처럼 relative="path"으로 지정되어 있으면 하나의 현재의
        경로에서 하나의 세그먼트만 제거하게 된다.
        또한 to에 절대경로를 넣게 되면 relative가 효과가 없게 된다.
         */}
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}

export default ProductDetailPage;
