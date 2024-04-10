function SeriesModel(sequelize, type) {
  return sequelize.define(
    "Series",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      series_uuid: {
        type: type.UUID,
        primaryKey: false
      },
      series_name: {
        type: type.STRING(200)
      },
      is_active: {
        type: type.BOOLEAN,
        defaultValue: true
      },
      user_uuid_as_publisher: {
        type: type.UUID
      },
      cover_url: { type: type.STRING }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "series"
    }
  );
}

export default SeriesModel;
