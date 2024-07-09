import { styled } from "styled-components";

// 이러한 방식이 더 큰 애플리케이션에서는 도움이 될 수 있다.
const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border-radius: 6px;
  border: none;

  // & 뒤에 띄워쓰기를 하게 되면 hover되는 버튼의 children 요소를 목표로
  // 하게 되므로 지금 상황에서는 띄워쓰기를 하지 않는다.
  &: hover {
    background-color: #f0920e;
  }
`;

export default Button;
