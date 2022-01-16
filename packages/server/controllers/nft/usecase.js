const {
  CreatorNft,
} = require('../../models')
const { NotFoundError } = require('../../exceptions')

module.exports.GetNftUseCase = async ({ id }) => {
  const result = await CreatorNft.findByPk(id)

  if (!result) throw new NotFoundError('Nft Not found')

  return result
}
