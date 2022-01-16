const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class CreatorFollow extends Model {
  display() {
    const { deletedAt, ...creatorFollow } = this.get({ plain: true })
    return creatorFollow
  }
}

CreatorFollow.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  followingId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize: db,
  paranoid: false,
  tableName: 'CreatorFollow',
})

module.exports = CreatorFollow
