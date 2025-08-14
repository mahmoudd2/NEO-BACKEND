const db = require('../../config/knex');

const toDb = (b) => ({
  RoleID: b.roleId,
  CompanyID: b.companyId,
  UserName: b.userName,
  FirstName: b.firstName,
  LastName: b.lastName,
  Email: b.email,
  Password: b.password,
  Language: b.language ?? null,
  status: b.status ?? null
});

const userColumns = [
  'id', 'RoleID', 'CompanyID', 'UserName', 'FirstName', 'LastName',
  'Email', 'Language', 'LastLogin', 'status'
];

module.exports = {
  create: async (body) => {
    const [row] = await db('UserAccount').insert(toDb(body)).returning(userColumns);
    return row;
  },

  list: () => db('UserAccount').select(userColumns).orderBy('id', 'asc'),

  listByCompany: (companyId) =>
    db('UserAccount').select(userColumns).where({ CompanyID: companyId }).orderBy('id', 'asc'),

  getById: (id) =>
    db('UserAccount').select(userColumns).where({ id }).first(),

  /** UPDATE: allow only safe fields (no password here) */
  update: async (id, payload) => {
    const safe = {
      ...(payload.roleId !== undefined ? { RoleID: payload.roleId } : {}),
      ...(payload.companyId !== undefined ? { CompanyID: payload.companyId } : {}),
      ...(payload.userName !== undefined ? { UserName: payload.userName } : {}),
      ...(payload.firstName !== undefined ? { FirstName: payload.firstName } : {}),
      ...(payload.lastName !== undefined ? { LastName: payload.lastName } : {}),
      ...(payload.email !== undefined ? { Email: payload.email } : {}),
      ...(payload.language !== undefined ? { Language: payload.language } : {}),
      ...(payload.status !== undefined ? { status: payload.status } : {}),
    };

    const [row] = await db('UserAccount')
      .where({ id })
      .update(safe)
      .returning(userColumns);

    return row;
  },

  /** Set a new (already-hashed) password */
  setPassword: async (id, hashedPassword) => {
    await db('UserAccount').where({ id }).update({ Password: hashedPassword });
    return true;
  },
  
  getEmailById: (id) =>
  db('UserAccount').select('id','Email','FirstName').where({ id }).first(),

  findUserByEmail: (email) =>
    db('UserAccount')
      .select([
        'id', 'Email', 'Password', 'RoleID', 'CompanyID',
        'UserName', 'FirstName', 'LastName', 'status'
      ])
      .where({ Email: email })
      .first(),

  getRoleName: (roleId) =>
    db('Role').select('Name').where({ id: roleId }).first(),

  remove: (id) => db('UserAccount').where({ id }).del()
};
