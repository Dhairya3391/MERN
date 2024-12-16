let obj = {
  name: "Node2",
  age: 20,
  gender: "male",
  hobbies: ["reading", "coding", "sports"],
  address: {
    city: "New York",
    state: "NY",
    zip: "10001",
  },
};

let randomNumber = Math.floor(Math.random() * 3);
delete obj.hobbies[randomNumber];
console.log(obj);
