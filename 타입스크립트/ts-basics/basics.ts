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

// 타입 추론 (Type inference)
// 이렇게 타입 추론의 방식을 이용해서 코드를 작성하는 것이 권장되는 방식이다.
// 불필요하게 타입을 지정하지 않아도 된다.
let course = "React - The Complete Guide";

// course = 1234;

// 유니온 사용하기
let lectureCourse: string | number = "React - The Complete Guide";

lectureCourse = 1234;

let teacherName: string | string[];

// 타입 별칭
type Person = {
  name: string;
  age: number;
};

let goodPerson: Person;

// 함수 및 함수 유형 (Functions & types)
function add(a: number, b: number) {
  return a + b;
}

function print(value: any) {
  console.log(value);
}

// Generics

// 제네릭을 통해 any 타입이 아니라는 것을 알려줌.
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// 이 코드를 실행하면 오류가 발생한다. 왜냐하면 숫자 값에는 split()을
// 호출할 수 없기 때문이다. 하지만 타입스크립트는 첫 번째 값이 숫자라는 것을 모른다.
// 이러한 현상을 해결하기 위해 제네릭이라는 기능을 사용한다.
// updatedArray[0].split("");
