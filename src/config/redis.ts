// @ts-ignore
import IoredisMock from 'ioredis-mock'
import Ioredis, { Redis as RedisType } from 'ioredis'

import { env } from './enviroments'

let redisConfig: RedisType

if (env.enviroment === 'production' || env.cacheStore === 'REDIS') {
  redisConfig = new Ioredis(env.redis)
} else {
  redisConfig = new IoredisMock()
}

export default redisConfig
