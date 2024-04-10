// token!: string

//   @Property()
//   expires!: Date

//   @Property()
// //   identifier!: string

function VerificationToken(sequelize, type) {
  return sequelize.define(
    "VerificationToken",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      token: {
        type: type.STRING()
      },
      expires: {
        type: type.DATE()
      },
      identifier: {
        type: type.STRING()
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "verification_tokens"
    }
  );
}

export default VerificationToken;
