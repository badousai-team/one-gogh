const {
  User,
  CreatorFollow,
} = require('../../models')
const { NotFoundError } = require('../../exceptions')

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

module.exports.FollowOtherCreator = async ({
  creatorId,
  followingId,
}) => {
  const creator = await User.findByPk(followingId)

  if (!creator) throw new NotFoundError('Creator not found')

  const creatorFollow = await User.create({
    userId: creatorId,
    followingId
  })

  return creatorFollow
}


module.exports.GetCreatorByUsernameUseCase
