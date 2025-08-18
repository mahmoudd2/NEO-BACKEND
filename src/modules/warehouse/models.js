// Knex data-access for the Warehouse table
const db = require('../../config/knex');

const TABLE = 'Warehouse'; 

module.exports = {
  // Create
  async create({ companyId, warehouseName, location, status = null }) {
    const [row] = await db(TABLE)
      .insert({
        CompanyID: companyId,
        Name: warehouseName,
        Location: location,
        status
      })
      .returning(['id', 'CompanyID', 'Name', 'Location', 'status']);
    return row;
  },

  // Read all
  list() {
    return db(TABLE)
      .select('id', 'CompanyID', 'Name', 'Location', 'status')
      .orderBy('id', 'asc');
  },

  // Read one
  getById(id) {
    return db(TABLE)
      .select('id', 'CompanyID', 'Name', 'Location', 'status')
      .where({ id })
      .first();
  },

  // Update — whitelists allowed fields and maps camelCase → DB columns
  async update(id, data = {}) {
    const patch = {};
    if (data.companyId !== undefined) patch.CompanyID = data.companyId;
    if (data.warehouseName !== undefined) patch.Name = data.warehouseName;
    if (data.location !== undefined) patch.Location = data.location;
    if (data.status !== undefined) patch.status = data.status;

    if (Object.keys(patch).length === 0) {
      // nothing to change, just return current
      return this.getById(id);
    }

    const [row] = await db(TABLE)
      .where({ id })
      .update(patch)
      .returning(['id', 'CompanyID', 'Name', 'Location', 'status']);
    return row;
  },

  // Delete
  remove(id) {
    return db(TABLE).where({ id }).del();
  }
};
