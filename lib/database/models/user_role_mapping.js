function UserModel(sequelize, type) {
  return sequelize.define(
    "UserRoleMapping",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: type.INTEGER
      },
      role_id: {
        type: type.INTEGER
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "user_role_mapping"
    }
  );
}

export default UserModel;
