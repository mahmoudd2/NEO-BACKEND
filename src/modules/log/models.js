const db = require('../../config/knex');

module.exports = {
    addLog: async (userId, action, objectId, objectType, timestamp, gps_location, note) => {
        return await db('Log').insert({ 
            UserID:userId,
            Action:action,
            ObjectID:objectId,
            ObjectType:objectType,
            Timestamp:timestamp,
            gps_location:gps_location, 
            Note:note
        });
    },
    editLog: async (logId,userId, action, objectId, objectType, timestamp, gps_location, note) => {
        return await db('Log').where({ id: logId }).update({
            UserID:userId,
            Action:action,
            ObjectID:objectId,
            ObjectType:objectType,
            Timestamp:timestamp,
            gps_location:gps_location, 
            Note:note
        });
    },
    deleteLog: async (id) => {
        return await db('Log').where({ id: id }).delete();
    }
}