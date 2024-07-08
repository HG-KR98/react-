## vanila css

### 해당 component가 있는 폴더에 css 파일을 만들어서 스타일링 하기

#### 장점

- 다른 사람이 스타일링 작업을 하여 전달해줄 수 있다.

#### 단점

- 각각의 컴포넌트와 css 파일이 스코핑 되어 있지 않는다. 그렇기 때문에 충돌이 발생할 수 있다. (css 파일을 컴포넌트에 맞게 여러 개로 나누어도 충돌한다는 의미)

#### 해결방법

- 인라인 스타일 적용

</br>

## inLine style

### jsx 태그 안에 `style ={{}}` 으로 스타일을 적용할 수 있다.

#### 장점

- 내가 적용하고자 하는 jsx 코드에만 영향을 미친다.
- 스타일 적용이 쉽고 간단하다.

#### 단점

- 여러 개의 컴포넌트와 jsx 코드에 적용을 하거나 수정을 하려면 일일이 다 바꿔줘야 한다.
- css와 jsx 코드에 구분이 없다는 것이다.
- 다른 사람과 작업을 하기 불편하다.

```jsx
<p>
  <label>Email</label>
  <input
    type="email"
    style={{ backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db" }}
    // className={emailNotValid ? 'invalid' : undefined}
    onChange={(event) => handleInputChange("email", event.target.value)}
  />
</p>
```

이렇게 인라인 스타일을 이용해 조건적으로 스타일을 적용시킬 수 있다.

</br>

## 클래스

```jsx
<input
            type="email"
             {/* style={{ backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db" }} */}
            className={emailNotValid && "invalid"}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
```

이런식으로 작성하게 되면 false일때 emailNotValid로 선언되어서 에러가 발생하게 된다.

```jsx
<input
  type="email"
   {/* style={{ backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db" }} */}
  className={emailNotValid ? "invalid" : undefined}
  onChange={(event) => handleInputChange("email", event.target.value)}
/>
```

그러므로 이런식으로 작성을 해야 에러가 발생하지 않게 된다.

```jsx
<label className="label invalid">Email</label>
```

이런식으로 작성이 가능하고

```jsx
<label className={`label ${emailNotValid ? "invalid" : ""}`}>Email</label>
```

이렇게도 작성이 가능하다

</br>

## CSS 모듈

React CSS Modules는 CSS의 범위를 컴포넌트 단위로 제한하여 스타일링 충돌을 방지하고, CSS를 모듈화하여 관리하는 방법이다. CSS Modules는 일반적인 CSS와 유사하게 작성되지만, 각각의 CSS 클래스와 ID가 고유하게 생성되어 컴포넌트 간의 스타일 충돌을 방지한다. 관련 컴포넌트 CSS 파일에 `.module.css`로 파일명을 작성하면 적용이 된다. 이러한 css 파일에서 가져온 클래스는 고유한 해시를 포함한 이름으로 변환된다.

### CSS 모듈의 특징

- 각 컴포넌트의 스타일이 해당 컴포넌트 파일과 함께 관리되므로, 스타일을 유지보수 하기가 쉽다. 컴포넌트와 스타일이 논리적으로 묶여 있어 파일 구조가 깔끔해진다.

- CSS 파일을 컴포넌트 폴더 안에 배치하여 해당 컴포넌트와 직접적으로 연관된 스타일임을 명확히 할 수 있다.

- JavaScript 내에서 동적으로 클래스명을 설정할 수 있다. 이를 통해 조건부 스타일링이나 여러 클래스를 쉽게 결합할 수 있다.

```jsx
import logo from "../assets/logo.png";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p className={classes.paragraph}>
        A community of artists and art-lovers.
      </p>
    </header>
  );
}
```

### CSS 모듈의 장점

- CSS 클래스명이 자동으로 고유하게 변환되므로, 전역 네임스페이스 오염 없이 컴포넌트 단위로 스타일을 관리할 수 있다.

- 스타일이 컴포넌트와 함께 묶여 있어, 코드가 더 모듈화되고 관리하기 쉬워진다. 이는 특히 대규모 애플리케이션에서 유용하다.

- JavaScript 내에서 조건부로 클래스를 쉽게 적용할 수 있어, 동적 스타일링이 편리하다.

- 전역 CSS를 사용하지 않아, 한 컴포넌트의 스타일이 다른 컴포넌트에 영향을 미치는 것을 방지할 수 있다.

### CSS 모듈의 단점

- CSS Modules는 스타일을 외부 CSS 파일에 작성하므로, CSS-in-JS와 비교했을 때 다소 유연성이 떨어질 수 있다. CSS-in-JS는 스타일을 JavaScript내에 직접 작성하여 더 많은 동적 스타일링 옵션을 제공한다.

- CSS Modules를 사용하려면 빌드 도구의 지원이 필요하다. Create React App(CRA)과 같은 도구를 사용하면 설정이 간단하지만, 빌드 도구 설정을 직접 관리하는 경우에는 추가 설정이 필요할 수 있다.

## styled-components 패키지

보통 리액트 프로젝트에서는 단일한 방법을 사용한다.
