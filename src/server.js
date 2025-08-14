const path = require('path');                           // ✅ add this line
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const app = require('./app');
const db = require('./config/knex');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.raw('select 1+1 as result'); // quick connection check
    console.log('✅ DB connected');
    app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
  } catch (e) {
    console.error('❌ Startup error:', e);
    process.exit(1);
  }
})();

process.on('SIGINT', async () => {
  await db.destroy();
  process.exit(0);
});
