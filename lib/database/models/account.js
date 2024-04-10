function AccountModel(sequelize, type) {
  return sequelize.define(
    "Account",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: type.STRING
      },
      provider: {
        type: type.STRING
      },
      providerAccountId: {
        type: type.STRING
      },
      refresh_token: {
        type: type.STRING
      },
      access_token: {
        type: type.STRING
      },
      expires_at: {
        type: type.INTEGER
      },
      token_type: {
        type: type.STRING
      },
      scope: {
        type: type.STRING
      },
      id_token: {
        type: type.STRING(2000)
      },
      userId: {
        type: type.UUID
      },
      session_state: {
        type: type.STRING
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "accounts"
    }
  );
}

export default AccountModel;
