// Knex data-access for Role
const db = require('../../config/knex');

const ROLE = 'Role';

module.exports = {
  async create({ roleName, description }) {
    const [row] = await db(ROLE)
      .insert({ Name: roleName, Description: description })
      .returning(['id', 'Name', 'Description']);
    return row;
  },

  list() {
    return db(ROLE)
      .select('id', 'Name', 'Description')
      .orderBy('id', 'asc');
  },

  getById(id) {
    return db(ROLE)
      .select('id', 'Name', 'Description')
      .where({ id })
      .first();
  },

  async update(id, data = {}) {
    const patch = {};
    if (data.roleName !== undefined) patch.Name = data.roleName;
    if (data.description !== undefined) patch.Description = data.description;

    if (Object.keys(patch).length === 0) return this.getById(id);

    const [row] = await db(ROLE)
      .where({ id })
      .update(patch)
      .returning(['id', 'Name', 'Description']);
    return row;
  },

  remove(id) {
    return db(ROLE).where({ id }).del();
  }
};
