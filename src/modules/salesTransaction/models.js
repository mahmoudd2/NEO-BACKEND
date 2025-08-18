// Knex data-access for SalesTransaction
const db = require('../../config/knex');
const TABLE = 'SalesTransaction';

const normalize = (d = {}) => ({
  ProductID: d.ProductID ?? d.productId,
  WarehouseID: d.WarehouseID ?? d.warehouseId,
  Quantity: d.Quantity ?? d.quantity,
  PricePerUnit: d.PricePerUnit ?? d.pricePerUnit,
  TotalAmount: d.TotalAmount ?? d.totalAmount,
  CustomerName: d.CustomerName ?? d.customerName,
  TransactionDate: d.TransactionDate ?? d.transactionDate, // expect ISO string or Date
  CreatedBy: d.CreatedBy ?? d.createdBy
});

module.exports = {
  async create(payload) {
    const [row] = await db(TABLE)
      .insert(normalize(payload))
      .returning(['id']);
    return row?.id;
  },

  async update(id, payload) {
    const patch = normalize(payload);
    Object.keys(patch).forEach(k => patch[k] === undefined && delete patch[k]);
    if (Object.keys(patch).length === 0) return id;

    const [row] = await db(TABLE)
      .where({ id })
      .update(patch)
      .returning(['id']);
    return row?.id ?? null;
  },

  remove(id) {
    return db(TABLE).where({ id }).del();
  },

  // (optional) get by id if you later need it
  getById(id) {
    return db(TABLE)
      .select('id','ProductID','WarehouseID','Quantity','PricePerUnit','TotalAmount','CustomerName','TransactionDate','CreatedBy')
      .where({ id })
      .first();
  }
};
