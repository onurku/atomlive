function ContentModel(sequelize, type) {
  return sequelize.define(
    "Content",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      title: {
        allowNull: false,
        type: type.STRING(100)
      },
      is_active: {
        type: type.BOOLEAN,
        defaultValue: true
      },
      uuid: {
        allowNull: false,
        type: type.UUID
      },
      author_uuid: {
        type: type.UUID
      },
      slug: {
        type: type.STRING(100)
      },
      publisher_uuid: {
        type: type.UUID
      }, //Either publisher_uuid or publisher_name is required.
      publisher_name: {
        type: type.STRING(100) //If publisher_name is submitted, need to check for publisher_id from }user table.
      },
      metadata: {
        allowNull: false,
        type: type.JSONB
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "content"
    }
  );
}

export default ContentModel;
