// Knex data-access for Stock
const db = require('../../config/knex');
const TABLE = 'Stock';

// helper to accept UpperCase or camelCase keys
const normalize = (data = {}) => ({
  ProductID: data.ProductID ?? data.productId,
  WarehouseID: data.WarehouseID ?? data.warehouseId,
  Quantity: data.Quantity ?? data.quantity,
  ExpiryDate: data.ExpiryDate ?? data.expiryDate,
  BatchNum: data.BatchNum ?? data.batchNum,
  LocCode: data.LocCode ?? data.locCode
});

module.exports = {
  async create(payload) {
    const rowToInsert = normalize(payload);
    const [row] = await db(TABLE)
      .insert({ ...rowToInsert })
      .returning(['id','ProductID','WarehouseID','Quantity','ExpiryDate','BatchNum','LocCode','last_updated']);
    return row;
  },

  list() {
    return db(TABLE)
      .select('id','ProductID','WarehouseID','Quantity','ExpiryDate','BatchNum','LocCode','last_updated')
      .orderBy('id','desc');
  },

  getById(id) {
    return db(TABLE)
      .select('id','ProductID','WarehouseID','Quantity','ExpiryDate','BatchNum','LocCode','last_updated')
      .where({ id })
      .first();
  },

  async update(id, data = {}) {
    const patch = normalize(data);
    // drop undefined keys
    Object.keys(patch).forEach(k => patch[k] === undefined && delete patch[k]);
    // always bump last_updated
    patch.last_updated = db.fn.now();

    if (Object.keys(patch).length === 0) return this.getById(id);

    const [row] = await db(TABLE)
      .where({ id })
      .update(patch)
      .returning(['id','ProductID','WarehouseID','Quantity','ExpiryDate','BatchNum','LocCode','last_updated']);
    return row;
  },

  remove(id) {
    return db(TABLE).where({ id }).del();
  }
};
