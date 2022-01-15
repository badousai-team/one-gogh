const supertest = require('supertest')
const app = require('../../app')
const TestHelper = require('../../tests/helper')
const { User } = require('../../models')

describe('GET /creator/:username', () => {
  afterEach(async () => {
    await User.destroy({
      where: {},
      force: true,
    })
  })

  it('should response 200 when fetch Ceator Profile by username', async () => {
    // Arrange
    const users = await TestHelper.createDummyUser()

    // Action
    const response = await supertest(app).get(`/creator/${users[0].username}`)

    // Assert
    expect(response.statusCode).toBe(200)
    expect(response.body.creator).toBeDefined()
  })

  it('should response 404 when Creator not found', async () => {
    // Arrange
    const users = await TestHelper.createDummyUser()

    // Action
    const response = await supertest(app).get(`/creator/${users[0].email}`)

    // Assert
    expect(response.statusCode).toBe(404)
  })
})

