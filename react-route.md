## 라우팅

## 싱글 페이지 애플리케이션 (SPA)

## `loader()`

loader 함수에서 어떤 브라우저 API도 사용할 수 있다. 예를 들어, 로컬 스토리지, 쿠키 등에 엑세스 할 수 있고 다른 JavaScript 코드에서 할 수 있는 모든 것을 할 수 있다. loader 함수에서는 리액트 컴포넌트가 아니기 때문에 useState와 같은 훅들을 사용할 수 없다.

## Response 객체

```jsx
const response = new Response(body, {
  status: 200,
  statusText: "OK",
  headers: {
    "Content-Type": "application/json",
  },
});
```

- body: 응답 본문으로, Blob, BufferSource, FormData, ReadableStream URLSearchParams, USVString 등의 타입을 받을 수 있다.
- status: HTTP 응답 상태 코드 (기본값: 200).
- statusText: 응답 상태 텍스트 (기본값: "OK").
- headers: HTTP 헤더 객체로, 응답 헤더를 설정할 수 있다.

### 굳이 `new Response()`를 사용할 필요가 없는 이유

- 단순화된 코드: 주어진 코드에서 이미 fetch 함수를 사용하여 응답 객체를 받고 있습니다. fetch 함수는 네트워크 요청을 보내고, 응답 객체를 반환합니다. 이 응답 객체는 이미 Response 타입이다.

- 자동 데이터 추출 : React Router의 useLoaderData 훅은 로더 함수에서 반환된 응답 객체에서 자동으로 데이터를 추출합니다. 따라서 fetch 함수로 받은 응답 객체를 그대로 반환하면, React Router가 자동으로 데이터를 처리합니다.

### `new Response()`를 사용해야 하는 상황

- 커스텀 응답 생성: 직접 생성한 데이터나 특정 형식의 데이터를 응답으로 보내야 할 때.
- 기존 응답 변형: 원래 응답을 기반으로 추가 데이터나 메타데이터를 포함한 새로운 응답을 만들어야 할 때.

### 커스텀 오류를 이용한 오류 처리

### `Json()` 유틸리티 함수

