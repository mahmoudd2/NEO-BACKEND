exports.seed = async function (knex) {
  await knex('Product').del();
  await knex('Product').insert([
    { VendorID: 1, CategoryID: 1, CompanyID: 1, Name: 'Laptop', Barcode: '111AAA', ImageURL: 'http://image.com/laptop', ExpiryDate: '2030-01-01', Description: 'High-end laptop' },
    { VendorID: 2, CategoryID: 2, CompanyID: 2, Name: 'Pizza', Barcode: '222BBB', ImageURL: 'http://image.com/pizza', ExpiryDate: '2025-01-01', Description: 'Frozen pizza' },
    { VendorID: 3, CategoryID: 3, CompanyID: 3, Name: 'T-Shirt', Barcode: '333CCC', ImageURL: 'http://image.com/tshirt', ExpiryDate: '2035-01-01', Description: 'Cotton T-Shirt' }
  ]);
};
