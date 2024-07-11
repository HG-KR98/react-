// Primitives(기본형) : number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

// Number로 작성하게 되면 자바스크립트의 Number 객체를 가리키게 된다.
let age: number = 24;

age = 12;
// age = 12.1;

let userName: string;

userName = "Max";

let isInstructor: boolean;

isInstructor = true;

// null과 undefined는 좀더 다른 방식으로 사용해야한다.

// More complex types
let hobbies: string[];

hobbies = ["Sports", "Cooking"];

// 이것을 any타입으로 지정하면 아무 형태의 값을 사용할 수 있다.
// 등호가 없기 때문에 객체를 생성하는 것은 아니다.
// {}의 위치는 변수에 사용할 타입을 정의하는 위치이다.(객체의 구조를 정의하는 것)
let person: {
  name: string;
  age: number;
};

person = {
  name: "Max",
  age: 32,
};

// 저장 불가능 구조가 다르기 때문
// person = {
//   isEmployee: true,
// };

// 객체 배열을 저장하겠다는 표시
let people: {
  name: string;
  age: number;
}[];
