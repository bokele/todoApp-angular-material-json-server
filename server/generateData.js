var faker = require('faker');

var database = { todoLists: [], users: []};


for (var i = 1; i<= 50; i++) {
  database.todoLists.push({
    id: i,
    name: faker.random.word(),
    description: faker.lorem.paragraphs(),
    createdAt: faker.date.future(),
    editedAt: faker.date.future(),
    userId: faker.random.number(10)
  });
}

for (var i = 1; i<= 10; i++) {
  database.users.push({
    id: i,
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password:faker.internet.password(),
    createdAt: faker.date.past(),
  });
}

console.log(JSON.stringify(database));


