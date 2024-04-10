function RoleModel(sequelize, type) {
  return sequelize.define(
    "Roles",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      role: {
        type: type.STRING(40),
        allowNull: false,
        unique: true
      }
    },
    {
      timestamps: false,
      tableName: "roles"
    }
  );
}

export default RoleModel;
