exports.seed = async function (knex) {
  await knex('BundleFeature').del();
  await knex('BundleFeature').insert([
    { BundleID: 1, FeatureID: 1 },
    { BundleID: 2, FeatureID: 1 },
    { BundleID: 2, FeatureID: 2 }
  ]);
};
