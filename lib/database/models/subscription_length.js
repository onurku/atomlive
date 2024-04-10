function SubscriptionLengthModel(sequelize, type) {
  return sequelize.define(
    "SubscriptionLength",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      name: {
        type: type.STRING(100)
      }
    },
    {
      timestamps: false,
      tableName: "subscription_length"
    }
  );
}

export default SubscriptionLengthModel;
