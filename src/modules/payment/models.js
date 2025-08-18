const db = require('../../config/knex');

module.exports = {
    addPayment: async (companyId, amount, status, paymentMethod, referenceId) => {
        return await db('Payment').insert({
            CompanyID:companyId,
            Amount:amount,
            Status:status,
            PaymentMethod:paymentMethod,
            ReferenceID:referenceId
        });
    },
    editPayment: async (paymentId, companyId, amount, status, paymentMethod, referenceId) => {
        return await db('Payment').where({ id: paymentId }).update({
            CompanyID:companyId,
            Amount:amount,
            Status:status,
            PaymentMethod:paymentMethod,
            ReferenceID:referenceId
        });
    },
    deletePayment: async (id) => {
        return await db('Payment').where({ id: id }).delete();
    }
    // getAllFeatures: async () => {
    //     return await db('Feature').select('*');
    // }
}