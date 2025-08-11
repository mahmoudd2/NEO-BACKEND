exports.seed = async function (knex) {
  await knex('Log').del();
  await knex('Log').insert([
    { UserID: 1, Action: 'Login', ObjectID: 1, ObjectType: 'Admin', gps_location: JSON.stringify({ lat: 40.7128, lng: -74.0060 }), Note: 'Successful login' },
    { UserID: 2, Action: 'Update', ObjectID: 2, ObjectType: 'Product', gps_location: JSON.stringify({ lat: 34.0522, lng: -118.2437 }), Note: 'Updated product details' },
    { UserID: 3, Action: 'Delete', ObjectID: 3, ObjectType: 'Stock', gps_location: JSON.stringify({ lat: 29.7604, lng: -95.3698 }), Note: 'Deleted expired stock' }
  ]);
};
