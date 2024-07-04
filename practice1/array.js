const hobbies = ["Sports", "Cooking", "Reading"];
console.log(hobbies[0]);

hobbies.push("Working");
console.log(hobbies);

const index = hobbies.findIndex((item) => {
  return item === "Sports";
});

console.log(index);

const editedHobbies = hobbies.map((item) => item + "!");
console.log(editedHobbies);

const editedHobbies2 = hobbies.map((item) => ({ text: item }));
console.log(editedHobbies2);
