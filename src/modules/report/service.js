// Service layer for reports
const repo = require('./models');

/** Create; stringifies Data if an object */
exports.addReport = async (payload) => {
  const Data = typeof payload.Data === 'object' ? JSON.stringify(payload.Data) : payload.Data;
  return repo.create({ ...payload, Data });
};

/** Update by ReportID; same Data handling */
exports.editReport = async (payload) => {
  const Data = typeof payload.Data === 'object' ? JSON.stringify(payload.Data) : payload.Data;
  return repo.update({ ...payload, Data });
};

/** Delete by ReportID; return boolean */
exports.deleteReport = async (reportId) => {
  const deleted = await repo.remove(reportId);
  return deleted > 0;
};

exports.getAllReports = () => repo.list();
