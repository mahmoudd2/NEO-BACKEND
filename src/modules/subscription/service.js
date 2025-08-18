// Service layer for Subscriptions
const repo = require('./models');

// Add subscription; returns new id
exports.addSubscription = async (companyId, bundleId, startDate, endDate, status, paymentMethod) => {
  // Business rules could go here (e.g., date range validation, overlap checks)
  const id = await repo.create({ companyId, bundleId, startDate, endDate, status, paymentMethod });
  return id;
};

// Edit subscription; returns id if updated
exports.editSubscription = async (subscriptionId, companyId, bundleId, startDate, endDate, status, paymentMethod) => {
  const id = await repo.update({
    id: subscriptionId,
    companyId,
    bundleId,
    startDate,
    endDate,
    status,
    paymentMethod
  });
  return id;
};

// Delete subscription; returns deletion count
exports.deleteSubscription = async (subscriptionId) => {
  const count = await repo.remove(subscriptionId);
  return count;
};
