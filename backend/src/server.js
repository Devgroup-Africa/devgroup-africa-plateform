import { createApp } from './app.js'
import { connectDatabase } from './config/database.js'
import { env } from './config/env.js'

async function bootstrap() {
  await connectDatabase()
  const app = createApp()

  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`)
  })
}

bootstrap().catch(error => {
  console.error(error.message)
  process.exit(1)
})
