const db = require('../../config/knex');

module.exports = {
  // Admins
  findAdminByEmail: (email) =>
    db('Admin').where({ Email: email }).first(),

  // Dashboard metrics
  countCompanies: async () => {
    const [{ count }] = await db('Company').count('*');
    return Number(count);
  },
  countUsers: async () => {
    const [{ count }] = await db('UserAccount').count('*');
    return Number(count);
  },
  countWarehouses: async () => {
    const [{ count }] = await db('Warehouse').count('*');
    return Number(count);
  },

  // Recent activity (last 10 logs)
  recentActivity: () =>
    db('Log')
      .select('id', 'Action', 'ObjectType', 'ObjectID', 'Timestamp', 'Note')
      .orderBy('Timestamp', 'desc')
      .limit(10),
};
