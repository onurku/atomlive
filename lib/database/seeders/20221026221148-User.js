"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "User",
      [
        {
          uuid: "c79e062e-4fbf-46ed-adcf-fb05ff40a6a5",
          is_active: true,
          is_email_verified: true,
          first_name: "Lien",
          last_name: "Nguyen",
          email: "lqnguyen@hotmail.com",
          country: "United States",
          publisher_name: "Atom"
        },
        // {
        //   uuid: "c79e062e-4fbf-46ed-adcf-fb05ff40a6a",
        //   is_active: false,
        //   is_email_verified: true,
        //   first_name: "Lien",
        //   last_name: "Nguyen",
        //   email: "lqnguyen@gmail.com",
        //   country: "United States",
        //   publisher_name: "Cangrejo"
        // },
        {
          uuid: "223ac066-81d9-4745-bc8e-72915a7e8e57",
          is_active: true,
          is_email_verified: true,
          first_name: "Altai",
          last_name: "Zenailov",
          email: "diveomedia@atom.live",
          country: "United States",
          publisher_name: "Diveo Media"
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("User", null, {});
  }
};
