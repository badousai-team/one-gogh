/* istanbul ignore file */

require('express-async-errors')
const { createHttpTerminator } = require('http-terminator')

const { Umzug, SequelizeStorage } = require('umzug')

const { db } = require('./models/db')
const { setupCrons } = require('./cron')

const app = require('./app')

// get PORT from .env file info
const port = process.env.SERVER_PORT || '9000' // default to 9000 if port info not set
const isProduction = process.env.NODE_ENV === 'production'

let httpTerminator

const migrator = new Umzug({
  logger: console,
  storage: new SequelizeStorage({ sequelize: db }),
  context: db.getQueryInterface(),
  migrations: {
    glob: './migrations/*.js',
    resolve: ({ name, path, context }) => {
      // Adjust the migration from the new signature to the v2 signature, making easier to upgrade to v3
      const migration = require(path)
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      }
    },
  },
})

const seeder = new Umzug({
  logger: console,
  storage: new SequelizeStorage({ sequelize: db, modelName: 'SequelizeData' }),
  context: db.getQueryInterface(),
  migrations: {
    glob: './seeders/*.js',
    resolve: ({ name, path, context }) => {
      // Adjust the migration from the new signature to the v2 signature, making easier to upgrade to v3
      const seed = require(path)
      return {
        name,
        up: async () => seed.up(context),
        down: async () => seed.down(context),
      }
    },
  },
})

migrator
  .up()
  .then(() => {
    if (!isProduction) seeder.up()
    console.log(`Starting server on ${port}`)
    const server = app.listen(port, () => {
      console.log(`Server listening http on ${port}`)
      httpTerminator = createHttpTerminator({ server })
      process.send && process.send('ready')
      if (process.env.API_SERVER_HOST !== 'localhost') {
        setupCrons()
      }
    })
  })
  .catch((err) => {
    console.log('ERROR migrating DB:', err)
    process.exit()
  })

process.on('SIGINT', async () => {
  console.log('Received shutdown signal')
  await db.close().catch(() => process.exit(1))
  console.log('DB closed')
  if (httpTerminator) {
    await httpTerminator.terminate().catch(() => process.exit(1))
    console.log('server terminated')
  }
  process.exit(0)
})

module.exports = app
