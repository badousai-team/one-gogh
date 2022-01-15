const {
  GetCreatorByUsernameUseCase,
  FollowOtherCreatorUseCase,
} = require('./usecase')

module.exports.handleGetCreatorByUsername = async (req, res) => {
  const { username } = req.params

  const creator = await GetCreatorByUsernameUseCase({ username })

  res.json({ creator })
}

module.exports.handleFollowOtherCreator = async (req, res) => {
  const { id: followingId } = req.params
  const userId = req.currentUser?.id

  await FollowOtherCreatorUseCase({ followingId, userId })

  res.json({ status: 'success' })
}
