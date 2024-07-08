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

## styled-components 패키지

보통 리액트 프로젝트에서는 단일한 방법을 사용한다.
