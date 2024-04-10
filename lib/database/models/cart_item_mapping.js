function CartItemMapping(sequelize, type) {
  return sequelize.define(
    "CartItemMapping",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      cart_id: {
        allowNull: false,
        type: type.UUID
      },
      item_id: {
        allowNull: false,
        type: type.INTEGER
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "cart_item_mapping"
    }
  );
}

export default CartItemMapping;
