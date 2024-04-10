function EventSeriesModel(sequelize, type) {
  return sequelize.define(
    "EventSeries",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      series_name: {
        allowNull: false,
        type: type.STRING(300)
      },
      description: {
        allowNull: false,
        type: type.STRING(300)
      },
      series_photo_url: {
        alllowNull: true,
        type: type.STRING(100)
      },
      user_id: {
        allowNull: false,
        type: type.UUID
      },
      event_id: {
        allowNull: false,
        type: type.INTEGER
      },
      is_active: {
        type: type.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "event_series"
    }
  );
}

export default EventSeriesModel;
