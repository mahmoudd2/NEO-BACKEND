const db = require('../../config/knex');

module.exports = {
    createCompany: async (name,size,industry,email,phoneNum,webURL,location,description) => {
        return await db('Company').insert({ Name: name, Size: size, Industry: industry, Email: email, phoneNum: phoneNum, webURL: webURL, Location: location, description: description });
    },
    getAllCompanies: async () => {
        return await db('Company').select('*');
    },
    getCompanyById: async (id) => {
        return await db('Company').where({ id: id }).select('*');
    },
    deleteCompany: async (id) => {
        return await db('Company').where({ id: id }).delete();
    },
    updateCompany: async (id,name,size,industry,email,phoneNum,webURL,location,description) => {
        return await db('Company').where({ id: id }).update({ Name: name, Size: size, Industry: industry, Email: email, phoneNum: phoneNum, webURL: webURL, Location: location, description: description });
    }
}