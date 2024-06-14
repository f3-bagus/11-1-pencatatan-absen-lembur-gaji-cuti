'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      encryptedPassword: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      privilege: {
        type: Sequelize.ENUM('ROOT', 'ADMIN', 'MEMBER'),
        allowNull: false,
        defaultValue: 'MEMBER'
      },
      roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'JobRoles',
            key: 'id',
          },
          onDelete: 'CASCADE'
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: "https://res.cloudinary.com/djsjnrfv0/image/upload/v1702988069/BINAR/mqtkzduziqwhdvxu1vzh.png"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};