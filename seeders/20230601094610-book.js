'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('books',
    [{
     title: 'John Doe',
     deskripsi: "this book talking story horors in the hospital",
     img:"book.png",
      },
    {
     title: 'Alex Sang Penguasa',
     deskripsi: "this book talking story horors in the hospital",
     img:"book.png",
      },
    {
     title: 'Matric Algorithm',
     deskripsi: "this book talking story horors in the hospital",
     img:"book.png",
      }],
   {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('books', null, {});

  }
};
