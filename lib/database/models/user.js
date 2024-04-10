const { DataTypes } = require("sequelize");

function UserModel(sequelize, type) {
  return sequelize.define(
    "User",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      uuid: {
        type: type.UUID
      },
      is_active: {
        type: type.BOOLEAN,
        defaultValue: true
      },
      is_email_verified: {
        type: type.BOOLEAN,
        defaultValue: false
      },
      email: {
        type: type.STRING(40),
        allowNull: false,
        unique: true
      },
      email_verification_code: {
        type: type.STRING(50)
      },
      authorization: {
        type: type.JSON //object received from next-auth on callback
      },
      authorization_provider: {
        type: type.STRING(20) //google, facebook, etc
      },
      twitter: {
        type: type.STRING(100)
      },
      facebook: {
        type: type.STRING(100)
      },
      instagram: {
        type: type.STRING(100)
      },
      tiktok: {
        type: type.STRING(100)
      },
      about: {
        type: type.STRING(100)
      },
      address_line1: {
        type: type.STRING
      },
      address_line2: {
        type: type.STRING
      },
      address_postal_code: {
        type: type.STRING
      },
      city: {
        type: type.STRING(20)
      },
      state: {
        //State, county, province, or region.
        type: type.STRING
      },
      country: {
        type: type.STRING(20)
      },
      publisher_name: {
        type: type.STRING(100)
      },
      first_name: {
        type: type.STRING(40)
      },
      last_name: {
        type: type.STRING(40)
      },
      metadata_timezone: {
        type: type.JSON
      },
      organization_id: {
        type: type.INTEGER
      },
      password: {
        type: type.STRING(100)
      },
      phone: {
        type: type.TEXT
      },
      phone_verified: {
        type: type.BOOLEAN
      },
      photo_url: {
        type: type.STRING(100)
      },
      reset_password_code: {
        type: type.STRING(50)
      },
      timezone: {
        type: type.STRING(50)
      },
      title: {
        type: type.STRING(10)
      },
      last_login_time: {
        type: type.DATE
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "users"
    }
  );
}

export default UserModel;
