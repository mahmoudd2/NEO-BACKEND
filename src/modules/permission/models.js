const db = require('../../config/knex');
const { getAllPermissions, getPermissionById } = require('./service');

module.exports = {
    createPermission: async (permissionName, description) => {
        return await db('permission').insert({ Name: permissionName, Description: description });
    },
    updatePermission: async (id, permissionName, description) => {
        return await db('permission').where({ id: id }).update({ Name: permissionName, Description: description });
    },
    deletePermission: async (id) => {
        return await db('permission').where({ id: id }).delete();
    },
    getPermissionById: async (id) =>{
        return await db('permission').where({ id: id }).select("*");
    },
    getAllPermissions: async () => {
        return await db('permission').select('*');
    }
}