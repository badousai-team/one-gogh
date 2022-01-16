const { GetCreatorByUsernameUseCase, FollowOtherCreatorUseCase } = require('../usecase')
const TestHelper = require('../../../tests/helper')
const { User, CreatorFollow } = require('../../../models')

describe('Creator Usecase', () => {
  afterEach(async () => {
    await User.destroy({
      where: {},
      force: true,
    })

    await CreatorFollow.destroy({
      where: {},
      force: true,
    })
  })

  describe('GetCreatorUsername Usecase', () => {
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

  describe('FollowOtherCreator UseCase', () => {
    it('should create creator follow correctly when success follow', async () => {
      // Arrange
      const users = await TestHelper.createDummyUser()

      const currentUserId = users[0].id
      const followingCreatorId = users[1].id

      //  Action
      await FollowOtherCreatorUseCase({
        userId: currentUserId,
        followingId: followingCreatorId,
      })


      const followingCreated = await CreatorFollow.findAll({
        where: {
          userId: currentUserId,
          followingId: followingCreatorId,
        },
      })

      expect(followingCreated.length).toEqual(1)
      expect(followingCreated[0].userId).toEqual(currentUserId)
      expect(followingCreated[0].followingId).toEqual(followingCreatorId)
    })

    it('should remove creator follow correctly when user click follow twice', async () => {
      // Arrange
      const users = await TestHelper.createDummyUser()

      const currentUserId = users[0].id
      const followingCreatorId = users[0].id

      //  Action

      // Should Follow other creator
      await FollowOtherCreatorUseCase({
        userId: currentUserId,
        followingId: followingCreatorId,
      })

      // Should Unfollow other creator
      await FollowOtherCreatorUseCase({
        userId: currentUserId,
        followingId: followingCreatorId,
      })

      const followingCreated = await CreatorFollow.findAll({
        where: {
          userId: currentUserId,
          followingId: followingCreatorId,
        },
      })

      expect(followingCreated.length).toBe(0)
    })
  })
})

