const { GetCreatorByUsernameUseCase } = require('./usecase')

const handleGetCreatorByUsername = async (req, res) => {
  const { username } = req.params

  const creator = await GetCreatorByUsernameUseCase({ username })

  res.json({ creator })
}

module.exports = {
  handleGetCreatorByUsername,
}


