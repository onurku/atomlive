function SeriesEventMapping(sequelize, type) {
  return sequelize.define(
    "SeriesEventMapping",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      event_series_id: type.INTEGER,
      event_id: type.INTEGER,
      modified_by: {
        type: type.UUID
      }
    },
    {
      timestamps: false,
      tableName: "series_event_mapping"
    }
  );
}

export default SeriesEventMapping;
