import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import connectDB from './config'
import router from './router'

(async function bootstrapAsync(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
		const dotenv: any = require('dotenv');
		dotenv.config()
  }
  
  await connectDB()

  const app: express.Application = express()
  app.use(bodyParser.json())
  app.use(cors())
  if (process.env.NODE_ENV !== 'production')
    app.use(express.static(path.join(__dirname, '../public')))
  else
    app.use(express.static(path.join(__dirname, 'public')))
  app.use(router)

  const PORT = process.env.PORT
  app.listen(PORT, function () {
    console.log(`App is listening on port http://localhost:${PORT} !`)
  })
})()
