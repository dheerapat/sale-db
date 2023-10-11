const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Specify the SQLite file path
const dbFilePath = path.join(__dirname, 'app.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFilePath,
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    }
}, {});

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    detail: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    }
}, {});

const ItemDiscount = sequelize.define('ItemDiscount', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER
    },
    sale_price: {
        type: DataTypes.DECIMAL
    },
    sale_date_start: {
        type: DataTypes.DATE
    },
    sale_date_end: {
        type: DataTypes.DATE
    }
}, {});

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.DECIMAL
    },
    purchase_date: {
        type: DataTypes.DATE
    }
}, {});

const Inventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING
    },
    order_id: {
        type: DataTypes.INTEGER
    },
    isRedeemed: {
        type: DataTypes.BOOLEAN
    }
}, {});

const BundleName = sequelize.define('BundleName', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    date_start: {
        type: DataTypes.DATE
    },
    date_end: {
        type: DataTypes.DATE
    },
    isValid: {
        type: DataTypes.BOOLEAN
    }
}, {});

const BundleItem = sequelize.define('BundleItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bundle_name_id: {
        type: DataTypes.INTEGER
    },
    product_id: {
        type: DataTypes.INTEGER
    }
}, {});

const BundleOrder = sequelize.define('BundleOrder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bundle_name_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.DECIMAL
    },
    purchase_date: {
        type: DataTypes.DATE
    }
}, {});

const BundleInventory = sequelize.define('BundleInventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING
    },
    bundle_order_id: {
        type: DataTypes.INTEGER
    },
    isRedeemed: {
        type: DataTypes.BOOLEAN
    }
}, {});

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Item.hasMany(ItemDiscount, { foreignKey: 'product_id' });
ItemDiscount.belongsTo(Item, { foreignKey: 'product_id' });

Item.hasMany(Order, { foreignKey: 'product_id' });
Order.belongsTo(Item, { foreignKey: 'product_id' });

Order.hasMany(Inventory, { foreignKey: 'order_id' });
Inventory.belongsTo(Order, { foreignKey: 'order_id' });

BundleName.hasMany(BundleItem, { foreignKey: 'bundle_name_id' });
BundleItem.belongsTo(BundleName, { foreignKey: 'bundle_name_id' });

BundleName.hasMany(BundleOrder, { foreignKey: 'bundle_name_id' });
BundleOrder.belongsTo(BundleName, { foreignKey: 'bundle_name_id' });

BundleOrder.hasMany(BundleInventory, { foreignKey: 'bundle_order_id' });
BundleInventory.belongsTo(BundleOrder, { foreignKey: 'bundle_order_id' });

sequelize.sync();