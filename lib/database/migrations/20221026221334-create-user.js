"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: Sequelize.INTEGER,
      uuid: Sequelize.UUID,
      is_active: Sequelize.BOOLEAN,
      is_email_verified: Sequelize.BOOLEAN,
      email: Sequelize.STRING(40),
      email_verification_code: Sequelize.STRING(50),
      authorization: Sequelize.JSON, //object received from next-auth on callback
      authorization_provider: Sequelize.STRING(20), //google, facebook, etc
      twitter: Sequelize.STRING(100),
      facebook: Sequelize.STRING(100),
      instagram: Sequelize.STRING(100),
      tiktok: Sequelize.STRING(100),
      about: Sequelize.STRING,
      address_line1: Sequelize.STRING,
      address_line2: Sequelize.STRING,
      address_postal_code: Sequelize.STRING,
      city: Sequelize.STRING(20),
      state: Sequelize.STRING, //State, county, province, or region.
      country: Sequelize.STRING(20),
      publisher_name: Sequelize.STRING(100),
      first_name: Sequelize.STRING(40),
      last_name: Sequelize.STRING(40),
      metadata_timezone: Sequelize.JSON,
      organization_id: Sequelize.INTEGER,
      password: Sequelize.STRING(100),
      phone: Sequelize.TEXT,
      phone_verified: Sequelize.BOOLEAN,
      photo_url: Sequelize.STRING(100),
      reset_password_code: Sequelize.STRING(50),
      timezone: Sequelize.STRING(50),
      title: Sequelize.STRING(10),
      last_login_time: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  }
};
