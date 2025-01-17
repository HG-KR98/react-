# react

## Component

- React 컴포넌트는 React 애플리케이션을 구성하는 기본 단위이다. 컴포넌트는 UI의 일부분을 정의하며, 독립적이고 재사용 가능한 코드 조각을 만들 수 있게 한다.

### 함수형 컴포넌트

javaScript 함수로 정의되며, props를 받아 JSX를 반환한다. 함수형 컴포넌트는 단순히 javaScript 함수이다. 이 함수는 props라는 매개변수를 받아서 JSX를 반환한다.

#### 함수형 컴포넌트의 특징

1. 단순성과 직관성 : 함수형 컴포넌트는 단순히 함수이므로 작성하고 이해하기 쉽다. 클래스형 컴포넌트에 비해 문법이 간결하여 코드를 더 깔끔하게 유지할 수 있다.

2. React 훅(Hooks) : React 훅의 도입으로 함수형 컴포넌트에서도 상태 관리와 사이드 이펙트를 처리할 수 있게 되었음. 주요 훅에는 'useState', 'useEffect', 'useContext', 'useReducer' 등이 있다.

#### 함수형 컴포넌트의 장점

1. 간결함 : 함수형 컴포넌트는 클래스형 컴포넌트보다 코드가 간결하고 명확함. 클래스 문법과 `this` 키워드를 사용하지 않으므로 코드가 단순해진다.

2. 성능 : 함수형 컴포넌트는 불필요한 라이프사이클 메서드가 없기 때문에 메모리 사용량이 적다. React 훅을 사용하면 라이프사이클을 더 효율적으로 관리할 수 있다.

3. 테스트 용이성 : 함수형 컴포넌트는 순수 함수로 작성되기 때문에 테스트가 쉽다. 상태와 사이드 이펙트를 분리하여 테스트 가능성을 높인다.

### 클래스형 컴포넌트

React의 초기 버전부터 존재한 컴포넌트 작성 방식으로, 상태(state)와 라이프사이클 메서드를 사용하여 복잡한 로직을 구현할 수 있다.

#### 클래스형 컴포넌트의 특징

1. ES6 클래스 기반 : 클래스형 컴포넌트는 ES6 클래스를 사용하여 정의된다. React.Component를 상속받아야 하며, 반드시 `render` 메서드를 정의해야 한다.

2. 상태 관리 : 클래스형 컴포넌트는 `state` 객체를 통해 컴포넌트의 상태를 관리한다. 상태는 `this.state`로 정의되고, `this.setState` 메서드로 업데이트 된다.

3. 라이프사이클 메서드 : 클래스형 컴포넌트는 컴포넌트의 생명주기 동안 특정 시점에 호출되는 여러 라이프사이클 메서드를 제공한다. 이 메서드들은 컴포넌트가 마운트되거나 업데이트되거나 언마운드 될 때 실행된다.

4. this 바인딩 : 클래스형 컴포넌트에서는 메서드 내에서 `this` 키워드를 사용할 때, 해당 메서드를 클래스 인스턴스에 바인딩해야 하는 경우가 많다. 이를 위해 생성자에서 바인딩하거나, 클래스 필드 문법을 사용한다.

#### 클래스형 컴포넌트 보다는 함수형 컴포넌트를 쓰는 것을 더 권장!!

1. 클래스형 컴포넌트보다 선언하기가 더 편함. 즉, 작성 코드가 더 적다.
2. 클래스형 컴포넌트보다 메모리 자원을 덜 사용한다.
3. 클래스형 컴포넌트보다 빌드 후 파일 크기가 더 작다.
4. 함수형 컴포넌트는 `render()` 함수가 필요 없어서 컴포넌트 마운트 속도가 더 빠르고, 가독성이 좋은 장점이 있다.

<br/>

## JSX

JSX는 javaScript XML의 약자로, React에서 UI 컴포넌트를 작성할 때 사용하는 구문이다. JSX는 HTML과 유사한 구문을 사용하여 React 요소를 정의하는데, 이는 React.createElement() 함수를 호출하는 javaScript 코드로 변환된다.

### JSX 주요 개념

1. JSX의 본질 : JSX는 javaScript 코드 안에서 HTML과 유사한 구문을 작성할 수 있는 구문 확장이다. JSX는 Babel과 같은 트랜스파일러에 의해 javaScript 코드로 변환된다.

2. JSX의 변환 : JSX는 React.createElement() 호출로 변환된다. 예를 들어, `<h1>Hello, world!</h1>`는 `React.createElement('h1', null, 'Hello, world!')`로 변환된다.

3. JSX의 표현식 : JSX는 javaScript 표현식을 중괄호 `{}`로 감쌀 수 있다. 예를 들어, `{name}`은 변수 `name`의 값을 삽입한다.

4. JSX와 HTML의 차이점 : JSX는 camelCase 속성명을 사용한다. 예를 들어, `class`는 `className`으로, `for`는 `htmlFor`로 작성한다. JSX에서는 자식 요소를 작성할 때 반드시 하나의 루트 요소로 감싸야 하다.

