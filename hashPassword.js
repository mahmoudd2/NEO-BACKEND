const bcrypt = require('bcrypt');

const password = 'user123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hashed Password:', hash);
});
