import cors from '@fastify/cors'
import app from './app'
import { env } from './env'

app.register(cors, {
  origin: '*',
})

app.listen({ port: Number(env.PORT), host: env.HOST }).then(() => {
  console.log(`HTTP server running on port ${env.PORT} and host ${env.HOST}`)
})
