function LanguagesAndRegions(sequelize, type) {
  return sequelize.define(
    "LanguagesAndRegions",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      language_code: {
        type: type.STRING
      },
      language: {
        type: type.STRING
      },
      regional: {
        type: type.STRING
      },
      language_name_regional: {
        type: type.STRING
      }
    },
    {
      timestamps: false,
      tableName: "languages_and_regions"
    }
  );
}

export default LanguagesAndRegions;
