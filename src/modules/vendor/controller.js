const s = require('./service');

const validateFields = (body, required) => {
  for (const f of required) if (body[f] == null || body[f] === '') return `Missing field: ${f}`;
  return null;
};

exports.deleteVendor = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Vendor ID is required' });
  }
  try {
    await s.deleteVendor(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete vendor' });
  }
};

exports.saveVendorDetails = async (req, res) => {
  const required = ['firstName', 'lastName', 'email', 'phoneNum', 'rating'];
  const error = validateFields(req.body, required);
  if (error) return res.status(400).json({ message: error });

  try {
    const vendor = await s.createVendor(req.body);
    res.status(201).json({ message: 'Vendor created', vendor });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Failed to create vendor' });
  }
}

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await s.getAllVendors();
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vendors' });
  }
};
