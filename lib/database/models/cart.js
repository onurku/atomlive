function CartModel(sequelize, type) {
  return sequelize.define(
    "Cart",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      user_uuid: {
        allowNull: false,
        type: type.UUID
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "cart"
    }
  );
}

export default CartModel;
