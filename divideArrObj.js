// const userNameData = ["Max", "Schwarzuller"];

// const firstName = userNameData[0];
// const lastName = userNameData[1];

const [firstName, lastName] = ["Max", "Schwarzuller"];

console.log(firstName);
console.log(lastName);

// const user = {
//   name: "Max",
//   age: 34,
// };

// const name = user.name;
// const age = user.age;

const { name: userName, age } = {
  name: "Max",
  age: 34,
};

console.log(userName);
console.log(age);
