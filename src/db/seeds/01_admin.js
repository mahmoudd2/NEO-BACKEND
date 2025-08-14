exports.seed = async function (knex) {
  await knex('Admin').del();
  await knex('Admin').insert([
    { UserName: 'admin1', FirstName: 'John', LastName: 'Doe', Password: '$2b$10$ULaPF0uYnmwm3atXP.iUfOTQljwc7bG0cMjeryL.jzHVDjmte8jmq', Email: 'admin1@example.com', PhoneNum: '1111111111' },
    { UserName: 'admin2', FirstName: 'Jane', LastName: 'Smith', Password: '$2b$10$ULaPF0uYnmwm3atXP.iUfOTQljwc7bG0cMjeryL.jzHVDjmte8jmq', Email: 'admin2@example.com', PhoneNum: '2222222222' },
    { UserName: 'admin3', FirstName: 'Alice', LastName: 'Johnson', Password: '$2b$10$ULaPF0uYnmwm3atXP.iUfOTQljwc7bG0cMjeryL.jzHVDjmte8jmq', Email: 'admin3@example.com', PhoneNum: '3333333333' },
    { UserName: 'Mahmoud', FirstName: 'Ahmed', LastName: 'Abdelhamid', Password: '$2b$10$ULaPF0uYnmwm3atXP.iUfOTQljwc7bG0cMjeryL.jzHVDjmte8jmq', Email: 'mahmoud-gamer220@gmail.com', PhoneNum: '4444444444' }

  ]);
};
