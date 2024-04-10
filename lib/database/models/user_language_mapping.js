function UserLanguageMapping(sequelize, type) {
  return sequelize.define(
    "UserLanguageMapping",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: type.INTEGER
      },
      language_id: {
        type: type.INTEGER
      }
    },
    {
      timestamps: false,
      tableName: "user_language_mapping"
    }
  );
}

export default UserLanguageMapping;
