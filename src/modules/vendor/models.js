// Knex data-access for the Vendor table
const db = require('../../config/knex');

const TABLE = 'Vendor'; 

module.exports = {
  // Create vendor
  async create({ firstName, lastName, email, phoneNum, rating }) {
    const [row] = await db(TABLE)
      .insert({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        PhoneNum: phoneNum,
        Rating: rating
      })
      .returning(['id', 'FirstName', 'LastName', 'Email', 'PhoneNum', 'Rating']);
    return row;
  },

  // List all vendors
  list() {
    return db(TABLE)
      .select('id', 'FirstName', 'LastName', 'Email', 'PhoneNum', 'Rating')
      .orderBy('id', 'asc');
  },

  // (Optional) get one by id
  getById(id) {
    return db(TABLE)
      .select('id', 'FirstName', 'LastName', 'Email', 'PhoneNum', 'Rating')
      .where({ id })
      .first();
  },

  // Delete vendor
  remove(id) {
    return db(TABLE).where({ id }).del();
  }
};
