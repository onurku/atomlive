function ItemTypeModel(sequelize, type) {
  return sequelize.define(
    "item_type",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      name: {
        type: type.STRING(100), //event, event_series, content, series
        allowNull: false,
        unique: true
      },
      description: {
        type: type.STRING(200),
        allowNull: false,
        unique: true
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "item_type"
    }
  );
}

export default ItemTypeModel;
