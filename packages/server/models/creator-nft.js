const { Model, DataTypes } = require('sequelize')

const { db } = require('./db')

class CreatorNft extends Model {
  display() {
    const { deletedAt, ...creatorNft } = this.get({ plain: true })
    return creatorNft
  }
}

CreatorNft.init({
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
  collectionAddress: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  nftAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize: db,
  paranoid: false,
  tableName: 'CreatorNft',
})

module.exports = CreatorNft
