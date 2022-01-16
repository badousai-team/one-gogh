const {
  GetAllCreatorUseCase,
  GetCreatorByUsernameUseCase,
  FollowOtherCreatorUseCase,
} = require('./usecase')

module.exports.handleFetchAllCreator = async (req, res) => {

  const query = {
    ...req.query,
  }

  const result = await GetAllCreatorUseCase(query)

  res.json({
    list: result.list,
    total: result.total,
    meta: result.meta,
  })
}

module.exports.handleGetCreatorByUsername = async (req, res) => {
  const { username } = req.params
  const userId = req.currentUser?.id

  const creator = await GetCreatorByUsernameUseCase({ username, userId })

  res.json({ creator })
}

module.exports.handleFollowOtherCreator = async (req, res) => {
  const { id: followingId } = req.params
  const userId = req.currentUser?.id

  await FollowOtherCreatorUseCase({ followingId, userId })

  res.json({ status: 'success' })
}
