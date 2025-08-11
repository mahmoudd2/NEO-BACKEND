require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./db'); // now points to the index.js with all models + associations

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    // Uncomment during dev to auto-create/update tables
    // await sequelize.sync({ alter: true });

    app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
  } catch (e) {
    console.error('❌ Startup error:', e);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit(0);
});
