import './bootstrap.js'
import express from 'express'
import cors    from 'cors'
import RateLimit from 'express-rate-limit'
import helmet from 'helmet'
import routes  from './routes.js'
import './database/index.js'

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(new RateLimit({windowMs: 1000 * 60, max: 100,}))
    this.server.use(helmet())
    this.server.use(cors())
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server