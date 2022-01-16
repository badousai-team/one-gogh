const {
  User,
  CreatorFollow,
} = require('../../models')
const { db } = require('../../models/db')
const {
  isNumber,
  calculateLimitAndOffset,
  paginate,
} = require('../../utils/helper')
const { NotFoundError, AuthenticationError } = require('../../exceptions')
const { Op } = require('sequelize')

module.exports.GetAllCreatorUseCase = async (query) => {

  // http://www.sqlines.com/postgresql/limit_offset
  let limit = (query && query.limit && isNumber(query.limit)) ? parseInt(query.limit, 10) : 10
  let offset = (query && query.offset && isNumber(query.offset)) ? parseInt(query.offset, 10) : 0

  const where = {}

  if (query.page) {
    const calc = calculateLimitAndOffset(Number(query.page), limit)
    limit = calc.limit
    offset = calc.offset
  }

  if (query.name) where.name = { [Op.iLike]: `%${query.name}%` }
  if (query.username) where.username = { [Op.iLike]: `%${query.username}%` }

  let sortBy = query.sortBy || 'createdAt'
  let sortDirection = 'DESC'
  const order = [[sortBy, sortDirection]]

  const result = await User.findAndCountAll({
    where,
    limit,
    offset,
    order,
  })

  let meta = {}

  if (query.page) {
    meta = paginate(
      query.page,
      result.count,
      result.rows,
      limit,
    )
  }

  return {
    list: result.rows,
    total: result.count,
    meta,
  }
}

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
