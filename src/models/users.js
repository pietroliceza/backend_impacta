const bcrypt = require('bcrypt');

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    password: DataTypes.VIRTUAL,
    hashedPassword: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasOne(models.Category,
      { foreignKey: 'createBy', as: 'userId' });
    User.hasOne(models.Product,
      { foreignKey: 'createBy', as: 'createBy' });
    User.hasOne(models.Provider,
      { foreignKey: 'createBy', as: 'user' });
    User.hasOne(models.Purchase,
      { foreignKey: 'createBy', as: 'seller' });
  };

  User.addHook('beforeSave', async (user) => {
    if (user.password){
      user.hashedPassword = await bcrypt.hash(user.password, 8);
    }
  });

  return User;
}


module.exports = User;
