const supertest = require('supertest')
const app = require('../../app')
const TestHelper = require('../../tests/helper')
const { User } = require('../../models')

describe('GET /creator/', () => {
  let accessToken

  afterEach(async () => {
    await User.destroy({
      where: {},
      force: true,
    })
  })

  beforeEach(async () => {
    accessToken = await TestHelper.getAccessToken()
  })

  describe('GET /creator/:username', () => {
    it('should response 200 when fetch Ceator Profile by username', async () => {
      // Arrange
      const users = await TestHelper.createDummyUser()

      // Action
      const response = await supertest(app).get(`/creator/${users[0].username}`)

      // Assert
      expect(response.statusCode).toBe(200)
      expect(response.body.creator).toBeDefined()
    })

    // it('should response 404 when Creator not found', async () => {
    //   // Arrange
    //   const users = await TestHelper.createDummyUser()

    //   // Action
    //   const response = await supertest(app).get(`/creator/${users[0].email}`)

    //   // Assert
    //   expect(response.statusCode).toBe(404)
    // })
  })

  describe('PUT /creator/:id/follow', () => {
    it('should response 200 when Follow user', async () => {
      // Arrange
      const users = await TestHelper.createDummyUser()

      const response = await supertest(app)
        .put(`/creator/${users[0].id}/follow`)
        .set('x-access-token', accessToken)

      expect(response.statusCode).toBe(200)
      expect(response.body.status).toBe('success')
    })

    it('should response 401 when User not log in', async () => {
      // Arrange
      const users = await TestHelper.createDummyUser()

      const response = await supertest(app)
        .put(`/creator/${users[0].id}/follow`)

      expect(response.statusCode).toBe(401)
    })
  })
})

