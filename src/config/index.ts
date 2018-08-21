import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

/* istanbul ignore next */
const nodeEnv = process.env.NODE_ENV || 'development'

configDotenv({
  path: resolve(process.cwd(), `.env.${nodeEnv}`),
})

interface IConfig {
  database: {
    sql: {
      host: string
      name: string
      password: string
      user: string
    }
  }
  server: {
    port: number
  }
}

const config: IConfig = {
  database: {
    sql: {
      host: process.env.DATABASE_HOST!,
      name: process.env.POSTGRES_DB!,
      password: process.env.POSTGRES_PASSWORD!,
      user: process.env.POSTGRES_USER!,
    },
  },
  server: {
    port: parseInt(process.env.PORT!, 10) || 3000,
  },
}

export default config
