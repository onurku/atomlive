function StripeSubscriptionModel(sequelize, type) {
  return sequelize.define(
    "StripeSubscriptions",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_uuid: {
        type: type.UUID
      },
      subscription_id: {
        allowNull: false,
        type: type.INTEGER
      },
      content_id: {
        type: type.INTEGER
      },
      series_id: {
        type: type.INTEGER
      },
      date_subscription_start: { allowNull: false, type: type.DATE },
      date_subscription_end: { allowNull: false, type: type.DATE }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "stripe_subscriptions"
    }
  );
}

export default StripeSubscriptionModel;
