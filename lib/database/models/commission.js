function CommissionModel(sequelize, type) {
  return sequelize.define(
    "Commission",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      commission: {
        //commission to Atom
        allowNull: false,
        type: type.FLOAT
      },
      commission_teacher: {
        type: type.FLOAT
      },
      commission_publisher: {
        type: type.FLOAT
      }
    },
    {
      timestamps: false,
      tableName: "commission"
    }
  );
}

export default CommissionModel;
