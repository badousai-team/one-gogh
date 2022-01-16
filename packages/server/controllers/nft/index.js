const {
  GetNftUseCase,
} = require('./usecase')

module.exports.handleGetNft = async (req, res) => {
  const { id } = req.params

  const nft = await GetNftUseCase({ id })

  res.json({ nft })
}
