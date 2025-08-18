// Knex data-access for the Subscription table
const db = require('../../config/knex');

const TABLE = 'Subscription'; // per your SQL schema

module.exports = {
  // Create a subscription; returns inserted id
  async create({ companyId, bundleId, startDate, endDate, status, paymentMethod }) {
    const [row] = await db(TABLE)
      .insert({
        CompanyID: companyId,
        BundleID: bundleId,
        StartDate: startDate,      // expect YYYY-MM-DD (string) or Date
        EndDate: endDate,          // expect YYYY-MM-DD (string) or Date
        Status: status,            // e.g. 'Active' | 'Paused' | ...
        PaymentMethod: paymentMethod
      })
      .returning(['id']);
    return row?.id;
  },

  // Update a subscription by id; returns id if updated (or null if not found)
  async update({ id, companyId, bundleId, startDate, endDate, status, paymentMethod }) {
    const patch = {};
    if (companyId !== undefined)    patch.CompanyID = companyId;
    if (bundleId !== undefined)     patch.BundleID = bundleId;
    if (startDate !== undefined)    patch.StartDate = startDate;
    if (endDate !== undefined)      patch.EndDate = endDate;
    if (status !== undefined)       patch.Status = status;
    if (paymentMethod !== undefined)patch.PaymentMethod = paymentMethod;

    if (Object.keys(patch).length === 0) return id;

    const [row] = await db(TABLE)
      .where({ id })
      .update(patch)
      .returning(['id']);
    return row?.id || null;
  },

  // Delete by id; returns number of rows deleted
  remove(id) {
    return db(TABLE).where({ id }).del();
  },

  // (Optional) get by id — handy if you later want to validate existence
  getById(id) {
    return db(TABLE)
      .select('id', 'CompanyID', 'BundleID', 'StartDate', 'EndDate', 'Status', 'PaymentMethod')
      .where({ id })
      .first();
  }
};
