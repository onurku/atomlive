function InvitationModel(sequelize, type) {
  return sequelize.define(
    "invitation",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: type.INTEGER
      },
      uuid: {
        //this is used to generate invite code
        allowNull: false,
        type: type.UUID
      },
      invitation_code: {
        type: type.UUID
      },
      item_id: {
        allowNull: false,
        type: type.INTEGER
      },
      host_user_id: {
        allowNull: false,
        type: type.UUID
      },
      participant_user_email: {
        allowNull: false,
        type: type.STRING(40)
      },
      participant_user_uuid: {
        // this is when participant accepted invite and created account from invite
        type: type.UUID
      },
      is_invitation_accepted: {
        defaultValue: false,
        type: type.BOOLEAN
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "invitation"
    }
  );
}

export default InvitationModel;
