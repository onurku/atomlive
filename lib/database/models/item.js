function ItemModel(sequelize, type) {
  return sequelize.define(
    "item",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      item_type_id: {
        //used to detect which column to look up: 1 of 4 - content_id, series_id, event_id, event_series_id
        allowNull: false,
        type: type.INTEGER
      },
      content_id: {
        type: type.INTEGER
      },
      series_id: {
        type: type.INTEGER
      },
      event_id: {
        type: type.INTEGER
      },
      event_series_id: {
        type: type.INTEGER
      },
      agora_event_id: {
        type: type.INTEGER
      },
      subscription_id: {
        //determines what kind of subscription
        type: type.INTEGER
      },
      stripe_price_id: {
        type: type.STRING(40)
      },
      stripe_product_id: {
        type: type.STRING(40)
      },
      cover_url: {
        type: type.STRING(200)
      }
    },
    {
      timestamps: false,
      // createdAt: "created_at",
      // updatedAt: "modified_at",
      tableName: "item"
    }
  );
}

export default ItemModel;
