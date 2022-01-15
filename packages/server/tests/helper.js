const {
  User,
} = require('../models')
const { generateAccessToken } = require('../utils/auth')
const UserDummy = require('./dummy/user')
const ServerTestHelper = {
  getAccessToken: async () => {
    const payload = {
      address: '0x3f70d9eE6a9803D8bA2C471D0eCD5aeA303E668f',
      status: 'active',
      username: 'test',
    }

    const user = await User.create(payload)

    const accessToken = await generateAccessToken(user.id)
    return accessToken
  },
  createDummyUser: async () => {
    const users = await User.bulkCreate(UserDummy, { returning: true })

    return users.map((user) => user.display())
  },
}

module.exports = ServerTestHelper
