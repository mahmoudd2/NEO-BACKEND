const bcrypt = require('bcryptjs');
const model = require('./models');
const s = require('./service');

// tiny validator like in your snippet
const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};
