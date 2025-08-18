// Knex data-access for rolePermission (link table) + helpers
const db = require('../../config/knex');

const ROLE = 'Role';
const PERMISSION = 'permission';
const ROLE_PERMISSION = 'rolePermission';

module.exports = {
  // Insert multiple permission links for a role (ignoring already-linked)
  async addMany(roleId, permissionIds = []) {
    // Get existing mappings
    const existing = await db(ROLE_PERMISSION)
      .where({ roleID: roleId })
      .pluck('permissionID');

    const toInsert = [...new Set(permissionIds.map(Number))].filter(
      (pid) => Number.isInteger(pid) && !existing.includes(pid)
    );

    if (toInsert.length === 0) {
      return { added: 0, existing: existing.length, insertedIds: [] };
    }

    const rows = toInsert.map((pid) => ({ roleID: roleId, permissionID: pid }));
    const inserted = await db(ROLE_PERMISSION)
      .insert(rows)
      .returning(['id', 'roleID', 'permissionID']);

    return { added: inserted.length, existing: existing.length, insertedIds: inserted.map(r => r.id) };
  },

  // Get all permissions (id, Name, Description) linked to a role
  listByRole(roleId) {
    return db({ rp: ROLE_PERMISSION })
      .join({ p: PERMISSION }, 'rp.permissionID', 'p.id')
      .where('rp.roleID', roleId)
      .select('p.id', 'p.Name', 'p.Description')
      .orderBy('p.id', 'asc');
  },

  // Delete all links for a role
  removeByRole(roleId) {
    return db(ROLE_PERMISSION).where({ roleID: roleId }).del();
  },

  // (Optional) existence checks
  getRole(roleId) {
    return db(ROLE).select('id').where({ id: roleId }).first();
  },
  getExistingPermissions(ids = []) {
    return db(PERMISSION).select('id').whereIn('id', ids);
  }
};
