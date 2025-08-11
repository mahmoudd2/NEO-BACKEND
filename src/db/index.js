// src/db/index.js
const sequelize = require('../config/database');

// MODELS
const Role = require('./models/Role');
const Permission = require('./models/Permission');
const RolePermission = require('./models/RolePermission');

const Company = require('./models/Company');
const UserAccount = require('./models/UserAccount');
const Warehouse = require('./models/Warehouse');

const Vendor = require('./models/Vendor');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Stock = require('./models/Stock');
const Alert = require('./models/Alert');

const Log = require('./models/Log');
const Report = require('./models/Report');
const Payment = require('./models/Payment');

const Feature = require('./models/Feature');
const Bundle = require('./models/Bundle');
const BundleFeature = require('./models/BundleFeature');
const Subscription = require('./models/Subscription');

const SalesTransaction = require('./models/SalesTransaction');

/** =========================
 *        ASSOCIATIONS
 *  =========================
 */

// Roles & Permissions (many-to-many via RolePermission)
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'roleID',
  otherKey: 'permissionID'
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permissionID',
  otherKey: 'roleID'
});

// Users ↔ Role, Company
UserAccount.belongsTo(Role, { foreignKey: 'RoleID' });
Role.hasMany(UserAccount, { foreignKey: 'RoleID' });

UserAccount.belongsTo(Company, { foreignKey: 'CompanyID' });
Company.hasMany(UserAccount, { foreignKey: 'CompanyID' });

// Warehouse ↔ Company
Warehouse.belongsTo(Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
Company.hasMany(Warehouse, { foreignKey: 'CompanyID' });

// Product ↔ Vendor / Category / Company
Product.belongsTo(Vendor, { foreignKey: 'VendorID', onDelete: 'CASCADE' });
Vendor.hasMany(Product, { foreignKey: 'VendorID' });

Product.belongsTo(Category, { foreignKey: 'CategoryID' });
Category.hasMany(Product, { foreignKey: 'CategoryID' });

Product.belongsTo(Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
Company.hasMany(Product, { foreignKey: 'CompanyID' });

// Stock ↔ Product / Warehouse
Stock.belongsTo(Product, { foreignKey: 'ProductID', onDelete: 'CASCADE' });
Product.hasMany(Stock, { foreignKey: 'ProductID' });

Stock.belongsTo(Warehouse, { foreignKey: 'WarehouseID' });
Warehouse.hasMany(Stock, { foreignKey: 'WarehouseID' });

// Alert ↔ Product / Stock / Warehouse
Alert.belongsTo(Product, { foreignKey: 'ProductID', onDelete: 'CASCADE' });
Product.hasMany(Alert, { foreignKey: 'ProductID' });

Alert.belongsTo(Stock, { foreignKey: 'StockID', onDelete: 'CASCADE' });
Stock.hasMany(Alert, { foreignKey: 'StockID' });

Alert.belongsTo(Warehouse, { foreignKey: 'WarehouseID' });
Warehouse.hasMany(Alert, { foreignKey: 'WarehouseID' });

// Log ↔ UserAccount
Log.belongsTo(UserAccount, { foreignKey: 'UserID' });
UserAccount.hasMany(Log, { foreignKey: 'UserID' });

// Report / Payment ↔ Company
Report.belongsTo(Company, { foreignKey: 'CompanyID' });
Company.hasMany(Report, { foreignKey: 'CompanyID' });

Payment.belongsTo(Company, { foreignKey: 'CompanyID' });
Company.hasMany(Payment, { foreignKey: 'CompanyID' });

// BundleFeature (many-to-many between Bundle & Feature via explicit join table)
Bundle.belongsToMany(Feature, {
  through: BundleFeature,
  foreignKey: 'BundleID',
  otherKey: 'FeatureID'
});
Feature.belongsToMany(Bundle, {
  through: BundleFeature,
  foreignKey: 'FeatureID',
  otherKey: 'BundleID'
});

// Subscription ↔ Company / Bundle
Subscription.belongsTo(Company, { foreignKey: 'CompanyID', onDelete: 'CASCADE' });
Company.hasMany(Subscription, { foreignKey: 'CompanyID' });

Subscription.belongsTo(Bundle, { foreignKey: 'BundleID', onDelete: 'CASCADE' });
Bundle.hasMany(Subscription, { foreignKey: 'BundleID' });

// SalesTransaction ↔ Product / Warehouse / UserAccount(CreatedBy)
SalesTransaction.belongsTo(Product, { foreignKey: 'ProductID', onDelete: 'CASCADE' });
Product.hasMany(SalesTransaction, { foreignKey: 'ProductID' });

SalesTransaction.belongsTo(Warehouse, { foreignKey: 'WarehouseID' });
Warehouse.hasMany(SalesTransaction, { foreignKey: 'WarehouseID' });

SalesTransaction.belongsTo(UserAccount, { foreignKey: 'CreatedBy', onDelete: 'CASCADE' });
UserAccount.hasMany(SalesTransaction, { foreignKey: 'CreatedBy' });

module.exports = {
  sequelize,
  models: {
    Role,
    Permission,
    RolePermission,
    Company,
    UserAccount,
    Warehouse,
    Vendor,
    Category,
    Product,
    Stock,
    Alert,
    Log,
    Report,
    Payment,
    Feature,
    Bundle,
    BundleFeature,
    Subscription,
    SalesTransaction
  }
};
