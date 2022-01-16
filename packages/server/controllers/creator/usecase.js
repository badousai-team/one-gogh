const {
  User,
  CreatorFollow,
} = require('../../models')
const { NotFoundError, AuthenticationError } = require('../../exceptions')

module.exports.GetCreatorByUsernameUseCase = async ({ username }) => {
  const attributes = [
    'id',
    'username',
    'address',
    'email',
    'profileUrl',
  ]
  const creator = await User.findOne({
    attributes,
    where: {
      username,
    },
  })

  if (!creator) throw new NotFoundError('Creator not found')

  return creator
}

module.exports.FollowOtherCreatorUseCase = async ({
  userId,
  followingId,
}) => {
  if (!userId) throw new AuthenticationError('AuthenticationError')
  const creator = await User.findByPk(followingId)

  if (!creator) throw new NotFoundError('Creator not found')

  const where = {
    userId,
    followingId,
  }

  const following = await CreatorFollow.findOne({ where })

  if (following) {
    // Unfollow
    await CreatorFollow.destroy({ where })
  } else {
    // Follow
    await CreatorFollow.create({ ...where })
  }

  // TODO: ADD Activity Log

  return true
}
