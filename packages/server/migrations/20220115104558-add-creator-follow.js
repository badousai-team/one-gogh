const { Sequelize } = require('sequelize')

module.exports = {
  up: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.createTable('CreatorFollow', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        following_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: true,
        },
      })
      await  queryInterface.addIndex('CreatorFollow', {
        name: 'user_id_following_id_idx',
        fields: ['user_id', 'following_id'],
        type: 'UNIQUE',
      })
    }),

  down: (queryInterface) => Promise.resolve()
    .then(async () => {
      await queryInterface.dropTable('CreatorFollow')
    }),
}
