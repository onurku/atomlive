function SeriesContentMapping(sequelize, type) {
  return sequelize.define(
    "SeriesContentMapping",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      series_id: type.INTEGER,
      content_id: type.INTEGER,
      modified_by: {
        type: type.UUID
      }
    },
    {
      timestamps: false,
      tableName: "series_content_mapping"
    }
  );
}

export default SeriesContentMapping;
