const express = require('express')
require('express-async-errors')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const noCache = require('nocache')
const cors = require('cors')
const helmet = require('helmet')
const requestIp = require('request-ip')
const useragent = require('express-useragent')

const exception = require('./utils/exception')

const redisClient = require('./service/redis')

// controllers
const activityController = require('./router/activity')
const creatorController = require('./router/creator')
const publicController = require('./controllers/public')
const userController = require('./controllers/user')
const awsController = require('./controllers/aws')
const sessionController = require('./controllers/session')
const nftController = require('./controllers/nft')

const app = express()

// get PORT from .env file info
const port = process.env.SERVER_PORT || '9000' // default to 9000 if port info not set
const isProduction = process.env.NODE_ENV === 'production'
const sessionSecret = process.env.COOKIE_SECRET || 'harmony'
const cookieDomain = process.env.COOKIE_DOMAIN || 'harmony.one'
const corsOrigin = process.env.CORS_ORIGIN || '*'

// in milliseconds
// https://expressjs.com/en/resources/middleware/session.html
const DURATION_30_DAYS = 30 * 24 * 3600 * 1000

var sess = {
  secret: sessionSecret,
  cookie: { path: '/', httpOnly: true, maxAge: DURATION_30_DAYS },
  unset: 'destroy',
}

console.log('App ENV', app.get('env'))

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
  sess.cookie.domain = `.${cookieDomain}`
  sess.proxy = true
}

// store session in redis
sess.store = new RedisStore({ client: redisClient })

if (app.get('env') !== 'test') {
  app.use(session(sess))
}

const corsOptions = {
  origin: corsOrigin,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(noCache())

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1mb' })) // for parsing application/json

// if need to compress response to gzip format
// include compression library and uncomment the code below
// app.use(compression())

if (isProduction) {
  // PRODUCTION optimization
  app.use(helmet())
  app.use(requestIp.mw())
  app.use(useragent.express())
}

app.get('/', (req, res) => {
  res.json({
    meta: {
      code: 200,
      error: null,
      message: `Server is running at: http://localhost:${port}`,
    },
  })
})

// ROUTES -> link to controllers
app.use('/public', publicController)
app.use('/session', sessionController)
app.use('/user', userController)
app.use('/aws', awsController)

app.use('/activity', activityController)
app.use('/creator', creatorController)
app.use('/nft', nftController)

app.use((err, req, res, next) => {
  if (!err) {
    next()
    return
  }

  if (!isProduction) console.log(err)
  const [error, status] = exception(err)

  if (status === 500) {
    res.status(status).json({
      meta: {
        code: 500,
        message: error.message,
      },
    })
  } else {
    res.status(status).json({ meta: error })
  }
  return
})

app.use((req, res) => {
  if (!res.headersSent) {
    res.status(404).json({ message: 'Sorry can\'t find that!' })
  }
})

module.exports = app
