function SubscriptionModel(sequelize, type) {
  return sequelize.define(
    "Subscription",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      num_languages: {
        type: type.INTEGER
      },
      commission_id: {
        type: type.INTEGER
      },
      price: {
        type: type.DOUBLE
      },
      subscription_length_id: {
        allowNull: false,
        type: type.INTEGER
      }
    },
    {
      timestamps: false,
      tableName: "subscription"
    }
  );
}

export default SubscriptionModel;