### JSX의 특징

1. 직관성 : JSX는 HTML과 유사한 구문을 사용하여 UI를 정의할 수 있으므로, 개발자에게 친숙하고 직관적이다.

2. 표현식 포함 : JSX는 javaScript 표현식을 포함할 수 있어 동적인 UI를 쉽게 만들 수 있다.

3. React와의 긴밀한 통합 : JSX는 React 요소를 정의하는데 최적화되어 있으며, React 컴포넌트오 자연스럽게 통합된다.

4. 컴파일 단계 : JSX는 브라우저가 직접 이해할 수 없기 때문에 Babel과 같은 도구를 사용하여 javaScript 코드로 변환된다.

### JSX의 장점

1. 가독성 : HTML과 유사한 구문을 사용하여 UI를 작성하므로, 코드가 직관적으고 가독성이 높다.

2. 동적 콘텐츠 : JSX는 javaScript 표현식을 사용할 수 있어 동적 콘텐츠를 쉽게 삽입할 수 있다.

3. React의 기능 활용 : JSX는 React의 상태 관리, 이벤트 처리, 라이프사이클 메서드 등과 잘 통합된다.

4. 에러 감지 : JSX는 컴파일 단계에서 에러를 감지할 수 있어, 런타임 에러를 줄이고 디버깅을 쉽게 할 수 있다.

### JSX의 단점

1. 트랜스파일러 필요 : JSX는 브라우저가 직접 이해할 수 없기 때문에 Babel과 같은 트랜스파일러가 필요하다.

2. HTML과의 차이 : JSX는 HTML과 매우 유사하지만, 일부 속성명과 문법이 다르다. 예를 들어, `class` 대신 `className`을 사용해야 한다.

3. 복잡한 구문 : JSX는 복잡한 구조의 UI를 작성할 때 중첩된 태그가 많아지면 가독성이 떨어질 수 있다.

<br />

## Props

Props는 컴포넌트 간 데이터를 전달하는 메커니즘이다. "properties"의 줄임말이며 부모 컴포넌트가 자식 컴포넌트에 전달하는 읽기 전용 데이터이다. Props는 컴포넌트가 동작을 제어하고, 재사용성을 높이며, 계층 구조에 따라 데이터를 전달하는 데 중요한 역할을 한다.

### Props의 특징

- 데이터 전달 : `props`는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 데 사용된다.

- 읽기 전용 : 자식 컴포넌트는 `props`를 변경할 수 없다. `props`는 컴포넌트의 외부에서만 변경될 수 있다.

- 재사용성 : `props`를 사용하면 컴포넌트를 더 재사용 가능하게 만들 수 있다. 동일한 컴포넌트를 여러 번 사용하되, 각 인스턴스에 다른 데이터를 전달할 수 있다.

- 함수 전달 : `props`를 통해 함수를 자식 컴포넌트에 전달할 수 있다. 이를 통해 자식 컴포넌트에서 부모 컴포넌트의 상태를 업데이트할 수 있다.

- 구조 분해 할당을 사용한 props 전달

```jsx
// Greeting.js
import React from "react";

const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

### Props 사용시 화살표 함수를 사용하는 경우

- 이벤트 핸들러 전달 : 자식 컴포넌트에 이벤트 핸들러를 전달할 때, 익명 화살표 함수를 자주 사용한다.

```jsx
function ParentComponent() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <ChildComponent onClick={() => handleClick()} />;
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}
```

- 매개변수 전달 : 이벤트 핸들러에 매개변수를 전달할 때도 화살표 함수를 사용하여 간결하게 작성할 수 있다.

```jsx
import React from "react";

const ChildComponent = ({ onButtonClick }) => (
  <div>
    <button onClick={() => onButtonClick("button1")}>Button 1</button>
    <button onClick={() => onButtonClick("button2")}>Button 2</button>
  </div>
);

const ParentComponent = () => {
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked`);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent onButtonClick={handleButtonClick} />
    </div>
  );
};

export default ParentComponent;
```

</br>

## state

React의 상태(state)는 컴포넌트 내에서 동적인 데이터를 관리하는 중요한 개념이다. 상태는 컴포넌트의 렌더링과 동작에 영향을 미치며, 주로 사용자 입력, 서버 응답, 타이머, 기타 애플리케이션 이벤트에 의해 변경된다.

### state의 특징

- 컴포넌트 내부 관리 : 상태는 컴포넌트 내부에서 관리된다. 상태를 변경하면 React는 컴포넌트를 다시 렌더링하여 UI를 최신 상태로 유지한다.

- 변경 가능 : `props`와 달리, 상태는 변경 가능하다. 상태는 주로 `useState` 훅을 사용하여 업데이트 된다.

- 초기화 : 상태는 컴포넌트가 처음 렌더링될 때 초기화된다. 초기값은 `useState`의 인자로 전달된다.

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
```

