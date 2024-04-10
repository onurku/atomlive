function ChildModel(sequelize, type) {
  return sequelize.define(
    "Children",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      parent_0_id: {
        type: type.INTEGER
      },
      parent_1_id: {
        type: type.INTEGER
      },
      first_name: {
        type: type.STRING(40)
      },
      last_name: {
        type: type.STRING(40)
      },

      grade: {
        type: type.INTEGER
      },
      // Made string rather than dateonly to avoid dealing with date conversion to local timezone as suggested by Lien.
      date_of_birth: {
        type: type.STRING
      },

      photo_url: {
        type: type.STRING(100)
      },
      uuid: {
        type: type.STRING
      }
    },
    {
      timestamps: false,
      tableName: "children"
    }
  );
}

export default ChildModel;
