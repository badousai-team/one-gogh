const { GetCreatorByUsernameUseCase } = require('../usecase')
const TestHelper = require('../../../tests/helper')
const { User } = require('../../../models')
const { NotFoundError } = require('../../../exceptions')

describe('Creator Usecase', () => {
  afterEach(async () => {
    await User.destroy({
      where: {},
      force: true,
    })
  })

  it('should show the correct data when return username', async () => {
    // Arrange
    const users = await TestHelper.createDummyUser()

    // Action
    const result = await GetCreatorByUsernameUseCase({ username: users[0].username })

    // Assert
    expect(result.username).toBe(users[0].username)
  })

  it('should error when return username is invalid', async () => {
    // Arrange
    const users = await TestHelper.createDummyUser()

    // Action & Assert
    await expect( GetCreatorByUsernameUseCase({ username: users[0].email }))
      .rejects.toThrowError('Creator not found')
  })
})

