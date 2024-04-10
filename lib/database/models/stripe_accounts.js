function StripeAccountModel(sequelize, type) {
  return sequelize.define(
    "StripeAccounts",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_uuid: {
        type: type.UUID
      },
      stripe_account_id: {
        // this is connect (stripe user) account
        type: type.STRING
      },
      stripe_customer_id: {
        // this is stripe customer account
        type: type.STRING
      },
      display_name: {
        type: type.STRING
      },
      country: {
        type: type.STRING(30)
      },
      currency: {
        type: type.STRING(30)
      },
      charges_enabled: {
        type: type.BOOLEAN
      },
      payouts_enabled: {
        type: type.BOOLEAN
      },
      has_connected_account: {
        type: type.BOOLEAN
      },
      has_completed_process: {
        //account details submitted
        type: type.BOOLEAN
      },
      has_overdue_requirements: {
        type: type.BOOLEAN
      },
      metadata: {
        type: type.JSONB
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "stripe_accounts"
    }
  );
}

export default StripeAccountModel;
