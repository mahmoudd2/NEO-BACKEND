exports.seed = async function (knex) {
  await knex('Company').del();
  await knex('Company').insert([
    { Name: 'TechCorp', Size: '100', Industry: 'IT', Email: 'info@techcorp.com', phoneNum: '5550001', webURL: 'https://techcorp.com', status: 'Active', Location: 'NY', description: 'IT services' },
    { Name: 'Foodies', Size: '50', Industry: 'Food', Email: 'contact@foodies.com', phoneNum: '5550002', webURL: 'https://foodies.com', status: 'Active', Location: 'LA', description: 'Food delivery' },
    { Name: 'BuildPro', Size: '200', Industry: 'Construction', Email: 'support@buildpro.com', phoneNum: '5550003', webURL: 'https://buildpro.com', status: 'Inactive', Location: 'TX', description: 'Construction services' }
  ]);
};
