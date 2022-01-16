const {
  User,
  CreatorFollow,
} = require('../../models')
const { db } = require('../../models/db')

const { NotFoundError, AuthenticationError } = require('../../exceptions')

module.exports.GetCreatorByUsernameUseCase = async ({ username }) => {
  const following = [db.literal(`
    (SELECT COUNT(*)::integer FROM
      public."CreatorFollow" AS follow
      WHERE follow.user_id = "User".id
        AND follow.deleted_at IS NULL
    )
  `), 'following']

  const follower = [db.literal(`
    (SELECT COUNT(*)::integer FROM
      public."CreatorFollow" AS follow
      WHERE follow.following_id = "User".id
        AND follow.deleted_at IS NULL
    )
  `), 'follower']

  const attributes = [
    'id',
    'username',
    'address',
    'email',
    'profileUrl',
    following,
    follower,
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
