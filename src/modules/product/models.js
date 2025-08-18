// Knex data-access for Product table
const db = require('../../config/knex');
const TABLE = 'Product';
// columns: id, VendorID, CategoryID, CompanyID, Name, Barcode, ImageURL, ExpiryDate, Description

// Normalize to accept either PascalCase or camelCase from service
const normalize = (d = {}) => ({
  VendorID:    d.VendorID    ?? d.vendorId,
  CategoryID:  d.CategoryID  ?? d.categoryId,
  CompanyID:   d.CompanyID   ?? d.companyId,
  Name:        d.Name        ?? d.name,
  Barcode:     d.Barcode     ?? d.barcode,
  ImageURL:    d.ImageURL    ?? d.imageUrl,
  ExpiryDate:  d.ExpiryDate  ?? d.expiryDate,
  Description: d.Description ?? d.description
});

const SELECT = [
  'id','VendorID','CategoryID','CompanyID','Name','Barcode','ImageURL','ExpiryDate','Description'
];

module.exports = {
  async create(payload) {
    const data = normalize(payload);
    const [row] = await db(TABLE).insert(data).returning(SELECT);
    return row;
  },

  list() {
    return db(TABLE).select(SELECT).orderBy('id', 'desc');
  },

  getById(id) {
    return db(TABLE).select(SELECT).where({ id }).first();
  },

  async update(id, updateData = {}) {
    const patch = normalize(updateData);
    Object.keys(patch).forEach(k => patch[k] === undefined && delete patch[k]);

    if (Object.keys(patch).length === 0) return this.getById(id);

    const [row] = await db(TABLE).where({ id }).update(patch).returning(SELECT);
    return row ?? null;
  },

  async remove(id) {
    // Return the deleted product for the controller's response
    const [row] = await db(TABLE).where({ id }).del().returning(SELECT);
    return row ?? null;
  },

  // helpers used by service (e.g., prevent duplicate Barcode)
  findByBarcode(barcode) {
    return db(TABLE).select(SELECT).where({ Barcode: barcode }).first();
  }
};
