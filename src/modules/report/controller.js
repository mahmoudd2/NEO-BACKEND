const S = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};


exports.addReport = async (req, res) => {
  const requiredFields = ['CompanyID', 'Type', 'period_start', 'period_end', 'Data']
  const validationError = validateFields(req.body, requiredFields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  try {
    const report = await S.addReport(req.body);
    return res.status(201).json(report);
  } catch (error) {
    console.error('Error adding report:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

exports.editReport = async (req, res) => {
  const requiredFields = ['ReportID', 'Type', 'period_start', 'period_end', 'Data']
  
  const validationError = validateFields(req.body, requiredFields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  try {
    const report = await S.editReport(req.body);
    return res.status(200).json(report);
  } catch (error) {
    console.error('Error editing report:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
exports.deleteReport = async (req, res) => {
  const requiredFields = ['ReportID']
  const validationError = validateFields(req.body, requiredFields);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  try {
    const result = await S.deleteReport(req.body.ReportID);
    if (result) {
      return res.status(200).json({ message: 'Report deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Report not found' });
    }
  } catch (error) {
    console.error('Error deleting report:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
exports.getAllReports = async (req, res) => {

  try {
    const reports = await S.getAllReports();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
}