function EventModel(sequelize, type) {
  return sequelize.define(
    "Event", //this can be event created by users and not teachers
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      event_name: {
        type: type.STRING //VARCHAR TYPE
      },
      event_description: {
        allowNull: false,
        type: type.BLOB
      },
      event_photo_url: {
        alllowNull: true,
        type: type.STRING(100)
      },
      created_by: {
        allowNull: false,
        type: type.UUID
      },
      modified_by: {
        allowNull: false,
        type: type.UUID
      },
      start_date: {
        allowNull: false,
        type: type.DATE
      },
      end_date: {
        allowNull: false,
        type: type.DATE
      },
      commission_id: {
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
      tableName: "event"
    }
  );
}

export default EventModel;
