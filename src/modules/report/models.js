// Knex data-access for Report table
const db = require('../../config/knex');
const TABLE = 'Report'; // columns: id, CompanyID, Type, period_start, period_end, Data

module.exports = {
  async create({ CompanyID, Type, period_start, period_end, Data }) {
    const [row] = await db(TABLE)
      .insert({ CompanyID, Type, period_start, period_end, Data })
      .returning(['id', 'CompanyID', 'Type', 'period_start', 'period_end', 'Data']);
    return row;
  },

  list() {
    return db(TABLE)
      .select('id', 'CompanyID', 'Type', 'period_start', 'period_end', 'Data')
      .orderBy('id', 'desc');
  },

  getById(id) {
    return db(TABLE)
      .select('id', 'CompanyID', 'Type', 'period_start', 'period_end', 'Data')
      .where({ id })
      .first();
  },

  async update({ ReportID, Type, period_start, period_end, Data }) {
    const patch = {};
    if (Type !== undefined) patch.Type = Type;
    if (period_start !== undefined) patch.period_start = period_start;
    if (period_end !== undefined) patch.period_end = period_end;
    if (Data !== undefined) patch.Data = Data;

    const [row] = await db(TABLE)
      .where({ id: ReportID })
      .update(patch)
      .returning(['id', 'CompanyID', 'Type', 'period_start', 'period_end', 'Data']);
    return row ?? null;
  },

  async remove(id) {
    const [row] = await db(TABLE)
      .where({ id })
      .del()
      .returning(['id']); // pg only
    return row ? 1 : 0;
  }
};
