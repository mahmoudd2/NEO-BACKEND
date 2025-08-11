exports.seed = async function (knex) {
  await knex('Vendor').del();
  await knex('Vendor').insert([
    { FirstName: 'John', LastName: 'Vendor', Email: 'vendor1@example.com', PhoneNum: '7770001', Rating: 8.5 },
    { FirstName: 'Anna', LastName: 'Supplier', Email: 'vendor2@example.com', PhoneNum: '7770002', Rating: 7.0 },
    { FirstName: 'Mike', LastName: 'Dealer', Email: 'vendor3@example.com', PhoneNum: '7770003', Rating: 9.0 }
  ]);
};
