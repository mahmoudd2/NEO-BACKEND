const db = require('../../config/knex');

module.exports = {
    addAlert: async (data) => {
        return await db('Alert').insert(data);
    },
    deleteAlert: async (alertID) => {
        return await db('Alert').where({ id: alertID }).delete();
    },
    getAllAlerts: async () => {
        return await db('Alert').select('*');
    }
}