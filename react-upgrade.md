## ref(참조)

React에서 `ref`는 특정 DOM 요소나 React 엘리먼트에 직접 접근하기 위해 사용된다. 주로 DOM을 직접 조작하거나, 포커스를 설정하거나, 외부 라이브러리와 통합할 때 사용된다.

### ref의 특징

- DOM 요소에 직접 접근 : `ref`를 통해 DOM 요소에 직접 접근할 수 있다. 이는 특정 상황에서 DOM 요소를 조작하거나 참조해야 할 때 유용하다.

```jsx
import React, { useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
};

export default FocusInput;
```

- 비제어 컴포넌트 : 비제어 컴포넌트는 상태를 React의 state로 관리하지 않고, DOM 자체에서 폼 데이터와 같은 값을 관리한다. 이 경우 `ref`를 사용하여 DOM 요소의 값을 읽거나 설정한다. 이는 HTML 폼 요소의 기본 동작을 그대로 사용하여 데이터를 처리하는 방법이다.

```jsx
import React, { useRef } from "react";

const FormComponent = () => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Input Value: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
```

- React 컴포넌트 인스턴스 접근 : 클래스형 컴포넌트에서는 `ref`를 통해 자식 컴포넌트의 메서드나 속성에 접근할 수 있다.

```jsx
import React, { Component, createRef } from "react";

class ChildComponent extends Component {
  alertMessage() {
    alert("Hello from Child Component");
  }

  render() {
    return <div>Child Component</div>;
  }
}

class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.childRef = createRef();
  }

  handleClick = () => {
    this.childRef.current.alertMessage();
  };

  render() {
    return (
      <div>
        <ChildComponent ref={this.childRef} />
        <button onClick={this.handleClick}>Call Child Method</button>
      </div>
    );
  }
}

export default ParentComponent;
```

### forwardRef

`forwardRef`는 부모 컴포넌트에서 자식 컴포넌트로 `ref`를 전달하기 위해 사용된다. 이는 고차 컴포넌트(HOC)나 함수형 컴포넌트에서 자주 사용된다.

```jsx
import React, { forwardRef, useRef } from "react";

const ChildComponent = forwardRef((props, ref) => (
  <input ref={ref} type="text" />
));

const ParentComponent = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <ChildComponent ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
};

export default ParentComponent;
```

### useImperativeHandle

`useImperativeHandle` 훅을 사용하면 `ref`를 통해 노출되는 인스턴스 값을 사용자 정의할 수 있다. 주로 `forwardRef`와 함께 사용된다.

```jsx
import React, { useRef, forwardRef, useImperativeHandle } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    alertMessage: () => {
      alert("Message from Child Component");
    },
  }));

  return <input ref={inputRef} type="text" />;
});

const ParentComponent = () => {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus();
    childRef.current.alertMessage();
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Interact with Child</button>
    </div>
  );
};

export default ParentComponent;
```

### ref의 장점

- 직접 DOM 조작 가능 : `ref`를 사용하면 React의 추상화를 거치지 않고 직접적으로 DOM 요소를 조작할 수 있다.
- 비제어 컴포넌트 : 폼 요소의 값을 직접 접근하고 조작할 수 있다.
- 포커스 설정 및 외부 라이브러리 통합 : DOM 요소에 포커스를 설정하거나 외부 라이브러리와의 통합을 쉽게 할 수 있다.

### ref의 단점

- React 철학과 다름 : React는 선언적 프로그래밍을 지향하지만, `ref`는 명령적 프로그래밍을 요구한다.
- 테스트 및 유지보수의 어려움 : 직접적인 DOM 조작은 테스트와 유지보수를 어렵게 만들 수 있다.
- 오용 가능성 : `ref`를 남용하면 코드의 가독성과 React의 이점을 저해할 수 있다.

</br>

## Portal

React Portal은 React 애플리케이션의 일반적인 DOM 구조 외부에 있는 DOM 노드로 컴포넌트의 렌더링을 허용하는 기능이다. 종종 Portal는 종종 모달, 팝업, 툴팁과 같은 오버레이 UI 컴포넌트를 구현할 때 유용하다.

### Portal의 특징

- 별도의 DOM 트리에 렌더링 : Portals는 부모 컴포넌트의 DOM 트리 외부에 있는 DOM 노드로 자식을 렌더링한다.
- DOM 계층 구조 분리 : 시각적으로는 DOM 트리의 다른 부분에 있지만, React 컴포넌트 계층 구조는 그대로 유지된다.
- 이벤트 버블링 유지 : Portals를 통해 렌더링된 자식 요소는 여전히 React 트리에서 원래 부모의 이벤트 버블링을 유지한다.
